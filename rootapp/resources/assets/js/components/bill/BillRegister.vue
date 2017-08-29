<template>
    <div class="row">
        <div class="col-md-12">
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
                    <button class="btn btn-info" @click="showModal" style="margin-bottom: 10px;"
                            v-if="bill.bill_no === ''">
                        <i class="fa fa-plus-circle"></i> New Payment
                    </button>
                    <v-dialog modal-id="payment" size="" dialog-title="Payment Entry" @dismiss="onDismissal"
                              v-model="unfoldModal">
                        <payment-modal :cloneOfInstance="cloneOfInstance" :lookups="lookups"></payment-modal>
                    </v-dialog>
                    
                    <v-dialog modal-id="prepare" size=""
                              dialog-title="Prepare Cheque"
                              @dismiss="onPrepareDismiss"
                              v-model="unfoldChequeModal">

                        <div class="form-horizontal">
                            <v-input-wrapper label="Date Of Cheque">
                                <dt-picker dp-name="effectivity_date"
                                           :value="cloneOfInstance.effectivity_date"
                                           @pick="cloneOfInstance.effectivity_date = $event"></dt-picker>
                            </v-input-wrapper>
                            <v-input-wrapper label="Payment No">
                                <input type="text"
                                       class="form-control" name="payment_no"
                                       v-model="cloneOfInstance.payment_no" required>
                            </v-input-wrapper>
                            <v-input-wrapper label="Default Bank">
                                <select name="bank" v-model="cloneOfInstance.bank" class="form-control">
                                    <option value="">--SELECT BANK--</option>
                                    <option v-for="lookup in lookups.bank" :value="lookup.code">{{lookup.name}}</option>
                                </select>
                            </v-input-wrapper>
                            <v-input-wrapper label="Reference No">
                                <input type="text"
                                       class="form-control" name="reference_no"
                                       v-model="cloneOfInstance.reference_no" required>
                            </v-input-wrapper>
                            <v-input-wrapper label="Period From">
                                <dt-picker dp-name="effectivity_date"
                                           :value="cloneOfInstance.period_start"
                                           @pick="cloneOfInstance.period_start = $event"></dt-picker>
                            </v-input-wrapper>
                            <v-input-wrapper label="Period To">
                                <dt-picker dp-name="effectivity_date"
                                           :value="cloneOfInstance.period_end"
                                           @pick="cloneOfInstance.period_end = $event"></dt-picker>
                            </v-input-wrapper>
                        </div>
                    </v-dialog>

                    <grid-view
                            :data="payments"
                            :grid="gridColumn"
                            :lookups="lookups"
                            @action="onDelete">

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
                        <button class="btn btn-info btn-block" @click="save" v-if="bill.bill_no===''"
                                :disabled="option.loadingSave">
                            <i class="fa " :class="viewIcon"></i> Create
                        </button>
                        <button class="btn btn-info btn-block" @click="print" v-else>
                            <i class="fa fa-print"></i> Print
                        </button>
                    </div>
                </div>
            </template>
        </v-panel>
        </div>
    </div>
</template>

