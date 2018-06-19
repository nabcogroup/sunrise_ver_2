@extends("layouts.master")

@section("content")
    <report-list
            :list="{{json_encode($reportList)}}"
            :params="{{htmlentities(json_encode($params))}}"></report-list>
@endsection