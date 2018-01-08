@component('layouts.report')

    @slot('report_title')
        <div class="text-right">
            <h1>{{$datasource->getTitle()}}</h1>
        </div>
    @endslot


    <div class="row">
        @if($datasource->getParam("report_type","") != "per_property")
            <p><strong>Property:</strong> {{App\Selection::getValue('villa_location',$datasource->getParam("location"))}}</p>
        @endif
        <table class="table table-bordered table-condensed">
            <thead>
            <tr class="info">

                <th class="text-center">Villa</th>
                @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                    <th class="text-center">{{date('M', mktime(0, 0, 0, $i, 10))}}</th>
                @endfor
                <th class="text-center">Total</th>
            </tr>
            </thead>
            <tbody>
                @php
                    $per_subtotal_month = [];
                    $grand_total = 0;
                @endphp
                @foreach($datasource->getData() as $villa_key => $villas)
                    <?php $sub_total = 0; ?>
                    <tr>
                        <td>{{strtoupper($villa_key)}}</td>
                        @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
                            <?php
                                $sub_total += floatval($villas[$i]);
                                $grand_total = $grand_total + floatval($villas[$i]);
                                if(isset($per_subtotal_month[$i])) {
                                    $per_subtotal_month[$i] = $per_subtotal_month[$i] + floatval($villas[$i]);
                                }
                                else {
                                    $per_subtotal_month[$i] = floatval($villas[$i]);
                                }
                            ?>
                            <td class="text-right">{{number_format($villas[$i],2)}}</td>
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
    </div>
@endcomponent