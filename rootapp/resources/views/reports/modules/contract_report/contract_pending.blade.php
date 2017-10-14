@component("layouts.report")

    @slot("report_title")
        <div class="text-right">
            <h3>Contract - Pending</h3>
            <p>Date: {{\Carbon\Carbon::now()->format('d, M, Y')}}</p>
        </div>
    @endslot
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th class="text-center">Villa No</th>
                <th class="text-center">Tenant</th>
                <th class="text-center">Contract No</th>
                <th class="text-center">Date</th>
                <th class="text-center">Contract Period</th>
                <th class="text-center">Amount</th>
                <th class="text-center">Age</th>
            </tr>
        </thead>
        <tbody>
            @php
                $index = 1;
            @endphp
            @foreach($datasource as $row)
                <tr>
                    <td>{{$index++}}</td>
                    <td class="text-center">{{$row->villa_no}}</td>
                    <td>{{$row->full_name}}</td>
                    <td class="text-center">{{$row->contract_no}}</td>
                    <td class="text-center">{{\Carbon\Carbon::parse($row->created_at)->format('d, M, Y')}}</td>
                    <td class="text-center">
                        {{\Carbon\Carbon::parse($row->period_start)->format('d, M, Y')}} -
                        {{\Carbon\Carbon::parse($row->period_end)->format('d, M, Y')}}
                    </td>
                    <td class="text-right">{{number_format($row->amount,2)}}</td>
                    <td class="text-center">{{\Carbon\Carbon::now()->diffInDays(\Carbon\Carbon::parse($row->created_at))}} day(s) old</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endcomponent