<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="x-panel">
                    <div class="panel-heading">Create Bill</div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="x-lite-panel">
                                    <p class="row x-read-group">
                                        <strong class="col-md-3 x-label">Code:</strong>
                                        <span class="col-md-9 x-desc">{{contract.tenant.code}}</span>
                                    </p>
                                    <p class="row x-read-group">
                                        <strong class="col-md-3 x-label">Full Name:</strong>
                                        <span class="col-md-9 x-desc">{{contract.tenant.full_name}}</span>
                                    </p>
                                    <p class="row x-read-group">
                                        <strong class="col-md-3 x-label">Email Address:</strong>
                                        <span class="col-md-9 x-desc">{{contract.tenant.email_address}}</span>
                                    </p>
                                    <p class="row x-read-group">
                                        <strong class="col-md-3 x-label">Tel No: / Mobile No:</strong>
                                        <span class="col-md-9 x-desc">{{contract.tenant.tel_no}} / {{contract.tenant.mobile_no}}</span>
                                    </p>
                                </div>
                                <div class="x-lite-panel">
                                    <p class="row x-read-group">
                                        <strong class="col-md-3 x-label">Villa No:</strong>
                                        <span class="col-md-9 x-desc">{{contract.villa.villa_no}}</span>
                                    </p>
                                    <p class="row x-read-group">
                                        <strong class="col-md-3 x-label">Description:</strong>
                                        <span class="col-md-9 x-desc">{{contract.villa.description}}</span>
                                    </p>
                                    <p class="row x-read-group">
                                        <strong class="col-md-3 x-label">Rate/Month:</strong>
                                        <span class="col-md-9 x-desc">{{contract.villa.rate_per_month | toCurrencyFormat}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="x-panel">
                                    <div class="panel-body">
                                        <p class="row x-read-group">
                                            <strong class="col-md-3 x-label">Contract No:</strong>
                                            <span class="col-md-9 x-desc">{{contract.contract_no}}</span>
                                        </p>
                                        <p class="row x-read-group">
                                            <strong class="col-md-3 x-label">Type:</strong>
                                            <span class="col-md-9 x-desc">{{contract.full_contract_type}}</span>
                                        </p>
                                        <p class="row x-read-group">
                                            <strong class="col-md-3 x-label">Period:</strong>
                                            <span class="col-md-9 x-desc">{{contract.period_start | toDateFormat}} - {{contract.period_end | toDateFormat}}</span>
                                        </p>
                                        <p class="row x-read-group">
                                            <strong class="col-md-3 x-label">Amount:</strong>
                                            <span class="col-md-9 x-desc">{{contract.amount | toCurrencyFormat}}</span>
                                        </p>
                                        <p class="row x-read-group">
                                            <strong class="col-md-3 x-label">Status:</strong>
                                            <span class="col-md-9 x-desc">{{contract.full_status}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button class="btn btn-info" @click="showModal" style="margin-bottom: 10px;"><i
                                        class="fa fa-plus-circle"></i> Add New
                                </button>
                                <modal modal-id="payment" size="" dialog-title="Payment Entry" @dismiss="onDismissal"
                                       :unfold="unfoldModal">
                                    <payment-modal :state="bill"></payment-modal>
                                </modal>
                                <gridview :data="bill.data.bill.payments"
                                          :grid="gridColumn"
                                          :lookups="bill.data.lookups"
                                          @action="onDelete">
                                    <label>{{totalFooter | toCurrencyFormat}}</label>
                                </gridview>
                                <div class="col-md-4 pull-right">
                                    <total-payment :payment="totalPayment"></total-payment>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-md-2 pull-right">
                                <button class="btn btn-info btn-block" @click="print" v-if="billNo!=''">
                                    <i class="fa fa-print"></i> Print
                                </button>
                                <button class="btn btn-info btn-block" @click="save" v-if="billNo==''">
                                    <i class="fa " :class="viewIcon"></i> Save
                                </button>
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

    import PaymentModal from './PaymentModal.vue';
    import ContractInfo from './ContractInfo.vue';
    import TotalPayment from './TotalPayment.vue';

    import {BillState, createGridColumn} from './BillModel';

    export default {
        name: 'billForm',
        props: ['contractNo','redirectNo'],
        components: {
            "contractInfo": ContractInfo,
            "gridview": GridView,
            "modal": Modal,
            "paymentModal": PaymentModal,
            "totalPayment": TotalPayment
        },
        data() {
            const bill = new BillState();
            const gridColumn = createGridColumn(3);
            gridColumn.footers = [
                {span: 8},
                {span: 2, label: "Total Amount", slot: true}
            ];
            return {
                bill: bill,
                billNo:'',
                gridColumn: gridColumn,
                unfoldModal: false,
                isSaved: false
            }
        },
        mounted() {
            this.bill.createBill(this.contractNo);
            this.billNo = this.redirectNo;
            
        },
        computed: {
            contract() {
                return this.bill.data.contract;
            },
            lookups() {
                return this.bill.data.lookups;
            },
            totalPayment() {
                this.bill.totalAmount();
                return {
                    total_payment: this.bill.data.bill.paymentSummary.total_payment,
                    total_cost: this.bill.data.bill.paymentSummary.total_cost
                };
            },
            totalFooter() {
                return _.sumBy(this.bill.data.bill.payments, (p) => {
                    return Number.parseFloat(p.amount);
                });
            },
            viewIcon() {
                return this.bill.options.loadingSave ? "fa-refresh fa-spin" : "fa-save";
            }
        },
        methods: {
            showModal() {
                this.bill.createInstance();
                this.unfoldModal = true;
            },
            onDismissal(result) {
                if (result) {
                    this.bill.validate(r => {
                        if (r.isValid) {
                            this.bill.insertNew();
                            this.unfoldModal = false;
                        }
                        else {
                            toastr.error(r.message);
                        }
                    })
                }
                else {
                    this.unfoldModal = false;
                }

            },
            onDelete(a, id) {
                const that = this;
                bbox.confirm({
                    title: "Remove Payment",
                    message: "Are you sure want to remove item?",
                    callback(result)  {
                        if (result) {
                            that.bill.removePayment(id);
                        }
                    }
                });
            },
            save() {
                this.bill.save((billNo) => {
                    this.billNo = billNo;
                });
            },
            print() {
                this.bill.redirectToPrint(this.billNo);
            }


        }
    }
</script>
