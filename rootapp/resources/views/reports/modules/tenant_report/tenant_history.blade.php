@component('layouts.report')

    @slot('report_title')
        <div class="text-right">
            <h2>Tenant - History</h2>
        </div>
    @endslot



    @foreach($datasource as $rowGroup)
        <!-- Group Header -->
        <div class="row">
            <div class="col-xs-8">
                <div class="x-lite-panel">
                    <p class="x-read-group">
                        <strong class="col-xs-3 x-label">Code:</strong>
                        <span class="col-xs-9 x-desc">{{$rowGroup[0]['reg_id']}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-xs-3 x-label">Full Name:</strong>
                        <span class="col-xs-9 x-desc">{{$rowGroup[0]['full_name']}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-xs-3 x-label">Email Address:</strong>
                        <span class="col-xs-9 x-desc">{{$rowGroup[0]['email_address']}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-xs-3 x-label">Tel No: / Mobile No:</strong>
                        <span class="col-xs-9 x-desc">{{$rowGroup[0]['tel_no']}} / {{$rowGroup[0]['mobile_no']}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- end group Header -->

        <table class="table">
            <thead>
                <tr>
                    <th class="text-center">Villa No</th>
                    <th class="text-center">Contract No</th>
                    <th class="text-center">Contract Type</th>
                    <th class="text-center">Bill No</th>
                    <th class="text-center">Contract Period</th>
                    <th class="text-center">Contract Value</th>
                    <th class="text-center">Status</th>
                </tr>
            </thead>
            <tbody>
                <!-- body -->
                @foreach($rowGroup as $rows)
                   <tr>
                       <td>{{$rows['villa_no']}}</td>
                       <td>{{$rows['contract_no']}}</td>
                       <td>{{ucfirst($rows['contract_type'])}}</td>
                       <td><a href="/bill/show/{{$rows['bill_no']}}">{{$rows['bill_no']}}</a></td>
                       <td>{{$rows['period']}}</td>
                       <td>{{number_format($rows['amount'],2)}}</td>
                       <td>{{$rows['status']}}</td>
                   </tr>
                @endforeach
                <!-- end body -->
            </tbody>
        </table>


    @endforeach



    <!-- details -->
    <table>
        <thead>

        </thead>
    </table>

@endcomponent