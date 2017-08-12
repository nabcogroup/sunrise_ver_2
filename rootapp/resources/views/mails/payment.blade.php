@component('mail::message')
# has been posted Reference Bill No {{$bill->bill_no}}



@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
