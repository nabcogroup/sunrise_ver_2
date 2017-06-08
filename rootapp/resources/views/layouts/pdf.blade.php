<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="../../lib/bootstrap/dist/css/bootstrap.min.css" />
    <title>{{ config("app.name")}}</title>

    <style>
        .page-break {
            page-break-after: always;
        }
        body {
            font-size: 1.2em;
        }
        .img-logo {
            width: 150px;
            height: 80px;
        }
        .wrapper {
            width:100%;
        }
        .nb-form-group {

        }

        .nb-total {

        }

    </style>
</head>
<body>
    <div class="wrapper">
        <img src="../../imgs/logo.png" class="img-logo"/>
    </div>
    <hr>
    <div class="container-fluid">
      @yield('content')
    </div>
</body>
</html>