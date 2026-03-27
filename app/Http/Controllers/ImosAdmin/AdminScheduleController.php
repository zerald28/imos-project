<?php

namespace App\Http\Controllers\ImosAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\ScheduleAssignSwine;
use App\Models\Swine\Swine;

use App\Models\Swine\SwineGroup;
use Illuminate\Support\Facades\Auth;
use App\Models\Swine\Breed;
use App\Models\CMS\BlogPost;
use App\Models\Event;
use Inertia\Inertia;

class AdminScheduleController extends Controller
{
      public function list()
{
    // Load events with their blog posts and transform to include blog_slug
    $events = Event::with('blogPost')->get()->map(function($event) {
        return [
            'id' => $event->id,
            'title' => $event->title,
            'date' => $event->date instanceof \DateTime ? $event->date->format('Y-m-d') : $event->date,
            'type' => $event->type,
            'start_time' => $event->start_time instanceof \DateTime ? $event->start_time->format('H:i:s') : $event->start_time,
            'end_time' => $event->end_time instanceof \DateTime ? $event->end_time->format('H:i:s') : $event->end_time,
            'description' => $event->description,
            'blog_id' => $event->blog_id,
            'blog_slug' => $event->blogPost ? $event->blogPost->slug : null, // Add blog slug
            'is_global' => $event->is_global,
            'added_by' => $event->added_by,
            'year' => $event->year,
        ];
    });
    
    $schedules = Schedule::where('user_id', auth()->id())->get();
    
    $user = Auth::user();
    $blogPosts = null;

    $blogPosts = BlogPost::whereHas('author', function ($query) {
        $query->whereIn('role', ['admin', 'enforcer']);
    })->get();

    $schedule = Schedule::with('swine')
        ->where('user_id', auth()->id())
        ->orderBy('date')
        ->orderBy('time')
        ->get()
        ->groupBy('date');

    $event = Event::all()->groupBy('date');

    return inertia('admin/schedule/list', [
        'schedule' => $schedule,
        'event' => $event,
        'events' => $events, // Now this includes blog_slug
        'schedules' => $schedules,
        'blogPosts' => $blogPosts,
    ]);
}

   public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string',
        'date' => 'required|date',
        'start_time' => 'required',
        'end_time' => 'required',
        'description' => 'required|string',
        'blog_id' => 'nullable|integer',
        // 'year' can be nullable but we'll set it automatically
        'year' => 'nullable|integer',
    ]);

    $event = Event::create([
        'title' => $request->title,
        'date' => $request->date,
        'start_time' => $request->start_time,
        'end_time' => $request->end_time,
        'description' => $request->description,
        'blog_id' => $request->blog_id,
        'type' => $request->type ?? 'da_program',
        'is_global' => $request->is_global ?? true,
        'added_by' => auth()->id(),
        'year' => $request->year ?? date('Y'), // ✅ set current year if not provided
    ]);

    return redirect()->route('admin.schedules.list')->with('success', 'Event created');
}



    
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
    public function update(Request $request, Event $event)
{
    $request->validate([
        'title' => 'required|string',
        'date' => 'required|date',
        'start_time' => 'required',
        'end_time' => 'required',
        'description' => 'required|string',
        'blog_id' => 'nullable|integer',
        'type' => 'nullable|string',
        'is_global' => 'nullable|boolean',
        'year' => 'nullable|integer',
    ]);

    $event->update([
        'title' => $request->title,
        'date' => $request->date,
        'start_time' => $request->start_time,
        'end_time' => $request->end_time,
        'description' => $request->description,
        'blog_id' => $request->blog_id,
        'type' => $request->type ?? 'da_program',
        'is_global' => $request->is_global ?? true,
        'year' => $request->year ?? date('Y'),
        'updated_at' => now(),
    ]);

    // ✅ Instead of returning JSON, use Inertia redirect with flash
    return redirect()->route('admin.schedules.list')
                    //  ->with('success', 'Event updated successfully')
                     ->with('update_info', $event);
}



    public function index()
    {
        // fetch schedules for logged-in user
        $schedules = Schedule::with('swine')->where('user_id', auth()->id())->get();
        return inertia('schedule/IndexSchedule', compact('schedules'));
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


    

    public function show(Schedule $schedule)
    {
        $schedule->load('swine');
        return inertia('schedule/ShowSchedule', compact('schedule'));
    }

// In your EventController (or whatever controller handles events)
public function destroy($id)
{
    // Find the event by ID
    $event = Event::find($id);

    if (!$event) {
        return redirect()->route('admin.schedules.list')
            ->with('error', 'Event not found.');
    }

    // Delete the event
    $event->delete();

    return redirect()->route('admin.schedules.list')
        ->with('success', 'Event deleted successfully.');
}



    
}
