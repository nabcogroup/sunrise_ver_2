@component('layouts.report')

    @slot('report_title')
        <div class="text-right">
            <h1>{{$datasource->getTitle()}}</h1>
            <h3 class="text-danger"><strong>Year: {{$datasource->getParam('year')}}</strong></h3>
            <strong>Range Date: {{date('M',mktime(0,0,0,$datasource->getParamInt('month_from'),10))}}-{{$datasource->getParam('year')}} -  {{date('M',mktime(0,0,0,$datasource->getParamInt('month_to'),10))}}-{{$datasource->getParam('year')}}</strong>
        </div>
    @endslot
    <p><strong>Property: </strong> {{$datasource->getParam("location")}}</p>
    <table class="table table-condensed table-bordered">
        <thead>
            <tr>
                <th class="text-center">Villa No</th>
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    <th class="text-center">{{date('M', mktime(0, 0, 0, $i, 10))}}</th>
                @endfor
                <th class="text-center">Total</th>
            <tr>
        </thead>
        <tbody>

            @php
                $grand_total_per_month;
                $grand_total_payable = 0; 
            @endphp
            
            @foreach($datasource->getData() as $villa_key => $villa)
                    @php 
                        $total_payable = 0;
                    @endphp 
                    <tr>
                        <td><a href="/reports/villa_history?villa_no={{$villa_key}}" target="_blank">{{$villa_key}}</a></td>
                        @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                            @if(isset($villa[$i]))
                                <?php 
                                    $item = null;                                    
                                    //remove conflict
                                    if(count($villa[$i]) > 1) {
                                        foreach($villa[$i] as $key => $value) {
                                            if($value->payment_status != 'cancelled') {
                                                $item = $value;
                                            }
                                        }
                                    }
                                    else {
                                        $item = $villa[$i][0];
                                    }
                                ?>
                                @if($item->payment_status === "clear")
                                    @php

                                        $total_payable += $item->monthly_payable;
                                        $month_name = date('M', mktime(0, 0, 0, $i, 10));
                                        
                                        if(!isset($grand_total_per_month[$month_name])) {
                                            $grand_total_per_month[$month_name] = $item->monthly_payable;
                                        }
                                        else {
                                            $grand_total_per_month[$month_name] += $item->monthly_payable;
                                        }
                                        
                                        $grand_total_payable += $item->monthly_payable;

                                    @endphp
                                    <td class="text-right">{{number_format($item->monthly_payable,2)}}</td>
                                @elseif($item->payment_status == "cancelled" && floatval($item->monthly_payable) == 0)
                                    <td class="text-center text-danger"><strong>VACATED</strong></td>    
                                @else
                                    <td class="text-right">{{number_format(0,2)}}</td>
                                @endif
                               
                            @else
                                <td class="text-center text-danger"><strong>VACATED</strong></td>
                            @endif
                        @endfor
                        <td class="text-right danger"><strong>{{number_format($total_payable,2)}}</strong></td>
                    </tr>
            @endforeach
        </tbody>
        <tfoot>
            <td class="text-right text-danger"><strong>GRAND TOTAL</strong></td>
            @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    <td class="text-right text-danger"><strong>{{number_format(isset($grand_total_per_month[date('M', mktime(0, 0, 0, $i, 10))]) ? $grand_total_per_month[date('M', mktime(0, 0, 0, $i, 10))] : 0,2)}}<srong></th>
            @endfor
            <td class="text-right text-danger"><strong>{{number_format($grand_total_payable,2)}}</strong></td>
        </tfoot>
    </table>

@endcomponent