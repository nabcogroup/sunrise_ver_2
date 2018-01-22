@extends("admin::layout.master")

@section("header")
    <div class="page-header">
        <h3>Contract Termination Revert</h3>
    </div>
@endsection


@section("content")
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form class="form-horizontal" method="post" action="{{route("admin.contract.terminate")}}">
                        {{csrf_field()}}
                        <div class="col-md-3">
                            <div class="input-group">
                                <input type="text" class="form-control" name="contract_no"
                                       value="{{$data['parameter']->contract_no or ""}}"
                                       placeholder="Enter Contract No">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="submit">Load!</button>
                                </span>
                            </div>
                        </div>
                    </form>

                    <div class="col-md-12">
                        <hr/>
                    </div>
                    @if($data["has_data"])
                        <p class="col-md-12">Tenant Name:
                            <strong>{{$data['data']->tenant()->first()->full_name or ""}}</strong></p>
                        <p class="col-md-3">Villa No:
                            <strong>{{$data['data']->villa()->first()->villa_no or ""}}</strong></p>
                        <p class="col-md-6">Villa Status: <strong
                                    class="text-danger">{{ucfirst($data['data']->villa()->first()->status)}}</strong>
                        </p>
                        <p class="col-md-12">Amount: <strong>{{$data['data']->amount or ""}}</strong></p>
                        <p class="col-md-3">Contract Status: <strong
                                    class="text-danger">{{$data['data']->full_status or ""}}</strong></p>
                        <p class="col-md-3">Contract Id: <strong
                                    class="text-danger">{{$data['data']->getId()}}</strong></p>
                        <p class="col-md-6">Period: <strong
                                    class="text-danger">{{\Carbon\Carbon::parse($data['data']->period_start)->format("d-M-Y")}} - {{\Carbon\Carbon::parse($data['data']->period_end)->format("d-M-Y")}}</strong></p>

                        <div class="col-md-6">
                            Termination Description:
                            @if($data['data']->contractTerminations !== null)
                                {{$data['data']->contractTerminations()->first()->description}}
                            @endif
                        </div>

                        <div class="col-md-12">
                            <table class="table table-condensed table-bordered">
                                <thead>
                                    <tr>
                                        <th>Effectivity Date</th>
                                        <th>Payment No</th>
                                        <th>Period From</th>
                                        <th>Period To</th>
                                        <th>Amount</th>
                                        <th style="width:10%">Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                @foreach($data['data']->bill()->first()->payments()->get() as $payment)
                                    <tr>
                                        <td>{{Carbon\Carbon::parse($payment->effectivity_date)->format("d-M-Y")}}</td>
                                        <td>{{$payment->payment_no}}</td>
                                        <td>{{Carbon\Carbon::parse($payment->period_start)->format("d-M-Y")}}</td>
                                        <td>{{Carbon\Carbon::parse($payment->period_end)->format("d-M-Y")}}</td>
                                        <td class="text-right">{{number_format($payment->amount,2)}}</td>
                                        <td class="text-center" style="width:10%">{{$payment->full_status}}</td>
                                    </tr>
                                @endforeach

                                </tbody>

                            </table>
                        </div>
                        @if($data["editable"])
                            <div class="col-md-3 col-md-offset-9">
                                <form action="{{route("admin.contract.reverse")}}" method="post">
                                    {{csrf_field()}}
                                    <input type="hidden" name="contract_id" value="{{$data['data']->id}}" />
                                    <button class="btn btn-success btn-block" type="submit">Reverse</button>
                                </form>
                            </div>
                        @endif
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection