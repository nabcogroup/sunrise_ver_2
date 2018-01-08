@component('layouts.report') @slot('report_title')
    <div class="text-right">
        <h1>{{$datasource->getTitle()}}</h1>
        <strong>For the Year: {{$datasource->getParam('year')}}</strong>
    </div>
@endslot


<?php $year_col_span = 3;  ?>
<table class="table table-condensed table-bordered">
    <thead>
    <tr>
        <th>Property</th>

        <!-- Year -->
        @for($i = $datasource->getParamInt('month_from');$i<=$datasource->getParamInt('month_to');$i++)
            <th class="text-center">{{date('M', mktime(0, 0, 0, $i, 10))}}</th>
    @endfor
    <!-- End Year -->

        <th class="text-center">Total</th>
    </tr>
    </thead>
    <tbody>
    <?php
    $per_subtotal_month = [];
    $grand_total = 0;
    ?>
    @foreach($datasource->getData() as $property_key => $properties)
        @php
            $sub_total = 0;
        @endphp
        <tr>
            <td>{{App\Selection::getValue('villa_location',$property_key)}}</td>
            @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                @if(isset($properties[$i]))
                    @foreach($properties[$i] as $property)
                        @php
                            $sub_total = $sub_total + $property->total_count;
                            $grand_total = $grand_total + $property->total_count;
                            if(isset($per_subtotal_month[$i])) {
                                $per_subtotal_month[$i] = $per_subtotal_month[$i] + $property->total_count;
                            }
                            else {
                                $per_subtotal_month[$i] = $property->total_count;
                            }
                        @endphp
                        <td class="text-center">{{$property->total_count}}</td>
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
                    <td class="text-center">0</td>
                @endif
            @endfor
            <td class="text-center"><strong>{{$sub_total}}</strong></td>
        </tr>
    @endforeach
    <!-- sub total per vertical -->
    <tr>
        <td><strong>Sub Total</strong></td>
        @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
            <td class="text-center"><strong>{{$per_subtotal_month[$i]}}</strong></td>
        @endfor
        <td class="text-center"><strong>{{$grand_total}}</strong></td>
    </tr>
    </tbody>
</table>
@endcomponent