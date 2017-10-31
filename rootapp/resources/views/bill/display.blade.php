@component('layouts.pdf')
    @slot('report_title')

    @endslot
<div class="row">
    <div col-xs-12>
        <div class="row nb-panel">
            <div class="col-xs-7">
                <p><strong>Code: </strong> <span>{{$contract->Tenant()->first()->code}}</span></p>
                <p>Full Name: {{$contract->Tenant()->first()->full_name}}</p>
                <p>Email Address: {{$contract->Tenant()->first()->email_address}}</p>
                {{--<p>Address: {{$contract->Tenant()->first()->fullAddress()}}</p>--}}
            </div>
            <div class="col-xs-4">
                <p><strong>Bill No: {{$bill->bill_no}}</strong></p>
                <p>Contract No: {{$contract->contract_no}}</p>
                <p>Period: {{\Carbon\Carbon::parse($contract->period_start)->format('d-M-Y') }} -
                    {{\Carbon\Carbon::parse($contract->period_end)->format('d-M-Y')}}</p>
            </div>
        </div>
    </div>
</div>


<div class="row">
    <p>Cleared Payments</p>
    <table class="table table-condensed table-bordered">
        <thead>
            <tr class="info">
                <th class="text-center">No</th>
                <th class="text-center">Schedule Date</th>
                <th class="text-center">Period</th>
                <th class="text-center">Date Deposited</th>
                <th class="text-center">Bank Account</th>
                <th class="text-center">Amount</th>
            </tr>
        </thead>
        <tbody>
        @foreach($bill->withClearedPayments()->get() as $payment)
            <tr>
                <td style="width: 10% " class="text-center">{{$payment->payment_no}}</td>
                <td style="width:15%" class="text-center">{{\Carbon\Carbon::parse($payment->effectivity_date)->format('d-M-Y')}}</td>
                <td class="text-center">{{\Carbon\Carbon::parse($payment->period_start)->format('d-M-Y')}} - {{\Carbon\Carbon::parse($payment->period_end)->format('d-M-Y')}}</td>
                <td class="text-center">{{\Carbon\Carbon::parse($payment->date_deposited)->format('d-M-Y')}}</td>
                <td class="text-center">{{$payment->bank_account}}</td>
                <td class="text-center" style="width:15%">{{number_format($payment->amount,2)}}</td>
            </tr>
        @endforeach
        </tbody>
        <tfoot>
        <tr>
            <th colspan="5">Sub-Total: </th>
            <th>{{number_format( !$bill->withClearedPayments() ? 0 : $bill->withClearedPayments()->sum('amount'),2 )}}</th>
        </tr>
        </tfoot>
    </table>
</div>

<div class="row">
    <div class="col-xs-4 col-xs-offset-8 text-right">
        <p>
            <strong>Total Cost:</strong>
            <span>{{number_format($contract->amount,2)}}</span>
        </p>
        <p>
            <strong>Total Payment:</strong>
            <span>{{number_format( !$bill->withClearedPayments() ? 0 : $bill->withClearedPayments()->sum('amount'),2 )}}</span>
        </p>
        <p>
            <strong>Total Payment:</strong>
            <span>{{
                    number_format(($contract->amount) - ( !$bill->withClearedPayments() ? 0 : $bill->withClearedPayments()->sum('amount')),2)
                    }}
                </span>
        </p>
    </div>
</div>

@endcomponent





