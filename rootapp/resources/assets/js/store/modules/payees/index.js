import {ErrorValidations} from "../../../helpers/helpers";

const state = {
    payee: {
        data: [],
        single: {},
        lookups: {
            payee_type: []
        }
    },
    errors: new ErrorValidations()
}

const mutations = {
    clearPayee(state) {
        state.payee.single= {};
    }
}

const actions = {
    create({state,commit}) {
        if(_.isEmpty(state.payee.single)) {
            axiosRequest.get('payee','create').then(r => {
                state.payee.single = r.data.data;
                state.payee.lookups = r.data.lookups;
            });
        }
    },
    save({commit,state},payload) {

        axiosRequest.post('payee','store',state.payee.single)
            .then(r => {
                commit('clearPayee');
                toastr.success("Payee successfully added");
                if(payload) payload.cb(r.data);
            })
            .catch(e => {
                if(e.response.status === 422) {
                    state.errors.register(e.response.data)
                }
            })
    },
}

const getters ={
    payee(state) {
        return state.payee.single;
    },
    payeeTypes(state) {
        return state.payee.lookups.payee_type;
    },
    errors(state) {
        return state.errors;
    }
}

const payeeModule = {
    namespaced:true,
    actions,
    state,
    getters,
    mutations
}

export default payeeModule;