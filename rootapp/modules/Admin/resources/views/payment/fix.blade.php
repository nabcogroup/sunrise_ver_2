@extends("admin::layout.master")

@php

    if(isset($bill)) {
        $villa = $bill->villa();
    }

@endphp
@section("header")
    <div class="page-header">
        <h3>Payment Reverse</h3>
    </div>
@endsection
@section("content")
    <div class="container-fluid">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form class="form-horizontal" method="post" action="{{route("admin.payment.reverse")}}">
                        {{csrf_field()}}
                        <div class="col-md-3">
                            <div class="input-group">
                                <input type="text" class="form-control" name="bill_no" value="{{$parameter->bill_no or ""}}" placeholder="Enter Bill No">
                                <span class="input-group-btn">
                            <button class="btn btn-default" type="submit">Load!</button>
                        </span>
                            </div>
                        </div>
                    </form>

                    <div class="col-md-12">
                        <hr />
                    </div>

                    <div class="col-md-6">
                        <p>Villa No: <strong>{{$villa->villa_no or "Enter Villa"}}</strong></p>
                    </div>
                    <form class="form" method="post" action="{{route("admin.payment.update")}}">
                        {{csrf_field()}}
                        <div class="col-md-12">
                            <table class="table table-bordered table-condensed">
                                <thead>
                                    <tr>
                                        <th style="width:15%" class="text-center">Date</th>
                                        <th style="width:10%" class="text-center">C/P No</th>
                                        <th class="text-center">Period From</th>
                                        <th class="text-center">Period To</th>
                                        <th style="width:10%" class="text-center">Amount</th>
                                        <th class="text-center" style="width:5%">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if(isset($bill))
                                        @foreach($bill->payments()->where('status','clear')->get() as $payment)
                                        <tr>
                                            <td style="width:15%">
                                                <input name="payments[{{$payment->id}}][id]" type="hidden" value="{{$payment->getId()}}"/>
                                                <div class="form-group">
                                                    <input type="date" name="payments[{{$payment->id}}][effectivity_date]" class="form-control" value="{{ $payment->effectivity_date }}"/>
                                                </div>
                                            </td>
                                            <td style="width:10%">
                                                <div class="form-group">
                                                    <input type="text"
                                                           class="form-control"
                                                           name="payments[{{$payment->id}}][payment_no]"
                                                           value="{{$payment->payment_no }}">
                                                </div>
                                            </td>
                                            <td>
                                                {{Carbon\Carbon::parse($payment->period_start)->format("d-M-Y")}}
                                            </td>
                                            <td>
                                                {{Carbon\Carbon::parse($payment->period_end)->format("d-M-Y")}}
                                            </td>
                                            <td style="width:10%">
                                                <div class="form-group">
                                                    <input type="text"
                                                           class="form-control"
                                                           name="payments[{{$payment->id}}][amount]"
                                                           value="{{$payment->amount}}">
                                                </div>

                                            </td>
                                            <td style="width:5%">
                                                <div class="form-group">
                                                    <button data-key="payments[{{$payment->id}}][revert]" class="btn btn-info" type="button">Revert</button>
                                                    <input type="hidden" id="payments[{{$payment->id}}][revert]" name="payments[{{$payment->id}}][revert]" value="0"/>
                                                </div>
                                            </td>

                                        </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                            </table>
                            @if(isset($bill))
                                <div class="col-md-3 col-md-offset-9">
                                    <button class="btn btn-block btn-info" type="submit">Update</button>
                                </div>
                            @endif
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection


@section("script")
    <script>
        $(document).ready(function() {
            $("button[type=button]").on("click",function(e) {
                var statusInput = $("input[name='" + $(this).data("key")+ "']");
                statusInput.val(1);
                $(this).removeClass("btn-info").addClass("btn-default");
                $(this).prop('disabled',true);
            });
        });
    </script>
@endsection
