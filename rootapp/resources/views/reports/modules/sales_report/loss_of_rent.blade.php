@component('layouts.report')

@slot('report_title')
<div class="text-right">
  <h1>{{$datasource->getTitle()}}</h1>
  <h3 class="text-danger"><strong></strong></h3>
  <strong></strong>
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
      <tr>
  </thead>
      <tbody>
        @foreach($datasource->getData() as $villa_key => $villa)
        <tr>
          <td>{{$villa_key}}</td>
          
        </tr>
        @endforeach
      </tbody>
</table>

@endcomponent
