<template>
    <v-panel header="Fixed Asset">
        <div class="row">
          <div class="col-md-2 col-md-offset-10">
              <button class="btn btn-info btn-block" @click="create">
                  <i class="fa fa-plus"></i> Add Fixed Assets
              </button>
          </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-12">
                <v-live-view :grid="gridView"></v-live-view>
            </div>
        </div>
    <fixed-asset-register-dialog></fixed-asset-register-dialog>
    </v-panel>
</template>

<script>
import {mapGetters} from "vuex";
import FixedAssetRegisterDialog from "./FixedAssetRegisterDialog.vue";
import {EventBus} from "../../eventbus";
export default {
  data() {
      return {
          gridView: {
              columns: [
                {name: 'purchase_date', column:'Purchase Date', filter: true},
                {name: 'fixed_asset_type', column:'Description', filter: true},
                {name: 'property', column:'Property', filter: true},
                {name: 'cost', column:'Cost', filter: true, type: 'currency'},
                {name: 'tag_code', column: 'Tag No', filter: true},
                {name: '$action', column: ' ', static: true, class: 'text-center'}
              ],
              actions: [
                  {key: 'edit', name: 'Edit'}
              ],
              source: {
                  url: '/api/fixed-asset'
              }
          }
      }
  },
  components: {
    'fixedAssetRegisterDialog': FixedAssetRegisterDialog
  },
  methods: {
    create(){
      EventBus.$emit('fixedAsset.entry.open');
    }
  }
};
</script>
