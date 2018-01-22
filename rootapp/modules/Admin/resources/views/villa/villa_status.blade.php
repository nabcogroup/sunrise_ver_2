@extends("admin::layout.master")

@section("header")
    <div class="page-header">
        <h3>Villa No Contract Resolved</h3>
    </div>
@endsection

@section("content")
    @if($villas->count() > 0)
        <form class="form" method="post" action="{{route("admin.villa.update")}}">
            {{csrf_field()}}
            <div class="container-fluid">
                <div class="col-md-12">
                    <table class="table table-bordered table-condensed">
                        <thead>
                        <tr>
                            <th class="text-center">Villa No</th>
                            <th class="text-center">Location</th>
                            <th class="text-center">Electricity No</th>
                            <th class="text-center">Water No</th>
                            <th class="text-center">QTel No</th>
                            <th class="text-center">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($villas as $villa)

                            <tr>
                                <td class="text-center">
                                    <input type="hidden" name="villas[{{$villa->getId()}}]">{{$villa->villa_no}}
                                </td>
                                <td>{{App\Selection::getValue("villa_location",$villa->location)}}</td>
                                <td class="text-center">{{$villa->electricity_no}}</td>
                                <td>{{$villa->water_no}}</td>
                                <td>{{$villa->qtel_no}}</td>
                                <td class="text-center" style="width:10%">{{\App\Selection::getValue("villa_status", $villa->status)}}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="col-md-3 col-md-offset-9">
                    <button class="btn btn-info pull-right" type="submit"><i class="fa fa-cog"></i> Resolved</button>
                </div>
            </div>


        </form>
    @else
        <h1>No In-Active Villa Found</h1>
    @endif
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