@extends('layouts.pdf')


@section('content')
    <div class="row">
        <h3>Villa Master List</h3>
        <hr/>
        <table class="table table-condensed table-bordered">
            <thead>
            <tr class="info">
                <th class="text-center">Villa No</th>
                <th class="text-center">Entry Date</th>
                <th class="text-center">Rate per Month</th>
                <th class="text-center">Villa Status</th>
                <th class="text-center">Contract No</th>
                <th class="text-center">Tenant Name</th>
                <th class="text-center">Contract Period</th>
                <th class="text-center">Contract Payment</th>
                <th class="text-center">Contract Status</th>
            </tr>
            </thead>
            <tbody>
            @foreach($datasource as $villa)
                <tr>
                    <td class="text-center">{{$villa['villa_no']}}</td>
                    <td style="width: 10% " class="text-center">{{$villa['created_at']}}</td>
                    <td style="width: 10% " class="text-center">{{number_format($villa['rate_per_month'],2)}}</td>
                    <td style="width: 5% " class="text-center">{{ucfirst($villa['villa_status'])}}</td>
                    <td style="width: 10% " class="text-center">{{$villa['contract_no']}}</td>
                    <td class="text-center">{{$villa['tenant_name']}}</td>
                    <td class="text-center">
                        {{$villa['period_start']}} - {{$villa['period_end']}}
                    </td>
                    <td style="width: 10% "
                        class="text-center">{{ ($villa['payment_amount'] ? number_format($villa['payment_amount'],2) : 0)}}</td>
                    <td style="width: 5% " class="text-center">{{ucfirst($villa['contract_status'])}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection





