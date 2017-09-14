<template>
    <v-dialog modal-id="payment" dialog-title="Payment Modal" v-model="toggle" @dismiss="onModalDismiss">
        <div class="form-horizontal">
            <div class="form-group">
                <label for="payment_type" class="col-md-3">Payment Type</label>
                <div class="col-md-9">
                    <select id="payment_type" name="payment_type" v-model="cloneOfInstance.payment_type" class="form-control">
                        <option v-for="lookup in lookups.payment_term" :value="lookup.code" :key="lookup.code">{{lookup.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="payment_type" class="col-md-3">Payment Mode</label>
                <div class="col-md-9">
                    <select id="payment_mode" name="payment_mode" v-model="cloneOfInstance.payment_mode" class="form-control">
                        <option v-for="lookup in lookups.payment_mode" :value="lookup.code" :key="lookup.code">{{lookup.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="effectivity_date" class="col-md-3">Date of Cheque</label>
                <div class="col-md-9">
                    <dt-picker dp-name="effectivity_date" :value="cloneOfInstance.effectivity_date" @pick="cloneOfInstance.effectivity_date = $event"></dt-picker>
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
                    <input type="text" class="form-control" name="payment_no" v-model="cloneOfInstance.payment_no" required>
                </div>
            </div>
            <div class="form-group">
                <label for="bank" class="col-md-3">Reference No</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" name="reference_no" v-model="cloneOfInstance.reference_no" required>
                </div>
            </div>
            <div class="form-group">
                <label for="period_start" class="col-md-3">Period Start</label>
                <div class="col-md-9">
                    <dt-picker dp-name="period_start" :value="cloneOfInstance.period_start" @pick="cloneOfInstance.period_start = $event"></dt-picker>
                </div>
            </div>
            <div class="form-group">
                <label for="period_end" class="col-md-3">Period End</label>
                <div class="col-md-9">
                    <dt-picker dp-name="period_end" :value="cloneOfInstance.period_end" @pick="cloneOfInstance.period_end = $event"></dt-picker>
                </div>
            </div>
            <div class="form-group">
                <label for="amount" class="col-md-3">Amount</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" name="amount" v-model="cloneOfInstance.amount" id="amount" required>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script>

import ErrorLabel from '../ErrorLabel.vue';
import { toggleModal } from '../mixins';
import { mapGetters, mapActions } from "vuex";
import {EventBus} from "../../eventbus";

export default {
    props: ["namespace"],
    components: {
        'error': ErrorLabel,
    },
    mixins: [toggleModal],
    data() {
        return {
            action:""
        }
    },
    beforeMount() {
        EventBus.$on("payment.register.open", (action,payment) => {
            this.action = action;
            this.$store.commit(this.namespace + "/" + action,{payment: payment});
            this.openDialog();

        /************************************************/
        //watch payment type
        /***********************************************/
        this.$store.watch(state => state[this.namespace].cloneOfInstance.payment_type, (value) => {
            this.$store.commit(this.namespace+'/convertPayment', { source: 'payment_term', needle: 'payment_type', target: 'full_payment_type' })
            if (value.toLowerCase() === "cash")
                this.$store.state[this.namespace].cloneOfInstance.payment_no = "Cash";
            else
                this.$store.state[this.namespace].cloneOfInstance.payment_no = '';
        });
        
        this.$store.watch(state => state[this.namespace].cloneOfInstance.payment_mode,
            (value) => this.$store.commit(this.namespace+'/convertPayment', { source: 'payment_mode', needle: 'payment_mode', target: 'full_payment_mode' }))
        this.$store.watch(state => state[this.namespace].cloneOfInstance.bank,
            (value) => this.$store.commit(this.namespace+'/convertPayment', { source: 'bank', needle: 'bank', target: 'full_bank' }))
        //*******************************************************************/

        });
    },
    methods: {
        onModalDismiss() {
            this.$store.commit(this.namespace+"/store",
            {
                trigger: this.action,
                cb:(res)=> {
                    if(res) this.closeDialog();  
                }
            });
        }
    },
    computed: {
        cloneOfInstance() {
            return this.$store.getters[this.namespace + "/cloneOfInstance"] || {};
        },
        lookups() {
            return this.$store.getters[this.namespace + "/lookups"] || [];
        }
    },
    watch: {
        toggle(nv) {
            if(nv) {
                EventBus.$emit("payment.register.opening");
            }
            else {
                EventBus.$emit("payment.register.closing");
            }
        }
    }
}
</script>


