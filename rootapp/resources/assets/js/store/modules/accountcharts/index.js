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
        state.lookups = data;
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
    save({state,commit}) {
        
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
    getters
}

export default accountChartsModule;