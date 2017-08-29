@extends('layouts.pdf')

@section('content')
    <div class="row">
        <h3>Villa Master List</h3>
        <hr/>
        @foreach($datasource as $key => $rows)
            <strong>Location: {{$key == 'sv1' ? 'Sunrise 1' : 'Sunrise 2'}}</strong>
            <table class="table table-condensed table-bordered">
                <thead>
                <tr class="info">
                    <th class="text-center">Villa No</th>
                    <th class="text-center">Electricity No</th>
                    <th class="text-center">Water No</th>
                    <th class="text-center">Qtel No</th>
                    <th class="text-center">Villa Class</th>
                    <th class="text-center">Rate per Month</th>
                    <th class="text-center">Villa Status</th>
                    <th class="text-center">Tenant Name</th>
                    <th class="text-center">Contact</th>
                    <th class="text-center">Email Address</th>

                </tr>
                </thead>
                <tbody>
                @foreach($rows as $villa)
                    <tr>
                        <td class="text-center">{{$villa['villa_no']}}</td>
                        <td  class="text-center">{{$villa['electricity_no']}}</td>
                        <td  class="text-center">{{$villa['water_no']}}</td>
                        <td  class="text-center">{{$villa['qtel_no']}}</td>
                        <td class="text-center">{{$villa['villa_class']}}</td>
                        <td  class="text-center">{{$villa['rate_per_month']}}</td>
                        <td  class="text-center">{{$villa['villa_status']}}</td>
                        <td class="text-center">{{$villa['tenant_name']}}</td>
                        <td  class="text-center">{{$villa['contact_no']}}</td>
                        <td  class="text-center">{{$villa['email_address']}}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            <div class="page-break"></div>
        @endforeach
    </div>
@endsection





