@extends('layouts.master')
@section('content')
    <div class="page-header">
        Dashboard
    </div>
    <div class="row">
        <div class="col-md-5">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    Contract Module
                </div>
                <div class="panel-body">
                    <div class="nb-button-group">
                        <a href="{{route('contract.manage')}}" class="nb-menu" >
                            <i class="fa fa-align-justify fa-3x fa-fw"></i><br/>
                            Manage
                        </a>
                        <a href="{{route('contract.create')}}" class="nb-menu">
                            <i class="fa fa-pencil-square-o fa-3x fa-fw"></i><br/>
                            Add
                        </a>
                        <a href="{{route('contract.calendar')}}" class="nb-menu">
                            <i class="fa fa-calendar fa-3x fa-fw"></i><br/>
                            Calendar
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    Accounts Module
                </div>
                <div class="panel-body">
                    <div class="nb-button-group">
                        <a href="{{route('bill.edit')}}" class="nb-menu">
                            <i class="fa fa-pencil-square-o fa-3x fa-fw"></i><br/>
                            Receivable
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

