<template>
    <v-panel header="RENTAL CONTRACT ENTRY">
        <v-input-wrapper label-class="col-md-3 text-right" label="Contract Type" model-name="contract_type">
            <select class="form-control" v-model="contract.contract_type">
                <option v-for="(lookup, index) in lookups.contract_type" :value="lookup.code" :key="index">{{lookup.name}}
                </option>
            </select>
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" label="Period Start" model-name="period_start" :required="true">
            <dt-picker dp-name="period_start" @pick="contract.period_start = $event" :value="contract.period_start"></dt-picker>
            <error :errorDisplay="errors.get('period_start')">{{ errors.get('period_start')}}</error>
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" label="Period End" model-name="period_end" :required="true">
            <dt-picker dp-name="period_end" @pick="contract.period_end = $event" :value="contract.period_end"></dt-picker>
            <error :errorDisplay="errors.get('period_end')">{{ errors.get('period_end') }}</error>
        </v-input-wrapper>

        <div class="form-group">
            <label class="col-md-3 text-right">Extra Days:</label>
            <div class="col-md-3">
                <input type="text" class="form-control" v-model="contract.extra_days" />
            </div>
        </div>
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
                    <input type="text" class="form-control" v-model="contract.prep_ref_no"/>
                </div>
            </div>
            <hr/>
        </div>

        <div class="form-group">
            <label for="" class="col-md-3 text-right">Contract Value:</label>
            <div class="col-md-9">
                <div class='input-group'>
                    <input name="amount" type="text" class="form-control text-right" placeholder="AMOUNT *" v-model='contract.amount'>
                    <span class="input-group-btn">
                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            Action
                            <i class="fa fa-chevron-down"></i>
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
                    </span>
                </div>
            </div>
        </div>
    </v-panel>
</template>

<script>

import ErrorLabel from '../ErrorLabel.vue';
import { mapGetters } from "vuex";

export default {
    name: "ContractEntry",
    components: {
        'error': ErrorLabel,
    },
    data() {
        return {
            rate_per_month: 0
        }
    },
    methods: {
        calc() {
            this.$store.dispatch('contracts/recalc', { rate: this.rate_per_month });
        }
    },
    computed: {
        ...mapGetters('contracts', {
            contract: 'contract',
            lookups: 'lookups',
            errors: 'stateContractError',
            selectedVilla: 'selectedVilla'
        })
    }
}


</script>
