<?php

namespace App\Traits;


trait PaginationTrait
{

    public function createOutput(&$model,$data,$params = array())
    {
        if(sizeof($params) > 0) {

            $model->appends($params);

        }

        return [
            'current_page' => $model->currentPage(),
            'total' =>  $model->total(),
            'data' => $data,
            'last_page'     =>  $model->url($model->lastPage()),
            'first_page'    =>  $model->url(1),
            'has_pages'     =>  $model->hasMorePages(),
            'previous_page' =>  $model->previousPageUrl(),
            'next_page'     =>  $model->nextPageUrl(),
            'has_more_pages' =>  $model->hasMorePages(),
            'current_url'   =>  ''
        ];
    }

    public function createPagination(&$model,$callback = null,$params = array()) {

        $data = $model->paginate(20);

        $items = [];

        foreach ($data as $key => $row) {

            if($callback == null) {
                $item = $row;
            }
            else {
                $item = $callback($row);
            }
            
            if(!empty($item))
                array_push($items, $item);
            
        }

        return $this->createOutput($data,$items,$params);

    }
}