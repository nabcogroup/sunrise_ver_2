<template>
<<<<<<< HEAD
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
=======
  <v-dialog dialog-title="Fixed Asset Entry" modal-id="fixedAssetEntry" v-model="toggle" @dismiss="save">
    <div class="form-horizontal">
        <v-input-wrapper label="Date" label-class="col-md-3 text-right">
            <dt-picker ></dt-picker>
        </v-input-wrapper>
        <v-input-wrapper label="Property" label-class="col-md-3 text-right">
            <select class="form-control" v-model="data.property">
                <option value="">--SELECT PROPERTY--</option>
                <option v-for="look in lookups.villa_location" :value="look.code">{{ look.name }}</option>
            </select>
        </v-input-wrapper>
        <v-input-wrapper label="Description" label-class="col-md-3 text-right">
            <textarea class="form-control" v-model="data.description"></textarea>
        </v-input-wrapper>
        <v-input-wrapper label="Fixed Asset Type" label-class="col-md-3 text-right">
            <select class="form-control" v-model="data.fixed_asset_type">
              <option value="">--ASSET TYPE--</option>
              <option v-for="look in lookups.fixed_asset_type" :value="look.code">{{ look.name }}</option>
            </select>
        </v-input-wrapper>
        <v-input-wrapper label="Cost" label-class="col-md-3 text-right">
            <input class="form-control" type="number" v-model="data.cost">
        </v-input-wrapper>
>>>>>>> 8be1af8c6b93d49a2d4c3708722a78889a803c88
    </div>
  </v-dialog>

</template>

<script>
import { ErrorValidations } from "../../helpers/helpers";
import { toggleModal } from "../mixins";

import { mapGetters, mapState } from "vuex";
import { EventBus } from "../../eventbus";

export default {
<<<<<<< HEAD
    name: 'FixedAssetRegisterDialog',
    mixins: [toggleModal],

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

    data() {
        return {
            validations: new ErrorValidations(),
        }
=======
  name: "FixedAssetRegisterDialog",
  mixins: [toggleModal],

  mounted() {
    this.$store.dispatch("fixedAsset/create");
  },
  computed: {
    ...mapGetters("fixedAsset", {
      lookups: "lookups"
    }),
    ...mapState("fixedAsset", {
      data: state => state.data
    })
  },

  data() {
    return {
      validations: new ErrorValidations()
    };
  },
  beforeMount() {
    this.open();
  },
  methods: {
    close() {
      EventBus.$emit("fixedAsset.entry.close", true);
>>>>>>> 8be1af8c6b93d49a2d4c3708722a78889a803c88
    },
    open() {
      EventBus.$on("fixedAsset.entry.open", value => {
        this.openDialog();
      });
    },
    save() {
        
    }
  }
};
</script>
