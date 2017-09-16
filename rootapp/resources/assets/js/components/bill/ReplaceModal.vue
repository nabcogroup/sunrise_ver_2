<template>
    <v-dialog modal-id="replacement" dialog-title="Replacement Entry" v-model="toggle" @dismiss="save" size="lg">
        <div class="x-lite-panel">
            <p class="x-read-group">
                <strong class="col-md-2 x-label">Payment No:</strong>
                <strong class="col-md-4 x-desc text-danger">{{item.payment_no}}</strong>
                <strong class="col-md-2 x-label">Date Due:</strong>
                <strong class="col-md-4 x-desc text-danger">{{item.effectivity_date | toDateFormat}}</strong>
            </p>
            <p class="x-read-group">
                <strong class="col-md-2 x-label">Period:</strong>
                <span class="col-md-4 x-desc text-danger">{{item.period_start | toDateFormat}} - {{item.period_end | toDateFormat}}</span>
                <strong class="col-md-2 x-label">Amount:</strong>
                <strong class="col-md-4 x-desc text-danger">{{item.amount | toCurrencyFormat}}</strong>
            </p>
        </div>
        <hr/>
        <div class="form-horizontal">
            <div class="form-group">
                <label for="payment_type" class="col-md-2">Payment Type</label>
                <div class="col-md-4">
                    <select id="payment_type" name="payment_type" v-model="cloneOfInstance.payment_type" class="form-control">
                        <option v-for="lookup in lookups.payment_term" v-bind:value="lookup.code">{{lookup.name}}</option>
                    </select>
                </div>
                <label for="bank" class="col-md-2">Bank</label>
                <div class="col-md-4">
                    <select name="bank" v-model="cloneOfInstance.bank" class="form-control">
                        <option value="">--SELECT BANK--</option>
                        <option v-for="lookup in lookups.bank" :value="lookup.code" :key="lookup.code">{{lookup.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="payment_no" class="col-md-2">Payment No:</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" name="payment_no" v-model="cloneOfInstance.payment_no" required>
                </div>
                <label for="reference_no" class="col-md-2">Ref# No:</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" name="reference_no" v-model="cloneOfInstance.reference_no">
                </div>
            </div>
            <div class="form-group">
                <label for="amount" class="col-md-2">Amount:</label>
                <div class="col-md-10">
                    <input type="text" class="form-control" name="amount" v-model="cloneOfInstance.amount" id="amount" required>
                </div>
            </div>
            <div class="form-group">
                <label for="remarks" class="col-md-2">Remarks:</label>
                <div class="col-md-10">
                    <textarea class="form-control" name="remarks" v-model="cloneOfInstance.remarks"></textarea>
                </div>
            </div>
            
        </div>
    </v-dialog>
</template>

<script>

import DateTimePicker from '../DateTimePicker.vue';
import { EventBus } from "../../eventbus";
import { toggleModal } from "../mixins";

export default {
    components: {
        'dtpicker': DateTimePicker
    },

    mixins: [toggleModal],

    data() {
        return {
            item: {}
        }
    },
    mounted() {
        EventBus.$on("payment.replace.open", (item) => {
            this.item = item;
            //clone must be new
            this.$store.commit("payments/edit",{payment:item});
            this.openDialog()

            /************************************************/
            //watch payment type
            /***********************************************/
            this.$store.watch(state => state["payments"].cloneOfInstance.payment_type, (value) => {
                this.$store.commit('payments/convertPayment', { source: 'payment_term', needle: 'payment_type', target: 'full_payment_type' })
                if (value.toLowerCase() === "cash")
                    this.$store.state["payments"].cloneOfInstance.payment_no = "Cash";
                else
                    this.$store.state["payments"].cloneOfInstance.payment_no = '';
            });

            this.$store.watch(state => state["payments"].cloneOfInstance.payment_mode,
                (value) => this.$store.commit('payments/convertPayment', { source: 'payment_mode', needle: 'payment_mode', target: 'full_payment_mode' }))
            this.$store.watch(state => state["payments"].cloneOfInstance.bank,
                (value) => this.$store.commit('payments/convertPayment', { source: 'bank', needle: 'bank', target: 'full_bank' }))
            //*******************************************************************/

        });

        EventBus.$on("payment.replace.close", () => this.closeDialog());
    },
    methods: {
        save() {
            
            this.$store.commit("payments/replace", {
                item: this.item,
                cb: (res) => {
                    if (res) {
                        this.closeDialog();
                    }
                }
            })
        }
    },
    computed: {
        lookups() {
            return this.$store.getters["payments/lookups"] || [];
        },
        cloneOfInstance() {
            return this.$store.getters["payments/cloneOfInstance"] || {};
        },
    }
}
</script>