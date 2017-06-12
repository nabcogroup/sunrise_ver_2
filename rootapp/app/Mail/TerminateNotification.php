<?php

namespace App\Mail;


use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;


use App\Contract;
use App\User;

class TerminateNotification extends Mailable
{
    use Queueable, SerializesModels;

    private $contract;

    private $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Contract $contract,User $user)
    {

        $this->contract = $contract;

        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $contractTermination = $this->contract->contractTerminations()->first();

        $termination = [

            'contract_no'   =>  $this->contract->contract_no,

            'villa_no'      =>  $this->contract->villa()->first()->villa_no,

            'location'      =>  $this->contract->villa()->first()->full_location,

            'amount'        =>  $this->contract->amount,

            'reason'        =>  $contractTermination->description,

            'ref_no'        =>  isset($contractTermination->ref_no) ? $contractTermination->ref_no : '',

            'user'          =>  $this->user->full_name
        ];

        return $this->markdown('mails.terminatenotification',compact('termination'));

    }
}
