<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sunrise</title>

    </head>
    <body>
      @include('layouts/nav')
      <div class="vid-container">
  <video class="bgvid" autoplay="autoplay" muted="muted" preload="auto" loop>
      <source src="{{URL::asset('videos/CidadeConvertVideo.mp4')}}" type="video/webm">
  </video>

</div>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
        <div class="inner-container">
          <video class="bgvid inner" autoplay="autoplay" muted="muted" preload="auto" loop>
            <source src="{{URL::asset('videos/CidadeConvertVideo.mp4')}}" type="video/webm">
          </video>

          <div class="box-vid">
            <button type="button"  class="close" style="width:5px;margin-right:20px;margin-top:-10px;" data-dismiss="modal">&times;</button>
            <h1>Admin Logins</h1>
            <input type="text" class="form-control" placeholder="Username"/>
            <input type="text"  class="form-control" placeholder="Password"/>
              <button type="button" class="btn btn-primary">Login</button>
          </div>

        </div>

      </div>


  </div>
</div>
    </body>
</html>
