const state = {
    accounts: [],
    account: {
    },
    lookups: []

};



const mutations = {
    fetchAll(state,data) {
        state.accounts = data;
    },
    create(state,data) {
        state.lookups = data.lookups;
    }
};


const actions = {
    fetchAll({state, commit}) {
        axiosRequest.dispatchGet("/api/chart")
            .then((response) => commit("fetchAll",response.data))
            .catch((error) => toastr.error(e.response.message));
    },
    create({state,commit}) {
        axiosRequest.dispatchGet("/api/chart/create")
            .then((response) => commit("create",response.data))
            .catch((error) => toastr.error(e.response.message));
    },

    save({state,commit},cb) {
        axiosRequest.post('chart','store',state.account)
            .then((response) => cb())
            .catch((error) => toastr.error(e.response.message));
    },
    edit({state,commit}) {

    }
};

const getters = {
    lookups(state) {
        return state.lookups || [];
    }
};


const accountChartsModule = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

export default accountChartsModule;
