<template>
    
    <div class="col-md-10 col-md-offset-1">
        <form>
            <v-panel header="Expenses Entry">
                <div class="column-group row">
                    <div class="col-md-6">
                        <label for="expensesTransactionNo">Transaction No:</label>
                        <input disabled type="text" class="input" 
                                :placeholder="expense.transaction == null ? '(New)' : expense.transaction.transaction_no" 
                                id="expensesTransactionNo" 
                                name="expensesTransactionNo" 
                                style="text-align:right"/>

                        <button class="btn btn-default " type="button" @click="searchTransaction">
                            <i class="fa fa-fw fa-search"></i>
                        </button>
                        <button class="btn btn-success" type="button" @click="newEntry">
                            <i class="fa fa-fw fa-plus"></i>
                        </button>
                    </div>

                    <div class="col-md-3 col-md-offset-3" style="text-align:right">
                        <label class="text-muted">
                            {{(expense.transaction !== null) ? expense.transaction.transaction_status : '' }}
                        </label>
                    </div>
                </div>

                <hr/>

                <!-- Doc Date / Doc No -->
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Doc. Date:</label>
                    <div class="col-md-4">
                        <v-dt-picker v-model="expense.entry.doc_date" ></v-dt-picker>
                    </div>
                    <label class="col-md-2 col-form-label">Doc No:</label>
                    <div class="col-md-4">
                        <input class="form-control" v-model="expense.entry.doc_no">
                        <error-span :value="errors" name="doc_no"></error-span>
                    </div>
                </div>

                <!-- Account -->
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Account:</label>
                    <div class="col-md-10">
                        <v-combo-box 
                            :options="lookups.accounts" 
                            v-model="expense.entry.acct_code" 
                            dvalue="code" dtext="description" 
                            :include-default=true>
                        </v-combo-box>
                        <error-span :value="errors" name="acct_code"></error-span>
                    </div>
                </div>

                <!-- Description -->
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Description:</label>
                    <div class="col-md-10">
                        <textarea  class="form-control" name="description" v-model="expense.entry.description" rows="5"></textarea>
                    </div>
                </div>

                <!-- Property / Villa -->
                <div class="form-group row">

                    <label class="col-md-2 col-form-label">Property:</label>
                    <div class="col-md-4">
                        <select class="form-control" v-model='expense.entry.location'>
                            <option value="">--SELECT PROPERTY--</option>
                            <option v-for="look in lookups.villa_location" v-bind:value="look.code" :key="look.code">{{ look.name }}</option>
                        </select>
                        <error-span :value="errors" name="location"></error-span>
                    </div>

                    <label class="col-md-2">Villa:</label>
                    <div class="col-md-4">
                        <select class="form-control" v-model='expense.entry.villa_id'>
                            <option value="0">--SELECT VILLA--</option>
                            <option v-for="look in filtered_villas" v-bind:value="look.id" :key="look.id">{{ look.villa_no }}</option>
                        </select>
                        <error-span :value="errors" name="villa_id"></error-span>
                    </div>
                </div>

                <!-- Paid To / Doc Ref -->
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Paid to:</label>
                    <div class="col-md-3">
                        <v-input v-model="expense.entry.payee_id"
                                 :items="lookups.payees"
                                 item-text="name"
                                 item-value="id">
                        </v-input>
                        <error-span :value="errors" name="payee_id"></error-span>
                    </div>

                    <div class="col-md-1">
                        <button type="button" class="btn btn-info btn-block" @click="createPayee"><i class="fa fa-plus-circle fa-1x" aria-hidden="true"></i></button>
                    </div>
                    <label class="col-md-2 col-form-label">Doc. Ref:</label>
                    <div class="col-md-4">
                        <input class="form-control" v-model="expense.entry.doc_ref">
                        <error-span :value="errors" name="doc_ref"></error-span>
                    </div>
                </div>

                <!-- Paid Date / Amount -->
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Paid Date:</label>
                    <div class="col-md-4">
                        <v-dt-picker v-model="expense.entry.payment_date"></v-dt-picker>
                    </div>
                    <label class="col-md-2 col-form-label">Paid Amount:</label>
                    <div class="col-md-4">
                        <input class="form-control" type="number" v-model="expense.entry.amount">
                        <error-span :value="errors" name="amount"></error-span>
                    </div>
                </div>

                <!-- Mode of Payment / Payment -->
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Mode of Payment:</label>
                    <div class="col-md-4">
                        <select class="form-control" v-model='expense.entry.mode_of_payment'>
                            <option value="">SELECT PAYMENT MODE</option>
                            <option v-for="look in lookups.payment_term" v-bind:value="look.code" :key="look.code">{{look.name}}</option>
                        </select>
                        <error-span :value="errors" name="mode_of_payment"></error-span>
                    </div>

                    <label class="col-md-1 col-form-label">Payment:</label>
                    <div v-if="expense.entry.mode_of_payment === 'cheque'">
                        <div class="col-md-3">
                            <select class="form-control" v-model='expense.entry.bank_provider'>
                                <option v-for="look in lookups.bank" v-bind:value="look.code" :key="look.code">{{ look.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <input class="form-control" placeholder="Check Number" v-model='expense.entry.payment_ref'>
                        </div>
                    </div>

                    <div v-else-if="expense.entry.mode_of_payment === 'credit_card'">
                        <div class="col-md-3">
                            <select class="form-control" v-model='expense.entry.bank_provider'>
                                <option v-for="look in lookups.bank" v-bind:value="look.id">{{ look.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select class="form-control" v-model='expense.entry.payment_ref'>
                                <option v-for="look in lookups.bank_provider" v-bind:value="look.id">{{ look.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <hr/>

                <div class="row">
                    <div class="col-md-3 col-md-offset-9">
                        <div class="col-md-6" style="padding-top: 10px;padding-bottom: 10px ">
                            <button class="btn btn-danger btn-block" @click="reset" type="button"><i class="fa fa-eraser"></i> Reset</button>
                        </div>
                        <div class="col-md-6" style="padding-top: 10px;padding-bottom: 10px ">
                            <button class="btn btn-primary btn-block" @click="insertItem" type="button"> <i class="fa fa-arrow-down"></i> Insert</button>
                        </div>
                    </div>
                    
                    <div class="col-md-12">
                        <!-- -->
                        <grid-view :grid="gridColumn" :data="expense.items.all()" @action="doAction">
                            <span class="text-right">{{expense.items.sum('amount') | toCurrencyFormat }}</span>
                        </grid-view>
                    </div>
                </div>

                <template slot="panel-footer">
                    <!-- Save and Post -->
                    <div class="row">
                        <div class="col-md-2 col-md-offset-10">
                            <button type="button" class="btn btn-info btn" :disabled="expense.items.all().length == 0" @click="save">Save</button>
                            <button type="button" class="btn btn-primary btn" :disabled="expense.items.all().length == 0">Save and Post</button>
                        </div>
                    </div>
                </template>

            </v-panel>
        </form>

        <v-dialog modal-id="payee" dialog-title="Payee Information" v-model="unfold" @dismiss="dismiss">
            <payee-register type="modal"></payee-register>
        </v-dialog>

        <transaction-list-dialog @selected="onSelected"></transaction-list-dialog>
    </div>

</template>


<script>
    import {mapGetters} from "vuex";
    import PayeeRegister from "../payee/Register.vue"
    import {EventBus} from "../../eventbus"
    import TransactionListDialog from "./TransactionListDialog";

    const confirmation = {
        ExpensesSave: (cb) => {
            bbox.confirm({
                title: "Create Expenses",
                message: "Do you want to create expenses?",
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
        },
        RemoveItem: (cb) => {
            bbox.confirm({
                title: "Remove Item",
                message: "Do you want to remove this item?",
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
        },
        NewTransaction: (cb) => {
            bbox.confirm({
                title: "New Transaction",
                message: "Do you want to make new transaction??",
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
        mounted() {
            this.$store.dispatch('expenditures/create');
        },
        data() {
            return {
                unfold: false,
                gridColumn: {
                    excludeIndex: true,
                    columns: [ {
                            name: 'doc_date',
                            column: 'Date',
                            style: 'width:10%',
                            class: 'text-center',
                            default: true,
                            format: 'date'
                        },
                        {name: 'doc_no', column: 'Doc. No.', style: 'width:10%', class: 'text-center'},
                        {name: 'account', column: 'Account', style: 'width:10%', class: 'text-center'},
                        {name: 'property', column: 'Property', style: "width:10%", class: 'text-right'},
                        {name: 'villa', column: 'Villa', style: "width:10%", class: 'text-center'},
                        {name: 'payee', column: 'Payee', class: 'text-center'},
                        {name: 'amount', column: 'Amount', class: 'text-center',dtype: 'currency'},
                        {name: '$action', column: 'Action', style: 'width:10%', class: 'text-center', actionable: true}
                    ],
                    actions: [
                        {key: 'edit', name: 'Edit'},
                        {key: 'remove', name: 'Remove'}
                    ],
                    footers: [
                        {label: "Grand Total",span:"6"},
                        {label: "",slot: true, class:'text-right'},
                        {label: ""}
                    ]
                }
            }
        },
        props: ['index'],
        computed: mapGetters('expenditures', {
            expense: 'expense',
            lookups: 'lookups',
            filtered_villas: 'filtered_villas',
            errors: 'errors',
            payee: 'payee',
            payeeTypes: 'payeeTypes',
            options: 'options'
        }),
        components: {TransactionListDialog, PayeeRegister},
        methods: {
            save() {
                confirmation.ExpensesSave((result) => {
                    if (result) {
                        this.$store.dispatch('expenditures/save')
                    }
                });
            },
            savePost() {
                confirmation.ExpensesSave((result) => {
                    if (result) {
                        this.$store.dispatch('expenditures/saveAndPost')
                    }
                });
            },
            newEntry() {
                confirmation.NewTransaction((result) => {
                    if (result) {
                        this.$store.commit('expenditures/new');
                    }
                });
            },
            reset() {
                this.$store.commit('expenditures/reset');
            },
            insertItem() {
                this.$store.commit('expenditures/insertItem')
            },
            doAction(action,value,index) {
                
                if(action === 'remove') {
                    confirmation.RemoveItem((result) => {
                        if(result) {
                            this.$store.commit('expenditures/removeItem',{key:value.key});
                        }
                    });
                }
                else {
                    this.$store.commit('expenditures/editItem',{key:value.key});
                }
            },
            createPayee() {
                this.unfold = true
            },
            dismiss(result) {
                
                if (result) {
                    EventBus.$emit("onSavePayee", r => {
                        this.lookups.payees = r
                    })
                }

                this.unfold = false
            },
            searchTransaction() {

                EventBus.$emit("list.open")
                
            },
            onSelected(transactionNo) {
                this.$store.dispatch('expenditures/edit',{transactionNo: transactionNo});
            }
        },
    }
</script>
