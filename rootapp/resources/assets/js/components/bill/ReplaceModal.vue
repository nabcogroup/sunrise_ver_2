<template>
     <div class="form-horizontal">
      <div class="form-group">
            <label for="payment_type" class="col-md-3">Payment Type</label>
            <div class="col-md-9">
                <select id="payment_type" name="payment_type" v-model="state.data.cloneOfInstance.payment_type"
                        class="form-control" @change="state.changePaymentType()">
                    <option v-for="lookup in state.data.lookups.payment_term" v-bind:value="lookup.code">{{lookup.name}}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="effectivity_date" class="col-md-3">Date of Effectivity</label>
            <div class="col-md-9">
                <dtpicker dp-name="effectivity_date"  :value="state.data.cloneOfInstance.effectivity_date" @pick="state.data.cloneOfInstance.effectivity_date = $event"></dtpicker>
            </div>
        </div>
        <div class="form-group">
            <label for="bank"  class="col-md-3">Bank</label>
            <div class="col-md-9">
                <input type="text" :disabled="state.data.cloneOfInstance.isCash" class="form-control" name="bank" v-model="state.data.cloneOfInstance.bank">
            </div>
        </div>
        <div class="form-group">
            <label for="payment_no" class="col-md-3">Payment No</label>
            <div class="col-md-9">
                <input type="text"
                       :disabled="state.data.cloneOfInstance.isCash" class="form-control" name="payment_no"
                       v-model="state.data.cloneOfInstance.payment_no" required>
            </div>
        </div>
        <div class="form-group">
            <label for="reference_no" class="col-md-3">Reference No</label>
            <div class="col-md-9">
                <input type="text" class="form-control" name="reference_no" v-model="state.data.cloneOfInstance.reference_no">
            </div>
        </div>
        <div class="form-group">
            <label for="remarks" class="col-md-3">Remarks</label>
            <div class="col-md-9">
                <textarea class="form-control" name="remarks" v-model="state.data.cloneOfInstance.remarks"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label for="amount" class="col-md-3">Amount</label>
            <div class="col-md-9">
                <input type="text" class="form-control" name="amount" v-model="state.data.cloneOfInstance.amount" id="amount" required>
            </div>
        </div>
    </div>
</template>

<script>
    
    import ErrorLabel from '../ErrorLabel.vue';
    import DateTimePicker from '../DateTimePicker.vue';

    export default {
        props: ['state'],
        components: {
            'error' : ErrorLabel,
            'dtpicker': DateTimePicker
        }
    }
</script>