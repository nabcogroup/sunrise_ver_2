@component('layouts.report')
    @slot('report_title')

        <div class="text-right">

            <h3>{{$datasource->getTitle()}}</h3>
            <p>Date: {{$datasource->getParamDate('date_from')->format('d M Y')}} - {{$datasource->getParamDate('date_to')->format('d M Y')}}</p>

            <p>Location: {{$datasource->getParam('location','All')}}</p>
            <p>Villa No: {{$datasource->getParam("villa_no","All")}}</p>

        </div>

    @endslot

    @php
        $grand_total  = 0;
    @endphp
    @foreach($datasource->getData() as $key => $expenseRows)

        @php
            $expense_total  = 0;
        @endphp
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
                        <th class="text-center">Description</th>
                        <th class="text-center">Bank</th>
                        <th class="text-center">Reference</th>
                        <th class="text-center">Doc. No.</th>
                        <th class="text-center">Doc. Ref.</th>
                        <th class="text-center">Doc. Date</th>
                        <th class="text-center">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($expenseRows as $row)
                            @php
                                $expense_total = $expense_total + floatval($row['amount']);
                            @endphp
                            <tr>
                                <td></td>
                                <td style="width:5%">{{$row['villa_no']}}</td>
                                <td style="width:10%" class="text-center">{{$row['payment_date']}}</td>
                                <td>{{$row['payee_name']}}</td>
                                <td>{{$row['accounts']}}</td>
                                <td>{{$row['description']}}</td>
                                <td class="text-center">{{$row['bank_provider']}}</td>
                                <td class="text-center">{{$row['payment_ref']}}</td>
                                <td>{{$row['doc_no']}}</td>
                                <td>{{$row['doc_ref']}}</td>
                                <td>{{$row['doc_date']}}</td>
                                <td class="text-right">{{number_format($row['amount'],2)}}</td>
                            </tr>
                        @endforeach
                        <tr>
                            <td colspan="11"><strong>SUB TOTAL</strong></td>
                            <td class="text-right"><strong>{{number_format($expense_total,2)}}</strong></td>
                        </tr>
                        @php
                            $grand_total = $grand_total + $expense_total;
                        @endphp

                    </tbody>
                </table>
            </div>
        </div>
    @endforeach
    <div class="row">
        <div class="col-md-3 col-md-offset-9">
            <h3 class="text-danger pull-right">GRAND TOTAL: {{number_format($grand_total,2)}}</h3>
        </div>
    </div>
@endcomponent

