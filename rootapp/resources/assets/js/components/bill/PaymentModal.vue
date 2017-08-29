<template>
    <div class="form-horizontal">
        <div class="form-group">
            <label for="payment_type" class="col-md-3">Payment Type</label>
            <div class="col-md-9">
                <select id="payment_type" name="payment_type" v-model="cloneOfInstance.payment_type"
                        class="form-control" @change="changePaymentType()">
                    <option v-for="lookup in lookups.payment_term" v-bind:value="lookup.code">{{lookup.name}}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="payment_type" class="col-md-3">Payment Mode</label>
            <div class="col-md-9">
                <select id="payment_mode" name="payment_mode" v-model="cloneOfInstance.payment_mode"
                        class="form-control">
                    <option v-for="lookup in lookups.payment_mode" v-bind:value="lookup.code">{{lookup.name}}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="effectivity_date" class="col-md-3">Date of Cheque</label>
            <div class="col-md-9">
                <dt-picker dp-name="effectivity_date"
                          :value="cloneOfInstance.effectivity_date"
                          @pick="cloneOfInstance.effectivity_date = $event"></dt-picker>
            </div>
        </div>
        <div class="form-group">
            <label for="bank"  class="col-md-3">Bank</label>
            <div class="col-md-9">
                 <select name="bank" v-model="cloneOfInstance.bank" class="form-control">
                    <option value="">--SELECT BANK--</option> 
                    <option v-for="lookup in lookups.bank" :value="lookup.code">{{lookup.name}}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="payment_no" class="col-md-3">Payment No</label>
            <div class="col-md-9">
                <input type="text"
                       class="form-control" name="payment_no"
                       v-model="cloneOfInstance.payment_no" required>
            </div>
        </div>
        <div class="form-group">
            <label for="bank"  class="col-md-3">Reference No</label>
            <div class="col-md-9">
                 <input type="text"
                       class="form-control" name="reference_no"
                       v-model="cloneOfInstance.reference_no" required>
            </div>
        </div>
        <div class="form-group">
            <label for="period_start" class="col-md-3">Period Start</label>
            <div class="col-md-9">
                <dt-picker dp-name="period_start"
                          :value="cloneOfInstance.period_start"
                          @pick="cloneOfInstance.period_start = $event"></dt-picker>
            </div>
        </div>
        <div class="form-group">
            <label for="period_end" class="col-md-3">Period End</label>
            <div class="col-md-9">
                <dt-picker dp-name="period_end"
                          :value="cloneOfInstance.period_end"
                          @pick="cloneOfInstance.period_end = $event"></dt-picker>
            </div>
        </div>
        <div class="form-group">
            <label for="amount" class="col-md-3">Amount</label>
            <div class="col-md-9">
                <input type="text" class="form-control" name="amount" v-model="cloneOfInstance.amount" id="amount" required>
            </div>
        </div>
    </div>
</template>

<script>

    import ErrorLabel from '../ErrorLabel.vue';

    export default {
        props: ["cloneOfInstance","lookups"],

        components:  {
            'error' : ErrorLabel,
        },
        methods: {
            changePaymentType() {

            }
        }
    }
</script>


