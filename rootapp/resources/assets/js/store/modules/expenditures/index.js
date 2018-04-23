import {cloneObject, ErrorValidations} from "../../../helpers/helpers";

const InstanceStorage = {
    _instance: null,
    set: (entry) => {
        this._instance = entry;
    },
    get: () => {
        return cloneObject(this._instance);
    }
}

const Validation = {
    _rules: [],
    validate: (inputs) => {
        var messageErrors = {};

        _.each(this._rules, (value, key) => {
            //break sem
            var attributes = value.split('|');

            if (attributes.length === 1) {
                if (inputs[key] !== undefined) {
                    if (inputs[key].trim().length === 0) {
                        messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                    }
                }
            }
            else {
                if (inputs[key] !== undefined) {
                    if (attributes[1] == 'integer') {
                        if (inputs[key] === null || isNaN(inputs[key])) {
                            messageErrors[key] = "This field" + key.toUpperCase() + "is required";
                        }
                        else if (inputs[key] === 0) {
                            if (key === 'villa_id') {
                                messageErrors[key] = "This field Villa No is required";
                            }
                        }
                    }
                }
            }

        });

        return messageErrors;

    },
    setRules: (rules) => {
        this._rules = rules;
    }
}


//validation
class ItemHandler {

    constructor() {
        this.items = [];
        this.autoKeyId = 0;
    }

    add(item) {
        let newKeyId = this.items.length;
        if (newKeyId === 0) {
            newKeyId = 1;
        }
        else {

            newKeyId = this.items[newKeyId - 1].key + 1;
        }

        item.key = newKeyId;
        this.items.push(item);
    }

    remove(id) {
        if (this.items.length > 0) {
            this.items = _.filter(this.items, (item) => {
                return item.key !== id;
            });
        }
        else {
            //do nothing
        }
    }

    all() {
        return this.items;
    }

    sum(column) {
        let sum = 0;
        _.forEach(this.items,(value) => {
            console.log(value);
            console.log(value[column]);
             sum += parseFloat(value[column])
        });
        console.log(sum);
        return sum;
    }
}


const state = {
    expenses: {
        data: []
    },
    expense: {
        entry: {},
        items: new ItemHandler()
    },
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
    redirectToList(state) {
        axiosRequest.redirect('expenses', '');
    },
    redirectToRegister(state, payload) {
        if (payload) axiosRequest.redirect('expenses', '', payload.id);
        else axiosRequest.redirect('expenses', 'create');
    },
    clearPayee(state) {
        state.payee.single = {};
    },
    create(state) {
        state.expense.entry = InstanceStorage.get();
    },
    removeTransaction(state, payload) {
        state.expense.items.remove(payload.key);
    },
    insertTransaction(state) {

        state.errors.expense.register(Validation.validate(state.expense.entry));
        if (state.errors.expense.hasError())
            return false;

        var newExpenseInstance = cloneObject(state.expense.entry);

        var account = _.find(state.lookups.accounts, (item) => {
            return item.code == state.expense.entry.acct_code;
        });

        var property = _.find(state.lookups.villa_location, (item) => {
            return item.code == state.expense.entry.location;
        });

        var villa = _.find(state.lookups.villas, (item) => {
            return item.id == state.expense.entry.villa_id;
        });

        var payee = _.find(state.lookups.payees, (item) => {
            return item.id == state.expense.entry.payee_id;
        });

        newExpenseInstance.account = state.expense.entry.acct_code + " - " + account.description;
        newExpenseInstance.property = property.name;
        newExpenseInstance.villa = villa.villa_no;
        newExpenseInstance.payee = payee.name;

        state.expense.items.add(newExpenseInstance);

    }
}

const actions = {
    fetch({state}) {
        axiosRequest.get('expenses', '').then(r => {
            state.expenses = r.data;
        });
    },
    create({state, commit}) {

        axiosRequest.get('expenses', 'create').then(r => {

            InstanceStorage.set(r.data.data);
            Validation.setRules(r.data.rules);

            state.lookups = r.data.lookups;

            commit('create', r.data);
        })
    },
    createPayee({state, commit}) {
        if (_.isEmpty(state.payee.single)) {

            axiosRequest.get('payee', 'create').then(r => {
                state.payee.single = r.data.data;
                state.payee.lookups = r.data.lookups;
            });

            state.options.isPayeeCreated = true;
        }
    },
    save({commit, state}) {

        axiosRequest.post('expenses', 'store', {transactions: state.expense.items.all()})
            .then(r => {
                toastr.success('Save successfully!!!');
                //commit("redirectToList");
            })
            .catch(e => {
                if (e.response.status === 422) {
                    state.errors.expense.register(e.response.data);
                }
            });
    },
    edit({commit, state}) {
        axiosRequest.post('expenses', 'update', state.expense)
            .then(r => {
                toastr.success('Save successfully!!!');
                commit("redirectToList");
            })
            .catch(e => {
                if (e.response.status === 422) {
                    state.errors.expense.register(e.response.data);
                }
            });
    },
    fetchPayees({commit, state}) {
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
        return state.expense;
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
            return item.location === state.expense.entry.location
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




