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
            <th></th>
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

                    <td>{{App\Selection::getValue("villa_location",$property_key)}}</td>

                    @for($i = $datasource->getParamInt("month_from");$i <= $datasource->getParamInt("month_to");$i++)
                        @php

                            $sub_total = $sub_total + $properties["periods"][$i];
                            $grand_total = $grand_total + floatval($properties["periods"][$i]);
                            if(isset($per_subtotal_month[$i])) {
                                $per_subtotal_month[$i] = $per_subtotal_month[$i] + floatval($properties["periods"][$i]);
                            }
                            else {
                                $per_subtotal_month[$i] = floatval($properties["periods"][$i]);
                            }
                        @endphp
                        <td class="text-right">{{number_format($properties["periods"][$i],2)}}</td>
                    @endfor

                    <td class="text-right"><strong>{{number_format($sub_total,2)}}</strong></td>

                </tr>

            @endforeach
            <!-- sub total -->
            <tr>
                <td><strong>Sub Total</strong></td>
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    <td class="text-right"><strong>{{number_format($per_subtotal_month[$i],2)}}</strong></td>
                @endfor
                <td class="text-right"><strong>{{number_format($grand_total,2)}}</strong></td>
            </tr>
        </tbody>
    </table>
@endcomponent