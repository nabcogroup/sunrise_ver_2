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
    @endphp
    @foreach($data as $villa_key => $villa)
        <tr>
            <td>{{$villa_key}}</td>
            @foreach($datasource->getParam("payment_types") as $key => $value)
                @php
                    $total_per_villa = 0;
                @endphp
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    @if(isset($villa[$key]))
                        @if(isset($villa[$key][$i]))
                            @php
                                $total_per_villa = $total_per_villa + $villa[$key][$i][0]->amount_deposited;

                                if(!isset($total_per_month[$i])) {
                                     $total_per_month[$i] = 0;
                                }

                                $total_per_month[$i] = $total_per_month[$i] + $villa[$key][$i][0]->amount_deposited;

                            @endphp
                            <td class="text-right">
                                {{number_format($villa[$key][$i][0]->amount_deposited,2)}}
                            </td>
                        @else
                            <td class="text-right">--</td>
                        @endif
                    @else
                        <td class="text-right">--</td>
                    @endif
                @endfor
                <td class="text-right"><strong>{{number_format($total_per_villa,2)}}</strong></td>
            @endforeach
        </tr>
    @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td></td>
            @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                <td class="text-right"><strong>{{number_format(isset($total_per_month[$i]) ? $total_per_month[$i] : 0,2)}}</strong></td>
            @endfor
        </tr>
    </tfoot>
</table>