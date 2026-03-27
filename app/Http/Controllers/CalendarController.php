<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Schedule;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
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

        return Inertia::render('calendar/index', [
            'events' => $events,
            'schedules' => $schedules,
        ]);
    }
}
