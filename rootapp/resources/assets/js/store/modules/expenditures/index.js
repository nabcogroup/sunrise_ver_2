import {cloneObject, ErrorValidations} from "../../../helpers/helpers";


const state = {
    expenses: {
        data: []
    },
    expense: {
        entry: {},
        items: []
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
        if (payload) {
            axiosRequest.redirect('expenses', '', payload.id);
        }
        else {
            axiosRequest.redirect('expenses', 'create');
        }
    },
    clearPayee(state) {
        state.payee.single = {};
    },
    insertTransactions(state) {
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
            return item.payee_code = state.expense.entry.payee;
        });

        newExpenseInstance.account = state.expense.entry.acct_code + " - " + account.description;
        newExpenseInstance.property = property.name;
        newExpenseInstance.villa = villa.villa_no;
        newExpenseInstance.payee = payee.name;

        state.expense.items.push(newExpenseInstance);
    }
}

const actions = {
    fetch({state}) {
        axiosRequest.get('expenses', '').then(r => {
            state.expenses = r.data;
        });
    },
    create({state}) {
        axiosRequest.get('expenses', 'create').then(r => {
            state.expense.entry = r.data.data;
            state.lookups = r.data.lookups;
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
        axiosRequest.post('expenses', 'store', state.expense)
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
    },
    edit({state}, payload) {
        axiosRequest.get('expenses', 'edit', payload.id).then(r => {
            state.expense = r.data.data;
            state.lookups = r.data.lookups;
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
    filtered_villas(state) {

        const filters = state.lookups.villas.filter((item) => {
            return item.location === state.expense.entry.location
        });

        return filters;

    },
    lookups(state) {
        return state.lookups;
    },
    errors(state) {
        return state.errors.expense;
    },
    options(state) {
        return state.options;
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




