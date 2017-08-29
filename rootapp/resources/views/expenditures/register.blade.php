@extends('layouts.master')

@section('content')
    <expenditure-register index="{{isset($id) ? $id : ''}}"></expenditure-register>
@endsection