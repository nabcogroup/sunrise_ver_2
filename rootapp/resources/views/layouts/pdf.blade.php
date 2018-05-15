<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @if(config('app.env') == 'dev')
        <link rel="stylesheet" href="{{asset('lib/bootstrap/dist/css/bootstrap.min.css')}}" />
    @else
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    @endif
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
    </style>
</head>
<body>
    <header class="wrapper" style="border-bottom: 1px solid gray">
        <div class="row">
            <div class="col-xs-3">
                <img src="{{asset('imgs/logo.png')}}" class="img-logo"/>
            </div>
            <div class="col-xs-9" style="position:relative">
                <div style="position:relative; margin-left:220px; top:0;" >
                    {{$report_title or ""}}
                </div>
            </div>
        </div>
    </header>
    <main class="container-fluid">
        {{$slot}}
    </main>
    <footer>
        <div class="row" style="position:absolute; bottom:50;">
            <div class="col-md-12">
                <div class="row"  style="border-bottom: 1px solid lightgray;margin-top: 20px; margin-bottom:20px;"> </div>
                <p style="position:absolute; top:20px; font-size:12px;">Doha, Qatar</p>
                <p style="position:absolute;  top:35px; font-size:12px;">Tel No: +974 4466 6646</p>
                <p style="position:absolute;  top:50px; font-size:12px;font-style:italic;">  Email: info@sunriseresidence.co</p>
                <p style="position:absolute; top:65px; font-size:12px;">Website: <a href="#">http://www.sunriseresidence.co</a></p>
            </div>
        </div>
    </footer>
</body>
</html>
