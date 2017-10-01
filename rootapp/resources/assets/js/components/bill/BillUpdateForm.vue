<template>
    <div class="panel panel-primary">
        <div class="panel-heading">Payment Update</div>
        <div class="panel-body">
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
                                    <input disabled type="text" class="input" placeholder="XXX" name="billSearch" v-model="bill.bill_no" />
                                    <button class="btn btn-info " @click="openSearchModal(true)">
                                        <i class="fa fa-fw " :class="options.loadingSearch ? 'fa-refresh fa-spin' : 'fa-search'"></i>
                                    </button>
                                    <button class="btn btn-info" @click="printBill" :disabled="bill.bill_no.length === 0">
                                        <i class="fa fa-fw fa-print"></i>
                                    </button>
                                </div>
                                <search-bill @select="onSelect"></search-bill>
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
                                    <span class="col-md-9 x-desc">
                                        {{contract.period_start | toDateFormat}} - {{contract.period_end_extended | toDateFormat}}
                                    </span>
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
                        <v-tab-group v-model="options.currentTabIndex">
                            <v-tab tab-id="received">For Clearing</v-tab>
                            <v-tab tab-id="deposit">Deposited</v-tab>
                            <v-tab tab-id="clear">Cleared</v-tab>
                            <v-tab tab-id="bounce">Bounced</v-tab>
                        </v-tab-group>
                        <div class="tab-content">
                            <div class="tab-pane active">
                                <div class="col-md-12 is-margin-bottom">
                                    <div class="col-md-3 pull-right">
                                        <button v-if="isPaymentStatusReplace"
                                        class="btn btn-info btn-block" 
                                        @click="openReplaceModal">Replace New Payment</button>
                                    </div>
                                </div>

                                <div class="col-md-12" id="main">
                                    <data-view :grid="gridColumn" :data="filtered">
                                        <template slot="body" scope="props">
                                            <div v-if="props.items.column.custom">
                                                <!-- selector -->
                                                <div v-if="props.items.column.name === 'payment_no'">
                                                    <input type="text" class="form-control" v-model="props.items.items.payment_no"/>
                                                </div>
                                                <!--status -->
                                                <div v-else-if="props.items.column.name === 'status'">
                                                    <v-combo-box v-model="props.items.items.status" :options="lookups.payment_status" dvalue="code" dtext="name"></v-combo-box>
                                                </div>
                                                <!-- bank account -->
                                                <div v-else-if="props.items.column.name === 'bank_account'">
                                                    <div v-if="props.items.items.status==='clear'" class="form-group text-center">
                                                        <v-combo-box v-model="props.items.items.bank_account"
                                                                     :options="lookups.bank_accounts"
                                                                     dvalue="account_no"
                                                                     dtext="account_no"
                                                                     includeDefault="true"
                                                                     @change="onChange(props.items.items.id)"></v-combo-box>
                                                        <small class="label label-info">
                                                            {{getBank(props.items.items.bank_account)}}
                                                        </small>
                                                    </div>
                                                    <div v-else class="text-center">
                                                        <span>{{props.items.items.bank_account}}</span>
                                                    </div>
                                                </div>

                                                <!-- date deposited -->
                                                <div v-else-if="props.items.column.name === 'date_deposited'">
                                                    <div v-if="props.items.items.status ==='clear' || props.items.items.status === 'bounce'">
                                                        <dt-picker dp-name="date_deposited" :value="props.items.items.date_deposited" @pick="props.items.items.date_deposited = $event"></dt-picker>
                                                    </div>
                                                    <div v-else class="text-center">
                                                        <span>{{props.items.items.date_deposited}}</span>
                                                    </div>
                                                </div>
                                                <!-- remarks -->
                                                <div v-else>
                                                    <div v-if="props.items.items.status==='clear'" class="form-group">
                                                        <textarea v-model="props.items.items.remarks" class="form-control"></textarea>
                                                    </div>
                                                    <div v-else class="text-center">
                                                        <span>{{props.items.items.remarks}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else="">
                                                <div v-if="props.items.column.editable">
                                                    <input v-model="props.items.items[column.name]" class="form-control text-center" disabled/>
                                                </div>
                                                <div v-else-if="props.items.column.actionable" class="btn-group">
                                                    <button type="button"
                                                            class="btn btn-primary dropdown-toggle btn-sm"
                                                            data-toggle="dropdown"
                                                            aria-haspopup="true" aria-expanded="false">
                                                        Action <span class="caret"></span>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a href="#" @click.prevent="actionTrigger('info',props.items.items)">Info</a></li>
                                                        <li v-if="props.items.items.replace_ref"><a href="#" @click.prevent="actionTrigger('rep-info',props.items.items)">Replacement - Info</a></li>
                                                        <li role="separator" class="divider"></li>
                                                        <li><a href="#" @click.prevent="actionTrigger('edit',props.items.items)">Edit</a></li>
                                                        <li><a href="#" @click.prevent="actionTrigger('deposit',props.items.items)">Add Deposit</a></li>
                                                        <li role="separator" class="divider"></li>
                                                        <li v-if="props.items.items.replace_ref === undefined || props.items.items.replace_ref === null"><a href="#" @click.prevent="actionTrigger('replacement',props.items.items)">Replacement</a></li>
                                                    </ul>
                                                </div>
                                                <div v-else="">
                                                    <span v-if="props.items.column.format=='date'">{{props.items.items[props.items.column.name] | toDateFormat}}</span>
                                                    <span v-else-if="props.items.column.format=='currency'">{{props.items.items[props.items.column.name] | toCurrencyFormat}}</span>
                                                    <span v-else="">{{props.items.items[props.items.column.name]}}</span>
                                                </div>
                                            </div>
                                        </template>
                                    </data-view>
                                </div>

                                <!-- modal -->
                                <replace-modal :clone-of-instance="cloneOfInstance" :lookups="lookups" @dismiss="onDismissal"></replace-modal>
                                <payment-info-modal></payment-info-modal>
                                <payment-modal namespace="payments"></payment-modal>
                                <deposit-modal></deposit-modal>
                                <!-- end modal -->
                                <hr/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 pull-right">
                                <total-payment :payment="totalPayment"></total-payment>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 pull-right">
                                <button v-if="options.currentTabIndex == 'received'" class="btn btn-info btn-block" @click="save" :disabled="options.loadingSave">
                                    <i class="fa fa-fw fa-lg" :class="options.loadingSave ? 'fa-refresh fa-spin' : 'fa-save'"></i> Save
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


import TotalPayment from './TotalPayment.vue';
import PaymentModal from './PaymentModal.vue';
import PaymentInfoModal from "./PaymentInfoModal.vue";
import ReplaceModal from './ReplaceModal.vue';
import SearchBill from './SearchBill.vue';
import DepositModal from './DepositModal.vue';
import { EventBus } from '../../eventbus';
import { mapGetters, mapMutations } from "vuex";


const createGridColumn = function(value) {
    function columnFactory(value) {
        let grid = {};
        switch (value) {
            case 'received': {
                grid.columns = [ 
                    { name: 'effectivity_date',column: 'Date',style: 'width:10%',class: 'text-center', default: true, format: 'date'},
                    { name: 'payment_no', column: 'C/P No.', style: 'width:10%', class: 'text-center' },
                    { name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right', },
                    { name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center' },
                    { name: 'bank_account', column: 'Accounts', class: 'text-center',  },
                    { name: 'date_deposited', column: 'Date Deposit', class: 'text-center', },
                    { name: 'remarks', column: 'Remarks', style: 'width:20%', class: 'text-center',},
                    { name: '', column: 'Action', style: 'width:10%', class: 'text-center', actionable: true }
                ]
                break;
            }
            case 'bounce': {
                grid.columns = [
                    {
                        name: 'effectivity_date',
                        column: 'Date',
                        style: 'width:10%',
                        class: 'text-center',
                        default: true,
                        format: 'date'
                    },
                    {
                        name: 'payment_no',
                        column: 'C/P No.',
                        style: 'width:10%',
                        class: 'text-center',
                        editable: true
                    },
                    { name: 'amount', column: 'Amount', style: "width:10%", class: 'text-right', editable: true },
                    { name: 'status', column: 'Status', style: "width:10%", class: 'text-center', custom: true },
                    { name: 'bank_account', column: 'Accounts', class: 'text-center' },
                    { name: 'date_deposited', column: 'Bounce Date', class: 'text-center', format: 'date' },
                    { name: 'remarks', column: 'Remarks', style: 'width:20%', class: 'text-center', }
                ]
                break;
            }
            default:
                grid.columns = [{
                    name: 'effectivity_date',
                    column: 'Date',
                    style: 'width:10%',
                    class: 'text-center',
                    default: true,
                    format: 'date'
                },
                {
                    name: 'payment_no',
                    column: 'C/P No.',
                    style: 'width:10%',
                    class: 'text-center',
                    editable: false
                },
                {
                    name: 'amount',
                    column: 'Amount',
                    style: "width:10%",
                    class: 'text-right',
                    editable: false,
                    format: 'currency'
                },
                { name: 'full_status', column: 'Status', style: "width:10%", class: 'text-center', },
                { name: 'bank_account', column: 'Accounts', class: 'text-center', },
                { name: 'date_deposited', column: 'Date Deposit', class: 'text-center', format: 'date' },
                { name: 'remarks', column: 'Remarks', style: 'width:20%', class: 'text-center', },
                ];
        }
        return grid
    }

    return columnFactory(value);
}

const confirmation = {
    updatePayment: (cb) => {
        bbox.confirm({
            title: "Update Payment",
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
                cb(result)
            }
        })
    }
}

export default {

    props: ["billNo"],
    components: {
        TotalPayment,
        PaymentModal,
        SearchBill,
        ReplaceModal,
        PaymentInfoModal,
        DepositModal
    },
    data() {
        let gridColumn = createGridColumn();
        return {
            searchToggle: false,
            gridColumn: gridColumn,
            unfoldModal: false,
            unfoldReplacementModal: false,
            paymentStatus: ''
        }
    },
    computed: {
        ...mapGetters('payments', {
            contract: 'contract',
            bill: 'bill',
            filtered: 'filtered',
            totalPayment: 'totalPayment',
            cloneOfInstance: 'cloneOfInstance',
            footerAmount: 'footerAmount',
            options: 'options',
            lookups: 'lookups',
            isPaymentStatusReplace: 'isPaymentStatusReplace'
        })
    },
    mounted() {
        if (this.billNo) {
            this.$store.state.payments.bill.bill_no = this.billNo;
            this.openSearchModal(false);
        }
    },
    methods: {
        openSearchModal(openToggle) {
            if (openToggle) {
                EventBus.$emit('openSearchBillDialog');
            }
            else {
                this.$store.dispatch('payments/edit');
            }
        },
        openPaymentInfoModal() {
            EventBus.$emit("payment.info.open");
        },
        printBill() {
            this.$store.commit('payments/redirectToPrint');
        },
        save() {
            confirmation.updatePayment((result) => {
                if (result) {
                    this.$store.dispatch('payments/update', {
                        done: (r) => {
                            this.$store.dispatch('payments/edit')
                        }
                    })
                }
            });
        },
        onDismissal(result) {
            this.$store.commit('payments/addNew');
            EventBus.$emit("closeReplaceModal");
        },
        onSelect(billNo) {
            this.$store.state.payments.bill.bill_no = billNo;
            this.$store.dispatch('payments/edit');
            this.searchToggle = false;
        },
        getBank(account_no) {
            const bank = _.find(this.lookups.bank_accounts, (item) => {
                return item.account_no === account_no;
            });

            return bank !== undefined ? bank.bank_name : '';
        },
        onChange(id) {
            this.$store.commit('payments/updateDeposit', { id });
        },
        openReplaceModal() {
            this.$store.commit('payments/calculateReplace', () => EventBus.$emit('openReplaceModal'));
        },
        get(ob) {
            console.log(ob);
        },
        actionTrigger(action,value) {
           if(action === 'info') {
                EventBus.$emit('payment.info.open',value);
           }  
           else if(action == 'edit') {
               EventBus.$emit('payment.register.open',"edit", value);
           }
           else if(action == 'deposit') {
               EventBus.$emit("payment.deposit.open",value)
           }
           else if(action == 'replacement') {
               EventBus.$emit("payment.replace.open",value)
           }
           else {
               
           }
        }
    },
    watch: {
        filtered(nv) {
            this.gridColumn = createGridColumn(this.options.currentTabIndex);
        },
        selectedTab(nv) {
            this.options.currentTabIndex
        }
    }
}
</script>

<style>
.column-group {
    width: 100%;
    padding: 10px;
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
    width: 230px;
}
</style>