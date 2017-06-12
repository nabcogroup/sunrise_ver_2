<template>
    <div class="x-panel">
        <div class="x-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-7">
                        <div class="x-lite-panel">   
                            <p class="x-read-group">
                                <strong class="col-md-3 x-label">Tenant Code:</strong>
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
                                <span class="col-md-9 x-desc">{{contract.tenant.tel_no}} 
                                <span v-if="contract.tenant.tel_no != ''">/</span> {{contract.tenant.mobile_no}}</span>
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
                        <div class="row">
                            <div class="col-md-12">
                                <div class="column-group">
                                    <label for="billSearch">Bill No:</label>
                                    <input type="text" class="input"  placeholder="XXX" name="billSearch" v-model="viewModel.options.billNo" />
                                    <button class="btn btn-info " @click="search"><i class="fa fa-fw " :class="viewModel.options.loadingSearch ? 'fa-refresh fa-spin' : 'fa-search'"></i></button>
                                    <button class="btn btn-info" @click="print" :disabled="viewModel.options.billNo.length === 0"><i class="fa fa-fw fa-print"></i> </button>
                                </div>
                                <search-bill :toggle="searchToggle" @select="onSelect"></search-bill>
                            </div>
                        </div>
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
                                    <span class="col-md-9 x-desc">{{contract.amount | toCurrencyFormat }}</span>
                                </p>
                                <p class="x-read-group">
                                    <strong class="col-md-3 x-label">Status:</strong>
                                    <span class="col-md-9 x-desc">{{contract.full_status}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-if="bill.id" class="col-md-12">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" >
                            <li :class="{active:tabIndex == 0}">
                                <a href="#" @click="changeTab(0, 'received')">For Clearing</a>
                            </li>
                            <li :class="{active:tabIndex == 1}">
                                <a href="#" @click="changeTab(1,'bounce')">Cancelled</a></li>
                            <li :class="{active:tabIndex == 2}">
                                <a href="#" @click="changeTab(2,'clear')">Completed</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active">
                                <div class="col-md-2 col-md-offset-10 is-margin-bottom">
                                    <button v-if="tabIndex == 0" class="btn btn-info btn-block" @click="onAddNewClick">Add New Cheque</button>
                                    <button v-if="tabIndex == 1" class="btn btn-warning btn-block" @click="onReplacementClick">Replacement</button>
                                </div>

                                <div class="col-md-12" id="main">
                                    <gridview
                                            :data="viewModel.data.filteredPayments"
                                            :grid="gridColumn"
                                            :lookups="viewModel.data.lookups">
                                        <label>{{footerAmount | toCurrencyFormat}}</label>
                                    </gridview>
                                </div>
                                <modal size="" modal-id="paymentEntry" dialog-title="Payment Entry" @dismiss="onDismissal" :unfold="unfoldModal">
                                    <payment-modal :state="viewModel" ></payment-modal>
                                </modal>
                                <modal size="" modal-id="replacement" dialog-title="Replacement" @dismiss="onReplacementDismissal" :unfold="unfoldReplacementModal">
                                    <replacement :state="viewModel" ></replacement>
                                </modal>
                                <hr/>
                                <div class="col-md-3 col-md-offset-9">
                                    <total-payment :payment="totalPayment"></total-payment>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 pull-right">
                            <button v-if="tabIndex == 0" class="btn btn-info btn-block" @click="save"><i class="fa fa-fw fa-lg" :class="viewModel.options.loadingSave ? 'fa-refresh fa-spin' : 'fa-save'"></i> Save</button>
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

    import TotalPayment from './TotalPayment.vue';
    import PaymentModal from './PaymentModal.vue';
    import ReplaceModal from './ReplaceModal.vue';
    import SearchBill from './SearchBill.vue';

    import {BillState,createGridColumn} from './BillModel';

    export default {
        components: {
            "gridview": GridView,
            'totalPayment': TotalPayment,
            "modal": Modal,
            "paymentModal": PaymentModal,
            "replacement": ReplaceModal,
            "searchBill": SearchBill
        },
        data() {
            let gridColumn = createGridColumn();

            gridColumn.footers =[
                {span: 8},
                {span: 1, label: 'Total', slot:true}];


            return {
                viewModel: new BillState(),
                searchToggle: false,
                gridColumn: gridColumn,
                unfoldModal: false,
                unfoldReplacementModal: false
            }

        },
        computed: {
            contract() {
                return this.viewModel.data.contract;
            },
            bill() {
                return this.viewModel.data.bill;
            },
            tabIndex() {
                return this.viewModel.options.currentTabIndex;
            },
            totalPayment() {
                return this.viewModel.data.bill.paymentSummary;
            },
            footerAmount() {
                return _.sumBy(this.viewModel.data.filteredPayments,(p) => { return parseInt(p.amount) });
            }
        },
        methods: {
            search() {
                if(this.viewModel.options.billNo.length == 0) {
                    this.searchToggle = true;
                }
                else {
                    this.viewModel.getBill();
                }
            },
            print() {
                this.viewModel.redirectToPrint(this.viewModel.options.billNo);
            },
            save() {
                window.bbox.confirm({
                    message: "Do you want to update payment?",
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
                        if(result) {
                            this.viewModel.update();
                        }
                    }
                });
            },
            changeTab(tabIndex,status) {
                this.viewModel.filterPayment(status,tabIndex);
                this.gridColumn = createGridColumn(tabIndex);
            },
            onDismissal(result) {
                if(result) {
                    this.viewModel.addNewCheque();
                    this.unfoldModal = false;
                }
                else {
                    this.unfoldModal = false;
                }
            },
            onReplacementDismissal(result) {
                if(result) {
                    this.viewModel.addNewCheque();
                    this.changeTab('received',0);
                }
                this.unfoldReplacementModal = false;
            },
            onAddNewClick() {
                 this.unfoldModal = true;
            },
            onReplacementClick() {
                const that = this;
                bbox.confirm({
                    title: "Confirmation",
                    message: "Do you want to replace new cheque?",
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
                    callback: function (result) {
                        if(!result) return; 
                        that.viewModel.mergeCheque();
                        that.unfoldReplacementModal = true;
                    }
                })
               
            },
            onSelect(billNo) {
                this.viewModel.options.billNo = billNo;
                this.viewModel.getBill();
                this.searchToggle = false;
            }
        }

    }
</script>

<style>
    .column-group {
        width:100%;
        padding:10px;
    }

    .column-group label {
        font-size: 1.8em;
        font-weight: 400;
    }

    .column-group .input {
        border: 0px;
        background: transparent;
        border-bottom: 2px solid #cecece;
        font-size: 1.8em;
        width:230px;
    }

</style>