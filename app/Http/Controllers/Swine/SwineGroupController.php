<?php
// app/Http/Controllers/SwineGroupController.php
namespace App\Http\Controllers\Swine;


use App\Http\Controllers\Controller;
use App\Models\Swine\Swine;
use App\Models\Swine\SwineGroup;
use App\Models\Swine\SwineGroupMember;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SwineGroupController extends Controller
{
    /**
     * List groups
     */
   public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'group_type' => 'required|string',
        'swine_id' => 'nullable|exists:swine,id',
    ]);

    $group = \App\Models\Swine\SwineGroup::create([
        'owner_id' => auth()->id(),
        'name' => $request->name,
        'description' => $request->description,
        'group_type' => $request->group_type,
    ]);

    $assignedSwine = null;

    // ✅ if swine_id provided, also attach to members
    if ($request->swine_id) {
        $swine = \App\Models\Swine\Swine::find($request->swine_id);

        \App\Models\Swine\SwineGroupMember::create([
            'swine_group_id' => $group->id,
            'swine_id' => $swine->id,
            'joined_at' => now(),
        ]);

        $assignedSwine = $swine;
    }

    // ✅ Return JSON (for Inertia modal)
    if ($request->wantsJson()) {
        return response()->json([
            'newGroup' => $group,
            'assignedSwine' => $assignedSwine,
        ]);
    }

    return back()->with('success', 'Group created successfully!');
}

public function assign(Request $request, Swine $swine)
{
    $request->validate([
        'group_id' => 'required|exists:swine_groups,id',
    ]);

    $group = SwineGroup::where('id', $request->group_id)
        ->where('owner_id', auth()->id())
        ->firstOrFail();

    $swine->groups()->syncWithoutDetaching([
        $group->id => ['joined_at' => now()],
    ]);

    // ✅ fix: prepare label first
    $swineLabel = $swine->tag_number ? $swine->tag_number : $swine->id;

    if ($request->wantsJson()) {
        return response()->json([
            'message' => "Swine {$swineLabel} assigned to group {$group->name} successfully!",
        ]);
    }

    return back()->with('success', "Swine {$swineLabel} assigned to group {$group->name} successfully!");
}

public function index(Request $request)
{
    $groups = SwineGroup::where('owner_id', auth()->id())->get();

    // If you want to render Inertia page:
    return inertia('swine/index', [
        'groups' => $groups,
    ]);

    // OR if you just want JSON for modals:
    // return response()->json(['groups' => $groups]);
}

// SwineGroupController.php
public function bulkAssign(Request $request)
{
    $request->validate([
        'swine_ids'   => 'required|array',
        'swine_ids.*' => 'exists:swine,id',
        'group_id'    => 'required|exists:swine_groups,id',
    ]);

    foreach ($request->swine_ids as $swineId) {
        \App\Models\Swine\SwineGroupMember::updateOrCreate(
            [
                'swine_id'       => $swineId,
                'swine_group_id' => $request->group_id,
            ],
            [
                'joined_at' => now(),
                'left_at'   => null,
            ]
        );
    }

    return back()->with('success', 'Swine assigned to group successfully!');
}


public function bulkDelete(Request $request)
{
    $request->validate([
        'swine_ids' => 'required|array',
        'swine_ids.*' => 'exists:swine,id',
    ]);

    Swine::whereIn('id', $request->swine_ids)->delete();

    return back()->with('success', 'Selected swine deleted.');
}

    public function update(Request $request, SwineGroup $group)
    {
        // $this->authorize('update', $group); // optional if using policies

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $group->update($validated);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Group updated successfully.']);
        }

        return back()->with('success', 'Group updated successfully.');
    }

    /**
     * Delete a group and unassign all its swine members.
     */
      public function destroy(SwineGroup $group)
{
    try {
        $group->delete(); // Should cascade to swine_group_members
        return response()->json(['message' => 'Group deleted successfully']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to delete group', 'error' => $e->getMessage()], 500);
    }
}


    /**
     * Remove a specific swine from a group.
     */
  // App\Http\Controllers\SwineGroupController.php

public function removeMember($groupId, $swineId)
{
    $group = SwineGroup::findOrFail($groupId);

    // detach deletes the pivot row
    $group->swine()->detach($swineId);

    return response()->json(['message' => 'Swine removed from group']);
}


}


