<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewContract extends Mailable
{
    use Queueable, SerializesModels;

    use Queueable, SerializesModels;

    private $contract;
    public function __construct($contract)
    {
        $this->contract = $contract;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $contract = $this->contract;
        return $this->markdown('mails.newcontract',compact('contract'));
    }
}
