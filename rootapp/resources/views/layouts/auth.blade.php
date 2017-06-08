<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config("app.name")}} - Login</title>
    <link href="{{ asset('lib/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{{asset('css/login.css')}}">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken'     => csrf_token()
        ]) !!};
    </script>
</head>
<body>
    <div>
       @include('layouts/login/nav')
       <div class="vid-container">
           <video class="bgvid" autoplay="autoplay" muted="muted" preload="auto" loop>
               <source src="{{URL::asset('imgs/CidadeConvertVideo.mp4')}}" type="video/webm">
           </video>
        </div>
        @yield('content')
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</body>

</html>
