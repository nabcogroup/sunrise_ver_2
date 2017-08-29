<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div>
                    <div>
                        <div class="row">
                            <div class="col-md-8">
                                <div class="row">
                                    <p>
                                        <strong class="col-md-2">Code:</strong>
                                        <span class="col-md-10">{{tenant.code}}</span>
                                    </p>
                                    <p>
                                        <strong class="col-md-2">Full Name:</strong>
                                        <span class="col-md-10">{{tenant.full_name}}</span>
                                    </p>
                                </div>
                                <hr/>
                                <div class="row">
                                    <p>
                                        <strong class="col-md-2">Villa No:</strong>
                                        <span class="col-md-10">{{villa.villa_no}}</span>
                                    </p>
                                    <p>
                                        <strong class="col-md-2">Description:</strong>
                                        <span class="col-md-10">{{villa.description}}</span>
                                    </p>
                                    <p>
                                        <strong class="col-md-2">Rate/Month:</strong>
                                        <span class="col-md-10">{{villa.rate_per_month}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h3 >Bill No: <span class="text-warning">{{bill.data.bill_no}}</span></h3>
                                <div class="panel panel-info">
                                    <div class="panel-body">
                                        <p class="row">
                                            <strong class="col-md-3">Contract No:</strong>
                                            <span class="col-md-9">{{contract.contract_no}}</span>
                                        </p>
                                        <p class="row">
                                            <strong class="col-md-3">Type:</strong>
                                            <span class="col-md-9">{{contract.full_contract_type}}</span>
                                        </p>
                                        <p class="row">
                                            <strong class="col-md-3">Period:</strong>
                                            <span class="col-md-9">{{contract.period_start}} - {{contract.period_end}}</span>
                                        </p>
                                        <p class="row">
                                            <strong class="col-md-3">Amount:</strong>
                                            <span class="col-md-9">{{contract.amount}}</span>
                                        </p>
                                        <p class="row">
                                            <strong class="col-md-3">Status:</strong>
                                            <span class="col-md-9">{{contract.full_status}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <grid-view :data="bill.data.payments"
                                          :columns="gridColumn">
                                </grid-view>
                                <div class="col-md-4 pull-right">
                                    <strong class="col-md-6">Payment Total:</strong> <strong class="col-md-3 text-right text-warning">{{totalPayment}}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


    import GridView from '../GridView.vue';
    import Modal from '../Modal.vue';

    let billModel = require('../../store/bill/BillModel.js');


    export default {
        props: {
            billNo:0
        },
        data() {
            return {
                bill: new billModel.default.createInstance(),
                gridColumn: [
                {name: 'effectivity_date', column: 'Date', style:'width:10%',class:'text-center', static: true},
                {name: 'payment_no', column: 'Payment No',static: true,style:'width:15%',class:'text-center'},
                {name: 'bank', column: 'Bank',static: true},
                {name: 'full_payment_mode', column: 'Payment Mode',static: true},
                {name: 'full_payment_type', column: 'Payment Type',static: true},
                {name: 'amount', column: 'Amount',static: true},
                {name: 'full_status', column: 'Status',static: true}]
            }
        },
        mounted() {
            this.bill.show(this.billNo);
        },
        computed: {
            tenant() {
                return this.bill.contract.tenant;
            },
            villa() {
                return this.bill.contract.villa;
            },
            contract() {
                return this.bill.contract;
            },
            totalPayment() {
                return this.bill.totalAmount();
            }
        }
    }

</script>