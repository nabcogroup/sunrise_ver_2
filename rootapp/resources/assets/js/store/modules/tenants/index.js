import {
    ErrorValidations
} from "../../../helpers/helpers"


const state = {
    key: '',
    tenant: {
        tenant_address: {}
    },
    lookups: {},
    errors: new ErrorValidations()
};

const mutations = {
    fetchData(state, payload) {
        state.tenant = payload.tenant;
        state.lookups = payload.lookups;
    },
    toEdit({state,commit}, id) {
        axiosRequest.redirect('tenant', 'register', id)
    },
    toCreate({state,commit}) {
        axiosRequest.redirect('tenant', 'register')
    }
}

const actions = {
    fetchData({
        state,
        commit
    }) {
        axiosRequest.get('tenant', 'edit', this.key)
            .then(r => commit('fetchData', {
                tenant: r.data.tenant,
                lookups: r.data.lookups
            }))
            .catch(e => {
                if (e.response.status === 422) {
                    state.errors.register(e.response.data);
                }
            });
    },
    save({
        state,
        commit
    }) {
        axiosRequest.post('tenant', 'store', state.tenant)
            .then(r => {
                toastr.success("Successfully save");
                axiosRequest.redirect("tenant", "");
            })
            .catch(e => {
                if (e.response.status === 422) {
                    state.errors.register(e.response.data);
                }
            });
    }
}



const getters = {
    tenant(state) {
        return state.tenant;
    },
    lookups(state) {
        return state.lookups;
    },
    labels(state) {
        if (state.tenant.type == 'individual') {
            return {
                regName: "Company",
                fullName: "Full Name",
                regDate: "Birthday",
                regNo: "Qatar Id"
            }
        } else {
            return {
                regName: "Representative",
                fullName: "Business Name",
                regDate: "Validity Date",
                regNo: "CR No"
            }
        }
    },
    showGender(state) {
        return state.tenant.type === 'individual';
    }
}

const tenantModule = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}


export default tenantModule;