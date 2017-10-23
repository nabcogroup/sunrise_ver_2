<template>
  <v-dialog dialog-title="Fixed Asset Entry" modal-id="fixedAssetEntry" v-model="toggle" @dismiss="save">
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Date:</label>
        <div class="col-md-9">
          <dt-picker ></dt-picker>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Decription:</label>
        <div class="col-md-9">
          <input class="form-control" v-model="lookups.description">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Property:</label>
        <div class="col-md-9">
          <select class="form-control" v-model="lookups.property">
              <option v-for="look in lookups.property" v-bind:value="look.id">{{ look.property }}</option>
          </select>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Fixed Asset Type:</label>
        <div class="col-md-9">
          <select class="form-control" v-model="lookups.fixed_asset_type">
              <option v-for="look in lookups.fixed_asset_type" v-bind:value="look.id">{{ look.fixed_asset_type }}</option>
          </select>
        </div>
    </div>
    <div class="form-group row">
        <label class="col-md-3 col-form-label">Cost:</label>
        <div class="col-md-9">
          <input class="form-control" v-model="lookups.cost">
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
<<<<<<< HEAD
=======

    mounted() {
      this.$store.dispatch('fixedAsset/create');
    },
    computed: {
      ...mapGetters("fixedAsset",{
        'lookups': 'lookups',
      }),
      ...mapState("fixedAsset",{
        data : state => state.data
      })
    },

>>>>>>> Register form added
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
