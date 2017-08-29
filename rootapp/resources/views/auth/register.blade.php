@php 


if($errors->bags->count()) {
    $full_name = old('full_name');
    $username = old('username');
    $email = old('email');
    $userId = old('id');
}    
else {
    $full_name = $user['full_name'];
    $username = $user['username'];
    $email = $user['email'];
    $userId = $user['id'];
}

    
@endphp

@extends('layouts.master')

@section('content')
    <div class="row">
        <div class="col-md-5">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ $action }}">
                        {{ csrf_field() }}
                        <input type="hidden" name="id" id="id" value="{{$userId}}" />
                        <div class="form-group{{ $errors->has('full_name') ? ' has-error' : '' }}">
                            <label for="full_name" class="col-md-3 control-label">Full Name</label>
                            <div class="col-md-9">
                                <input id="full_name" type="text" class="form-control" name="full_name" value="{{$full_name}}" required autofocus>
                                @if ($errors->has('full_name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('full_name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                            <label for="username" class="col-md-3 control-label">User Name</label>
                            <div class="col-md-9">
                                <input id="username" type="text" class="form-control" name="username" value="{{ $username }}" required autofocus>
                                @if ($errors->has('username'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                @endif

                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-3 control-label">E-Mail Address</label>
                            <div class="col-md-9">
                                <input id="email" type="email" class="form-control" name="email" value="{{ $email }}" required>
                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-3 control-label">Password</label>
                            <div class="col-md-9">
                                <input id="password" type="password" class="form-control" name="password" required>
                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password-confirm" class="col-md-3 control-label">Confirm Password</label>
                            <div class="col-md-9">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password-confirm" class="col-md-3 control-label">Role</label>
                            <div class="col-md-9">
                                <select name="user_role" id="user-role" class="form-control">
                                    <option value="" >--Select Role--</option>
                                    @foreach($roles as $role)
                                        <option value="{{$role->id}}"
                                            @if(isset($user['roles']))
                                                @if($user['roles']->first()->id == $role->id) 
                                                    selected='true'
                                                @endif
                                            @endif
                                        >{{ucfirst($role->name)}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-2 col-md-offset-8">
                                <button type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-7">
            <div class="panel panel-default">
                <div class="panel-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($users as $user)
                            <tr>
                                <td>{{$user->full_name}}</td>
                                <td>{{$user->username}}</td>
                                <td>{{$user->email}}</td>
                                <td>{{$user->getRoleToString() }}</td>
                                <td>
                                    <a href="{{route('user.edit',$user->id)}}" class="btn btn-info" data-dispatch="edit" data-link=""><i class="fa fa-pencil"></i></a>
                                    <a href="#" class="btn btn-info" data-dispatch="remove"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection


