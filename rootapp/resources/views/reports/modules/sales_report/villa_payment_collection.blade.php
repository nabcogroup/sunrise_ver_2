@component('layouts.report')
    @slot('report_title')
        <div class="text-right">
            <h1>{{$datasource->getTitle()}}</h1>
            <h3 class="text-danger"><strong>Year: {{$datasource->getParam("year")}}</strong></h3>
        </div>
    @endslot

    @component('reports.modules.villa_report.component.payment_collection_theme_pivot',["datasource" =>$datasource])
    @endcomponent
@endcomponent