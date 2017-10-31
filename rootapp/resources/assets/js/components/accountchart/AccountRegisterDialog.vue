<template>
<v-dialog dialog-title="Account Chart List" modal-id="accountList" v-model="toggle" @dismiss="save">
    <div class="form-horizontal">
      <v-input-wrapper label="Code" label-class="col-md-3 text-right">
          <input class="form-control" type="text" name="serial_number" v-model="account.code">
      </v-input-wrapper>

        <v-input-wrapper label="Account Type" label-class="col-md-3 text-right">
            <select class="form-control" v-model="account.account_type">
                <option value="">--ACCOUNT TYPE--</option>
                <option v-for="look in lookups.villa_location" :value="look.code">{{ look.name }}</option>
            </select>

        </v-input-wrapper>
        <v-input-wrapper label="Description" label-class="col-md-3 text-right">
            <textarea class="form-control" v-model="account.description"></textarea>
        </v-input-wrapper>

    </div>
</v-dialog>
</template>
<script>

import { toggleModal } from "../mixins";
import { mapGetters, mapState } from "vuex";
import { EventBus } from "../../eventbus";
  export default {
    name: 'AccountRegisterDialog',
    mixins: [toggleModal],
    computed: {
      ...mapGetters("accountCharts", {
        lookups: "lookups",
      }),
      ...mapState("accountCharts", {
        account: state => state.account
      })
    },
    methods: {
      create() {
        dispatch('accountCharts/create')
      }
    }

  }
</script>
