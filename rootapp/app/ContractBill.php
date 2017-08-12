<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Services\Result;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;


class ContractBill extends BaseModel
{
    
    const DEFAULT_PERIOD = 1;

    

    public function __construct(array $attributes = [])
    {
        $this->created_at = Carbon::now();
        $this->updated_at = Carbon::now();

        parent::__construct($attributes);

    }

    public static function createInstance($contractId,$tenant_id,$amount) {

        $bill = new ContractBill();
        $bill->contract_id = $contractId;
        $bill->bill_no = "";
        $bill->instance = Payment::createInstance();
        $bill->payee_id = $tenant_id;
        $bill->amount = $amount;
        $bill->instance->initPeriod(self::DEFAULT_PERIOD);
        $bill->payments = [];

        return $bill;
    }

    public static function createInstanceOfPayment() {

        $instance =  Payment::createInstance();

        $instance->initPeriod(self::DEFAULT_PERIOD);

        return $instance;
    }

    /*********************
     * mutation
     ********************/

    


    /*********************
     * navigation
     ********************/
    public function Payments() {

        return $this->hasMany(Payment::class,'bill_id','id');

    }
    public function contract() {

        return $this->belongsTo('App\Contract','contract_id');

    }
    public function payee() {

        return $this->belongsTo('App\Tenant','payee_id');

    }
    /******************
    * end navigation
     *******************/
    public function activate() {

        $this->status = 'active';

        return $this;
    }

    public function withClearedPayments() {

        return $this->payments()->where('status','clear');

    }

    public function withPendingPayments() {
        return $this->payments()->where('status','received');
    }

    public function withPaymentStatusOf($status) {
        return $this->payments()->where('status',$status);
    }

    public function getSummary() {

        return $this->Payments()->where("status","clear")->sum("amount");

    }

    public function withPaymentLine() {

        return $this->with('Payments');
    }

    public function saveBill($entity,$userId) {

        try {

            if(!isset($entity['id']) || $entity['id'] == 0) {
                $bill = new ContractBill([
                    'bill_no'       =>  "B" . $entity['contract_id'] . "-" . Carbon::now()->year . "-" . $this->createNewId(),
                    'contract_id'   =>  $entity['contract_id'],
                    'amount'        =>   $entity['amount'],
                    'payee_id'      =>  $entity['payee_id'],
                    'user_id'       =>  $userId
                ]);

                $bill->save();

                if(!isset($entity['payments']['id']) || $entity['payments']['id'] == 0) {
                    $bill->Payments()->saveMany(array_map(function ($item) use ($userId) {
                        $payment = new Payment();
                        $payment->toMap($item);
                        $payment->payment_no = $item['payment_no'];
                        $payment->user_id = $userId;  //manually

                        return $payment;

                    }, $entity['payments']));
                }
            }
            else {
                $bill = $this->find($entity['id']);
                //update its payment
                $entityPayments = isset($entity['payments']) ? $entity['payments'] : [];
                if (sizeof($entityPayments) > 0) {
                    foreach ($entityPayments as $entityPayment) {
                        if (!isset($entityPayment['id']) || $entityPayment['id'] == 0) {
                            $paymentModel = new Payment();
                            $paymentModel->toMap($entityPayment);
                            $paymentModel->user_id = $userId;
                            $paymentModel->bill_id = $bill->getId();
                            $paymentModel->save();
                        }
                        else {
                            //update only without received
                            $paymentModel = Payment::find($entityPayment['id']);
                            if ($paymentModel != null) {
                                $paymentModel->status = $entityPayment['status'];
                                $paymentModel->remarks = $entityPayment['remarks'];
                                $paymentModel->deposited_bank = $entityPayment['deposited_bank'];
                                $paymentModel->date_deposited = $entityPayment['date_deposited'];
                                $paymentModel->bank_account = $entityPayment['bank_account'];
                                $paymentModel->save();
                            }
                            else {
                                throw new Exception('Invalid payment');
                            }
                        }
                    }
                }
            }
            return $bill;
        }
        catch (Exception $e) {
           Result::badRequest(['exception' => $e->getMessage()]);
        }
    }

    public function updatePayment($entity,$userId) {

        try {

            //get the current bill
            $currentBill = $this->find($entity['id']);

            //update its payment
            $entityPayments = isset($entity['payments']) ? $entity['payments'] : [];
            if (sizeof($entityPayments) > 0) {
                foreach ($entityPayments as $entityPayment) {
                    if(!isset($entityPayment['id']) || $entityPayment['id'] == 0) {
                        $paymentModel = new Payment();
                        $paymentModel->toMap($entityPayment);
                        $paymentModel->user_id = $userId;
                        $paymentModel->bill_id = $currentBill->getId();
                        $paymentModel->save();
                    }
                    else {
                        //update only without received
                        $paymentModel = $currentBill->Payments()->find($entityPayment['id']);
                        if ($paymentModel != null) {
                            $paymentModel->status = $entityPayment['status'];
                            $paymentModel->remarks = $entityPayment['remarks'];
                            $paymentModel->save();
                        }
                        else {
                            throw new Exception('Invalid payment');
                        }
                    }


                }
            }

            return $currentBill;
        }

        catch(Exception $e) {
            Result::badRequest(['exception' => $e->getMessage()]);
        }

        return false;
    }

    public function getBillByNo($billNo) {
        return $this->where('bill_no',$billNo)->get();
    }

    public function getExistingContract($contractNo) {

        $raw =  DB::table('contracts AS c')
                ->select('cb.bill_no')
                ->join('contract_bills AS cb','c.id', '=' ,'cb.contract_id')
                ->where('c.contract_no','=',$contractNo)->first();

        

        return $raw;

    }

    public function isClear() {
        return $this->hasStatusOf('clear');
    }
    public function isCancel() {
        return $this->hasStatusOf('bounce');
    }
    public function isPending() {
        return $this->hasStatusOf('received');
    }
}
