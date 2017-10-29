<template>
    <div class="row" v-if="toggle">
        <div class="col-md-12">
            <v-panel header="Fixed Asset Register" :classic="true">
                <div class="form-horizontal">
                    <v-input-wrapper label="Date" label-class="col-md-3 text-right">
                    <dt-picker
                                :value="data.purchase_date"
                                @pick="data.purchase_date =$event"></dt-picker>
                                <error-span v-model="errorValidations" name="purchase_date"></error-span>
                    </v-input-wrapper>
                    <v-input-wrapper label="Property" label-class="col-md-3 text-right">
                        <v-combo-box v-model="data.property" :options="lookups.villa_location" :includeDefault="true" dvalue="code" dtext="name"></v-combo-box>
                        <error-span v-model="errorValidations" name="property"></error-span>
                    </v-input-wrapper>
                    <v-input-wrapper label="Description" label-class="col-md-3 text-right">
                        <textarea class="form-control" v-model="data.description"></textarea>
                        <error-span v-model="errorValidations" name="description"></error-span>
                    </v-input-wrapper>
                    <v-input-wrapper label="Fixed Asset Type" label-class="col-md-3 text-right">
                        <v-combo-box v-model="data.fixed_asset_type" :options="lookups.fixed_asset_type" :includeDefault="true" dvalue="code" dtext="name"></v-combo-box>
                        <error-span v-model="errorValidations" name="fixed_asset_type"></error-span>
                    </v-input-wrapper>
                    <v-input-wrapper label="Serial Number" label-class="col-md-3 text-right">
                        <input class="form-control" type="text" name="serial_number" v-model="data.serial_number">
                        <error-span v-model="errorValidations" name="serial_number"></error-span>
                    </v-input-wrapper>
                    <v-input-wrapper label="Cost" label-class="col-md-3 text-right">
                            <input class="form-control" type="number" v-model="data.cost">
                            <error-span v-model="errorValidations" name="cost"></error-span>
                    </v-input-wrapper>
                </div>
            </v-panel>
        </div>
    </div>
</template>

<script>
import { ErrorValidations } from "../../helpers/helpers";
import { toggleModal } from "../mixins";

import { mapGetters, mapState } from "vuex";
import { EventBus } from "../../eventbus";

export default {
  name: "FixedAssetRegisterFrame",
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
    this.openHandler();
  },
  methods: {
    close() {
      EventBus.$emit("fixedAsset.entry.close", true);
    },
    openHandler() {
      EventBus.$on("fixedAsset.entry.open", value => {
        if (value) {
          this.$store.dispatch("fixedAsset/edit", { id: value.data.id });
        } else {
          this.$store.dispatch("fixedAsset/create");
        }
        this.toggleDialog();
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