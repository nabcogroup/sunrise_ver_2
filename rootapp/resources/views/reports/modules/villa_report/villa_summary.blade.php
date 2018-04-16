@component('layouts.report')
    @slot('report_title')
        <div class="text-right">
            <h1>{{$datasource->getTitle()}}</h1>
        </div>
    @endslot
    <table class="table table-condensed table-bordered">
        <thead>
            <tr>
                <th class="text-center">Villa No</th>
                <th class="text-center">Location</th>
                <th class="text-center">Tenant</th>
                <th class="text-center">Electricity No</th>
                <th class="text-center">Water No</th>
                <th class="text-center">Qtel No</th>
                <th class="text-center">Villa Class</th>
                <th class="text-center">Rate</th>
                <th class="text-center">Status</th>
                <th class="text-center">Last Occupied Date</th>
            </tr>
        </thead>
        <tbody>
        @php
            $total_rate = 0;
        @endphp
        @foreach($datasource->getData() as $villa_key => $villa)

            @foreach($villa as $item)
                <tr>
                    <td>{{$item['villa_no']}}</td>
                    <td>{{$item['full_location']}}</td>
                    <td>{{$item['latest_tenant']}}</td>
                    <td class="text-center">{{$item['electricity_no']}}</td>
                    <td class="text-center">{{$item['water_no']}}</td>
                    <td class="text-center">{{$item['qtel_no']}}</td>
                    <td class="text-center">{{$item['villa_class']}}</td>
                    <td class="text-right">{{number_format($item['rate_per_month'], 2)}}</td>
                    <td class="text-center">{{$item['status']}}</td>
                    <td class="text-center">{{$item['latest_occupied']}}</td>
                </tr>

                @php
                    $total_rate += $item['rate_per_month'];
                @endphp

            @endforeach

        @endforeach
        </tbody>
    </table>
@endcomponent
