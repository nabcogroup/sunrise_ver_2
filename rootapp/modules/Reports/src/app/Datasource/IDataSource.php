<?php

namespace Reports\App\Datasource;


interface IDataSource
{
    public function execute();

    public function lookups();
}