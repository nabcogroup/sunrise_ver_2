<template>
  <v-dialog dialog-title="Fixed Asset Entry" modal-id="fixedAssetEntry" v-model="toggle">
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Date:</label>
        <div class="col-md-9">
          <dt-picker ></dt-picker>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Decription:</label>
        <div class="col-md-9">
          <input class="form-control">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Property:</label>
        <div class="col-md-9">
          <select class="form-control">
              <option value="">PROPERTY</option>
          </select>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Fixed Asset Type:</label>
        <div class="col-md-9">
          <select class="form-control">
              <option value="">Fixed Asset Type</option>
          </select>
        </div>
    </div>
  </v-dialog>

</template>

<script>


import { ErrorValidations } from '../../helpers/helpers';
import { toggleModal } from "../mixins";

import {mapGetters,mapState} from 'vuex';
import { EventBus } from "../../eventbus";

export default {
    name: 'FixedAssetRegisterDialog',
    mixins: [toggleModal],

    data() {
        return {
            validations: new ErrorValidations(),
        }
    },
    beforeMount() {
        this.open();
    },
    methods: {
        close() {
            EventBus.$emit("fixedAsset.entry.close",true);
        },
        open() {
             EventBus.$on("fixedAsset.entry.open",(value) => {
                 this.openDialog();
             });
        }
    }
}
</script>
