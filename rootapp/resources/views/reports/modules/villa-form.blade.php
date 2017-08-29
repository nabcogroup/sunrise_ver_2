@component('layouts.pdf')
    @foreach($datasource as $villa)

        @slot('report_title')
        <h2  style="margin-top:25px;font-size:20px; color:#1b68e5;">{{$villa['location']}}</h2>
        <h2 style="padding-top:-20px;">VILLA MASTER</h2>
        @endslot

        <div class="row" style="margin-top:15px">
              <div class="col-xs-3"><strong>Villa No.</strong></div>
              <div class="col-xs-9"><span>:  {{$villa['villa_no']}}</span></div>
        </div>
        <div class="row">
            <div class="col-xs-3"><strong>Description</strong></div>
            <div class="col-xs-10"><span>:  {{$villa['description']}}</span></div>
        </div>
        <div class="row">
          <div class="col-xs-3"><strong>Electricity No.</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['electricity_no']}}</span></div>
        </div>
        <div class="row">
          <div class="col-xs-3"><strong>Water No.</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['water_no']}}</span></div>
        </div>
        <div class="row">
          <div class="col-xs-3"><strong>QTel No.</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['qtel_no']}}</span></div>
        </div>
        <div class="row">
          <div class="col-xs-3"><strong>Rate/Month</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['rate_per_month']}}</span></div>
        </div>

        <div class="row"  style="border-bottom: 1px solid lightgray;margin-top: 20px;"></div>
        <br/>
        <div class="row" style="margin-top:15px">
          <div class="col-xs-3"><strong>Contract No.</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['contract_no']}}</span></div>
        </div>

        <div class="row">
          <div class="col-xs-3"><strong>Period</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['period'] }}</span></div>
        </div>

        <div class="row">
          <div class="col-xs-3"><strong>Contract Amount</strong></div>
          <div class="col-xs-10"><span>:  {{number_format($villa['contract_amount'],2) }}</span></div>
        </div>
        <div class="row">
          <div class="col-xs-3"><strong>Contract Status</strong></div>
          <div class="col-xs-10"><span>:  {{ucfirst($villa['contract_status']) }}</span></div>
        </div>

  <div class="row"  style="border-top: 1px solid lightgray;margin-top: 20px; margin-bottom:20px;"> </div>

<br/>
        <div class="row">
          <div class="col-xs-3"><strong>Full Name</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['tenant_name']}}</span></div>
        </div>
        <div class="row">
          <div class="col-xs-3"><strong>Email Address</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['email_address']}}</span></div>
        </div>
        <div class="row">
          <div class="col-xs-3"><strong>Tel No/Mobile No.</strong></div>
          <div class="col-xs-10"><span>:  {{$villa['tel_no']}}<i>/  </i>{{$villa['mobile_no']}}</span></div>
        </div>
        <div class="row">
          <div class="col-xs-3"><strong>QID / CR No</strong></div>
          <div class="col-xs-11"><span>:  {{$villa['tenant_reg_id']}}</span></div>
        </div>
  <div class="row" style="position:absolute; bottom:50;">

        <div class="col-xs-12">

        <div class="row"  style="border-bottom: 1px solid lightgray;margin-top: 20px; margin-bottom:20px;"> </div>
        <p style="position:absolute; top:20px; font-size:12px;">Doha, Qatar</p>
        <p style="position:absolute;  top:35px; font-size:12px;">Tel No: +974 4466 6646</p>
        <p style="position:absolute;  top:50px; font-size:12px;font-style:italic;">  Email: info@sunriseresidence.co</p>
        <p style="position:absolute; top:65px; font-size:12px;">Website: <a href="#">http://www.sunriseresidence.co</a></p>

      </div>
  </div>

    @endforeach
@endcomponent
