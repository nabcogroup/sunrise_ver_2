@component('mail::message')

# Contract has been terminated by {{$termination['user']}}

> Contract No: {{$termination['contract_no']}}

> Villa No:  {{$termination['location']}} - {{$termination['villa_no']}}

> Contract Amount: {{$termination['amount']}}

> Reason for termination: {{$termination['reason']}}

> Reference No: {{$termination['ref_no']}}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
