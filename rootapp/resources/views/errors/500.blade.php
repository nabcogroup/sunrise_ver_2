@extends('layouts.master')

@section('content')
    <div class="page-header">
        <h1>Sunrise Error 500</h1>
    </div>
    <div class="alert alert-danger">
        <p>{{$exception->getMessage()}}</p>
    </div>

@endsection