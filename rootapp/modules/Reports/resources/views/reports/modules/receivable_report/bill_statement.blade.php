@php 

    $data = $datasource->getData();

    
@endphp

@component("layouts.pdf")

    @slot('report_title')

    @endslot

        <div class="row">
            <div col-xs-12>
                    <div class="col-xs-8">
                        <p><strong>Villa No: </strong> <span>{{$data["contract"]->villa()->first()->villa_no}}</span></p>
                        <p>Full Name: {{$data["contract"]->tenant()->first()->full_name}}</p>
                        <p>Email Address: {{$data["contract"]->tenant()->first()->email_address}}</p>
                    </div>
                    <div class="col-xs-4">
                        <p><strong>Bill No: {{$data["bill"]->bill_no}} - {{$data["bill"]->id}}</strong></p>

                        <p>Contract No: {{$data["contract"]->contract_no}}</p>
                        <p>Period: {{\Carbon\Carbon::parse($data["contract"]->period_start)->format('d/m/Y') }} -
                            {{\Carbon\Carbon::parse($data["contract"]->period_end)->format('d/m/Y')}}</p>
                    </div>
            </div>
        </div>
    

        <div class="row">
            <div col-xs-12>
                <table class="table ">
                    <thead>
                        <tr >
                            <th class="text-center">Date</th>
                            <th class="text-center">Type</th>
                            <th class="text-center">No</th>
                            <th class="text-center">Deposited</th>
                            <th class="text-center">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($data["clear_payments"] as $payment)
                            <tr>
                                <td class="text-center">{{$payment->full_effectivity_date->format("d-M-Y")}}</td>
                                <td class="text-center">{{$payment->full_payment_type}}</td>
                                <td class="text-center">{{$payment->payment_no}}</td>
                                <td class="text-center">{{$payment->full_date_deposited->format("d-M-Y")}}</td>
                                <td class="text-right">{{$payment->full_amount}}</td>
                            </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="4"></th>
                            <th class="text-right">{{$data['total_payments']}}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

@endcomponent
