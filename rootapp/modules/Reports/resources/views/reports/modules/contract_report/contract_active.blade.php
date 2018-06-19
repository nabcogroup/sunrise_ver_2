@component("layouts.report")
    @slot("report_title")
        <div class="text-right">
            <h3>{{$datasource->getTitle()}}</h3>
            <p>As of {{\Carbon\Carbon::now()->format('d-M-Y')}}</p>
        </div>
    @endslot

    @foreach($datasource->getData() as $key => $items)

        @php
            $total_contract_value = 0;
            $total_gross_sale = 0;
            $total_credit_sale = 0;
        @endphp

        <p><strong>Property:</strong> {{$datasource->getParam("location")}}</p>
        <table class="table table-condensed table-bordered">
            <thead>
                <tr>
                    <th class="text-center">Villa No</th>
                    <th class="text-center">Contract No</th>
                    <th class="text-center">Tenant</th>
                    <th class="text-center">Period</th>
                    <th class="text-center">Yrs./Months</th>
                    <th class="text-center">Contract Value</th>
                    <th class="text-center">Deposited</th>
                    <th class="text-center">Balance</th>
                </tr>
            </thead>
            <tbody>
            @foreach($items as $row)
                <tr>
                    <td class="text-center">{{$row['villa_no']}}</td>
                    <td class="text-center">{{$row['contract_no']}}</td>
                    <td>{{$row['tenant_name']}}</td>
                    <td class="text-center">{{$row['period']}}</td>
                    <td class="text-center" style="width:10%">{{$row['total_years']}}</td>
                    <td class="text-right"><strong>{{number_format($row['contract_value'],2)}}</strong></td>
                    <td class="text-right"><strong>{{number_format($row['gross_sale'],2)}}</strong></td>
                    <td class="text-right"><strong>{{number_format($row['credit_sale'],2)}}</strong></td>
                </tr>

                @php
                    $total_contract_value = $total_contract_value + floatval($row['contract_value']);
                    $total_gross_sale = $total_gross_sale + floatval($row['gross_sale']);
                    $total_credit_sale = $total_credit_sale + floatval($row['credit_sale']);
                @endphp
            @endforeach
            </tbody>
            <tfoot>
                <th colspan="5" class="text-right text-danger" style="font-size:14px">GRAND TOTAL:</th>
                <th  class="text-right text-danger" style="font-size:14px">QR {{number_format($total_contract_value,2)}}</th>
                <th class="text-right text-danger" style="font-size:14px">QR {{number_format($total_gross_sale,2)}}</th>
                <th class="text-right text-danger" style="font-size:14px">QR {{number_format($total_credit_sale,2)}}</th>
            </tfoot>
        </table>
        <div class="page-break"></div>
    @endforeach
@endcomponent