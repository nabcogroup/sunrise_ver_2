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
                <v-live-view :grid="gridView"></v-live-view>
            </div>
        </div>
    </v-panel>
</template>
<script>
import {mapGetters} from "vuex";
import {AccountRegisterDialog} from "./AccountRegisterDialog";
import {EventBus} from "../../eventbus";
export default {
  data() {
    return {
      gridView: {
        columns:[
          {name:'code', column: 'Code', style: 'width:20%', class: 'text-center'},
          {name:'description', column: 'Description', class: 'text-left'},
          {name:'account_type', column: 'Account Type', class:'text-center', style:'width:10%'}
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
      }
    }
}

</script>
