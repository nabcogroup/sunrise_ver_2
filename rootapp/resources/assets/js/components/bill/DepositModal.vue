<template>
    <v-dialog modal-id="depositModal" dialog-title="Payment Deposit" v-model="toggle" @dismiss="save">
        <div class="x-lite-panel">
            <p class="x-read-group">
                <strong class="col-md-3 x-label">Payment No:</strong>
                <strong class="col-md-9 x-desc text-danger">{{cloneOfInstance.payment_no}}</strong>
            </p>
            <p class="x-read-group">
                <strong class="col-md-3 x-label">Due Date:</strong>
                <span class="col-md-9 x-desc">{{cloneOfInstance.effectivity_date | toDateFormat}}</span>
            </p>
            <p class="x-read-group">
                <strong class="col-md-3 x-label">Amount:</strong>
                <strong class="col-md-9 x-desc text-danger">{{cloneOfInstance.amount | toCurrencyFormat}}</strong>
            </p>
            <p class="x-read-group">
                <strong class="col-md-3 x-label">Period:</strong>
                <span class="col-md-9 x-desc">{{cloneOfInstance.period_start | toDateFormat}} - {{cloneOfInstance.period_end | toDateFormat}}</span>
            </p>
        </div>
        <hr/>
        <div class="form-horizontal">
            <div class="form-group">
                <label for="payment_type" class="col-md-3">Accounts:</label>
                <div class="col-md-9">
                    <select id="bank_accounts" name="bank_accounts" v-model="cloneOfInstance.bank_account" class="form-control">
                        <option value="">--Select Account--</option>
                        <option v-for="lookup in lookups.bank_accounts" :value="lookup.account_no" :key="lookup.account_no">{{lookup.account_no}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-md-3">Bank:</label>
                <div class="col-md-9">
                    <input type="text" disabled :value="bankDeposited" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-md-3">Date Deposit:</label>
                <div class="col-md-9">
                    <dt-picker dp-name="date_deposited" :value="cloneOfInstance.date_deposited" @pick="cloneOfInstance.date_deposited = $event"></dt-picker>
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-md-3">Remarks:</label>
                <div class="col-md-9">
                    <textarea v-model="cloneOfInstance.remarks" class="form-control"></textarea>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script>

import { toggleModal } from '../mixins';
import { EventBus } from "../../eventbus";
import { mapGetters } from "vuex";

export default {
    name: "depositModal",
    mixins: [toggleModal],
    data() {
        return {
            data: {}
        }
    },
    beforeMount() {
        EventBus.$on("payment.deposit.open", (item) => {
            this.$store.commit("payments/edit",{
                payment:item
            });

            if(this.cloneOfInstance.date_deposited == "0000-00-00") {
                this.cloneOfInstance.date_deposited = moment().format('L');
            }
            
            this.openDialog();
        });
    },
    computed: {
        lookups() {
            return this.$store.getters["payments/lookups"] || [];
        },
        cloneOfInstance() {
            return this.$store.getters["payments/cloneOfInstance"] || {};
        },
        bankDeposited() {
            return this.$store.getters["payments/bankDeposited"] || "";
        }
    },
    methods: {
        save() {
            
            this.cloneOfInstance.status = "clear";
            this.cloneOfInstance.full_status = "Clear";
            this.$store.commit("payments/store",{
                trigger: "edit",
                cb: (res) => {
                    if(res) this.closeDialog();
                }
            });
        },
    }
}
</script>
