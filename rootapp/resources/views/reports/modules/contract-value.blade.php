@component('layouts.report')
    @slot('report_title')
        <div class="text-right">
            <h3>Contract Value</h3>
            <p>Year: {{ $datasource['year'] == '' ? 'All' : $datasource['year']}}</p>
            <p>Date: {{\Carbon\Carbon::now()->format('d, M, Y')}}</p>
        </div>
    @endslot

    <div class="row">
        <p>{{$datasource['location']}}</p>
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
                <th class="text-center">Contract Value</th>
                <th class="text-center">Contract<br/>Status</th>
            </tr>
            </thead>
            <tbody>
            @foreach($datasource['data'] as $row)
                <tr>
                    <td style="width:10%" class="text-center">{{$row['villa_no']}}</td>
                    <td style="width: 10% " class="text-center">{{$row['contract_no']}}</td>
                    <td style="width:10%" class="text-center">{{$row['date_entry']}}</td>
                    <td  class="text-left">{{$row['full_name']}}</td>
                    <td  class="text-center" >{{$row['date_period']}}</td>
                    <td style="width:7%" class="text-center">{{$row['total_year']}}</td>
                    <td class="text-right" style="width:10%">{{$row['rate_per_month']}}</td>
                    <td class="text-right" style="width:10%">{{$row['full_value']}}</td>
                    <td style="width: 8% " class="text-center">{{$row['contract_status']}}</td>
                </tr>
            @endforeach
            </tbody>
            <tfoot>
                <td colspan="7" class="text-right text-danger" style="font-size:18px">GRAND TOTAL:</td>
                <td class="text-right text-danger" style="font-size:18px">{{number_format($datasource['total'])}}</td>
                <td class="text-left text-danger" style="font-size:18px"><i>QAR</i></td>
            </tfoot>
        </table>
    </div>

@endcomponent






