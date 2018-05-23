<template>
    <v-panel header="RENTAL CONTRACT ENTRY">
        <!-- contract type -->
        <v-input-wrapper label-class="col-md-3 text-right" label="Contract Type" model-name="contract_type">
            <v-combo-box v-model="contract.contract_type" :options="lookups.contract_type" dvalue="code"
                         dtext="name"></v-combo-box>
        </v-input-wrapper>

        <!-- date period -->
        <v-input-wrapper label-class="col-md-3 text-right" label="Period Start" model-name="period_start"
                         :required="true">
            <v-dt-picker v-model="contract.period_start"></v-dt-picker>
            <error-span v-model="errors" name="period_start"></error-span>
        </v-input-wrapper>
        <v-input-wrapper label-class="col-md-3 text-right" label="Period End" model-name="period_end" :required="true">
            <v-dt-picker v-model="contract.period_end"></v-dt-picker>
            <error-span v-model="errors" name="period_end"></error-span>
        </v-input-wrapper>
        <!-- end date period -->

        <!-- extra days -->
        <v-input-wrapper label="Extra Days: " label-class="col-md-3 text-right">
            <input type="text" class="form-control" v-model="contract.extra_days"/>
            <error-span v-model="errors" name="extra_days"></error-span>
        </v-input-wrapper>
        
        <!-- line segment -->
        <hr/>

        <template v-if="contract.contract_type === 'legalized'">
            <v-input-wrapper label="Cheque Series:" label-class="col-md-3 text-right">
                <input type="number" class="form-control" v-model="contract.prep_series"/>
            </v-input-wrapper>
            <v-input-wrapper label="Bank:" label-class="col-md-3 text-right">
                <v-combo-box v-model="contract.prep_bank" :options="lookups.bank" :include-default="true" dvalue="code"
                             dtext="name"></v-combo-box>
            </v-input-wrapper>
            <div class="form-group">
                <label for="" class="col-md-3 text-right">Due Date:</label>
                <div class="col-md-4">
                    <v-combo-box :options="lookups.due_date" :include-default="true"
                                 v-model="contract.prep_due_date"></v-combo-box>
                </div>
                <label for="" class="col-md-3 text-right">Reference No:</label>
                <div class="col-md-2">
                    <input type="text" class="form-control" v-model="contract.prep_ref_no"/>
                </div>
            </div>
            <hr/>
        </template>
        <div class="form-group">
            <label for="" class="col-md-3 text-right">Rate Per Month:</label>
            <div class="col-md-4">
                <input type="number" class="form-control text-right" v-model="contract.rate_per_month"/>
            </div>
        </div>
        <div class="row">
            <label for="" class="col-md-3 text-right">Contract Value:</label>
            <div class="col-md-9">
                <div class='input-group'>
                    <input name="amount" type="text" class="form-control text-right" disabled="true"
                           placeholder="0.00" v-model='contract.amount'>
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="button" @click.prevent="calc('direct')">
                            <i class="fa fa-calculator"></i>
                        </button>
                    </div>
                </div>
                <error-span v-model="errors" name="amount"></error-span>
            </div>
        </div>
    </v-panel>
</template>

<script>


    import {mapGetters} from "vuex";

    export default {
        name: "ContractEntry",
        data() {
            return {
                rate_per_month: 0,
                configs: {
                   locale: 'ru'
                }
            }
        },
        methods: {
            calc(direct = false) {
                this.$store.dispatch('contracts/recalc', {isRate: true});
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
