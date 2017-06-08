@extends('layouts.auth')

@section('content')
<!-- Modal -->
<div id="loginAdminModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="inner-container">
            <div class="box-vid">
                <button type="button"  class="close" style="width:39px; height:34px;margin-right:10px;margin-top:-25px;color:red;font-size:30px;" data-dismiss="modal">&times;</button>
                <div class="img-logo">
                <img src="{{URL::asset('imgs/logo.png')}}" class="img-responsive">
              </div>
                <h1>Admin Login</h1>
                <form method="POST" action="{{ route('login') }}">
                    <div class="login-fields">
                        {{ csrf_field() }}
                        <input id="username" type="text" name="username" placeholder="Enter User" value="{{ old('username') }}" required autofocus autocomplete="off">
                        @if ($errors->has('email'))
                            <span class="icon"  data-toggle="tooltip" data-placement="right" title="{{$errors->first('username')}}">
                               <i class="fa fa-warning fa-2x"></i>
                            </span>
                        @endif
                        <input id="password" type="password" placeholder="Enter Password" name="password" required autocomplete="off">
                        @if ($errors->has('password'))
                            <span class="icon"  data-toggle="tooltip" data-placement="right" title="{{$errors->first('password')}}">
                                 <i class="fa fa-warning fa-2x"></i>
                            </span>
                        @endif
                    </div>
                    <div class="login-submit">
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
            </div>  
        </div>
    </div>
</div>
@endsection
