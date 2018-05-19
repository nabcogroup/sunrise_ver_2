import { cloneObject, copiedValue, ErrorValidations, Validator,ItemHandler,InstanceStorage } from "../../../helpers/helpers";

var moment = moment || require('moment');


class Expense {

    constructor() {

        this.state = {
            transaction: null,
            current: null,
            entry: {},
            items: new ItemHandler(),
            expenses: []
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
                else {
                    this.count++;
                }
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

    create(data) {
        axiosRequest.get('expenses', 'create').then(r => {
            this.instanceStorage = new InstanceStorage(r.data.data);
            this.state.entry = this.instanceStorage.getClone();
            this.validator.setRules(r.data.rules);
            this.lookups = r.data.lookups;
        })
    }

    save() {
        axiosRequest.post('expenses', 'store', { transactions: this.state.items.all()})
            .then(r => {
                toastr.success('Save successfully!!!')
            })
            .catch(e => {
                if (e.response.status === 422) {
                    this.errors.register(e.response.data);
                }
            });
    }

    saveAndPost() {
        axiosRequest.post('expenses', 'post', { transactions: this.state.items.all()})
            .then(r => { 
                toastr.success('Save successfully!!!'); 
            })
            .catch(e => {
                if (e.response.status === 422) {
                    this.errors.register(e.response.data);
                }
            });
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
        this.state.transaction = null;
        this.state.items.clear();
    }

    registerItem(entry, isEdit = false) {

        var account = _.find(this.lookups.accounts, (item) => item.code == entry.acct_code);
        var property = _.find(this.lookups.villa_location, (item) => item.code == entry.location);
        var villa = _.find(this.lookups.villas, (item) => item.id == entry.villa_id);
        var payee = _.find(this.lookups.payees, (item) => item.id == entry.payee_id);

        entry.account = entry.acct_code;
        entry.property = property.name;
        entry.villa = villa.villa_no;
        entry.payee = payee.name;
        entry.payment_date = moment(entry.payment_date).format("L")
        entry.doc_date = moment(entry.doc_date).format("L")

        if (isEdit) {
            this.state.items.update(entry, this.state.current)
        } 
        else {
            this.state.items.add(entry)
        }
    }

    insertItem() {

        this.errors.register(this.validator.validate(this.state.entry));
        if (this.errors.hasError())
            return false;

        //if key exist it is meant for editing
        if (this.state.current !== null) {
            this.registerItem(this.state.entry, true)
        }
            
        else {
            this.registerItem(cloneObject(this.state.entry))
            this.smart.capture(this.state.entry.doc_no);
        }
            


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

    suggest(prop) {
        if(this.smart.count >= 3) {
            this.state.entry[prop] = this.smart.snap;
            this.smart.stopCount(3);
        }
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
    insertItem: (state) => state.expense.insertItem(),
    editItem: (state, payload) => state.expense.editItem(payload.key),
    reset: (state) => state.expense.resetEntry(),
    new: (state) => state.expense.newTransaction(),
    suggest: (state,payload) => state.expense.suggest(payload.prop)
}

const actions = {
    create: ({state}) => state.expense.create(),
    save: ({state}) => state.expense.save(),
    post: ({state}) => state.expense.saveAndPost(),
    edit: ({state}, payload) => state.expense.edit(payload.transactionNo),
    fetch: ({state}) => state.expense.fetch()
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