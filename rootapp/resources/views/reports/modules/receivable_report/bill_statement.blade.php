@php 

    $data = $datasource->getData();

    
@endphp

@component("layouts.pdf")

    @slot('report_title')

    @endslot

        <div class="row">
            <div col-xs-12>
                    <div class="col-xs-8">
                        <p><strong>Code: </strong> <span>{{$data["contract"]->tenant()->first()->code}}</span></p>
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
                            <th class="text-center">Payment</th>
                            <th class="text-center">Deposited</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($data["clear_payments"] as $payment)
                            <tr>
                                <td>{{$payment->full_effectivity_date->format("d/m/Y")}}</td>
                                <td>{{$payment->full_payment_type}}</td>
                                <td>{{$payment->payment_no}}</td>
                                <td>{{$payment->full_date_deposited->format("d/m/Y")}}</td>
                                <td>{{$payment->full_amount}}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

@endcomponent
