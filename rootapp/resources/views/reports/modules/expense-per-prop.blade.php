@component('layouts.report')
    @slot('report_title')

        <div class="text-right">

            <h3>Property Expenses Master List</h3>

            @if($datasource['date_from'] && $datasource['date_to'])
                <p>Date: {{$datasource['date_from']}} - {{$datasource['date_to']}}</p>
            @endif

            <p>Location: {{$datasource['location'] == '' ? 'All' : $datasource['location']}}</p>
            <p>Villa No: {{$datasource['villa_no'] == '' ? 'All' : $datasource['villa_no']}}</p>

        </div>

    @endslot

    @foreach($datasource['data'] as $key => $rows)

        <div class="row">
            <div class="col-md-12">
                <h3>Payment Mode - {{ucfirst($key)}}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-condensed table-bordered">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">Villa No</th>
                        <th class="text-center">Payment Date</th>
                        <th class="text-center">Payee Name</th>
                        <th class="text-center">Category</th>
                        <th class="text-center">Bank</th>
                        <th class="text-center">Reference</th>
                        <th class="text-center">Doc. No.</th>
                        <th class="text-center">Doc. Ref.</th>
                        <th class="text-center">Doc. Date</th>
                        <th class="text-center">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    @php
                        $grand_total  = 0;
                    @endphp
                    @foreach($rows as $key => $expenseRows)
                        <tr class="active"><td colspan="11" ><strong>Expense Type: {{ucfirst($key)}}</strong></td></tr>
                        @php
                            $expense_total  = 0;
                        @endphp
                        @foreach($expenseRows as $row)
                            @php
                                $expense_total = $expense_total + floatval($row['amount']);
                            @endphp
                            <tr>
                                <td></td>
                                <td style="width:10%">{{$row['villa_no']}}</td>
                                <td style="width:10%" class="text-center">{{$row['payment_date']}}</td>
                                <td>{{$row['payee_name']}}</td>
                                <td>{{$row['accounts']}}</td>
                                <td class="text-center">{{$row['bank_provider']}}</td>
                                <td class="text-center">{{$row['payment_ref']}}</td>
                                <td>{{$row['doc_no']}}</td>
                                <td>{{$row['doc_ref']}}</td>
                                <td>{{$row['doc_date']}}</td>
                                <td class="text-right">{{number_format($row['amount'],2)}}</td>
                            </tr>
                        @endforeach
                        <tr>
                            <td colspan="10"><strong>SUB TOTAL</strong></td>
                            <td class="text-right"><strong>{{number_format($expense_total,2)}}</strong></td>
                        </tr>
                        @php
                            $grand_total = $grand_total + $expense_total;
                        @endphp
                    @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="10"><strong>GRAND TOTAL</strong></td>
                            <td class="text-right"><strong>QR {{number_format($grand_total,2)}}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    @endforeach
@endcomponent

