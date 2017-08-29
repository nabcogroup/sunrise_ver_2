<template>
    <v-panel header="RENTAL CONTRACT ENTRY">

        <v-input-wrapper label-class="col-md-3 text-right" label="Contract Type" model-name="contract_type">
            <select class="form-control" v-model="contract.contract_type">
                <option v-for="(lookup, index) in lookups.contract_type"
                        :value="lookup.code" :key="index">{{lookup.name}}
                </option>
            </select>
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" label="Period Start" model-name="period_start" :required="true">
            <dt-picker dp-name="period_start" @pick="contract.period_start = $event"
                       :value="contract.period_start"></dt-picker>
            <error :errorDisplay="errors.get('period_start')">{{ errors.get('period_start')}}</error>
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" label="Period End" model-name="period_end" :required="true">
            <dt-picker dp-name="period_end" @pick="contract.period_end = $event"
                       :value="contract.period_end"></dt-picker>
            <error :errorDisplay="errors.get('period_end')">{{ errors.get('period_end') }}
            </error>
        </v-input-wrapper>

        <v-input-wrapper
                label-class="col-md-3 text-right"
                label="Amount"
                model-name="amount" :required="true">
            <div class='input-group'>
                <input name="amount" type="text" class="form-control" placeholder="AMOUNT *"
                       v-model='contract.amount'>
                <span class="input-group-btn">
                            <button class="btn btn-secondary" type="button" @click="calc()">
                            <i class="fa fa-calculator" aria-hidden="true"></i></button>
                </span>
            </div>
            <error :errorDisplay="errors.get('amount')">{{ errors.get('amount') }}</error>
        </v-input-wrapper>
    </v-panel>
</template>

<script>

    import ErrorLabel from '../ErrorLabel.vue';
    
    import {mapGetters} from "vuex";

    export default {
        name: "ContractEntry",
        components: {
            'error': ErrorLabel,
        },
        methods: {
            calc() {
                this.$store.dispatch('contracts/recalc')
            }
        },
        computed: mapGetters('contracts',{
            contract: 'contract',
            lookups: 'lookups',
            errors: 'stateContractError'
        })
    }


</script>
