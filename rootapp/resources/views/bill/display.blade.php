@component('layouts.pdf')
    @slot('report_title')

    @endslot
    <div class="row">
        <div col-xs-12>
            <div class="row nb-panel">
                <div class="col-xs-7">
                    <p><strong>Villa No: </strong> <span>{{$bill->contract->villa()->first()->villa_no}}</span></p>
                    <p>Full Name: {{$bill->contract->tenant()->first()->full_name}}</p>
                    <p>Email Address: {{$bill->contract->tenant()->first()->email_address}}</p>
                    <p>Mobile No: {{$bill->tenant()->first()->mobile_no }}</p>
                    <p>Tel No: {{ $bill->tenant()->first()->tel_no }}</p>
                    {{--<p>Address: {{$contract->Tenant()->first()->fullAddress()}}</p>--}}
                </div>
                <div class="col-xs-4">
                    <p><strong>Bill No: {{$bill->bill_no}}</strong></p>
                    <p>Contract No: {{$bill->contract->contract_no}}</p>

                    <p>Period:
                        {{\Carbon\Carbon::parse($bill->contract->period_start)->format('d-M-Y') }} -
                        {{\Carbon\Carbon::parse($bill->contract->period_end)->format('d-M-Y')}}
                    </p>
                    <p>Issued Date: {{\Carbon\Carbon::now()->format('d M Y')}} </p>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Monthly Billing Statement Summary
                </div>
                <div class="panel-body">
                    <p class="row">
                        <span class="col-xs-8">Total Rental Charges:</span>
                        <span class="col-xs-4">{{number_format($bill->current_monthly_charge,2)}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-condensed table-bordered">
                <thead>
                <tr class="info">
                    <th class="text-center">Schedule Date</th>
                    <th class="text-center">P/No</th>
                    <th class="text-center">Period</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Amount</th>
                </tr>
                </thead>

                <tbody>

                @foreach($bill->payments->sortBy("effectivity_date") as $payment)
                    <tr>
                        <td style="width:15%"
                            class="text-center">{{\Carbon\Carbon::parse($payment->effectivity_date)->format('d-M-Y')}}</td>
                        <td style="width: 10% " class="text-center">{{$payment->payment_no}}</td>
                        <td class="text-center">{{\Carbon\Carbon::parse($payment->period_start)->format('d-M-Y')}}
                            - {{\Carbon\Carbon::parse($payment->period_end)->format('d-M-Y')}}</td>
                        <td style="width:15%"
                            class="text-center">{{\App\Selection::getValue("payment_status",$payment->status)}}</td>
                        <td class="text-center" style="width:15%">{{number_format($payment->amount,2)}}</td>
                    </tr>
                @endforeach

                </tbody>

                <tfoot>
                <tr>
                    <th colspan="4">Sub-Total:</th>
                    <th class="text-center">{{number_format( $bill->payments->sum("amount"),2 )}}</th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>

    <div class="row">
        @php

        @endphp
        <div class="col-md-4 col-md-offset-8 text-right">
            <p>
                <strong>Contract Value:</strong>
                <span>{{number_format($bill->contract->amount,2)}}</span>
            </p>
            <p>
                <strong>Paid Total:</strong>
                <span>{{number_format( $bill->cleared_payment_amount,2 )}}</span>
            </p>
            <p>
                <strong>Balance Due:</strong>
                <span>{{number_format($bill->balance_due_amount,2)}}</span>
            </p>
        </div>
    </div>

@endcomponent





