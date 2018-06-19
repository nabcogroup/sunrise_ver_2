@component("layouts.report")
    @slot("report_title")
        <div class="text-right">
            <h1>{{$datasource->getTitle()}}</h1>
            <h3 class="text-danger"><strong>Year: {{$datasource->getParam('year')}}</strong></h3>
        </div>
    @endslot

    @if($datasource->getParam("report_type") != "per_property")
        <p><strong>Property:</strong> {{$datasource->getParam("location")}}</p>
    @endif

    <table class="table table-bordered table-condensed">
        <thead>
        <tr>
            <th>Property</th>
            @for($i = $datasource->getParamInt("month_from");$i <= $datasource->getParamInt("month_to");$i++)
                <th class="text-center">{{date('M', mktime(0, 0, 0, $i, 10))}}</th>
            @endfor
            <th class="text-center">Grand Total</th>
        </tr>
        </thead>
        <tbody>
            @php
                $per_subtotal_month = [];
                $grand_total = 0;
            @endphp
            @foreach($datasource->getData() as $property_key => $properties)
                <?php $sub_total = 0; ?>
                <tr>

                    @if($datasource->getParam("report_type") == "per_property")
                        <td>{{App\Selection::getValue("villa_location",$property_key)}}</td>
                    @else
                        <td>{{$property_key}}</td>
                    @endif

                    @for($i = $datasource->getParamInt("month_from");$i <= $datasource->getParamInt("month_to");$i++)

                        @if(isset($properties[$i]))

                            @php
                                $property = $properties[$i][0];

                                $sub_total = $sub_total + $property->contract_value;
                                $grand_total = $grand_total + floatval($property->contract_value);

                                if(isset($per_subtotal_month[$i])) {
                                    $per_subtotal_month[$i] = $per_subtotal_month[$i] + floatval($property->contract_value);
                                }
                                else {
                                    $per_subtotal_month[$i] = floatval($property->contract_value);
                                }
                            @endphp
                            <td class="text-right">{{number_format($property->contract_value,2)}}</td>
                        @else
                            <td class="text-center">--</td>
                        @endif
                    @endfor

                    <td class="text-right"><strong>{{number_format($sub_total,2)}}</strong></td>

                </tr>

            @endforeach
            <!-- sub total -->
            <tr>
                <td><strong>Sub Total</strong></td>
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)

                    <td class="text-right"><strong>{{number_format((isset($per_subtotal_month[$i]) ? $per_subtotal_month[$i] : 0) ,2)}}</strong></td>
                @endfor
                <td class="text-right"><strong>{{number_format($grand_total,2)}}</strong></td>
            </tr>
        </tbody>
    </table>
@endcomponent