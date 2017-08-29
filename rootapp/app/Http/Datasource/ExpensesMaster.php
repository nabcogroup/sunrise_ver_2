<?php

namespace App\Http\Datasource;


use App\Expenditure;

class ExpensesMasterDataSource implements IDataSource
{

    private $param;
    public function __construct($param)
    {
        $this->param = $param;
    }

    public function execute()
    {
        //range param
        $expenditures = Expenditure::with('accounts','payees')->all();


        return $expenditures;

    }
}