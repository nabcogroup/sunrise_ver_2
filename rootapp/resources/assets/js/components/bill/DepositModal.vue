<template>
    <v-dialog modal-id="depositModal" dialog-title="Payment Deposit" v-model="toggle" @dismiss="save">
        <div class="x-lite-panel">
            <p class="x-read-group">
                <strong class="col-md-3 x-label">Payment No:</strong>
                <strong class="col-md-9 x-desc text-danger">{{cloneInstance.payment_no}}</strong>
            </p>
            <p class="x-read-group">
                <strong class="col-md-3 x-label">Due Date:</strong>
                <span class="col-md-9 x-desc">{{cloneInstance.effectivity_date | toDateFormat}}</span>
            </p>
            <p class="x-read-group">
                <strong class="col-md-3 x-label">Amount:</strong>
                <strong class="col-md-9 x-desc text-danger">{{cloneInstance.amount | toCurrencyFormat}}</strong>
            </p>
            <p class="x-read-group">
                <strong class="col-md-3 x-label">Period:</strong>
                <span class="col-md-9 x-desc">{{cloneInstance.period_start | toDateFormat}} - {{cloneInstance.period_end | toDateFormat}}</span>
            </p>
        </div>
        <hr/>
        <div class="form-horizontal">
            <div class="form-group">
                <label for="payment_type" class="col-md-3">Accounts:</label>
                <div class="col-md-9">
                    <select id="bank_accounts" name="bank_accounts" v-model="cloneInstance.bank_account" class="form-control">
                        <option value="">--Select Account--</option>
                        <option v-for="lookup in lookups.bank_accounts" :value="lookup.account_no" :key="lookup.account_no">{{lookup.account_no}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-md-3">Bank:</label>
                <div class="col-md-9">
                    <input type="text" disabled :value="bankName" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-md-3">Date Deposit:</label>
                <div class="col-md-9">
                    <dt-picker dp-name="date_deposited" :value="cloneInstance.date_deposited" @pick="cloneInstance.date_deposited = $event"></dt-picker>
                </div>
            </div>
            <div class="form-group">
                <label for="" class="col-md-3">Remarks:</label>
                <div class="col-md-9">
                    <textarea v-model="cloneInstance.remarks" class="form-control"></textarea>
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
    props: ["namespace"],
    mixins: [toggleModal],
    data() {
        return {
            data: {}
        }
    },
    beforeMount() {
        EventBus.$on("payment.deposit.open", (item) => {
            this.$store.commit(this.namespace+"/edit",{payment:item});
            this.openDialog();
        });
    },
    computed: {
        lookups() {
            return this.$store.getters[this.namespace + "/lookups"] || [];
        },
        cloneInstance() {
            return this.$store.getters[this.namespace + "/cloneOfInstance"] || {};
        },
        bankName() {
            const bank = _.find(this.lookups.bank_accounts, (item) => {
                return item.account_no === this.cloneInstance.bank_account;
            });
            return bank !== undefined ? bank.bank_name : '';
        }
    },
    methods: {
        save() {
            this.$store.commit(this.namespace + "/store",{
                trigger: "edit",
                cb: (res) => {
                    if(res) this.closeDialog();
                }
            });
        },
    }
}
</script>
