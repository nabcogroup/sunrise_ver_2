@extends("layouts.master")

@section("content")
    {!! Breadcrumbs::render('contract') !!}
    <contract-list></contract-list>
    
@endsection