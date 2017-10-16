@component('layouts.report')


    @slot('report_title')
        <div class="text-right">
            <h1>{{$datasource->getTitle()}}</h1>
        </div>
    @endslot


    @component('reports.modules.sales_report.component.payment_collection_theme_pivot',["datasource" =>$datasource])
        <div>
            <p>{{$datasource->getParam("location")}}</p>
        </div>
    @endcomponent
@endcomponent