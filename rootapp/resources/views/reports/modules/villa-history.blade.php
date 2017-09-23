
@component('layouts.report')
    
    @slot('report_title')
        <div class="text-right">
            <h2>Villa History</h2>
            <p class="text-danger">
                <strong>As of </strong><span>{{Carbon\Carbon::now()->toDateString()}}</span>
            </p>
        </div>
    @endslot
    @if(sizeof($datasource['data']) > 0) 
        @foreach($datasource['data'] as $key => $data) 
            <p>{{$key}}</p>
            <div class="row">
            <table class="table table-condensed table-bordered">
                <thead>
                    <tr class="info">
                        <td class="text-center" style="width:5%">No</td>
                        <th class="text-center">Tenant Name</th>
                        <th class="text-center">Contract No</th>
                        <th class="text-center">Period Start</th>
                        <th class="text-center">Period End</th>
                        <th class="text-center">Amount</th>
                        <th class="text-center">Payment</th>
                        <th class="text-center">Balance</th>
                        <th class="text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    @php 
                        $index = 1;
                    @endphp
                    @foreach($data as $row)
                        <tr>
                            <td class="text-center">{{$index++}}</td>
                            <td>{{$row['tenant_name']}}</td>
                            <td class="text-center">{{$row['contract_no']}}</td>
                            <td class="text-center">{{$row['period_start']}}</td>
                            <td class="text-center">{{$row['period_end']}}</td>
                            <td class="text-right">{{$row['amount']}}</td>
                            <td class="text-right">{{$row['total_payments']}}</td>
                            <td class="text-right">{{$row['balance']}}</td>
                            <td class="text-center">{{$row['status']}}</td>
                        </tr>    
                    @endforeach
                </tbody>
            </table>
        @endforeach
    @endif

@endcomponent