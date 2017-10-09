const state = {
    accounts: [],
    account: {
        lookups: []
    }

};



const mutations = {
    fetchAll(state,data) {
        state.accounts = data;
    },
    create(state,data) {
        state.account = {
            code: "",
            description: "",
            account_type: "",
            lookups: data
        };
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
    edit({state,commit}) {

    }
};

const getters = {};


const accountChartsModule = {
    namespaced: true,
    state,
    mutations,
    getters
}

export default accountChartsModule;