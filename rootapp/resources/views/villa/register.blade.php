@extends("layouts.master")
@section("content")
    <villa-register :villa-id="{{isset($id) ? $id : 0}}"></villa-register>
@endsection

