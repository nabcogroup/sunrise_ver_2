@component('layouts.report')


    @slot('report_title')
        <div class="text-right">
            <h1>{{$datasource->getTitle()}}</h1>
            <h3 class="text-danger">Year: {{$datasource->getParam("year")}}</h3>
        </div>
    @endslot
    
    @component('reports.modules.sales_report.component.payment_collection_theme_pivot',["datasource" =>$datasource])
        <div>
            <p><strong>Property:</strong> {{$datasource->getParam("location")}}</p>
        </div>
    @endcomponent
@endcomponent