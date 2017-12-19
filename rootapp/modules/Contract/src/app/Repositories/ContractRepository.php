<?php 



namespace Contract\App\Repositories;


use Carbon\Carbon;
use KielPack\Laralibs\Repositories\BaseRepository;


class ContractRepository extends BaseRepository {



    protected function model()
    {
        return 'Contract\Models\Contract';
    }

    public function expireContracts($start,$end) {

        return $this->model->whereBetween('period_end',[$start,$end]);

    }

    public function activeContracts() {

        return $this->model->where('status','active');

    }


    public function contracts($status = 'active') {

        return $this->model->with(['villas','tenants'])->where('status',$status);
        
    }

    public function create(array $data) {

        $villaNo = extract_with_unset($data,'villa_no');

        $data['contract_no'] = "C" . $villaNo . "-" . Carbon::now()->year . "-" . $this->model->createNewId();

        $data['status'] = 'pending';

        $this->model->toMap($data);

        $this->saveWithUser();
    }


    public function renew(array $data) {

        //use the logic
        $payments = $this->model->bill()->first()->payments()->get();
        
        foreach($payments as $payment) {
            
            
        }
    }


}