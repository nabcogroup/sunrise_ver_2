<template>
    <v-dialog modal-id="replacement" dialog-title="Replacement Entry" v-model="unfoldModal">
        <div class="form-horizontal">
            <div class="form-group">
                <label for="payment_type" class="col-md-3">Payment Type</label>
                <div class="col-md-9">
                    <select id="payment_type" name="payment_type" v-model="cloneOfInstance.payment_type"
                            class="form-control">
                        <option v-for="lookup in lookups.payment_term" v-bind:value="lookup.code">{{lookup.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="effectivity_date" class="col-md-3">Date of Effectivity</label>
                <div class="col-md-9">
                    <dtpicker dp-name="effectivity_date" :value="cloneOfInstance.effectivity_date"
                              @pick="cloneOfInstance.effectivity_date = $event"></dtpicker>
                </div>
            </div>
            <div class="form-group">
                <label for="bank" class="col-md-3">Bank</label>
                <div class="col-md-9">
                    <select name="bank" v-model="cloneOfInstance.bank" class="form-control">
                        <option value="">--SELECT BANK--</option>
                        <option v-for="lookup in lookups.bank" :value="lookup.code" :key="lookup.code">{{lookup.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="payment_no" class="col-md-3">Payment No</label>
                <div class="col-md-9">
                    <input type="text"
                           :disabled="cloneOfInstance.isCash" class="form-control" name="payment_no"
                           v-model="cloneOfInstance.payment_no" required>
                </div>
            </div>
            <div class="form-group">
                <label for="reference_no" class="col-md-3">Reference No</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" name="reference_no" v-model="cloneOfInstance.reference_no">
                </div>
            </div>
            <div class="form-group">
                <label for="remarks" class="col-md-3">Remarks</label>
                <div class="col-md-9">
                    <textarea class="form-control" name="remarks" v-model="cloneOfInstance.remarks"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label for="amount" class="col-md-3">Amount</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" name="amount" v-model="cloneOfInstance.amount"
                           id="amount" required>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script>

    import ErrorLabel from '../ErrorLabel.vue';
    import DateTimePicker from '../DateTimePicker.vue';
    import {EventBus} from "../../eventbus";

    export default {

        props: ["cloneOfInstance","lookups"],

        components: {
            'error': ErrorLabel,
            'dtpicker': DateTimePicker
        },
        data() {
            return {
                unfoldModal: false
            }
        },
        mounted() {
            EventBus.$on("openReplaceModal",() => this.unfoldModal = true);
        }
    }
</script>