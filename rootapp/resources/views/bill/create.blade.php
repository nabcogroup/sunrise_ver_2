@extends("layouts.master")

@section("content")
    <div>
        {!! Breadcrumbs::render('bill.create') !!}
        
        <bill-register 
            :instance-lookups="{{htmlentities(json_encode($lookups,ENT_QUOTES))}}"
            :instance-contract="{{htmlentities(json_encode($contract,ENT_QUOTES))}}" 
            :instance="{{htmlentities(json_encode($bill,ENT_QUOTES))}}" ></bill-register>
    </div>
@endsection

