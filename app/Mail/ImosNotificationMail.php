<?php

namespace App\Mail;

use App\Models\ImosNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class ImosNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $notification;

    /**
     * Create a new message instance.
     */
    public function __construct(ImosNotification $notification)
    {
        // Pass notification data to the email
        $this->notification = $notification;
    }

    /**
     * Email subject
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'IMOSSF Notification'
        );
    }

    /**
     * Email view template
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.imos_notification',
            with: [
                'notification' => $this->notification
            ]
        );
    }

    /**
     * Attachments (not needed now)
     */
    public function attachments(): array
    {
        return [];
    }
}