@extends("layouts.master")

@section("content")
    <payee-register payee-id="{{$id or ""}}"></payee-register>
@endsection