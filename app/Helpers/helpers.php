<?php

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

if (!function_exists('log_activity')) {
    function log_activity(string $action, ?string $module = null, array $meta = []): void
    {
        ActivityLog::create([
            'user_id' => Auth::check() ? Auth::id() : null,
            'action'  => $action,
            'module'  => $module,
            'meta'    => $meta,
        ]);
    }
}
