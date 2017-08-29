@extends('layouts.master')
@section('content')

    <div class="page-header">
        Dashboard
    </div>
    <div class="row">
        @foreach($menus as $menu)
            @if($menu['visible'])
                <div class="col-md-8 col-lg-offset-2">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <i class="fa {{$menu['icon']}}"></i> {{$menu['name']}}
                        </div>
                        <div class="panel-body">
                            <div class="sr-menu-button">
                                @foreach($menu['submenus'] as $submenu)
                                    @if($submenu['name'] != '$separator')
                                        <a href="{{$submenu['url']}}" class="sr-menu">
                                            <i class="fa fa-3x fa-fw fa-github"></i><br/>
                                            {{$submenu['name']}}
                                        </a>
                                    @endif
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            @endif
        @endforeach
    </div>
@endsection

