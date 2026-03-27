<h2>IMOSSF Notification</h2>

<p>Hello {{ $notification->user->name ?? 'User' }},</p>

<p>{{ $notification->message }}</p>

@if($notification->url)
<p>
    <a href="{{ url($notification->url) }}">
        View Notification
    </a>
</p>
@endif

<p>Thank you,<br>IMOSSF System</p>