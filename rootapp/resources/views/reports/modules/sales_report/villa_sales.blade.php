@component('layouts.report')

    @slot('report_title')
        <div class="text-right">
            <h2>Villa Master - Payment</h2>
            <p class="text-danger">
                <span>Month:</span> <strong>{{$datasource['period']['from']}} - {{$datasource['period']['to']}}</strong>
                <span>Year:</span> <strong>{{$datasource['period']['year']}}</strong>
            </p>
        </div>
    @endslot

    @if(sizeof($datasource['data']) > 0)
        <p>{{$datasource['location']}}</p>
        <div class="row">
            <table class="table table-condensed table-bordered">
                <thead>
                <tr class="info">
                    <th class="text-center">Villa No</th>
                    <th class="text-center">Rate/Month</th>
                    @foreach($datasource['months'] as $row)
                        <th class="text-center">{{$row['date_name']}}</th>
                    @endforeach
                </tr>
                </thead>
                <tbody>
                    @php
                        $villa_no = '';
                        $month = [];
                        $per_villa = [];
                        foreach($datasource['data'] as $row) {
                            if(!isset($per_villa[$row['villa_no']])) {
                                $per_villa[$row['villa_no']] = [$row['number_month'] => $row['total_payments']];
                            }
                            else {
                                $per_villa[$row['villa_no']][$row['number_month']] = $row['total_payments'];
                            }
                        }
                    @endphp

                    @foreach($datasource['data'] as $row)
                        @if($row['villa_no'] != $villa_no)
                            @php
                                $villa_no = $row['villa_no'];
                            @endphp
                            <tr>
                                <td class="text-center" style="width:10%">{{$row['villa_no']}}</td>
                                <td class="text-center" style="width:10%">{{number_format($row['rate_per_month'],2)}}</td>
                                @foreach($datasource['months'] as $key => $value)
                                    <td style="width: 10% " class="text-right">
                                        {{(isset($per_villa[$villa_no][$key]) ? number_format($per_villa[$villa_no][$key],2) : ' ')}}
                                    </td>
                                @endforeach
                            </tr>
                        @endif
                    @endforeach
                </tbody>
                <tfoot>
                    <td colspan="2"></td>
                    @foreach($datasource['months'] as $row)
                        <td class="text-right"
                            style="font-size: 14px;font-weight:bold">{{number_format($row['total'],2)}}</td>
                    @endforeach
                </tfoot>
            </table>
        </div>
    @else
        <h1>Sorry no payment records found</h1>
    @endif
@endcomponent