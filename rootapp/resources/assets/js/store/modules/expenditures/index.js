import {ErrorValidations} from "../../../helpers/helpers";

const state = {
    expenses: {
        data: []
    },
    expense: {},
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
        axiosRequest.redirect('expenses','');
    },
    redirectToRegister(state,payload) {
        if(payload) {
            axiosRequest.redirect('expenses','create',payload.id);
        }
        else {
            axiosRequest.redirect('expenses','create');
        }
    },
    clearPayee(state) {
        state.payee.single= {};
    }
}

const actions = {
    fetch({state}) {
        axiosRequest.get('expenses','').then(r => {
            state.expenses = r.data;
        });
    },
    create({state}) {
        axiosRequest.get('expenses','create').then(r => {
            state.expense = r.data.data;
            state.lookups = r.data.lookups;
        })
    },
    createPayee({state,commit}) {
        if(_.isEmpty(state.payee.single)) {
            axiosRequest.get('payee','create').then(r => {
                state.payee.single = r.data.data;
                state.payee.lookups = r.data.lookups;
            });
            state.options.isPayeeCreated = true;
        }
    },
    save({ commit,state }) {
        axiosRequest.post('expenses','store',state.expense)
            .then(r => {
                toastr.success('Save successfully!!!');
                commit("redirectToList");
            })
            .catch(e => {
                if(e.response.status === 422) {
                    state.errors.expense.register(e.response.data);
                }
            });
    },
    fetchPayees({commit,state}) {
        axiosRequest.post('payee','store',state.payee.single)
            .then(r => {
                state.lookups.payees = r.data;
                commit('clearPayee');
            })
            .catch(e => {
                if(e.response.status === 422) {
                    state.errors.payee.register(e.response.data)
                }
            })
    },
    edit({state},payload) {
        axiosRequest.get('expenses','edit',payload.id).then(r => {
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
            return item.location === state.expense.location
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
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}


export default expenditureModule;




