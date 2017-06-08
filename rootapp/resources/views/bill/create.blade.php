@extends("layouts.master")

@section("content")
    <div>
        {!! Breadcrumbs::render('bill.create') !!}
        <bill-register contract-no="{{$contractNo}}" redirect-no="{{$billNo}}" ></bill-register>
    </div>
@endsection