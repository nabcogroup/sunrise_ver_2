@component("reports::layouts.report")

    @slot("report_title")
        <div class="text-right">
            <h3>{{$datasource->getTitle()}}</h3>
            <small>From {{$datasource->getParamDate("date_from")->format('d M Y')}}
                to {{$datasource->getParamDate("date_to")->format('d M Y')}}
            </small>
        </div>
    @endslot

    @foreach($datasource->getData() as $key => $items)
        @php
            $contract_value_total = 0;
            $balance_due_total = 0;
        @endphp
        <div><strong>Property:</strong> {{\App\Selection::getValue('villa_location',$key)}}</div>
        <table class="table table-condensed table-bordered">
            <thead>
            <tr>
                <th colspan="3"></th>
                <th colspan="5" class="text-center">Contract Period</th>
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
                <th class="text-center">Extended Period</th>
                <th class="text-center">End Date</th>
                <th class="text-center">Yrs/Months</th>
                <th class="text-center">Contract Value</th>
                <th class="text-center">Balance Due</th>
                <th class="text-center">Day(s) Left/Due</th>
            </tr>
            </thead>
            <tbody>
                @foreach($items as $row)
                    @php 
                        $label = (intval($row['exceed_days']) >= 0) ? "left" : "due";
                        $contract_value_total = $contract_value_total + floatval($row['amount']);
                        $balance_due_total = $balance_due_total + floatval($row['total_balance']);
                    @endphp 
                    <tr>
                        <td class="text-center">{{$row['villa_no']}}</td>
                        <td>{{$row['full_name']}}</td>
                        <td class="text-center">{{$row['contract_no']}}</td>
                        <td class="text-center">{{$row['period_start']}}</td>
                        <td class="text-center">{{$row['period_end']}}</td>
                        <td class="text-center" style="width:5%">{{$row['extended_days']}}</td>
                        <td class="text-center">{{$row['end_date']}}</td>
                        <td class="text-center" style="width:10%">{{$row['total_year']}}</td>
                        <td class="text-right"><strong>{{number_format($row['amount'],2)}}</strong></td>
                        <td class="text-right"><strong>{{number_format($row['total_balance'],2)}}</strong></td>
                        <td class="text-center">{{$row['exceed_days']}} day(s) {{$label}}</td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <th colspan='8' class='text-right text-danger'>GRAND TOTAL</th>
                <th class='text-right text-danger'>{{number_format($contract_value_total,2)}} QR</th>
                <th class='text-right text-danger'>{{number_format($balance_due_total,2)}} QR</th>
                <th></th>
            </tfoot>
        </table>
        <div class="page-break"></div>
    @endforeach
@endcomponent