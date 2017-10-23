@component('layouts.report')
     @slot('report_title')
        <div class="text-right">
            <h3>{{$datasource->getTitle()}}</h3>
        </div>
    @endslot
@endcomponent