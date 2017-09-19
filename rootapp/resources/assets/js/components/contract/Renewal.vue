<template>
    <v-dialog dialog-title="Contract Renewal" modal-id="renewal" v-model="toggle" @dismiss="save">
        <div class="row">
            <div class="col-md-12">
                 <div class="x-lite-panel">
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Tenant Name:</strong>
                        <strong class="col-md-9 x-desc text-danger">{{contract.tenant.full_name}}</strong>
                    </p>
                </div>
            </div>
            <div class="col-md-12">
                 <div class="x-lite-panel">
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Villa No:</strong>
                        <strong class="col-md-9 x-desc text-danger">{{contract.villa.villa_no}}</strong>
                    </p>
                </div>
            </div>
            <div class="col-md-12">
                 <div class="x-lite-panel">
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Rate per Month:</strong>
                        <strong class="col-md-9 x-desc text-danger">{{contract.villa.rate_per_month | toCurrencyFormat}}</strong>
                    </p>
                </div>
            </div>
        </div>   
        <form class="form-horizontal">
            <v-input-wrapper label="Period Start" model-name="period_start" :required="true">
                <dt-picker dp-name="period_start" :value="contract.period_start" @pick="contract.period_start = $event"></dt-picker>
                <error-span v-model="stateRenewError" name="period_start"></error-span>
            </v-input-wrapper>
            <v-input-wrapper label="Period End" model-name="period_end" :required="true">
                <dt-picker dp-name="period_end" :value="contract.period_end" @pick="contract.period_end = $event"></dt-picker>
                <error-span v-model="stateRenewError" name="period_end"></error-span>
            </v-input-wrapper>
            <v-input-wrapper label="Amount" model-name="amount" :required="true">
                <div class='input-group'>
                    <input name="amount" type="text" class="form-control" placeholder="AMOUNT *" v-model='contract.amount'>
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" type="button" @click="calc()">
                            <i class="fa fa-calculator" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
                <error-span v-model="stateRenewError" name="amount"></error-span>
            </v-input-wrapper>
        </form>
    </v-dialog>
</template>
<script>

import { EventBus } from "../../eventbus";
import { toggleModal } from "../mixins";
import { mapState,mapGetters } from "vuex";

export default {
    props: ["viewModel"],
    mixins: [toggleModal],
    beforeMount() {
        EventBus.$on("contracts.renewal.open", (contract_id) => {
            this.$store.dispatch("contracts/renew", {
                id: contract_id,
                cb: () => this.openDialog() 
            });
        });
    },
    computed: {
        ...mapState("contracts", {
            contract: state => state.contract,
        }),
        ...mapGetters("contracts", {
            stateRenewError: "stateRenewError"
        })
    },
    methods: {
        save() {
            this.$store.dispatch("contracts/update");
        },
        calc() {
            this.$store.dispatch('contracts/recalc')
        }
    }
}
</script>
