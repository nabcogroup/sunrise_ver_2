@extends('layouts.pdf')

@section('content')
    <div class="row">
        <h3>Contract Master List</h3>
        <table class="table table-condensed table-bordered">
            <thead>
            <tr class="info">
                <th class="text-center">Villa No</th>
                <th class="text-center">Contract No</th>
                <th class="text-center">Entry Date</th>
                <th class="text-center">Tenant Name</th>
                <th class="text-center">Contract Period</th>
                <th class="text-center">No Years / No Months</th>
                <th class="text-center">Rate per Month</th>
                <th class="text-center">Full Value</th>
                <th class="text-center">Status</th>
            </tr>
            </thead>
            <tbody>
            @foreach($datasource as $contract)
                <tr>
                    <td class="text-center">{{$contract->villa()->first()->villa_no}}</td>
                    <td style="width: 10% " class="text-center">{{$contract->contract_no}}</td>
                    <td style="width:10%" class="text-center">{{\Carbon\Carbon::parse($contract->created_at)->format('d M y')}}</td>
                    <td style="width:15%" class="text-left">{{$contract->tenant()->first()->full_name}}</td>
                    <td class="text-center">
                        {{\Carbon\Carbon::parse($contract->period_start)->format('d M y')}} -
                        {{\Carbon\Carbon::parse($contract->period_end)->format('d M y')}}
                    </td>
                    <th class="text-center">{{$contract->total_year_month}}</th>
                    <td class="text-right" style="width:10%">{{number_format($contract->villa()->first()->rate_per_month,2)}}</td>
                    <td class="text-right" style="width:10%">{{number_format($contract->amount,2)}}</td>
                    <td style="width: 8% " class="text-center">{{ucfirst($contract->status)}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection





