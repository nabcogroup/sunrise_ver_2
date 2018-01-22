<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="{{asset('lib/bootstrap/dist/css/bootstrap.min.css')}}" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>{{ config("app.name")}}</title>


    <style>
        body {
            padding-top: 75px;
        }
    </style>
</head>

<body>
<header>
    <!-- -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="{{url('/admin')}}" class="navbar-brand">Admin Utility</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="{!! url("/admin/payment/reverse") !!}"><i class="fa fa-credit-card"></i> Revert Payment</a></li>
                    <li><a href="{!! url("/admin/contract/terminate") !!}"><i class="fa fa-certificate"></i> Revert Contract Termination</a></li>
                    <li><a href="{!! url("/admin/villa/resolved") !!}"><i class="fa fa-home"></i> Villa with no Active Contract </a></li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li><a href="{!! url("/") !!}"><i class="fa fa-reply-all"></i></a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<main class="container-fluid">
    @yield("header")
    @yield("content")
</main>
<script src="{{asset('lib/jquery/dist/jquery.min.js')}}"></script>
<script src="{{asset('lib/boostrap/dist/js/bootstrap.js')}}"></script>

@yield("script")
</body>
</html>
