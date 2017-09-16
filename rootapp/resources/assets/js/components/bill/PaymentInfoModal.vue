<template>
    <v-dialog modal-id="info" dialog-title="Payment Info" v-model="toggle" button-type="okOnly" size="lg">
        <div class="row">
            <div class="col-md-12">
                <div class="x-lite-panel">
                    <p class="x-read-group">
                        <strong class="col-md-2 x-label">Payment Status:</strong>
                        <strong class="col-md-4 x-desc text-danger">{{data.full_status}}</strong>
                    </p>
                </div>
                <div class="x-lite-panel">
                    <p class="x-read-group">
                        <strong class="col-md-2 x-label">Type:</strong>
                        <span class="col-md-4 x-desc">{{data.full_payment_type}}</span>
                        <strong class="col-md-2 x-label">Mode:</strong>
                        <span class="col-md-4 x-desc">{{data.full_payment_mode}}</span>
                    </p>

                    <p class="x-read-group">
                        <strong class="col-md-2 x-label">Due Date:</strong>
                        <span class="col-md-4 x-desc">{{data.effectivity_date | toDateFormat}}</span>
                        <strong class="col-md-2 x-label">Bank:</strong>
                        <span class="col-md-4 x-desc">{{data.full_bank}}</span>
                    </p>

                    <p class="x-read-group">
                        <strong class="col-md-2 x-label">P/C No:</strong>
                        <span class="col-md-4 x-desc">{{data.payment_no}}</span>
                        <strong class="col-md-2 x-label">Ref#:</strong>
                        <span class="col-md-4 x-desc">{{data.reference_no}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-md-2 x-label">Period:</strong>
                        <span class="col-md-4 x-desc">{{data.period_start | toDateFormat}} - {{data.period_end | toDateFormat}}</span>
                        <strong class="col-md-2 x-label">Amount:</strong>
                        <span class="col-md-4 x-desc">{{data.amount | toCurrencyFormat}}</span>
                    </p>
                    <hr/>
                    <div>Deposit Info</div>
                    <div class="row">
                        <div class="col-md-12">
                            <p class="x-read-group">
                                 <strong class="col-md-2 x-label">Date Deposited:</strong>
                                <span class="col-md-4 x-desc">{{data.date_deposited | toDateFormat}}</span>
                                <strong class="col-md-2 x-label">Account No:</strong>
                                <span class="col-md-4 x-desc">{{data.bank_account}}</span>
                            </p>
                            <p class="x-read-group">
                                <strong class="col-md-2 x-label">Remarks:</strong>
                                <span class="col-md-10 x-desc">{{data.remarks}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </v-dialog>
</template>

<script>

import { EventBus } from "../../eventbus";
import { toggleModal } from "../mixins";

export default {
    name: "paymentInfo",
    data() {
        return {
            data: {},
            itemIndex: 0
        }
    },
    mixins: [toggleModal],
    beforeMount() {
        EventBus.$on("payment.info.open", (item) => {
            this.data = item;
            this.openDialog();
        })
    }
}
</script>