<?php

namespace App\Repositories;

use App\Payment;
use Carbon\Carbon;
use Dompdf\Exception;

class BillRepository extends AbstractRepository
{

    protected function definedModel()
    {
        return new \App\ContractBill();
    }

    public function create($contractId)
    {
        return $this->model->createInstance($contractId);
    }

    public function saveBill($entity = array(), $userId)
    {
        try {
            //update
            if (isset($entity['id']) && $entity['id'] != 0) {
                $this->model->updatePayment($entity, $userId);
            }
            else {
                $this->model->saveBill($entity, $userId);
            }
        }
        catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        return $this;
    }

    public function includePayments()
    {
        $this->model = $this->model->with("Payments");

        return $this;
    }

    public function findByBillNo($billNo) {

        return $this->model->where('bill_no',$billNo);
    }

    public function findExistingContract($contractNo) {
        return $this->model->getExistingContract($contractNo);
    }

    public function hasBalance($entity, $contractAmount)
    {
        if (isset($entity['payments']) && sizeof($entity['payments']) > 0) {
            $amountReceived = 0;
            foreach ($entity['payments'] as $payment) {
                $amountReceived += (float)$payment['amount'];
            }

            if ($amountReceived >= (float)$contractAmount) {
                return false;
            }
        }
        return true;
    }

    public function search($source) {
        if($source == 'bill') {
            return $this->model->where('bill_no',$source)->get();
        }
        else if($source == 'contract') {

        }
    }

}