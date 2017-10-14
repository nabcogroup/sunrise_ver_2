@php
    $data = $datasource->getData();
@endphp

{{ $slot }}
<table class="table table-condensed table-bordered">
    <thead>
    <tr>
        <th></th>
        @foreach($datasource->getParam("payment_types") as $key => $value)
            <th colspan="{{$value + 1}}" class="text-center">{{ucwords($key)}}</th>
        @endforeach
    </tr>
    <tr>
        <th>Villa</th>

        @foreach($datasource->getParam("payment_types") as $key => $value)
            {{create_calender_header($datasource->getParamInt("month_from"),$datasource->getParamInt("month_to"))}}

            @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                <th class="text-center">{{date('M', mktime(0, 0, 0, $i, 10))}}</th>
            @endfor
        @endforeach
    </tr>
    </thead>
    <tbody>
    @foreach($data as $villa_key => $villa)
        <tr>
            <td>{{$villa_key}}</td>
            @foreach($datasource->getParam("payment_types") as $key => $value)
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    @if(isset($villa[$key]))
                        @if(isset($villa[$key][$i]))
                            <td class="text-right">
                                <a
                                        href="/reports/bank_report_detail?account_no=222-167500-01-10-00&month_from={{\Carbon\Carbon::createFromDate($datasource->getParam("year"),$i,01)->toDateString()}}&month_to={{\Carbon\Carbon::createFromDate($datasource->getParam("year"),$i,01)->addMonth()->subDay()->toDateString()}}"
                                        target="_blank"
                                >
                                    {{number_format($villa[$key][$i][0]->amount_deposited,2)}}
                                </a>
                            </td>
                        @else
                            <td class="text-right">--</td>
                        @endif
                    @else
                        <td class="text-right">--</td>
                    @endif
                @endfor
            @endforeach
        </tr>
    @endforeach
    </tbody>
</table>