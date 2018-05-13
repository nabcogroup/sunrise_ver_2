import {
    cloneObject,
    ErrorValidations
} from "../../../helpers/helpers";

//class helper
class InstanceStorage {

    constructor(instance = null) {
        this._instance = instance;
    }

    set(entry) {
        this._instance = entry;
    }

    get() {
        return cloneObject(this._instance);
    }
}

class Validator {

    constructor() {
        this._rules = [];
    }

    validate(inputs) {

        let messageErrors = {}
    _.each(this._rules, (value, key) => {
            if (typeof (inputs[key]) === undefined) {
                return;
            }

            //break sem
            let attributes = value.split('|')
            let option = {
                type: 'string',
                condition: ''
            }
            
            if (attributes.length > 1) {
                option.type = attributes[1]
                option.condition = typeof (attributes[2]) == 'undefined' ? '' : attributes[2]
            }
            
            let inputVal = typeof(inputs[key]) !== "undefined" ? inputs[key] : '';
            switch (option.type) {
                case 'string':
                    if (inputVal.length === 0 || inputVal === null) {
                        messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                    }
                    break;
                case 'integer':
                    
                    let intRegex = /^\d+$/;
                    if (inputVal === null || isNaN(inputVal) ) {
                        messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                    }
                    else if(!intRegex.test(inputVal)) {
                      messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                    }
                    else {
                        if(option.condition !== '') {
                            //check additional condition met
                            if (inputVal === option.condition) {
                                messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                            }        
                        }
                    }
                    break;

                default:

                    break;
            }
        })
        return messageErrors;
    }

    setRules(rules) {
        this._rules = rules;
    }

}

//validation
class ItemHandler {
    
    constructor() {
        /**
         * @TODO: adding tag
         */

        this.items = {
            data: [],
            deletedItems: []
        };
        
        this.autoKeyId = 0;
        this.isEditMode = false;
    }
    

    add(item) {
        
        let newKeyId = this.items.data.length;
        
        //********************
        //  @TODO tagging item expense entry
        // 1 check if item has transaction and id
        // 2 if true make the tag to edit
        // 3 otherwise tag new
        if(item.id && item.transaction_no) {
            item.tag = 'edit';
        }


        if (newKeyId === 0) {
            newKeyId = 1;
        } 
        else {
            newKeyId = this.items.data[newKeyId - 1].key + 1;
        }
        item.key = newKeyId;
        this.items.data.push(item);
    }

    remove(id) {

        /***************
            @TODO: seperate stack for deletion of stored when removed
            to notify server the removal of deleted item
        */
        if (this.items.data.length > 0) {
            this.items.data = _.filter(this.items.data, (item) => {
                if(item.key === id && item.id && item.transaction_no) {
                    this.items.deletedItems.push(item.id);
                }
                return item.key !== id;
            });
        } 
        else {
            //do nothing
            
        }
        
    }

    find() {

    }

    clear() {
        this.items.data = [];
    }

    all() {
        return this.items.data;
    }

    visible() {

    }

    sum(column) {
        return _.sumBy(this.items.data, (item) => {
            return item[column]
        });
    }
}

class ExpenseHandler {

    constructor() {

        this.state = {
            entry: {},
            items: new ItemHandler()
        };

        this.instanceStorage = null;
    }

    register(items, lookups) {
        this.state.items.clear();
        _.each(items, (entry) => {

            var account = _.find(lookups.accounts, (item) => {
                return item.code == entry.acct_code;
            });

            var property = _.find(lookups.villa_location, (item) => {
                return item.code == entry.location;
            });

            var villa = _.find(lookups.villas, (item) => {
                return item.id == entry.villa_id;
            });

            var payee = _.find(lookups.payees, (item) => {
                return item.id == entry.payee_id;
            });



            entry.account = this.state.entry.acct_code + " - " + account.description;
            entry.property = property.name;
            entry.villa = villa.villa_no;
            entry.payee = payee.name;

            this.state.items.add(entry);

        });
    }

    create(data) {
        this.instanceStorage = new InstanceStorage(data);
        this.state.entry = this.instanceStorage.get();
    }

