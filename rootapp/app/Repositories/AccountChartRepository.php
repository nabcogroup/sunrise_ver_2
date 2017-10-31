<?php


namespace App\Repositories;

use App\AccountChart;
use App\Traits\PaginationTrait;

class AccountChartRepository extends AbstractRepository {

    use PaginationTrait;


    protected function definedModel()
    {
        return new AccountChart();
    }

    public function getAccountCharts() {

        $accounts = $this->model->orderBy('code');

        return $this->createPagination($accounts, function($row) {
            $item = [
                'id'            =>  $row->id,
                'code'          =>  $row->code,
                'description'   =>  $row->description,
                'account_type'  =>  $row->account_type
            ];

            return $item;

        });

    }
}

