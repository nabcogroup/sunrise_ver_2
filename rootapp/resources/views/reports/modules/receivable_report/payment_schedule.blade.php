@component('layouts.report')

    @slot('report_title')
        <div class="text-right">
            <h2>{{$datasource->getTitle()}}</h2>
            <h4 class="text-danger"><strong>Year: {{$datasource->getParam('year')}}</strong></h4>
            <strong>Range Date: {{date('M',mktime(0,0,0,$datasource->getParamInt('month_from'),10))}}-{{$datasource->getParam('year')}} -  {{date('M',mktime(0,0,0,$datasource->getParamInt('month_to'),10))}}-{{$datasource->getParam('year')}}</strong>
        </div>
    @endslot

    @if($datasource->hasData())
        <p><strong>Property: </strong>{{$datasource->getParam('location')}}</p>
        <div class="row">
            <table class="table table-condensed table-bordered">
                <thead>
                    <tr class="info">
                        <th class="text-center">Villa No</th>
                        @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                            <th class="text-center">{{date('M', mktime(0, 0, 0, $i, 10))}}</th>
                        @endfor
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                @php
                    $grand_total_per_month;
                    $grand_total_payable = 0;
                @endphp

                @foreach($datasource->getData() as $villa_key => $villa)
                    @php
                        $total_payments = 0;
                    @endphp
                    <tr>
                        <td><a href="/reports/villa_history?villa_no={{$villa_key}}" target="_blank">{{$villa_key}}</a></td>
                        @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                            @if(isset($villa[$i]))
                                @foreach($villa[$i] as $item)
                                    @php
                                        $total_payments += $item->monthly_payable;
                                        if(!isset($grand_total_per_month[$i])) {
                                            $grand_total_per_month[$i] = $item->monthly_payable;
                                        }
                                        else {
                                            $grand_total_per_month[$i] += $item->monthly_payable;
                                        }
                                        $grand_total_payable += $item->monthly_payable;
                                    @endphp
                                    <td class="text-right">{{number_format($item->monthly_payable,2)}}</td>
                                @endforeach
                            @else

                                <td class="text-right">0.00</td>
                            @endif
                        @endfor
                        <td class="text-right danger"><strong>{{number_format($total_payments,2)}}</strong></td>
                    </tr>
                @endforeach
                </tbody>
                <tfoot>
                <td class="text-right text-danger"><strong>GRAND TOTAL</strong></td>
                    @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                        <td class="text-right text-danger"><strong>{{number_format(isset($grand_total_per_month[$i]) ? $grand_total_per_month[$i] : 0,2)}}<srong></th>
                    @endfor
                    <td class="text-right text-danger"><strong>{{number_format($grand_total_payable,2)}}</strong></td>
                </tfoot>
            </table>
        </div>
    @else
        <h1>Sorry no payment records found</h1>
    @endif
@endcomponent