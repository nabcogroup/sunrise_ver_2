<template>

<v-dialog dialog-title="Account Chart List" modal-id="accountList" v-model="toggle" @dismiss="save">
    <div class="form-horizontal">
      <v-input-wrapper label="Code" label-class="col-md-3 text-right">
          <input class="form-control" type="text" name="account.code" v-model="account.code">
      </v-input-wrapper>

      <v-input-wrapper label="Account Type" label-class="col-md-3 text-right">
          <v-combo-box 
            :options="lookups.account_type" 
            v-model="account.account_type" 
            dtext="name" 
            dvalue="code" 
            :include-default=true></v-combo-box>
      </v-input-wrapper>
      <v-input-wrapper label="Description" label-class="col-md-3 text-right">
          <textarea class="form-control" v-model="account.description"></textarea>
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
  name: "AccountRegisterDialog",
  mixins: [toggleModal],
  computed: {
    ...mapGetters("accountCharts", {
      lookups: "lookups",
      account: "account"
    }),
  },
  mounted() {
    this.open();
  },
  data() {
    return {
      
      validations: new ErrorValidations()

    };
  },
  methods: {
    close() {

      EventBus.$emit("accountChart.entry.close", true);

    },
    open() {
      
      EventBus.$on("accountChart.entry.open", value => {
        
        if (value) {
          this.$store.dispatch("accountCharts/edit", value.item);
        } 
        else {
          this.$store.dispatch("accountCharts/create");
        }

        this.openDialog();

      });

    },
    save() {
      this.$store.dispatch("accountCharts/save", () => {

        this.closeDialog();

        this.close();
        
      });
    }
  }
};
</script>
