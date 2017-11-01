<template>
<v-dialog dialog-title="Account Chart List" modal-id="accountList" v-model="toggle" @dismiss="save">
    <div class="form-horizontal">
      <v-input-wrapper label="Code" label-class="col-md-3 text-right">
          <input class="form-control" type="text" name="account.code" v-model="account.code">
      </v-input-wrapper>

        <v-input-wrapper label="Account Type" label-class="col-md-3 text-right">
            <select class="form-control" v-model="account.account_type">
                <option value="">--ACCOUNT TYPE--</option>
                <option v-for="look in lookups.account_type" :value="look.code" :key="look.code">{{ look.name }}</option>
            </select>

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
      lookups: "lookups"
    }),
    ...mapState("accountCharts", {
      account: state => state.account
    })
  },
  beforeMount() {
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
          this.$store.dispatch("accountCharts/edit", value.id);
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
