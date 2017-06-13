
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">{{config('app.name')}} v{{config('app.version')}}</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
              <li><a href="#" data-toggle="modal" data-target="#loginClientModal"><i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> Client</a></li>
              <li><a href="#" data-toggle="modal" data-target="#loginAdminModal"><i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> Admin</a></li>
          </ul>

        </div><!--/.nav-collapse -->
    </div>
</div>
