<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        $address = 'noreply@monkeyscripts.org';
        $subject = 'Verify your MonkeyScripts email address';
        $name = 'MonkeyScripts';
        $activation_link = "http://127.0.0.1:8000/verify/" . $this->data['activation_code'];

        return $this->view('emails.verify_email')
                    ->from($address, $name)
                    ->replyTo($address, $name)
                    ->subject($subject)
                    ->with([ 
                        'username' => $this->data['username'], 
                        'activation_link' => $activation_link 
                    ]);

    }
}
