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
            <v-input-wrapper label-class="col-md-3 text-right" label="Contract Type" model-name="contract_type">
                <v-combo-box v-model="contract.contract_type" :options="lookups.contract_type" dvalue="code" dtext="name"></v-combo-box>
            </v-input-wrapper>

            <v-input-wrapper label="Period Start" model-name="period_start" :required="true">
                <dt-picker dp-name="period_start" :value="contract.period_start" @pick="contract.period_start = $event"></dt-picker>
                <error-span v-model="stateRenewError" name="period_start"></error-span>
            </v-input-wrapper>
            <v-input-wrapper label="Period End" model-name="period_end" :required="true">
                <dt-picker dp-name="period_end" :value="contract.period_end" @pick="contract.period_end = $event"></dt-picker>
                <error-span v-model="stateRenewError" name="period_end"></error-span>
            </v-input-wrapper>
            <v-input-wrapper label="Extra Days: " label-class="col-md-3 text-right">
                <input type="text" class="form-control" v-model="contract.extra_days" />
                <error-span v-model="stateRenewError" name="extra_days"></error-span>
            </v-input-wrapper>
            <hr/>
            <div v-if="contract.contract_type === 'legalized'">
                <v-input-wrapper label="Cheque Series:" label-class="col-md-3 text-right">
                    <input type="number" class="form-control" v-model="contract.prep_series" />
                </v-input-wrapper>
                <v-input-wrapper label="Bank:" label-class="col-md-3 text-right">
                    <v-combo-box v-model="contract.prep_bank" :options="lookups.bank" :include-default="true" dvalue="code" dtext="name"></v-combo-box>
                </v-input-wrapper>
                <div class="form-group">
                    <label for="" class="col-md-3 text-right">Due Date:</label>
                    <div class="col-md-4">
                        <v-combo-box :options="lookups.due_date" :include-default="true" v-model="contract.prep_due_date"></v-combo-box>
                    </div>
                    <label for="" class="col-md-3 text-right">Reference No:</label>
                    <div class="col-md-2">
                        <input type="text" class="form-control" v-model="contract.prep_ref_no" />
                    </div>
                </div>
                <hr/>
            </div>
            <div class="row">
                <label for="" class="col-md-3 text-right">Contract Value:</label>
                <div class="col-md-9">
                    <div class='input-group'>
                        <input name="amount" type="text" class="form-control text-right" placeholder="AMOUNT" v-model='contract.amount'>
                        <div class="input-group-btn">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                Action <i class="fa fa-chevron-down"></i>
                            </button>
                             <ul class="dropdown-menu dropdown-menu-right" style="width:450px">
                                <li>
                                    <div class="form-group">
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" v-model="rate_per_month" />
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-info" @click.prevent="calc()">
                                                <i class="fa fa-calculator" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <error-span v-model="stateRenewError" name="amount"></error-span>
                </div>
            </div>
        </form>
    </v-dialog>
</template>
<script>

import { EventBus } from "../../eventbus";
import { toggleModal } from "../mixins";
import { mapState, mapGetters } from "vuex";

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
    data() {
        return {
            rate_per_month: 0
        }
    },
    computed: {
        ...mapState("contracts", {
            contract: state => state.contract,
        }),
        ...mapGetters("contracts", {
            stateRenewError: "stateRenewError",
            lookups: "lookups"
        })
    },
    methods: {
        save() {
            this.$store.dispatch("contracts/update");
        },
        calc() {
            this.$store.dispatch('contracts/recalc', { rate: this.rate_per_month });
        }
    }
}
</script>
