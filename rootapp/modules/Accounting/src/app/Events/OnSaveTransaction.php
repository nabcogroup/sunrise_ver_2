<?php

namespace Accounting\App\Events;


use Illuminate\Queue\SerializesModels;
use KielPack\LaraLibs\Supports\Predictive;

class OnSaveTransaction
{
    use SerializesModels;

    public $transaction;
    public $predictive;

    public function __construct(Predictive $predictive, array $transaction = [])
    {
        $this->transaction = $transaction;
        $this->predictive = $predictive;
    }
}