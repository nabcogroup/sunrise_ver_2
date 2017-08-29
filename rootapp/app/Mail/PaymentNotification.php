<?php

namespace App\Mail;

use App\ContractBill;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PaymentNotification extends Mailable
{
    use Queueable, SerializesModels;

    private $bill;
    public function __construct(ContractBill $bill)
    {
        $this->bill = $bill;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $bill = $this->bill;
        return $this->markdown('mails.payment',compact('bill'));
    }
}
