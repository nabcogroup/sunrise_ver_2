@component('layouts.report')

    @slot('report_title')
        <div class="text-right">
            <h1>{{$datasource->getTitle()}}</h1>
        </div>
    @endslot
    <div class="row">
        <table class="table table-bordered table-condensed">
            <thead>
            <tr class="danger">
                <th class="text-center">Property</th>
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    <th class="text-center">{{date('M', mktime(0, 0, 0, $i, 10))}}</th>
                @endfor
                <th class="text-center">Total</th>
            </tr>
            </thead>
            <tbody>
            <?php
                $per_subtotal_month = [];
                $grand_total = 0;
            ?>
            @foreach($datasource->getData() as $property_key => $properties)
                <?php $sub_total = 0; ?>
                <tr>
                    <td><a href="/reports/villa_history?villa_no={{$property_key}}"
                           target="_blank">{{App\Selection::getValue('villa_location',$property_key)}}</a></td>
                    @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                        @if(isset($properties[$i]))
                            @foreach($properties[$i] as $property)
                                <?php
                                    $sub_total = $sub_total + $property->monthly_payable;
                                    $grand_total = $grand_total + $property->monthly_payable;
                                    if(isset($per_subtotal_month[$i])) {
                                        $per_subtotal_month[$i] = $per_subtotal_month[$i] + $property->monthly_payable;
                                    }
                                    else {
                                        $per_subtotal_month[$i] = $property->monthly_payable;
                                    }
                                ?>
                                <td class="text-right">{{number_format($property->monthly_payable,2)}}</td>
                            @endforeach
                        @else
                            <?php
                                if(!isset($per_subtotal_month[$i])) {
                                    $per_subtotal_month[$i] = 0;
                                }
                                else {
                                    //do nothing
                                }
                            ?>
                            <td class="text-center"><strong>--</strong></td>
                        @endif
                    @endfor
                    <!-- Sub Total per horizontal-->
                    <td class="text-right"><strong>{{number_format($sub_total,2)}}</strong></td>
                </tr>
            @endforeach
            <!-- sub total per vertical -->
            <tr>
                <td><strong>Sub Total</strong></td>
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    <td class="text-right"><strong>{{number_format($per_subtotal_month[$i],2)}}</strong></td>
                @endfor
                <td class="text-right"><strong>{{number_format($grand_total,2)}}</strong></td>
            </tr>
            </tbody>
        </table>
    </div>
@endcomponent


