@component('layouts.report')
    @slot('report_title')
        <div class="text-right">
            <h3>{{$datasource->getTitle()}}</h3>
            <p>Year: {{$datasource->getParam("contract_year","All")}}</p>
            <p>Date: {{\Carbon\Carbon::now()->format('d-M-Y')}}</p>
        </div>
    @endslot

    @if($datasource->hasData())
        <div class="row">

            <div class="col-md-12">

                <table class="table table-condensed table-bordered">
                    <thead>
                    <tr class="info">
                        <th class="text-center">No</th>
                        <th class="text-center">Villa No</th>
                        <th class="text-center">Tenant Name</th>
                        <th class="text-center">Contract No</th>
                        <th class="text-center">Contract Period</th>
                        <th class="text-center">No Years / No Months</th>
                        <th class="text-center">Rate per Month</th>
                        <th class="text-center">Contract Value</th>
                        <th class="text-center">Completion Date</th>
                        <th class="text-center">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    @php $count = 0; @endphp
                    @foreach($datasource->getData() as $row)
                        @php $count++; @endphp
                        <tr>
                            <td class="text-center">{{$count}}</td>
                            <td style="width:5%" class="text-center">{{$row['villa_no']}}</td>
                            <td class="text-left">{{$row['full_name']}}</td>
                            <td style="width: 10% " class="text-center">{{$row['contract_no']}}</td>
                            <td class="text-center">{{$row['date_period']}}</td>
                            <td style="width:7%" class="text-center">{{$row['total_year']}}</td>
                            <td class="text-right" style="width:10%">{{$row['rate_per_month']}}</td>
                            <td class="text-right" style="width:10%">{{$row['full_value']}}</td>
                            <td class="text-center" style="width:8%">{{$row['date_termination']}}</td>
                            <td class="text-center" style="width:5%">{{$row['contract_status']}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @else
        <h1>No Record found</h1>
    @endif
@endcomponent






