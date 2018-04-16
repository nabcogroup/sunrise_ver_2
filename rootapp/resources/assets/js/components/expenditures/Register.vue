<template>
    <form @submit.prevent="save()" @keydown="errors.clear($event.target.name)">
        <div class="col-md-10 col-md-offset-1" >
            <v-panel header="Expenses Entry">

                <div class="column-group row">
                    <label for="billSearch">Transaction No:</label>
                    <input disabled type="text" class="input" placeholder="XXX" name="expensesTransactionNo"/>
                    <button class="btn btn-info ">
                        <i class="fa fa-fw fa-search"></i>
                    </button>
                    <button class="btn btn-info">
                        <i class="fa fa-fw fa-plus"></i>
                    </button>
                </div>
                <hr/>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Doc. Date:</label>
                    <div class="col-md-4">
                        <dt-picker
                                :value="expense.doc_date"
                                @pick="expense.doc_date =$event"></dt-picker>
                    </div>
                    <label class="col-md-2 col-form-label">Doc No:</label>
                    <div class="col-md-4">
                        <input class="form-control" v-model="expense.doc_no">
                        <error-span :value="errors" name="doc_no"></error-span>
                    </div>

                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Account:</label>
                    <div class="col-md-10">
                        <select class="form-control" v-model='expense.acct_code'>
                            <option value="">SELECT CATEGORY</option>
                            <option v-for="look in lookups.accounts" :value="look.code">{{ look.code
                                }}-{{ look.description }}
                            </option>
                        </select>
                        <error-span :value="errors" name="acct_code"></error-span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Property:</label>
                    <div class="col-md-4">
                        <select class="form-control" v-model='expense.location'>
                            <option value="">--SELECT PROPERTY--</option>
                            <option v-for="look in lookups.villa_location" v-bind:value="look.code">{{ look.name
                                }}
                            </option>
                        </select>
                        <error-span :value="errors" name="location"></error-span>
                    </div>
                    <label class="col-md-2">Villa:</label>
                    <div class="col-md-4">
                        <select class="form-control" v-model='expense.villa_id'>
                            <option v-for="look in filtered_villas" v-bind:value="look.id">{{ look.villa_no }}
                            </option>
                        </select>
                        <error-span :value="errors" name="villa_id"></error-span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Paid to:</label>
                    <div class="col-md-6">
                        <v-input :value="expense.payee"
                                 @input="expense.payee=$event"
                                 :items="lookups.payees"
                                 item-text="name"
                                 item-value="payee_code"
                        ></v-input>
                    </div>
                    <div class="col-md-4">
                        <button type="button" class="btn btn-info pull-right btn-block" @click="createPayee"><i
                                class="fa fa-plus-circle fa-1x" aria-hidden="true"></i>Add
                        </button>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Paid Date:</label>
                    <div class="col-md-4">
                        <dt-picker
                                :value="expense.payment_date"
                                @pick="expense.payment_date =$event"
                        ></dt-picker>
                    </div>
                    <label class="col-md-2 col-form-label">Doc. Ref:</label>
                    <div class="col-md-4">
                        <input class="form-control" v-model="expense.doc_ref">
                        <error-span :value="errors" name="doc_ref"></error-span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Paid Amount:</label>
                    <div class="col-md-10">
                        <input class="form-control" type="number" v-model="expense.amount">
                        <error-span :value="errors" name="amount"></error-span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label">Mode of Payment:</label>
                    <div class="col-md-4">
                        <select class="form-control" v-model='expense.mode_of_payment'>
                            <option value="">SELECT PAYMENT MODE</option>
                            <option v-for="look in lookups.payment_term" v-bind:value="look.code">{{ look.name
                                }}
                            </option>
                        </select>
                        <error-span :value="errors" name="mode_of_payment"></error-span>
                    </div>
                    <label class="col-md-1 col-form-label">Payment:</label>
                    <div v-if="expense.mode_of_payment === 'cheque'">
                        <div class="col-md-3">
                            <select class="form-control" v-model='expense.bank_provider'>
                                <option v-for="look in lookups.bank" v-bind:value="look.code">{{ look.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <input class="form-control" placeholder="Check Number" v-model='expense.payment_ref'>
                        </div>
                    </div>
                    <div v-else-if="expense.mode_of_payment === 'credit_card'">
                        <div class="col-md-3">
                            <select class="form-control" v-model='expense.bank_provider'>
                                <option v-for="look in lookups.bank" v-bind:value="look.id">{{ look.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select class="form-control" v-model='expense.payment_ref'>
                                <option v-for="look in lookups.bank_provider" v-bind:value="look.id">{{ look.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- -->
                <grid-view :grid="gridColumn" :data="expenses">

                </grid-view>

                <template slot="panel-footer">
                    <div class="row">
                        <div class="col-md-2 col-md-offset-10">
                            <button type="submit" class="btn btn-info btn-block">Save</button>
                        </div>
                    </div>
                </template>


            </v-panel>

            <v-dialog modal-id="payee" dialog-title="Payee Information" v-model="unfold" @dismiss="dismiss">
                <payee-register type="modal"></payee-register>
            </v-dialog>

        </div>
    </form>


</template>


<script>
    import {mapGetters} from "vuex";
    import payeeRegister from "../payee/Register.vue"
    import {EventBus} from "../../eventbus"

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
        }
    }

    export default {
        mounted() {
            console.log(this.index);
            if (this.index !== '') {
                this.$store.dispatch('expenditures/edit', {id: this.index})
            } else {
                this.$store.dispatch('expenditures/create')
            }
        },
        data() {
            return {
                unfold: false,
                gridColumn: {
                    columns: [
                        {name: 'doc_date', column: 'Date',  style: 'width:10%', class: 'text-center', default: true, format: 'date'},
                        {name: 'doc_no', column: 'Doc. No.', style: 'width:10%', class: 'text-center'},
                        {name: 'account', column: 'Account', style: 'width:10%', class: 'text-center'},
                        {name: 'property', column: 'Property', style: "width:10%", class: 'text-right',},
                        {name: 'villa', column: 'Villa', style: "width:10%", class: 'text-center'},
                        {name: 'payee', column: 'Payee', class: 'text-center',},
                        {name: 'amount', column: 'Amount', class: 'text-center',},
                        {name: '', column: 'Action', style: 'width:10%', class: 'text-center', actionable: true}
                    ]
                },
                expenses: []
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
        components: {
            payeeRegister
        },
        methods: {
            save() {
                confirmation.ExpensesSave((result) => {
                    if (result) {
                        this.$store.dispatch('expenditures/save')
                    }
                });
            },
            createPayee() {
                if (!this.options.isPayeeCreated) {
                    //this.$store.dispatch('expenditure/createPayee')
                }
                this.unfold = true
            },
            dismiss(result) {
                if (result) {
                    EventBus.$emit("onSavePayee", r => {
                        this.lookups.payees = r
                    });
                }
                this.unfold = false
            }
        },


    }

</script>
