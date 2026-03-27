<?php

namespace App\Http\Controllers\Swine;

use App\Http\Controllers\Controller;
use App\Http\Requests\Swine\StoreSwineRequest;
use App\Http\Requests\Swine\UpdateSwineRequest;
use App\Models\Swine\Swine;
use App\Models\Swine\SwineTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SwineController extends Controller
{
    /**
     * Display a listing of the active swine for the authenticated farmer.
     */
    public function index(Request $request)
    {
        $swine = Swine::query()
            ->where('owner_id', $request->user()->id)
            ->whereIn('status', ['active', 'available'])
            ->with('breed')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return inertia('Swine/Index', [
            'swine' => $swine,
        ]);
    }

    /**
     * Store a newly created swine.
     */
    public function store(StoreSwineRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $swine = Swine::create([
                'owner_id'     => $request->user()->id,
                'tag_number'   => $request->tag_number,
                'sex'          => $request->sex,
                'birthdate'    => $request->birthdate,
                'breed_id'     => $request->breed_id,
                'cuztom_breed' => $request->cuztom_breed,
                'category'     => $request->category,
                'purpose'      => $request->purpose,
                'weight'       => $request->weight,
                'stage'        => $this->calculateStage($request->birthdate, $request->purpose),
                'status'       => 'active',
                'description'  => $request->description,
            ]);

            // Log transaction
            SwineTransaction::create([
                'swine_id'        => $swine->id,
                'from_owner_id'   => null,
                'to_owner_id'     => $request->user()->id,
                'transaction_type'=> 'registration',
                'notes'           => 'Initial registration',
                'performed_by_id' => $request->user()->id,
            ]);

            return redirect()->route('swine.index')->with('success', 'Swine registered successfully.');
        });
    }

    /**
     * Update swine details.
     */
    public function update(UpdateSwineRequest $request, Swine $swine)
    {
        $this->authorize('update', $swine);

        return DB::transaction(function () use ($request, $swine) {
            $oldOwner = $swine->owner_id;
            $oldStatus = $swine->status;

            $swine->update([
                'tag_number'   => $request->tag_number,
                'sex'          => $request->sex,
                'birthdate'    => $request->birthdate,
                'breed_id'     => $request->breed_id,
                'cuztom_breed' => $request->cuztom_breed,
                'category'     => $request->category,
                'purpose'      => $request->purpose,
                'weight'       => $request->weight,
                'stage'        => $this->calculateStage($request->birthdate, $request->purpose),
                'status'       => $request->status,
                'description'  => $request->description,
            ]);

            // Log transaction if ownership or status changed
            if ($swine->owner_id !== $oldOwner || $swine->status !== $oldStatus) {
                SwineTransaction::create([
                    'swine_id'        => $swine->id,
                    'from_owner_id'   => $oldOwner,
                    'to_owner_id'     => $swine->owner_id,
                    'transaction_type'=> $this->determineTransactionType($oldStatus, $swine->status),
                    'notes'           => 'Status or ownership change',
                    'performed_by_id' => $request->user()->id,
                ]);
            }

            return redirect()->route('swine.index')->with('success', 'Swine updated successfully.');
        });
    }

    /**
     * Soft delete a swine (mark as inactive).
     */
    public function destroy(Swine $swine)
    {
        $this->authorize('delete', $swine);

        return DB::transaction(function () use ($swine) {
            $swine->update(['status' => 'inactive']);
            $swine->delete();

            SwineTransaction::create([
                'swine_id'        => $swine->id,
                'from_owner_id'   => $swine->owner_id,
                'to_owner_id'     => null,
                'transaction_type'=> 'deactivation',
                'notes'           => 'Swine record soft-deleted',
                'performed_by_id' => auth()->id(),
            ]);

            return redirect()->route('swine.index')->with('success', 'Swine deactivated.');
        });
    }

    /**
     * Calculate stage based on birthdate and purpose.
     */
    protected function calculateStage(string $birthdate, string $purpose): string
    {
        $ageInDays = now()->diffInDays(\Carbon\Carbon::parse($birthdate));

        if ($purpose === 'breeding_sow' || $purpose === 'breeding_boar') {
            return 'Breeder';
        }

        if ($ageInDays < 28) {
            return 'Pre-Weaning';
        } elseif ($ageInDays < 56) {
            return 'Post-Weaning';
        } elseif ($ageInDays < 150) {
            return 'Grower';
        }

        return 'Finisher';
    }

    /**
     * Determine transaction type from old and new status.
     */
    protected function determineTransactionType(string $oldStatus, string $newStatus): string
    {
        return match ($newStatus) {
            'sold'        => 'sale',
            'dead'        => 'death',
            'slaughtered' => 'slaughter',
            'inactive'    => 'deactivation',
            default       => 'transfer',
        };
    }

    public function create()
{
    return inertia('Swine/Create');
}

}
