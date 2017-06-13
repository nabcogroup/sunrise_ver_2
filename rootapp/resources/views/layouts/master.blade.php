<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config("app.name")}}</title>

    <link rel="stylesheet" href="{{asset('lib/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css')}}"/>
    <link rel="stylesheet" href="{{asset('lib/font-awesome/css/font-awesome.min.css') }}" />
    <link rel="stylesheet" href="{{asset('lib/fullcalendar/dist/fullcalendar.min.css') }}" />
    <link rel="stylesheet" href="{{asset('lib/fullcalendar/dist/fullcalendar.print.min.css') }}" media="print" />
    <link rel="stylesheet" href="{{asset('css/sidebar.css') }}" />
    <link rel="stylesheet" href="{{asset('css/app.css') }}" />

    <script>
        window.Laravel = {!! json_encode([
            'csrfToken'     => csrf_token(),
            'imagePath'     => asset('img/villa'),
            'appPath'       => base_path(),
            'baseUrl'       =>  url('/')
        ]) !!};
    </script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
</head>
<body>
    <div id="mainApp">
        <sidebar title="{{config('app.name')}}" :logo="{{json_encode($sidebar['logos'])}}"  :menus="{{$sidebar['menus']}}"></sidebar>
        <div class="container-fluid" style="padding:0">
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse-menu" aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse" id="collapse-menu">
                            <ul class="nav navbar-nav navbar-right">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-user-circle fa-lg" aria-hidden="true"></i> {{ isset(Auth::user()->username) ? Auth::user()->username : "Anonymous"}}
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="{{ url('users.profile') }}"><i class="fa fa-user-plus" aria-hidden="true"></i> Profile</a></li>
                                        <li><hr/></li>
                                        <li>
                                            <a href="#" onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit()">
                                                <i class="fa fa-power-off" aria-hidden="true"></i> Logout
                                            </a>
                                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                {{ csrf_field() }}
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="page-wrapper">
                    @yield('content')
                </div>
            </div>

    </div>

    <!-- /#wrapper -->
    <script src="{{asset('js/vendor.js')}}"></script>
    <script src="{{asset('lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js')}}"></script>
    <script src="{{asset('lib/fullcalendar/dist/fullcalendar.min.js')}}"></script>
    <script src="{{asset('js/app.js')}}"></script>

    <script>


    </script>

    @yield('scripts')
</body>

</html>
