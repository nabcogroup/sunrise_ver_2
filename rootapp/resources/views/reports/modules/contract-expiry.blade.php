@component("layouts.report")

    @slot("report_title")
        <div class="text-right">
            <h3>Expiring Contract</h3>
            <small>From {{\Carbon\Carbon::parse($datasource['from'])->format('d M Y')}}
                to {{\Carbon\Carbon::parse($datasource['to'])->format('d M Y')}}</small>
        </div>
    @endslot

    @foreach($datasource['data'] as $key => $items)
        <div>{{\App\Selection::getValue('villa_location',$key)}}</div>

        <table class="table table-condensed table-bordered">
            <thead>

            <tr>
                <th colspan="3"></th>
                <th colspan="3" class="text-center">Contract Period</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>

            <tr>

                <th class="text-center">Villa No</th>
                <th class="text-center">Tenant</th>
                <th class="text-center">Contract No</th>
                <th class="text-center">Start Period</th>
                <th class="text-center">End Period</th>
                <th class="text-center">Yrs/Months</th>
                <th class="text-center">Contract Value</th>
                <th class="text-center">Balance Due</th>
                <th class="text-center">Day(s) Over</th>
            </tr>
            </thead>
            <tbody>
                @foreach($items as $row)
                    <tr>
                        <td class="text-center">{{$row['villa_no']}}</td>
                        <td>{{$row['full_name']}}</td>
                        <td class="text-center">{{$row['contract_no']}}</td>
                        <td class="text-center">{{$row['period_start']}}</td>
                        <td class="text-center">{{$row['period_end']}}</td>
                        <td class="text-center" style="width:10%">{{$row['total_year']}}</td>
                        <td class="text-right"><strong>{{$row['amount']}}</strong></td>
                        <td class="text-right"><strong>{{$row['total_balance']}}</strong></td>
                        <td class="text-center">{{$row['exceed_days']}} day(s) old</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="page-break"></div>
    @endforeach
@endcomponent