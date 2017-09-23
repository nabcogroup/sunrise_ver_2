<?php

namespace App;


use App\Traits\HelperTrait;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contract extends BaseModel
{
    use SoftDeletes,HelperTrait;

    const PENDING = 'pending';
    const ACTIVE = 'active';
    const COMPLETED = 'completed';
    const CANCELLED = 'cancelled';

    protected $table = "contracts";
    protected $appends = ['full_status', 'full_contract_type', 'payable_per_month', 'full_period_start', 'full_period_end', 'total_year_month', 'total_received_payment'];

    //factory method
    public static function createInstance($defaultMonths)
    {

        $contract = new Contract();
        $contract->contract_type = "legalized";
        $contract->tenant_id = 0;
        $contract->villa_id = 0;
        $contract->setDefaultPeriod(Carbon::now(), $defaultMonths);
        $contract->amount = 0;
        
        $contract->register_tenant = Tenant::createInstance();
        $contract->villa_list = Villa::with('villaGalleries')
            ->where('status', 'vacant')
            ->orderBy('villa_no')
            ->get();
            

        return $contract;
    }

    /******** mutators ********/
    protected function getFullStatusAttribute()
    {
        return $this->attributes['full_status'] = Selection::convertCode($this->status);
    }

    protected function getFullContractTypeAttribute()
    {
        return $this->attributes['contract_type'] = Selection::convertCode($this->contract_type);
    }

    protected function getPayablePerMonthAttribute()
    {
        
        if ($this->amount > 0) {
            $totalAmountPerDays = $this->calculatePayableAmount($this->period_start,$this->period_end,$this->amount);
            return $totalAmountPerDays;
        }
        
        return 0;
    }

    protected function getFullPeriodStartAttribute()
    {
        return $this->attributes['full_period_start'] = Carbon::parse($this->period_start)->toDateTimeString();
    }

    protected function getFullPeriodEndAttribute()
    {
        return $this->attributes['full_period_end'] = Carbon::parse($this->period_end)->toDateTimeString();
    }

    protected function getTotalYearMonthAttribute()
    {
        return $this->calculateTotalYearMonth($this->period_start,$this->period_end);
    }

    protected function getTotalReceivedPaymentAttribute()
    {
        $bills = $this->bill()->get();
        if ($bills->count() > 0) {
            foreach ($bills as $bill) {
                $amount = $bill->Payments()->get()->sum('amount');
            }
            return $amount;
        }

        return 0;
    }

    /******** end mutators ********/

    /* navigation */
    public function contractTerminations()
    {
        return $this->hasOne(ContractTermination::class, 'contract_id');
    }

    public function villa()
    {
        return $this->hasOne(Villa::class, "id", "villa_id");
    }

    public function tenant()
    {
        return $this->hasOne(Tenant::class, "id", "tenant_id");
    }

    public function bill()
    {

        return $this->hasMany(ContractBill::class, 'contract_id', 'id');

    }

    /* end navigation */


    public function searchByNo($contractNo)
    {

        return $this->where('contract_no', $contractNo);

    }

    public function withAssociates()
    {

        return $this->with('villa')->with('tenant');

    }

    public function setDefaultPeriod(Carbon $startPeriod, $default, $extraPeriod = 0)
    {
        $this->period_start = $startPeriod->toDateTimeString();
        $this->period_end = $startPeriod->addMonth($default)->addDay(-1)->toDateTimeString();
    }

    public function setPeriod($periodStart, $periodEnd)
    {
        $this->period_start = $periodStart;
        $this->period_end = $periodEnd;
    }

    public function toComputeAmount($rate)
    {
        $totalPeriod = Carbon::parse($this->period_start)->diffInDays(Carbon::parse($this->period_end));
        $totalMonth = intval($totalPeriod / 30);
        $this->amount = $rate * $totalMonth;

    }


    public function getWithTotalPayment()
    {

        $payments = DB::table('contracts')
            ->join('bills', 'contracts.id', '=', 'bills.contract_id')
            ->join('payments', 'bills.id', '=', 'payments.bill_id')
            ->select(DB::raw('sum(payments.amount) as total_amount,contracts.contract_no,contracts.period_start,contracts.period_end'))
            ->grouBy('')
            ->get();

        return $payments;
    }


    public function saveContract($entity, $userId)
    {

        $villaNo = $entity['villa_no'];
        unset($entity['villa_no']);

        $entity['contract_no'] = "C" . $villaNo . "-" . Carbon::now()->year . "-" . $this->createNewId();

        $this->toMap($entity);
        $this->user_id = $userId;
        $this->pending()->save();

        return $this;
    }

    public function pending() {

        $this->status = "pending";
        return $this;
    }
    public function terminate() {
        $this->status = "terminated";
        return $this;
    }
    public function cancel() {
        $this->status = "cancelled";
        return $this;
    }
    public function completed() {
        $this->status = "completed";

        return $this;
    }
    public function active() {
        $this->status = "active";

        return $this;
    }
    public function isActive() {
        return $this->hasStatusOf('active');
    }
    public function isPending() {
        return $this->hasStatusOf('pending');
    }
    public function isTerminated() {
        if ($this->hasStatusOf('terminated') && $this->contractTerminations()->get()) {
            return true;
        } else {
            return false;
        }
    }

    
    public function getRemainingBalance()
    {
        if ($this->bill()->first() == null) {
            return 0;
        }
        //got to bill
        return $this->bill()->first()->withPendingPayments()->sum("amount");
    }

    public function getRemainingPeriod() {
        $endPeriod = Carbon::parse($this->period_end);
        $remaining = $endPeriod->diffInDays(Carbon::now());
        return $remaining;
    }

    public function isReconcile($total_payment) {

        if($total_payment >= $this->amount) {
            return true;
        }
        return false;
    }
}
