<template>
    <div class="x-panel is-margin-bottom">
        <div class="panel-heading">
            RENTAL ENTRY
        </div>
        <div class="panel-body">
            <div class='form-group'>
                <label for='tenant_type' class='col-md-3 text-right'>Contract Type:</label>
                <div class='col-md-9'>
                    <select class="form-control" v-model="contract.contract_type">
                        <option v-for="lookup in lookups.contract_type"
                                :value="lookup.code">{{lookup.name}}
                        </option>
                    </select>
                </div>
            </div>

            <div class='form-group'>
                <label for='tenant_type' class='col-md-3 text-right'>Period Start: <span class="text-right">*</span> </label>
                <div class='col-md-9'>
                    <dtpicker dp-name="period_start" @pick="contract.period_start = $event"
                              :value="contract.period_start"></dtpicker>
                    <error :errorDisplay="errors.get('period_start')">{{ errors.get('period_start')}}
                    </error>
                </div>
            </div>


            <div class='form-group'>
                <label for='tenant_type' class='col-md-3 text-right'>Periord End: <span class="text-right">*</span></label>
                <div class='col-md-9'>
                    <dtpicker dp-name="period_end" @pick="contract.period_end = $event"
                              :value="contract.period_end"></dtpicker>
                    <error :errorDisplay="errors.get('period_end')">{{ errors.get('period_end') }}
                    </error>
                </div>
            </div>

            <div class='form-group'>
                <label for='tenant_type' class='col-md-3 text-right'>Amount: <span class="text-right">*</span></label>
                <div class='col-md-9'>
                    <div class='input-group'>
                        <input name="amount" type="text" class="form-control" placeholder="AMOUNT *"
                               v-model='contract.amount'>
                        <span class="input-group-btn">
                            <button class="btn btn-secondary" type="button" @click="calc()">
                            <i class="fa fa-calculator" aria-hidden="true"></i></button>
                        </span>
                    </div>
                    <error :errorDisplay="errors.get('amount')">{{ errors.get('amount') }}</error>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import ErrorLabel from '../ErrorLabel.vue';
    import DateTimePicker from '../DateTimePicker.vue';

    export default {
        name: "ContractEntry",
        props: ["viewModel"],
        components: {
            'error': ErrorLabel,
            'dtpicker': DateTimePicker
        },
        methods: {
            calc() {
                this.viewModel.recal()
            }
        },
        computed: {
            contract() {
                return this.viewModel.data;
            },
            lookups() {
                return this.viewModel.lookups;
            },
            errors() {
                return this.viewModel.errors;
            }
        }

    }


</script>
