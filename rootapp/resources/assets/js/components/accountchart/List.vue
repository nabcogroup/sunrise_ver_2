<template>
    <v-panel header="Account Chart List">
        <div class="row">
            <div class="col-md-2 col-md-offset-10">
                <button class="btn btn-info btn-block" @click="create">
                    <i class="fa fa-plus"></i> Add Account Chart
                </button>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-12">
                <v-live-view :grid="gridView" @action="doAction"></v-live-view>
            </div>
        </div>
        <account-register-dialog></account-register-dialog>
    </v-panel>
</template>
<script>
import {mapGetters} from "vuex";
import AccountRegisterDialog from "./AccountRegisterDialog.vue";
import {EventBus} from "../../eventbus";
export default {
  components: {
    AccountRegisterDialog
  },
  data() {
    return {
      gridView: {
        columns:[
          {name:'code', column: 'Code', style: 'width:20%', class: 'text-center'},
          {name:'description', column: 'Description', class: 'text-left', filter: true},
          {name:'account_type', column: 'Account Type', class:'text-center', style:'width:10%', filter: true},
          {name: '$action', column: ' ', static: true, class: 'text-center', style: 'width:5%'}
        ],
        actions: [
            {key: 'edit', name: 'Edit'}
        ],
        source: {
          url: '/api/chart'
        }
      }
    }
  },
  methods: {
      create() {
          EventBus.$emit('accountChart.entry.open');
          EventBus.$on('accountChart.entry.close',() =>{
              EventBus.$emit('onLiveViewFetch');
          })
      },
      doAction(a, item, index) {
          if(a.key === 'edit') {
              EventBus.$emit('accountChart.entry.open',{id: item.id});
          }
      }
    }
}

</script>
