@component('layouts.report')
    @slot('report_title')
        <div class="text-right">
            <h3>{{$datasource->getTitle()}}</h3>
        </div>
    @endslot

    @foreach($datasource->getData() as $account => $accounts)
        <strong>Bank Account No: {{$account}}</strong>
        <table class="table table-condensed table-bordered">
            <thead>
                <tr>
                    <th class="text-center">Villa No</th>
                    <th class="text-center">Contract No</th>
                    <th class="text-center">Tenant Name</th>
                    <th class="text-center">Due Date</th>
                    <th class="text-center">Date Deposit</th>
                    <th class="text-center">Amount</th>
                </tr>
            </thead>
            <tbody>

            @php
                $grand_total = 0;
            @endphp

            @foreach($accounts as $row)
                @php
                    $grand_total = $grand_total + floatval($row['amount']);
                @endphp

                <tr>
                    <td>{{$row['villa_no']}}</td>
                    <td>{{$row['contract_no']}}</td>
                    <td>{{$row['full_name']}}</td>
                    <td>{{$row['effectivity_date']}}</td>
                    <td>{{$row['date_deposited']}}</td>
                    <td class="text-right">{{number_format($row['amount'],2)}}</td>
                </tr>
            @endforeach
            </tbody>
            <tfoot>
                <th colspan="5">GRAND TOTAL </th>
                <th class="text-right">{{number_format($grand_total,2)}}</th>
            </tfoot>
        </table>
    @endforeach
@endcomponent