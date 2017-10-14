@php
    $data = $datasource->getData();
@endphp
<table class="table table-condensed table-bordered">
    <thead>
    <tr>
        <th></th>
        @foreach($datasource->getParam("payment_types") as $key => $value)
            <th colspan="{{$value + 1}}">{{$key}}</th>
        @endforeach
    </tr>
    <tr>
        <th>Villa</th>
        @foreach($datasource->getParam("payment_types") as $key => $value)
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
                            <td>{{$villa[$key][$i][0]->total_payable}}</td>
                        @else
                            <td>--</td>
                        @endif
                    @else
                        <td>--</td>
                    @endif
                @endfor
            @endforeach
        </tr>
    @endforeach
    </tbody>
</table>