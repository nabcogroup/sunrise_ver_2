import { cloneObject, copiedValue, ErrorValidations, Validator,ItemHandler,InstanceStorage } from "../../../helpers/helpers";

var moment = moment || require('moment');

class Expense {

    constructor() {

        this.state = {
            transaction: null,
            current: null,
            entry: {},
            items: new ItemHandler(),
            expenses: [],
            progress: {
                saving: false,
                editing: false
            }
        };

        this.instanceStorage = {};
        this.lookups = {
            villas: []
        };

        this.smart = {
            snap: "",
            count: 0,
            capture: function(element) {
                if(this.snap !== element) {
                    this.snap = element;
                    if(this.count > 0) this.reset();
                }
                else { this.count++; }
            },
            reset: function() {
                this.count = 0;
            },
            stopCount: function(count) {
                this.count = count;
            }
        }

        this.validator = new Validator();
        this.errors = new ErrorValidations();
    }

    //end point
    fetch() {
        axiosRequest.get('expenses', '').then(r => {
            this.state.expenses = r.data.data;
        });
    }

    fetchPayees() {
        axiosRequest.dispatchGet('/api/payee/list').then(r => {
            this.lookups.payees = [];
            this.lookups.payees = r.data.data;
        });
    }

    create(data) {
        axiosRequest.get('expenses', 'create').then(r => {
            this.instanceStorage = new InstanceStorage(r.data.data);
            this.state.entry = this.instanceStorage.getClone();
            this.validator.setRules(r.data.rules);
            this.lookups = r.data.lookups;
        })
    }
    save(isPosted = false,cbSuccess = null) {

        let arx = null;
        this.state.progress.saving = true;
        
        let transactions = {
            transaction_no: this.state.transaction !== null ? this.state.transaction.transaction_no : null,
            items: this.state.items.pops()
        };
        
        if(this.state.progress.saving) {

            arx = (isPosted) ? axiosRequest.post('expenses', 'post', { transaction_set: transactions}) : 
                                axiosRequest.post('expenses', 'store', { transaction_set: transactions});
            arx.then(r => {
                toastr.success(r.data.message)
                this.state.progress.saving = false;
                this.edit(r.data.data);
                
                if(cbSuccess) {
                    cbSuccess(r.data.data);
                }
                    
            })
            .catch(e => {
                if (e.response.status === 422) {
                    this.errors.register(e.response.data);
                }
                this.state.progress.saving = false;
            });
        }
    }
    
    edit(transactionNo) {
        axiosRequest.dispatchGet(`/api/expenses/${transactionNo}/edit/`)
            .then(r => {
                this.state.items.clear();
                this.state.transaction = r.data.transaction_no;
                r.data.data.forEach((entry) => this.registerItem(entry));
            })
            .catch(e => {
                if (e.response.status === 422) 
                    this.errors.register(e.response.data);
            });
    }

    resetEntry() {

        this.errors.clearAll();
        this.state.current = null;
        copiedValue(this.instanceStorage.get(), this.state.entry);
    }

    newTransaction() {
        this.resetEntry();
        this.state.transaction = null;  //destroy transaction
        this.state.items.clear();
    }

    registerItem(entry, isEdit = false) {

        var property = _.find(this.lookups.villa_location, (item) => item.code == entry.location);
        var villa = _.find(this.lookups.villas, (item) => item.id == entry.villa_id);
        var payee = _.find(this.lookups.payees, (item) => item.id == entry.payee_id);
        

        entry.account = entry.acct_code;
        entry.property = property.name;
        entry.villa = villa.villa_no;
        entry.payee = payee.name;
        entry.payment_date = moment(entry.payment_date).format("L")
        entry.doc_date = moment(entry.doc_date).format("L")

        //wait for the amount to fetch and display it with proper debit credit display
        if(entry.expense_type == 'debit') {
            entry.debit_amount = entry.amount;
            entry.credit_amount = 0;
        }
        else {
            entry.credit_amount = entry.amount;
            entry.debit_amount = 0;
        }
        


        if (isEdit) {
            this.state.items.update(entry, this.state.current)
        } 
        else {
            this.state.items.add(entry)
        }
    }

    insertItem(callback) {

        this.errors.register(this.validator.validate(this.state.entry));
        if (this.errors.hasError())
            return false;

        //if key exist it is meant for editing
        if (this.state.current !== null) {
            this.registerItem(this.state.entry, true)
        }
            
        else {
            this.registerItem(cloneObject(this.state.entry))
            this.smart.capture(this.state.entry.doc_no);    //capture doc no to present in the future repetitive
        }
        
        callback(this.state.entry)
        
        this.resetEntry();
    }

    editItem(key) {
        const editExpense = this.state.items.find(key)
        copiedValue(editExpense, this.state.entry, ['account', 'id', 'key', 'payee', 'property', 'villa']);
        this.state.current = editExpense.key;
    }

    removeItem(key) {

        this.state.items.remove(key);
    }

    fork(key) {
        this.resetEntry();
        let forked = this.state.items.find(key); 
        //clone
        copiedValue(forked,this.state.entry,['account', 'id', 'key', 'payee', 'property', 'villa'])
    }

    suggest(prop) {
        
        if(this.smart.count >= 3) {
            this.state.entry[prop] = this.smart.snap;
            this.smart.stopCount(3);
        }
    }
    
    updateDescription(description,amount) {
        this.state.entry.description = description;
        this.state.entry.amount = amount;
    }
}

const state = {
    expense: new Expense(),
    options: {
        isPayeeLoaded: false,
        isPayeeCreated: false,
    },
}


const mutations = {
    removeItem: (state, payload) => state.expense.removeItem(payload.key),
    insertItem: (state,callback) => state.expense.insertItem(callback),
    editItem: (state, payload) => state.expense.editItem(payload.key),
    reset: (state) => state.expense.resetEntry(),
    new: (state) => state.expense.newTransaction(),
    suggest: (state,payload) => state.expense.suggest(payload.prop),
    fork: (state,payload) => state.expense.fork(payload.key),
    updateDescription: (state,payload) => state.expense.updateDescription(payload.description,payload.amount)
}

const actions = {
    create: ({state}) => state.expense.create(),
    save: ({state},callback) => state.expense.save(false,callback),
    post: ({state},callback) => state.expense.save(true,callback),
    edit: ({state}, payload) => state.expense.edit(payload.transactionNo),
    fetch: ({state}) => state.expense.fetch(),
    fetchPayees: ({state}) => state.expense.fetchPayees(),
    fetchPredictive: ({state}) => state.predictive.fetch()
}

const getters = {
    expense: (state) => state.expense.state,
    expenses: (state) => state.expense.state.expenses,
    lookups: (state) => state.expense.lookups,
    errors: (state) => state.expense.errors,
    options: (state) => state.options,
    filtered_villas: (state) => {
        const filters = state.expense.lookups.villas.filter((item) => {
            return item.location === state.expense.state.entry.location
        });
        return filters;
    }
}

const expenditureModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

export default expenditureModule;