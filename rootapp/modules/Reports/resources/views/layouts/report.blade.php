<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="../../lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="{{asset('css/app.css') }}" />
    <title>{{ config("app.name")}}</title>

    <style>
        .page-break {
            page-break-after: always;
        }
        td {
            font-size: 12px;
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

        @media print {
            a:after { content:''; }
            a[href]:after { content: none !important; }

        }
    </style>
</head>

<body>
    <header class="container-fluid wrapper" style="border-bottom: 1px solid lightgray; margin-bottom: 55px">
        <div class="row">
            <div class="col-md-3 col-xs-2">
                <img src="{{asset('imgs/logo.png')}}" class="img-logo"/>
            </div>
            <div class="col-md-9 col-xs-10">
                {{$report_title or "Reports"}}
            </div>
        </div>
    </header>
<main class="container-fluid">
    {{$slot}}
</main>
<footer>
    <div class="row" style="position:absolute; bottom:0;">
        <div class="col-xs-12" style="padding-right:10px">
            {{$footer or ""}}
        </div>
    </div>
</footer>
</body>
</html>
