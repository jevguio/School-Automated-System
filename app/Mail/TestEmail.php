<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;
    /**
     * Create a new message instance.
     */
    public function __construct($details)
    {
        $this->details = $details;
    } 
    public function build()
    {
        return $this->from('noreply@gdsc.advocu.com', 'Advocu GDSC')
                    ->replyTo('	developerstudentclubs-support@google.com', 'developerstudentclubs support')
                    ->subject('[GDSC] Exciting news: You are invited to interview for the GDSC Lead position!')
                    ->view('emails.test');
    }
}
