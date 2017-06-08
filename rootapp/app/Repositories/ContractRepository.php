<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Selection;

class ContractRepository extends AbstractRepository {

    protected $parameters;



    protected function beforeCreate(&$model)
    {
        $model['status'] = 'pending';
    }

    public function definedModel() {
        return new \App\Contract();
    }

    public function create($defaultPeriod) {
        return $this->model->createInstance($defaultPeriod);
    }

    public function getContracts($status) {
        
        $contracts = $this->model->with('villa')->with('tenant')->where('status',$status)->get();

        $items = array();
        foreach ($contracts as $contract) {

            $item = [
                "id"            =>  $contract->getId(),
                "contract_no"   =>  $contract->contract_no,
                "bill_no"       =>  ($contract->status == 'active') ? $contract->bill()->first()->bill_no : "",
                "villa_no"      =>  $contract->villa()->first()->villa_no,
                "tenant_name"   =>  $contract->tenant()->first()->full_name,
                "contract_type" =>  $contract->full_contract_type,
                "created_at"    =>  Carbon::parse($contract->created_at)->toDateString(),
                "period_start"  =>  Carbon::parse($contract->period_start)->toDateString(),
                "period_end"    =>  Carbon::parse($contract->period_end)->toDateString(),
                "amount"        =>  $contract->amount,
                "status"        =>  $contract->full_status
            ];
            array_push($items,$item);
        }
        return $items;
    }

    public function getExpiryContracts($start,$end) {

        return $this->model->whereBetween('period_end',[$start,$end]);
        
    }


    public function saveContract($entity,$userId)
    {
        $villaNo = $entity['villa_no'];
        unset($entity['villa_no']);
        $entity['contract_no'] = "C".$villaNo."-".Carbon::now()->year."-".$this->model->createNewId();
        $entity['user_id'] = $userId;

        return $this->attach($entity)->instance();
    }

    public function includeAssociates() {

        $this->model = $this->model->with('villa')->with('tenant');

        return $this;
    }

    public function activeOnly() {
        $this->model = $this->model->where('status','active');
        return $this;
    }

    public function findByContractNo($contractNo) {
        return $this->model->where('contract_no',$contractNo);
    }


    public function renew($models) {
        
        $oldContract = $this->single($models['id']);

        if($oldContract->hasStatusOf(Contract::ACTIVE)) {
            
            $oldContractNo = $oldContract->contract_no;
            
            preg_match('/^([^-]+?)-([0-9]+?)-([0-9]+?)$/',$oldContractNo,$splits);

            if(sizeof($splits) > 0)  {
                array_splice($splits,0,1); //exclude the whole contractno
                $splits[1] = Carbon::now()->year;
                $splits[2] = $this->createNewId();
            }

            $newContractNo = implode('-',$splits);

            $oldContract->completed();

            $oldContract->save();
            
            //set contract no
            $model['contract_no'] = $newContractNo;
            
            $this->attach($models,"create");

            return true;
        }
        else {
            
            return false;
        }  
    }

    public function cancelled($models) {

        $contract = $this->single($models['id']);

        if($contract->hasStatusOf(Contract::PENDING)) {

            $contract->cancel();

            $contract->toUpdate();

        }

        return true;
    }

    public function terminate($models = array()) {

        $contract = $this->single($models['id']);
        
        if($contract->hasStatusOf(Contract::ACTIVE)) {

            $this->contract->terminate();

            $this->contract->save();
        }
        
        return true;
    }

    public function calculateAmount($ratePerMonth) {
        
        $this->model->toComputeAmount($ratePerMonth);

        return $this;

    }





}