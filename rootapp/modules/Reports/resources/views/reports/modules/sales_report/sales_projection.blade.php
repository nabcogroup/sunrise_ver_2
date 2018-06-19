@component('layouts.report')

    @slot('report_title')
        <div class="text-right">
            <h1>Active {{$datasource->getTitle()}}</h1>
        </div>
    @endslot

    @if($datasource->hasData())
        <div class="row">
            <table class="table table-condensed table-bordered">
                <thead>

                    <tr>
                        <th>Property</th>

                        {!! create_calendar_header($datasource->getParamInt('month_from'),$datasource->getParamInt('month_to')) !!}

                        <th>Total</th>

                    </tr>

                </thead>

                <tbody>

                    @php
                        $per_subtotal_month = [];
                        $grand_total = 0;
                    @endphp

                    @php $properties = $datasource->getData(); @endphp

                    @foreach($properties as $key => $property)
                        <?php $sub_total = 0; ?>

                        <tr>

                            <td>{{ $datasource->getParam("report_type") == "property" ? \App\Selection::getValue("villa_location" ,$key) : $key}}</td>

                            @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to'); $i++)
                                <?php

                                    $sub_total = $sub_total +  $property[$i];
                                    $grand_total = $grand_total +  $property[$i];

                                    if(isset($per_subtotal_month[$i])) {
                                        $per_subtotal_month[$i] = $per_subtotal_month[$i] + floatval($property[$i]);
                                    }
                                    else {
                                        $per_subtotal_month[$i] = floatval($property[$i]);
                                    }

                                ?>
                                <td class="text-right">{{number_format($property[$i],2)}}</td>
                            @endfor

                            <td class="text-right">{{number_format($sub_total,2)}}</td>

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
        </div>
    @else
        <h1>Sorry no payment records found</h1>
    @endif
@endcomponent