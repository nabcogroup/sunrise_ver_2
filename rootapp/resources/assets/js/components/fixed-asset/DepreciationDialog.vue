<template>
  <v-dialog dialog-title="Depreciation Value" modal-id="depValue" v-model="toggle" @dismiss="save">
      <div class="form-horizontal">
        <v-input-wrapper label="Opening" label-class="col-md-3 text-right">
            <select class="form-control">
                <option></option>
            </select>
        </v-input-wrapper>
        <v-input-wrapper label="Opening Year" label-class="col-md-3 text-right">
            <input class="form-control" type="text">
        </v-input-wrapper>
        <v-input-wrapper label="Depreciated Value" label-class="col-md-3 text-right">
          <input class="form-control" type="text">
        </v-input-wrapper>
        <v-input-wrapper label="Book Value" label-class="col-md-3 text-right">
          <input class="form-control" type="text">
        </v-input-wrapper>
        <v-input-wrapper label="Account" label-class="col-md-3 text-right">
            <select class="form-control">
                <option value="">--ACCOUNT--</option>
                <option></option>
            </select>
        </v-input-wrapper>
      </div>
  </v-dialog>
</template>

<script>
import { toggleModal } from "../mixins";
  import { EventBus } from "../../eventbus";
  export default {
    name: "DepreciationDialog",
    mixins: [toggleModal],
    beforeMount() {
      this.open();
    },
    methods: {
      close() {
        EventBus.$emit("depreciation.entry.close", true);
      },
      open() {
        EventBus.$on("depreciation.entry.open", value => {
          this.$store.dispatch("depreciation/create");
          this.openDialog();
        });
      },
      save() {
        
      }
    }
  }
</script>
