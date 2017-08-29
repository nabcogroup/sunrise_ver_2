@extends('layouts.master')

@section('content')
    <tenant-register :model="{{json_encode($model)}}"></tenant-register>
@endsection
