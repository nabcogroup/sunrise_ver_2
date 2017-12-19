<?php


namespace Contract\App\Criterias;

use KielPack\Laralibs\Repositories\Criteria;


class ContractRenewalCriteria extends Criteria {

    public function __construct(Array $data,$model) {

    }

    protected function apply() {
        
        //use the logic
        $payments = $this->model->bill()->first()->payments()->get();
        
        
        foreach($payments as $payment) {
            
        }
    }
}