<script>

    import PaymentModal from './PaymentModal.vue';
    import ContractInfo from './ContractInfo.vue';
    import TotalPayment from './TotalPayment.vue';
    import {mapGetters} from "vuex";
    

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
                        {
                            name: 'selectorIndex',
                            itype: 'selector',
                            column: '',
                            bind: 'paymentIndex',
                            editable: true
                        },
                        {
                            name: 'effectivity_date',
                            column: 'Date',
                            style: 'width:10%',
                            class: 'text-center',
                            dtype: 'date'
                        },
                        {
                            name: 'payment_no',
                            column: 'Payment No',
                            style: 'width:10%',
                            class: 'text-center',
                            editable: true,
                            bind: 'payment_no',
                            itype: 'text'
                        },
                        {
                            name: 'reference_no',
                            column: 'Reference No',
                            style: "width:10%",
                            class: "text-center",
                            editable: true,
                            bind: 'reference_no',
                            itype: 'text'
                        },
                        {
                            name: 'bank',
                            column: 'Bank',
                            editable: true,
                            bind: 'bank',
                            editable: true,
                            bind: 'bank',
                            itype: 'dropdown',
                            selection: 'bank'
                        },
                        {
                            name: 'full_payment_mode', column: 'Payment Mode', class: 'text-center',
                            editable: true, bind: 'payment_mode', itype: 'dropdown', selection: 'payment_mode'
                        },
                        {name: 'full_payment_type', column: 'Payment Type', class: 'text-center'},
                        {name: 'period_start|period_end', column: 'Period', class: 'text-center', dtype: 'date'},
                        {
                            name: 'amount',
                            column: 'Amount',
                            style: "width:10%",
                            class: 'text-right',
                            editable: true,
                            bind: 'amount',
                            itype: 'text'
                        },
                        {name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center'},
                        {name: '$markDelete', column: '', static: true}
                    ];
                    break;
                default:
                    grid.columns = [
                        {
                            name: 'effectivity_date',
                            column: 'Date',
                            style: 'width:10%',
                            class: 'text-center',
                            dtype: 'date'
                        },
                        {name: 'payment_no', column: 'Payment No', style: 'width:10%', class: 'text-center'},
                        {name: 'reference_no', column: 'Reference No', style: "width:10%", class: "text-center"},
                        {name: 'full_bank', column: 'Bank'},
                        {name: 'full_payment_mode', column: 'Payment Mode', class: 'text-center'},
                        {name: 'full_payment_type', column: 'Payment Type', class: 'text-center'},
                        {name: 'period_start|period_end', column: 'Period', class: 'text-center', dtype: 'date'},
                        {name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right'},
                        {name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center'},
                    ];
                    break;
            }

            grid.footers = [
                {span: 9},
                {span: 3, label: "Total Amount", slot: true}
            ];

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

            this.$store.commit('bills/create', {
                bill: this.instance,
                contract: this.instanceContract,
                lookups: this.instanceLookups
            });

            this.$store.watch(
                state => {
                    return state.bills.cloneOfInstance.payment_type;
                },
                value => {
                    if (value.toLowerCase() == 'cash')
                        this.$store.state.bills.cloneOfInstance.payment_no = 'Cash';
                    else
                        this.$store.state.bills.cloneOfInstance.payment_no = '';
                }
            )
        },
        computed: mapGetters('bills', {
            contract: 'contract',
            lookups: 'lookups',
            bill: 'bill',
            totalPayment: 'totalPayment',
            viewIcon: 'viewIcon',
            payments: 'payments',
            option: 'option',
            cloneOfInstance: 'cloneOfInstance'
        }),
        methods: {
            showModal() {
                //this.unfoldModal = true;
                if (this.bill.payments.length == 0) {
                    confirmation.prepareCheque(result => {
                        this.$store.commit('bills/createInstance');
                        setTimeout(() => {
                            if (result) {
                                this.unfoldChequeModal = true;
                            }
                            else {
                                this.unfoldModal = true;
                            }
                        },1000)
                    });
                }
                else {
                    this.unfoldModal = true;
                }
            },
            onDismissal(result) {
                this.$store.commit('bills/validate', {
                    cb: (r) => {
                        if (r.isValid) {
                            this.$store.commit('bills/insert')
                            this.unfoldModal = false;
                        }
                        else {
                            toastr.error(r.message);
                        }
                    }
                })
            },
            onPrepareDismiss() {
                this.$store.dispatch('bills/prepare');
                this.unfoldChequeModal = false;
            },
            onDelete(a, id,index) {
                const that = this;
                confirmation.removePayment((result) => {
                    if (result) {
                        that.$store.commit('bills/removePayment', id)
                    }
                })
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
                if (nv) {
                    this.$store.commit('bills/createInstance');
                }
            }
        }
    }
</script>
