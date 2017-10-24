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
        <th></th>
    </tr>
    <tr>
        <th class="text-center">Villa</th>

        @foreach($datasource->getParam("payment_types") as $key => $value)
            @php
                echo create_calendar_header($datasource->getParamInt("month_from"),$datasource->getParamInt("month_to"))
            @endphp
        @endforeach
        <th class="text-center">Total</th>
    </tr>
    </thead>
    <tbody>
    @php
        $total_per_month = [];
        $grand_total = 0;
    @endphp
    @foreach($data as $villa_key => $villa)
        @php
            $total_per_villa = 0;
        @endphp
        <tr>
            <td><a href="/reports/villa_history?villa_no={{$villa_key}}">{{$villa_key}}</a></td>
            @foreach($datasource->getParam("payment_types") as $key => $value)
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    @if(isset($villa[$key]))
                        @if(isset($villa[$key][$i]))
                            @php
                                
                                $total_per_villa = $total_per_villa + $villa[$key][$i][0]->amount_deposited;
                                
                                if(!isset($total_per_month[$key][$i])) {
                                     $total_per_month[$key][$i] = 0;
                                }
                                
                                $total_per_month[$key][$i] = $total_per_month[$key][$i] + $villa[$key][$i][0]->amount_deposited;
                                $grand_total = $grand_total + $villa[$key][$i][0]->amount_deposited;
                            @endphp
                            <td class="text-right">
                                <a href="/reports/villa_bank_deposit?villa_no={{$villa_key}}&year={{$datasource->getParamInt('year')}}&month_from={{$i}}&month_to={{$i}}">{{number_format($villa[$key][$i][0]->amount_deposited,2)}}</a>
                            </td>
                        @else
                            <td class="text-right">--</td>
                        @endif
                    @else
                        <td class="text-right">--</td>
                    @endif
                @endfor
            @endforeach
            <td class="text-right"><strong>{{number_format($total_per_villa,2)}}</strong></td>
        </tr>
    @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td></td>
            @foreach($datasource->getParam("payment_types") as $key => $value)
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    <td class="text-right"><strong>{{number_format(isset($total_per_month[$key][$i]) ? $total_per_month[$key][$i] : 0,2)}}</strong></td>
                @endfor
            @endforeach
            <td class="text-right"><strong>{{number_format($grand_total,2)}}</strong></td>
        </tr>
    </tfoot>
</table>