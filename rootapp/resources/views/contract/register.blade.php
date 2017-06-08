@extends("layouts.master")

@section("content")
    {!! Breadcrumbs::render('contract.register') !!}
    <div>
        <contract-register></contract-register>
    </div>
@endsection
