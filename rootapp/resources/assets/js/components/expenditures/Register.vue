<template>
    
    <div class="col-md-12">
        <form>
            <v-panel header="Expenses Entry">
                <div class="column-group row">
                    <div class="col-md-6">
                        <label for="expensesTransactionNo">Transaction No:</label>
                        <input disabled type="text" 
                                class="input" 
                                :placeholder="expense.transaction == null ? '(New)' : expense.transaction.transaction_no" 
                                id="expensesTransactionNo" 
                                name="expensesTransactionNo" 
                                style="text-align:right"/>

                        <button class="btn btn-default " type="button" @click.prevent="searchTransaction">
                            <i class="fa fa-fw fa-search"></i>
                        </button>
                        <button class="btn btn-success" type="button" @click.prevent="newEntry">
                            <i class="fa fa-fw fa-plus"></i>
                        </button>
                    </div>
                    <div class="col-md-3 col-md-offset-3" style="text-align:right">
                        <template v-if="(expense.transaction !== null)">
                            <button v-if="expense.transaction.posted == 0" type="button" class="btn btn-primary btn" 
                                    :disabled="saveDisabled" 
                                    @click="post">Save and Post
                            </button>
                            <label v-else class="text-muted">
                                {{expense.transaction.transaction_status}}
                            </label>
                        </template>
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
                        <input class="form-control" name="doc_no" v-model="expense.entry.doc_no" @focus="suggest($event.target.name)">
                        <error-span :value="errors" name="doc_no"></error-span>
                    </div>
                </div>

                <!-- Expense Type / Account -->
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Account:</label>
                    <div class="col-md-4">
                        <v-combo-box 
                            :options="lookups.accounts" 
                            v-model="expense.entry.acct_code" 
                            dvalue="code" dtext="full_account_description" 
                            :include-default=true>
                        </v-combo-box>
                        <error-span :value="errors" name="acct_code"></error-span>
                    </div>
                    <label class="col-md-2 col-form-label">Expense Type:</label>
                    <div class="col-md-4">
                        <select name="expense_type" class="form-control" v-model='expense.entry.expense_type'>
                            <option value="">--SELECT EXPENSE TYPE--</option>
                            <option v-for="look in lookups.expense_type" v-bind:value="look.code" :key="look.code">{{ look.name }}</option>
                        </select>
                        <error-span :value="errors" name="expense_type"></error-span>
                    </div>
                </div>

                <!-- Description -->
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Description:</label>
                    <div class="col-md-10">
                        <div class="input-group">
                            <input class="form-control" name="description"
                                v-model="expense.entry.description"
                                @input="descriptionChange($event.target.value)"/>
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button" @click="togglePredictive()">
                                    <i class="fa fa-angle-down"></i>
                                </button>
                            </span>
                        </div>

                        <div style="position:relative; width:100%">
                            <v-predictive 
                                :configs="preConfig"
                                :filter-value="expense.entry.description"
                                @selected="onPredictiveSelected"
                                item-text="description">
                            </v-predictive>
                        </div>
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
                    <div class="col-md-4">
                        <v-input v-model="expense.entry.payee_id"
                                :configs="payeeConfig"
                                @insert="addPayee">
                        </v-input>
                        <error-span :value="errors" name="payee_id"></error-span>
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
                            <option v-for="look in lookups.payment_term" 
                                    v-bind:value="look.code"
                                    :key="look.code">{{look.name}}</option>
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
                                <option v-for="(look,index) in lookups.bank" 
                                        v-bind:value="look.id" :key="index">{{ look.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select class="form-control" v-model='expense.entry.payment_ref'>
                                <option v-for="(look,index) in lookups.bank_provider" v-bind:value="look.id" :key="index">{{ look.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <hr/>

                <div class="row">
                    <div class="col-md-3 col-md-offset-9">
                        <div class="col-md-6" style="padding-top: 10px;padding-bottom: 10px ">
                            <button class="btn btn-danger btn-block" 
                                    @click="reset" 
                                    type="button"><i class="fa fa-eraser"></i> Reset</button>
                        </div>
                        <div class="col-md-6" style="padding-top: 10px;padding-bottom: 10px ">
                            <button class="btn btn-primary btn-block" @click="insertItem" type="button"> <i class="fa fa-arrow-down"></i> Insert</button>
                        </div>
                    </div>
                    
                    <div class="col-md-12">
                        <!-- -->
                        <grid-view :grid="gridColumn" :data="expense.items.all()" @action="doAction">
                            <tr slot="footer-slot">
                                <th colspan="8"></th>
                                <th class="text-right">
                                    <span class="text-right">{{expense.items.sum('debit_amount') | toCurrencyFormat }}</span>
                                </th>
                                <th class="text-right">
                                    <span class="text-right">{{expense.items.sum('credit_amount') | toCurrencyFormat }}</span>
                                </th>
                                <th></th>
                            </tr>
                        </grid-view>

                    </div>
                </div>

                <template slot="panel-footer">
                    <!-- Save and Post -->
                    <div class="row">
                        <div class="col-md-2 col-md-offset-10">
                            <button type="button" class="btn btn-info btn btn-block" 
                                :disabled="saveDisabled" 
                                @click.prevent="save">Save <i class="fa " :class="[{'fa-spinner fa-spin': expense.progress.saving}]"></i>
                            </button>
                        </div>
                    </div>
                </template>

            </v-panel>
        </form>
        
        <!-- transaction list -->
        <transaction-list-dialog @selected="onSelected"></transaction-list-dialog>
        <!-- end -->

        <!-- Payee -->
        <v-dialog modal-id="payee" dialog-title="Payee Information" v-model="unfold" @dismiss="dismiss">
            <payee-register type="modal"></payee-register>
        </v-dialog>
        <!-- end Payee -->
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
            EventBus.$on("payee-register.saved",() => {
                this.$store.dispatch('expenditures/fetchPayees')
            });
        },
        data() {
            return {
                unfold: false,
                payeeConfig: {
                    columns: [
                        {name: 'id', dataType:'key'},
                        {name: 'name', column: 'Name', dataType:'text'}
                    ],
                    option: {key: 'id', label: 'name'},
                    api: {
                        url: '/api/payee/lookups'
                    }
                },
                preConfig: {
                    visible: false,
                    preKey: 'description',
                    columns: [
                        {name: '$icon', value: 'fa fa-tags', style:'width:3%;text-align:center'},
                        {name: 'description', column: 'Description'},
                        {name: 'amount',column: 'Amount',  style:'width:20%'}
                    ],
                    api: {
                        url: '/api/expenses/predictives'
                    }
                },
                gridColumn: {
                    excludeIndex: true,
                    columns: [ 
                        {name: 'handlerStatus',column:'',style:'width:3%,font-size:10px',class:'text-primary'},
                        {name: 'doc_date', column: 'Date', style: 'width:10%', class: 'text-center', default: true, format: 'date', sorted: true},
                        {name: 'doc_no', column: 'Doc. No.', style: 'width:10%', class: 'text-center',sorted:true,filter:true},
                        {name: 'doc_ref', column: 'Doc. Ref#', style: 'width:10%', class: 'text-center',sorted:true},
                        {name: 'account', column: 'Account', style: 'width:10%', class: 'text-center',sorted:true},
                        {name: 'villa', column: 'Villa', style: "width:10%", class: 'text-center',sorted:true, filter: true},
                        {name: 'description', column: 'Description',sorted:true},
                        {name: 'payee', column: 'Payee', class: 'text',sorted:true},
                        {name: 'debit_amount', column: 'Debit', class: 'text-center',dtype: 'currency' },
                        {name: 'credit_amount', column: 'Credit', class: 'text-center',dtype: 'currency'},
                        {name: '$action', column: 'Action', style: 'width:5%', class: 'text-center', actionable: true}
                    ],
                    actions: [
                        {key: 'edit', name: 'Edit'},
                        {key: 'fork', name: 'Copy'},
                        {key: 'remove', name: 'Remove'},
                    ],
                    hasFooter: true
                }
            }
        },
        props: ['index'],
        computed: {
            ...mapGetters('expenditures', {
                expense: 'expense',
                lookups: 'lookups',
                filtered_villas: 'filtered_villas',
                errors: 'errors',
                payee: 'payee',
                payeeTypes: 'payeeTypes',
                options: 'options',
                smartState: 'smartState',
            }),
            saveDisabled() {
                return this.expense.items.all().length == 0 || this.expense.progress.saving
            }
        },
        components: {TransactionListDialog, PayeeRegister},
        methods: {
            descriptionChange(value) {
                this.preConfig.visible = value.length > 0 ? true : false;
            },
            onPredictiveSelected(item) {
               this.$store.commit('expenditures/updateDescription',item)
               this.preConfig.visible = false;
            },
            save() {
                confirmation.ExpensesSave((result) => {
                    if (result) {
                        this.$store.dispatch('expenditures/save', (response) => {
                            EventBus.$emit('predictive.store');
                        });
                    }
                });
            },
            post() {
                confirmation.ExpensesSave((result) => {
                    if (result) {
                        this.$store.dispatch('expenditures/post', (response) => {
                            EventBus.$emit('predictive.store');
                        });
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
            addPayee(value) {   
                EventBus.$emit('payee.in.attributes',{option: {name:value}})
                this.unfold = true
            },
            reset() {
                this.$store.commit('expenditures/reset');
            },
            insertItem() {
                //store in memory
                this.$store.commit('expenditures/insertItem',(item) => {
                    EventBus.$emit('predictive.new',{description: item.description,amount: item.amount});
                })
            },
            doAction(action,value,index) {
                if(action === 'remove') {
                    confirmation.RemoveItem((result) => {
                        if(result) {
                            this.$store.commit('expenditures/removeItem',{key:value.key});
                        }
                    });
                }
                else if(action === 'fork') {
                    this.$store.commit('expenditures/fork',{key: value.key});
                }
                else {
                    this.$store.commit('expenditures/editItem',{key:value.key});
                }
            },
            dismiss(result) {
                if (result) {
                    EventBus.$emit("payee.in.saving")
                }
                this.unfold = false
            },
            searchTransaction() {
                EventBus.$emit("list.open")
            },
            onSelected(transactionNo) {
                this.$store.dispatch('expenditures/edit',{transactionNo: transactionNo});
            },
            suggest(value) {
               this.$store.commit('expenditures/suggest',{prop: value});
            },
            togglePredictive() {
                this.preConfig.visible = !this.preConfig.visible;
            }
        },
    }
</script>
