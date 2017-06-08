@component('mail::message')
#    New contract was created Contract No: {{$contract->contract_no}}

##    **Villa No:** {{$contract->villa()->first()->villa_no}}
##    Amount: {{number_format($contract->amount,2)}} QR


    Thanks,<br>
    {{ config('app.name') }}
@endcomponent