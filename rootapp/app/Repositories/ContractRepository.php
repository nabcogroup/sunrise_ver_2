<?php

namespace App\Repositories;

use App\Traits\PaginationTrait;
use App\Traits\QuerySoftDeleteTrait;
use Carbon\Carbon;
use App\Selection;
use Dompdf\Exception;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\DeserializeTrait;
class ContractRepository extends AbstractRepository
{

    use PaginationTrait,DeserializeTrait;

    use QuerySoftDeleteTrait;

    protected $parameters;

    protected function beforeCreate(&$model,&$source)
    {

        $villaNo = $model['villa_no'];
        unset($model['villa_no']);
        
        if(isset($model['configure'])) {
            $configure = "";
            $this->setMetaValue($configure,$model['configure']);
            $source->configure = $configure;
            unset($model['configure']);
        }
        
        
        $model['contract_no'] = "C" . $villaNo . "-" . Carbon::now()->year . "-" . $this->model->createNewId();
        $source->period_end_extended = $model['period_end']->addDays(floatval($model['extra_days'])); 
        $model['status'] = 'pending';
    }

    public function definedModel()
    {
        return new \App\Contract();
    }

    public function create($defaultPeriod)
    {
        $model = $this->model->createInstance($defaultPeriod);
        $model->register_tenant = \App\Tenant::createInstance();
        $model->villa_list = \App\Villa::with('villaGalleries')
            ->where('status', 'vacant')
            ->orderBy('villa_no')
            ->get();
        $model->extra_days = 0;
        return $model;
    }

    public function getContracts($state,$filter_field = null,$filter_value = null) {

        $contracts = $this->createDb('contracts')
            ->join('villas', 'contracts.villa_id', '=', 'villas.id')
            ->join('tenants', 'contracts.tenant_id', '=', 'tenants.id')
            ->leftJoin('contract_bills','contracts.id','=','contract_bills.contract_id')
            ->select(
                "contracts.id",
                "contracts.contract_no",
                "villas.villa_no",
                "tenants.full_name",
                "contracts.created_at AS contract_created",
                "contracts.period_start",
                "contract_bills.bill_no",
                "contracts.period_end_extended", "contracts.amount", "contracts.status AS contracts_status")
            ->where('contracts.status', $state);

        $params  = [];
        if ($filter_field) {
            
            $params = ['filter_field' => $filter_field,'filter_value' => $filter_value];

            if ($filter_field == 'villa_no') {
                $contracts->where('villas.villa_no', 'LIKE', '%' . $filter_value . '%');
            }
            else if ($filter_field == 'full_name') {
                $contracts->where('tenants.full_name', 'LIKE', '%' . $filter_value . '%');
            }
            else if($filter_field == 'period') {
                //split filter
                
            }
            else {
                $contracts->where('contracts.' . $filter_field, 'LIKE', '%' . $filter_value . '%');
            }
        }


        return $this->createPagination($contracts, function ($row) {
            
            $item = [
                "id" => $row->id,
                "contract_no" => $row->contract_no,
                "villa_no" => $row->villa_no,
                "full_name" => $row->full_name,
                "created_at" => Carbon::parse($row->contract_created)->format('d, M, Y'),
                "period" => Carbon::parse($row->period_start)->format('d, M, Y') ." - ". Carbon::parse($row->period_end_extended)->format('d, M, Y'),
                "amount" => number_format($row->amount,2),
                "bill_no" => $row->bill_no,
                "status" => ucfirst($row->contracts_status)
            ];

            return $item;
            
        },$params);

    }

    public function getExpiryContracts($start, $end) {
        return $this->model->whereBetween("period_end_extended",[$start, $end]);
    }

    public function getExistingBill($contractNo)
    {
        return $this->model->where('contract_no', $contractNo)->with('bill')->firstOrFail();
    }

    public function saveContract($entity) {

        return $this->attach($entity,[],true)->instance();

    }

    public function includeAssociates()
    {

        $this->model = $this->model->with(['villa', 'tenant']);

        return $this;
    }

    public function activeOnly()
    {
        $this->model = $this->model->where('status', 'active');
        return $this;
    }

    public function findByContractNo($contractNo)
    {
        return $this->model->where('contract_no', $contractNo);
    }

    public function renew($models) {

        $oldContract = $this->single($models['id']);
        if ($oldContract->isActive()) {
            $oldContractNo = $oldContract->contract_no;
            preg_match('/^([^-]+?)-([0-9]+?)-([0-9]+?)$/', $oldContractNo, $splits);
            if (sizeof($splits) > 0) {
                array_splice($splits, 0, 1); //exclude the whole contractno
                $splits[1] = Carbon::now()->year;
                $splits[2] = $this->createNewId();
            }

            $newContractNo = implode('-', $splits);

            $oldContract->completed();

            $oldContract->save();

            //set contract no
            $model['contract_no'] = $newContractNo;

            $this->attach($models, "create");

            return true;
        } else {

            return false;
        }
    }

    public function cancelled($models)
    {
        $contract = $this->single($models['id']);
        if ($contract->isPending()) {
            $contract->cancel();
            $contract->save();
        }

        return true;
    }

    public function terminate($models = array())
    {
        $contract = $this->find($models['id']);

        if ($contract->isActive()) {
            $contract->terminate();
            $contract->saveWithUser();
            $contract->contractTerminations()->create([
                'description' => $models['description'],
                'ref_no' => $models['ref_no']]);
        }
        else {
            throw new Exception("Unable to terminate contract either contract is not active or internal error occured");
        }
        return $contract;
    }

    public function calculateAmount($ratePerMonth)
    {

        $this->model->toComputeAmount($ratePerMonth);
        return $this;
    }


}