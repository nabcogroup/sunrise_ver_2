<template>
<div id="app">
    <div class="container-fluid">
      <div class="col-md-5">
        <div class="panel panel-yellow">
          <div class="panel-heading ">User Profile</div>

          <div class="panel-body">
            <div class='form-group'>
                <label class='col-md-12'>NAME:</label>

            </div>
            <div class='form-group'>
                <label class='col-md-12'>CONTACT NO:</label>

            </div>
            <div class='form-group'>
                <label class='col-md-3'>USERNAME:</label>
                <div class='col-md-9'>
                    <input type='text' class='form-control'>
                </div>
            </div>

            <div class='form-group'>
                <label class='col-md-3'>PASSWORD:</label>
                <div class='col-md-9'>
                    <input type='text' class='form-control'>
                </div>
            </div>
          </div>

          <div class="panel-footer">
            <button type="submit" class="btn-sm btn-primary">Update</button>
          </div>

        </div>
      </div>
      <div class="col-lg-7">
      <div class="panel panel-yellow">
          <div class="panel-heading ">Activity Log</div>
          <div class="panel-body">
                  <div class="row">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                    </div>
                  </div>
                    <br/>
                  <gridview
                  :data="items"
                  :columns="gridColumns">
                </gridview>
            </div>
        </div>
      </div>
    </div>
</div>

</template>


<script>

import GridView from '../GridView.vue';
export default {

  name: "app",
  props: ['url'],
  methods: {
      doAction(a,id) {
           if(a.key == 'edit') {
              var redirectToEdit = this.url + "/" + id;
              AjaxRequest.route(redirectToEdit);
          }
      },
      addNew() {
          AjaxRequest.route(this.url);
      }
  },
  data: function () {
    return {
      items:[],
      components: {
        'gridview':GridView
      },
      gridColumns: [
        {name: 'created_at', column: 'ACTIVITY DATE'},
        {name: 'username ', column: 'ACTIVITY'},
        {name: 'usertype ', column: 'CATEGORY'}],
        statusCounts: []
    }
  }
}

</script>
