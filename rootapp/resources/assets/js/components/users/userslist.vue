<template>
<div id="app">
    <div class="container-fluid">
      <div class="col-lg-12">
      <div class="panel panel-yellow">
          <div class="panel-heading ">User Account</div>
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
                  :columns="gridColumns"
                  :actions="actions"
                  @action="doAction">
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
        {name: 'created_at', column: 'DATE CREATED'},
        {name: 'username ', column: 'USER NAME'},
        {name: 'usertype ', column: 'USER TYPE'},
        {name: 'action', column: 'SET USER TYPE',static:true, class: 'text-center'}],
        actions: [
            {key:'admin', name:'Admin'},
            {key:'accounting', name:'Accounting'},
            {key:'staff', name:'Staff'},
            {key:'remove',name:'Remove'}
        ],
        statusCounts: []
    }
  }
}

</script>
