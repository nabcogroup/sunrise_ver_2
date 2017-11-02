<?php
/**
 * Created by PhpStorm.
 * User: arnold.mercado
 * Date: 8/10/2017
 * Time: 3:41 PM
 */

namespace App\Repositories;

use App\Services\EDB;
use Carbon\Carbon;
use App\Selection;
use App\Expenditure;
use App\Traits\UserTrait;
use App\Traits\PaginationTrait;

class ExpenditureRepository extends AbstractRepository
{

    use PaginationTrait;

    
    protected function definedModel()
    {
        return new Expenditure();
    }

    public function createInstance()
    {
        return Expenditure::createInstance();
    }

    public function save($entities)
    {

        
        if (isset($entities['id']) && $entities['id'] != 0) {
            $this->model = $this->model->find($entities['id']);
        }

        $this->model->toMap($entities);
        $this->model->saveWithUser();

        return true;
    }

    public function getExpenses($property_code = null)
    {
        $params = array();
        $edb = EDB::createQuery('expenditures');
        $modelDb = $edb->joins([
                        'villas' => 'villas.id=expenditures.villa_id',
                        'payees' => 'payees.payee_code=expenditures.payee',
                        'account_charts' => 'account_charts.code=expenditures.acct_code'])->self($params);
            
        if (!is_null($property_code)) {
            $modelDb->where('expenditures.location',$property_code);
            $params['property'] = $property_code;
        }

        $modelDb = $modelDb->select(
            'expenditures.id',
            'expenditures.location',
            'payment_date',
            'villa_no',
            'expense_type','account_charts.code','account_charts.description','payees.name','amount');
        
        return $this->createPagination($modelDb,

            function ($row) {
                $item = [
                    'id'                =>  $row->id,
                    'location'          =>  Selection::getValue('villa_no',$row->location),
                    'payment_date'      =>  Carbon::parse($row->payment_date)->format('d-M-Y'),
                    'villa'             =>  $row->villa_no,
                    'expense_type'      =>  Selection::getValue('expense_type',$row->expense_type),
                    'accounts'          =>  $row->code.'-'.$row->description,
                    'payee'             =>  $row->name,
                    'amount'            =>  number_format($row->amount, 2)
                ];

                return $item;
            },
        $params);
    }
}
