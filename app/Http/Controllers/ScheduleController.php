<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\ScheduleAssignSwine;
use App\Models\Swine\Swine;

use App\Models\Swine\SwineGroup;
use Illuminate\Support\Facades\Auth;
use App\Models\Swine\Breed;

use App\Models\Event;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function edit($id)
    {
        $schedule = Schedule::with('swine')->findOrFail($id);
        $swine = Swine::all();
        $groups = SwineGroup::with('swine')->get();

        return inertia('schedule/edit', [
            'schedule' => $schedule,
            'swine' => $swine,
            'groups' => $groups,
        ]);
    }


    /**
     * Update the specified schedule in storage.
     */
    public function update(Request $request, $id)
    {
        $schedule = Schedule::with('swine')->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'category' => 'nullable|string|max:100',
            'swine_ids' => 'nullable|array',
            'swine_ids.*' => 'integer|exists:swine,id',
        ]);

        // Original data before update
        $original = $schedule->only(['title', 'description', 'date', 'category']);
        $oldSwines = $schedule->swine->pluck('id')->toArray();

        // New data
        $newSwines = $validated['swine_ids'] ?? [];

        // Detect changes
        $changes = [];
        foreach ($original as $field => $oldValue) {
            if ($oldValue != ($validated[$field] ?? '')) {
                $changes[$field] = [
                    'old' => $oldValue,
                    'new' => $validated[$field] ?? ''
                ];
            }
        }

        // Detect added and removed swines
        $addedSwines = array_diff($newSwines, $oldSwines);
        $removedSwines = array_diff($oldSwines, $newSwines);

        // Update model
        $schedule->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'date' => $validated['date'],
            'category' => $validated['category'] ?? '',
        ]);
        $schedule->swine()->sync($newSwines);

        // Prepare flash data (only if there are any changes)
        $updateInfo = [
            'title' => $validated['title'], // ✅ include title always
            'changed_fields' => $changes,
            'added_swine' => count($addedSwines),
            'removed_swine' => count($removedSwines),
        ];

        return redirect()
            ->route('schedules.list')
            ->with([
                'success' => 'Schedule updated successfully.',
                'update_info' => $updateInfo,
            ]);
    }



    public function index()
    {
        // fetch schedules for logged-in user
        $schedules = Schedule::with('swine')->where('user_id', auth()->id())->get();
        return inertia('schedule/IndexSchedule', compact('schedules'));
    }

    public function list()
    {
        $events = Event::all(); // DA + Holidays
        $schedules = Schedule::where('user_id', auth()->id())->get(); // farmer schedules
        // Get schedules for the current user or all if admin

        $schedule = Schedule::with('swine')
            ->where('user_id', auth()->id())
            ->orderBy('date')
            ->orderBy('time')
            ->get()
            ->groupBy('date'); // group schedules by date

        return inertia('schedule/list', [
            'schedule' => $schedule,
            'events' => $events,
            'schedules' => $schedules,
        ]);
    }

    public function create(Request $request)
    {
        $userId = auth()->id();

        // Only swine that belong to the user
        $swine = Swine::where('owner_id', $userId)->get();
        // ✅ Retrieve swine_ids[] from the query if present
        $selectedSwineIds = collect($request->input('swine_ids', []))->map(fn($id) => (int) $id)->toArray();
        // Only groups that belong to the user, with their swines
        $groups = SwineGroup::with(['swine' => function ($q) use ($userId) {
            $q->where('owner_id', $userId);
        }])->where('owner_id', $userId)->get();

        return inertia('schedule/CreateSchedule', compact('swine', 'groups', 'selectedSwineIds'));
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'category' => 'required|string|in:Health,Marketplace,Schedule', // ✅ must match frontend values
            'swine_ids' => 'required|array|min:1',
            'swine_ids.*' => 'exists:swine,id',
        ]);

        $category = $validated['category'] ?? 'Schedule';

        // create the schedule
        $schedule = Schedule::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'date' => $validated['date'],
            'category' => $category, // ✅ now always filled
        ]);

        // assign swines
        $uniqueSwines = array_unique($validated['swine_ids']);
        foreach ($uniqueSwines as $swineId) {
            ScheduleAssignSwine::create([
                'schedule_id' => $schedule->id,
                'swine_id' => $swineId,
            ]);
        }

      return redirect()->route('schedules.list')->with([
    'success' => 'Schedule created successfully!',
    'update_info' => [
        'title' => $schedule->title,
        'changed_fields' => [],
        'added_swine' => count($uniqueSwines),
        'removed_swine' => 0,
    ],
]);

    }

    public function show(Schedule $schedule)
    {
        $schedule->load('swine');
        return inertia('schedule/ShowSchedule', compact('schedule'));
    }

public function destroy($id)
{
    $schedule = Schedule::find($id);

    if (!$schedule) {
        return back()->withErrors(['error' => 'Schedule not found.']);
    }

    $schedule->delete();

    // ✅ Respond properly for Inertia
    return back()->with('success', 'Schedule deleted successfully!');
}


    public function schedule()

    {
        $user = Auth::user();

        // Global Events (Holidays + DA Programs)
        $events = Event::query()
            ->where('is_global', true)
            ->get();

        // User-specific schedules
        $schedules = Schedule::query()
            ->where('user_id', $user->id)
            ->get();

        return Inertia::render('schedule/schedules', [
            'events' => $events,
            'schedules' => $schedules,
        ]);
    }
}
