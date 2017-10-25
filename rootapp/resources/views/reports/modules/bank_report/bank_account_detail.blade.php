@php 
    $data = $datasource->getData();
    
@endphp

@component('layouts.report')
    @slot('report_title')
        <div class="text-right">
            <h3>{{$datasource->getTitle()}}</h3>
            <strong>Date From {{$datasource->getParamDate('month_from')->format('d-M-Y')}} To {{$datasource->getParamDate('month_to')->format('d-M-Y')}}</strong>
        </div>
    @endslot

    @foreach($data as $key => $items)
        <p><strong>Account No:</strong> {{$items[0]["account_no"]}}</p>
        <p><strong>Bank Name:</strong> {{$items[0]["bank_name"]}}</p>
        <table class="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th class="text-center">Deposit Date</th>
                    <th class="text-center">Tenant</th>
                    <th class="text-center">Period</th>
                    <th class="text-center">Cheque No</th>
                    <th class="text-center">Payment For</th>
                    <th class="text-center">Payment Type</th>
                    <th class="text-center">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($items[0]["payments"] as $payment)
                    <tr>
                        <td class="text-center">{{$payment["deposit_date"]}}</td>
                        <td>{{strtoupper($payment["tenant_name"])}}</td>
                        <td class="text-center">{{$payment["period_start"]}} - {{$payment["period_end"]}}</td>
                        <td class="text-center">{{$payment["payment_no"]}}</td>
                        <td class="text-center">{{strtoupper($payment["payment_mode"])}}</td>
                        <td class="text-center">{{strtoupper($payment["payment_type"])}}</td>
                        <td class="text-right">{{number_format($payment["amount"],2)}}</td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="6" class="text-right text-danger" style="font-size:18px">GRAND TOTAL:</th>
                    <th class="text-right text-danger" style="font-size:18px">{{number_format($items[0]["total_payments"],2)}} <i>QR</i></th>
                </tr>
            </tfoot>
        </table>
    @endforeach
    
@endcomponent