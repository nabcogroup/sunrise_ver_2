<template>
<v-dialog dialog-title="Fixed Asset Entry" modal-id="fixedAssetEntry" v-model="toggle" @dismiss="save">
    <div class="form-horizontal">
        <v-input-wrapper label="Date" label-class="col-md-3 text-right">
            <dt-picker
                :value="data.purchase_date"
                @pick="data.purchase_date =$event"></dt-picker>
                <error-span v-model="errorValidations" name="purchase_date"></error-span>
        </v-input-wrapper>
        <v-input-wrapper label="Property" label-class="col-md-3 text-right">
            <select class="form-control" v-model="data.property">
                <option value="">--SELECT PROPERTY--</option>
                <option v-for="look in lookups.villa_location" :value="look.code">{{ look.name }}</option>
            </select>
            <error-span v-model="errorValidations" name="property"></error-span>
        </v-input-wrapper>
        <v-input-wrapper label="Description" label-class="col-md-3 text-right">
            <textarea class="form-control" v-model="data.description"></textarea>
            <error-span v-model="errorValidations" name="description"></error-span>
        </v-input-wrapper>
        <v-input-wrapper label="Fixed Asset Type" label-class="col-md-3 text-right">
            <select class="form-control" v-model="data.fixed_asset_type">
                <option value="">--ASSET TYPE--</option>
                <option v-for="look in lookups.fixed_asset_type" :value="look.code">{{ look.name }}</option>
            </select>
            <error-span v-model="errorValidations" name="fixed_asset_type"></error-span>
        </v-input-wrapper>
        <v-input-wrapper label="Cost" label-class="col-md-3 text-right">
            <input class="form-control" type="number" v-model="data.cost">
            <error-span v-model="errorValidations" name="cost"></error-span>
        </v-input-wrapper>
    </div>
</v-dialog>
</template>

<script>
import { ErrorValidations } from "../../helpers/helpers";
import { toggleModal } from "../mixins";

import { mapGetters, mapState } from "vuex";
import { EventBus } from "../../eventbus";

export default {
  name: "FixedAssetRegisterDialog",
  mixins: [toggleModal],
  computed: {
    ...mapGetters("fixedAsset", {
      lookups: "lookups",
      errorValidations: "errorValidations"
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
    },
    open() {
      EventBus.$on("fixedAsset.entry.open", value => {
        if(value) {
          this.$store.dispatch('fixedAsset/edit', {id: value.data.id});
        }
        else {
          this.$store.dispatch("fixedAsset/create");
        }
        this.openDialog();
        
      });
    },
    save() {
      this.$store.dispatch("fixedAsset/save", () => {
        this.closeDialog();
        this.close();
      });
    }
  }
};
</script>
