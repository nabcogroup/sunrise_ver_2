<template>
    <form @submit.prevent="save()" @keydown="errors.clear($event.target.name)">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default wrap">
                <div class="panel-heading" style="background-color:#3f51b5!important;"><h3 style="color:white;">
                    Expenses</h3></div>
                <div class="panel-body" style="background-color:#f6f6f6;">

                    <div class="form-group row">
                        <label class="col-md-2 col-form-label">Property:</label>
                        <div class="col-md-4">
                            <select class="form-control" v-model='expense.location'>
                                <option value="">SELECT PROPERTY</option>
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
                        <label class="col-md-2 col-form-label">Expenses:</label>
                        <div class="col-md-10">
                            <select class="form-control" v-model='expense.expense_type'>
                                <option v-for="look in lookups.expense_type" v-bind:value="look.code">{{ look.name }}
                                </option>
                            </select>
                            <error-span :value="errors" name="expense_type"></error-span>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-md-2 col-form-label">Category</label>
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
                        <label class="col-md-2 col-form-label">Paid to:</label>
                        <div class="col-md-6">
                            <!-- <select class="form-control" v-model="expense.payee">
                              <option value=""></option>
                              <option v-for="look in lookups.payees" :value="look.payee_code">{{ look.name }}</option>
                            </select> -->
                            <v-input :value="expense.payee"
                              @input="expense.payee=$event"
                             :items="lookups.payees"
                             item-text="name"
                             item-value="payee_code"
                            ></v-input>
                        </div>
                        <div class="col-md-4">
                          <button type="button" class="btn btn-info pull-right btn-block" @click="createpayee"><i class="fa fa-plus-circle fa-1x" aria-hidden="true"></i>Add</button>
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
                        <label class="col-md-2 col-form-label">Doc No:</label>
                        <div class="col-md-4">
                            <input class="form-control" v-model="expense.doc_no">
                            <error-span :value="errors" name="doc_no"></error-span>
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

                    <div class="form-group row">
                        <label class="col-md-2 col-form-label">Doc Ref:</label>
                        <div class="col-md-10">
                            <input class="form-control" v-model="expense.doc_ref">
                            <error-span :value="errors" name="doc_ref"></error-span>
                        </div>

                    </div>
                    <div class="form-group row">
                        <label class="col-md-2 col-form-label">Doc Ref Date:</label>
                        <div class="col-md-10">
                            <dt-picker
                            :value="expense.doc_date"
                            @pick="expense.doc_date =$event"
                            ></dt-picker>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-2 col-md-offset-10">
                            <button type="submit" class="btn btn-info btn-block">Save</button>
                        </div>
                    </div>
                </div>

            </div>
            <v-dialog modal-id="payee" dialog-title="Payee Information" v-model="unfold" @dismiss="dismiss">
              <payee-register type="modal"></payee-register>
            </v-dialog>

        </div>
    </form>


</template>


<script>
    import {mapGetters} from "vuex";
    import payeeRegister from "../payee/Register.vue"
    import {EventBus} from  "../../eventbus"


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
            if (this.index!=='') {
              this.$store.dispatch('expenditures/edit', {id:this.index})
            } else {
              this.$store.dispatch('expenditures/create')
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
          createpayee () {
            if (!this.options.isPayeeCreated) {
              //this.$store.dispatch('expenditure/createPayee')
            }
            this.unfold = true
          },
          dismiss (result) {
            if (result) {
              EventBus.$emit("onSavePayee", r=>{this.lookups.payees=r});
            }
            this.unfold = false
          }
        },
        data () {
          return {
             unfold: false
          }
        }

    }

</script>
