<template>
    <v-panel header="Bill Entry">
        <div class="row">
            <div class="col-md-7">
                <div class="x-lite-panel">
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Code:</strong>
                        <span class="col-md-9 x-desc">{{contract.tenant.code}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Full Name:</strong>
                        <span class="col-md-9 x-desc">{{contract.tenant.full_name}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Email Address:</strong>
                        <span class="col-md-9 x-desc">{{contract.tenant.email_address}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Tel No: / Mobile No:</strong>
                        <span class="col-md-9 x-desc">{{contract.tenant.tel_no}} / {{contract.tenant.mobile_no}}</span>
                    </p>
                </div>
                <div class="x-lite-panel">
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Villa No:</strong>
                        <span class="col-md-9 x-desc">{{contract.villa.villa_no}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Description:</strong>
                        <span class="col-md-9 x-desc">{{contract.villa.description}}</span>
                    </p>
                    <p class="x-read-group">
                        <strong class="col-md-3 x-label">Rate/Month:</strong>
                        <span class="col-md-9 x-desc">{{contract.villa.rate_per_month | toCurrencyFormat}}</span>
                    </p>
                </div>
            </div>
            <div class="col-md-5">
                <div class="x-panel">
                    <div class="panel-body">
                        <p class="x-read-group">
                            <strong class="col-md-3 x-label">Contract No:</strong>
                            <span class="col-md-9 x-desc">{{contract.contract_no}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-3 x-label">Type:</strong>
                            <span class="col-md-9 x-desc">{{contract.full_contract_type}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-3 x-label">Period:</strong>
                            <span class="col-md-9 x-desc">{{contract.period_start | toDateFormat}} - {{contract.period_end | toDateFormat}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-3 x-label">Amount:</strong>
                            <span class="col-md-9 x-desc">{{contract.amount | toCurrencyFormat}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-3 x-label">Status:</strong>
                            <span class="col-md-9 x-desc">{{contract.full_status}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-info" @click="addPayment" style="margin-bottom: 10px;" v-if="bill.bill_no === ''">
                    <i class="fa fa-plus-circle"></i> Add
                </button>

                <button v-if="payments.length > 0" class="btn btn-danger" @click="clearPayment" style="margin-bottom: 10px;">
                    <i class="fa fa-trash-o"></i> Clear Payment
                </button>

                <v-dialog modal-id="payment" size="" dialog-title="Payment Entry" @dismiss="onDismissal" v-model="unfoldModal">
                    <payment-modal :cloneOfInstance="cloneOfInstance" :lookups="lookups"></payment-modal>
                </v-dialog>

                <grid-view :data="payments" :grid="gridColumn" :lookups="lookups" @action="onAction">
                    <label>{{totalPayment.total_payment | toCurrencyFormat}}</label>
                </grid-view>

                <div class="col-md-4 pull-right">
                    <total-payment :payment="totalPayment"></total-payment>
                </div>
            </div>
        </div>
        
        <template slot="panel-footer">
            <div class="row">
                <div class="col-md-2 pull-right">
                    <button class="btn btn-info btn-block" @click="save" v-if="bill.bill_no===''" :disabled="option.loadingSave">
                        <i class="fa " :class="viewIcon"></i> Create
                    </button>
                    <button class="btn btn-info btn-block" @click="print" v-else>
                        <i class="fa fa-print"></i> Print
                    </button>
                </div>
            </div>
        </template>

    </v-panel>
</template>

<script>

import PaymentModal from './PaymentModal.vue';
import ContractInfo from './ContractInfo.vue';
import TotalPayment from './TotalPayment.vue';

import { mapGetters, mapMutations } from "vuex";

const confirmation = {
    removePayment: (cb) => {
        bbox.confirm({
            title: "Remove Payment",
            message: "Are you sure want to remove item?",
            callback: (result) => {
                cb(result)
            }
        })
    },
    prepareCheque: (cb) => {
        bbox.confirm({
            title: "Cheque Preparation",
            message: "Do you want to instantly prepare 12 cheques?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: (result) => {
                cb(result);
            }
        })
    },
    clearPayment: (cb) => {
        bbox.confirm({
            title: "Clear payments",
            message: "Do you want to all clear payments?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: (result) => {
                cb(result);
            }
        })
    }
}

const createGridColumn = (value) => {
    function columnFactory(value) {
        let grid = {};
        switch (value) {
            case 0:
                grid.columns = [
                    { name: 'effectivity_date', column: 'Date', style: 'width:10%', class: 'text-center', dtype: 'date' },
                    { name: 'payment_no', column: 'Payment No', style: 'width:10%', class: 'text-center' },
                    { name: 'reference_no', column: 'Reference No', style: "width:10%", class: "text-center" },
                    { name: 'full_bank', column: 'Bank' },
                    { name: 'full_payment_mode', column: 'Payment Mode', class: 'text-center' },
                    { name: 'full_payment_type', column: 'Payment Type', class: 'text-center' },
                    { name: 'period', column: 'Period', class: 'text-center',dtype:'period',from:'period_start',to:'period_end'},
                    { name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right', dtype: 'currency' },
                    { name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center' },
                    { name: '$action', column: '', static: true }
                ];

                grid.actions = [
                    { key: 'edit', name: 'Edit' },
                    { key: 'remove', name: 'Remove' },
                ];
                break;
            default:
                grid.columns = [
                    { name: 'effectivity_date', column: 'Date', style: 'width:10%', class: 'text-center', dtype: 'date'},
                    { name: 'payment_no', column: 'Payment No', style: 'width:10%', class: 'text-center' },
                    { name: 'reference_no', column: 'Reference No', style: "width:10%", class: "text-center" },
                    { name: 'full_bank', column: 'Bank' },
                    { name: 'full_payment_mode', column: 'Payment Mode', class: 'text-center' },
                    { name: 'full_payment_type', column: 'Payment Type', class: 'text-center' },
                    { name: 'period_start|period_end', column: 'Period', class: 'text-center', dtype: 'date' },
                    { name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right' },
                    { name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center' },
                ];
                break;
        }

        grid.footers = [
            { span: 9 },
            { span: 3, label: "Total Amount", slot: true }
        ];
        grid.selected = -1;

        return grid
    }

    return columnFactory(value);
}

export default {
    name: 'billForm',
    props: ['instanceContract', 'instance', 'instanceLookups'],
    components: {
        "contractInfo": ContractInfo,
        "paymentModal": PaymentModal,
        "totalPayment": TotalPayment
    },
    data() {

        let colType = 0;
        
        if (this.instance.bill_no !== '') {
            colType = 1;
        }
        
        const gridColumn = createGridColumn(colType);
       
        return {
            gridColumn: gridColumn,
            unfoldModal: false,
            unfoldChequeModal: false,
            isSaved: false
        }
    },
    mounted() {
        
        this.$store.dispatch('bills/create', {
            bill: this.instance,
            contract: this.instanceContract,
            lookups: this.instanceLookups
        });

        /************************************************/
        //watch payment type
        /***********************************************/
        this.$store.watch(state => state.bills.cloneOfInstance.payment_type, (value) => {
            this.$store.commit('bills/convertPayment', { source: 'payment_term', needle: 'payment_type', target: 'full_payment_type' })
            if (value.toLowerCase() === "cash")
                this.$store.state.bills.cloneOfInstance.payment_no = "Cash";
            else
                this.$store.state.bills.cloneOfInstance.payment_no = '';
        });
        
        this.$store.watch(state => state.bills.cloneOfInstance.payment_mode,
            (value) => this.$store.commit('bills/convertPayment', { source: 'payment_mode', needle: 'payment_mode', target: 'full_payment_mode' }))
        this.$store.watch(state => state.bills.cloneOfInstance.bank,
            (value) => this.$store.commit('bills/convertPayment', { source: 'bank', needle: 'bank', target: 'full_bank' }))
        //*******************************************************************/
    },
    computed: {
        ...mapGetters('bills', {
            contract: 'contract',
            lookups: 'lookups',
            bill: 'bill',
            totalPayment: 'totalPayment',
            viewIcon: 'viewIcon',
            payments: 'payments',
            option: 'option',
            cloneOfInstance: 'cloneOfInstance'
        })
    },
    methods: {
        clearPayment() {
            confirmation.clearPayment(result => {
                if (result) this.$store.commit('bills/clearPayment');
                this.gridColumn.selected = -1;
            });
        },
        addPayment() {
            this.gridColumn.selected = -1;
            this.unfoldModal = true;
        },
        onDismissal(result) {
            if (this.gridColumn.selected < 0) {
                this.$store.commit('bills/insert',(suc) => this.unfoldModal = !suc);
            }
            else {
                this.$store.commit('bills/update',(suc) => this.unfoldModal = !suc);
            }
        },
        onPrepareDismiss() {
            this.$store.dispatch('bills/prepare');
        },
        onAction(a, item, index) {
            const that = this;
            if (a === 'remove') {
                confirmation.removePayment((result) => {
                    if (result) {
                        that.$store.commit('bills/removePayment', id)
                    }
                })
            }
            else 
            {
                this.gridColumn.selected = index;
                this.$store.commit('bills/edit', { payment: item });
                this.unfoldModal = true;
            }
        },
        save() {
            this.$store.dispatch('bills/save');
        },
        print() {
            this.$store.commit('bills/redirectToPrint');
        }
    },
    watch: {
        unfoldModal(nv) {
            if (nv && this.gridColumn.selected < 0) {
                this.$store.commit('bills/createInstance');
            }
        }
    }
}
</script>
