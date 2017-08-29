@component('mail::message')
#Bill No {{$bill->bill_no}} payment has been posted

@foreach($bill->payments()->get() as $payment)
#   Payment No {{$payment->payment_no}} with amount of {{$payment->amount}} was {{$payment->status}}
@endforeach



Thanks,<br>
{{ config('app.name') }}
@endcomponent