    addItem(entry, lookups) {

        var account = _.find(lookups.accounts, (item) => {
            return item.code == this.state.entry.acct_code;
        });

        var property = _.find(lookups.villa_location, (item) => {
            return item.code == this.state.entry.location;
        });

        var villa = _.find(lookups.villas, (item) => {
            return item.id == this.state.entry.villa_id;
        });

        var payee = _.find(lookups.payees, (item) => {
            return item.id == this.state.entry.payee_id;
        });

        entry.account = this.state.entry.acct_code + " - " + account.description;
        entry.property = property.name;
        entry.villa = villa.villa_no;
        entry.payee = payee.name;

        this.state.items.add(entry);
    }

    getItem(key) {
        let item = this.items.find(key);

        if(typeof(item) !== "undefined") {
            this.state.entry = cloneObject(item);
        }
    }

    removeItem(key) {
        this.state.items.remove(key);
    }

    get() {
        return this.state;
    }

    getItems() {
        return this.state.items.all();
    }

}

const validator = new Validator()

const state = {
    expenses: {
        data: []
    },
    expense: new ExpenseHandler(),
    payee: {
        data: [],
        single: {},
        lookups: {
            payee_type: []
        }
    },
    lookups: {
        villas: []
    },
    options: {
        isPayeeLoaded: false,
        isPayeeCreated: false,
    },
    errors: {
        expense: new ErrorValidations(),
        payee: new ErrorValidations()
    }
}


const mutations = {
    clearPayee(state) {
        state.payee.single = {};
    },
    removeTransaction(state, payload) {
        state.expense.removeItem(payload.key);
    },
    insertTransaction(state) {
        state.errors.expense.register(validator.validate(state.expense.get().entry));
        if (state.errors.expense.hasError())
            return false;
        
        let newExpenseInstance = cloneObject(state.expense.get());
        
        state.expense.addItem(newExpenseInstance, state.lookups);
    }
}

const actions = {
    fetch({state}) {
        axiosRequest.get('expenses', '').then(r => {
            state.expenses = r.data;
        });
    },
    create({ state, commit }) {
        axiosRequest.get('expenses', 'create').then(r => {
            state.expense.create(r.data.data);
            validator.setRules(r.data.rules);
            state.lookups = r.data.lookups;
        })
    },
    createPayee({ state, commit }) {
        if (_.isEmpty(state.payee.single)) {
            axiosRequest.get('payee', 'create').then(r => {
                state.payee.single = r.data.data;
                state.payee.lookups = r.data.lookups;
            });
            state.options.isPayeeCreated = true;
        }
    },
    save({ commit, state }) {
        let transactions = state.expense.getItems()
        axiosRequest.post('expenses', 'store', { transactions: transactions })
            .then(r => {
                toastr.success('Save successfully!!!');
            })
            .catch(e => {
                if (e.response.status === 422) {
                    state.errors.expense.register(e.response.data);
                }
            });
    },
    edit({ commit, state }, payload) {
        axiosRequest.get('expenses', 'edit/' + payload.transactionNo)
            .then(r => state.expense.register(r.data.data, state.lookups))
            .catch(e => {
                if (e.response.status === 422) {
                    state.errors.expense.register(e.response.data);
                }
            });
    },
    fetchPayees({ commit, state }) {
        axiosRequest.post('payee', 'store', state.payee.single)
            .then(r => {
                state.lookups.payees = r.data;
                commit('clearPayee');
            })
            .catch(e => {
                if (e.response.status === 422) {
                    state.errors.payee.register(e.response.data)
                }
            })
    }
}

const getters = {
    expense(state) {
        return state.expense.get();
    },
    expenses(state) {
        return state.expenses.data;
    },
    payee(state) {
        return state.payee.single;
    },
    payeeTypes(state) {
        return state.payee.lookups.payee_type;
    },
    lookups(state) {
        return state.lookups;
    },
    errors(state) {
        return state.errors.expense;
    },
    options(state) {
        return state.options;
    },

    filtered_villas(state) {
        const filters = state.lookups.villas.filter((item) => {
            return item.location === state.expense.get().entry.location
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