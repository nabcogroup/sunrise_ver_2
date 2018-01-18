@component('reports::layouts.report')

@slot('report_title')
<div class="text-right">
  <h1>{{$datasource->getTitle()}}</h1>
  <h3 class="text-danger"><strong>Year: {{$datasource->getParam('year')}}</strong></h3>
  <strong>Range Date: {{date('M',mktime(0,0,0,$datasource->getParamInt('month_from'),10))}}-{{$datasource->getParam('year')}} -  {{date('M',mktime(0,0,0,$datasource->getParamInt('month_to'),10))}}-{{$datasource->getParam('year')}}</strong>
</div>
@endslot
<p><strong></strong></p>
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
        $grand_loss_of_rent_per_month;
        $grand_total_loss_of_rent = 0;
    @endphp

    @foreach($datasource->getData() as $villa_key => $villa)
    @php
    $total_loss_of_rent = 0;
    @endphp
    <tr>

        @if($datasource->getParam('report_type')== "property")
        <td>{{App\Selection::getValue('villa_location', $villa_key)}}</td>
        @else
        <td>{{$villa_key}}</td>
        @endif

        <?php $periods = isset($villa['periods']) ? $villa['periods']  : [];  ?>
        @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)

            @if(isset($periods[to_month_name($i)]))
              <td class="text-right">{{number_format($periods[to_month_name($i)], 2)}}</td>
            @else
              <td class="text-right">{{number_format(0, 2)}}</td>
            @endif

            @if(isset($periods[to_month_name($i)]))

              @php

                $total_loss_of_rent += $periods[to_month_name($i)];

                $month_name = to_month_name($i);

                if(!isset($grand_loss_of_rent_per_month[$month_name])) {
                    $grand_loss_of_rent_per_month[$month_name] = $periods[to_month_name($i)];
                }
                else {
                    $grand_loss_of_rent_per_month[$month_name] += $periods[to_month_name($i)];
                }

                $grand_total_loss_of_rent += $periods[to_month_name($i)];

              @endphp

            @endif
        @endfor
      <td class="text-right"><strong>{{number_format($total_loss_of_rent, 2)}}</strong></td>
    </tr>
    @endforeach
    <tr>
      <td class="text-right text-danger"><strong>GRAND TOTAL</strong></td>
      @for($i = $datasource->getParamInt('month_from');$i <= $datasource->getParamInt('month_to');$i++)
              <td class="text-right text-danger"><strong>{{number_format(isset($grand_loss_of_rent_per_month[to_month_name($i)]) ? $grand_loss_of_rent_per_month[to_month_name($i)] : 0, 2)}}<srong></th>
      @endfor

        <td class="text-right text-danger"><strong>{{number_format($grand_total_loss_of_rent,2)}}</strong></td>
    </tr>
  </tbody>

</table>
<div class="row">
  <div class="col-md-4 pull-right">
      <h5>{{$datasource->getTitle()}}</h5>
  </div>
</div>
@endcomponent
