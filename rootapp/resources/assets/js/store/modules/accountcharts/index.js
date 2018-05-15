


class AccountChart {

    constructor() {

        this.accounts;
        this.account = {};
        this.lookups = [];
    }

    create() {
        
        axiosRequest.dispatchGet("/api/chart/create")
            .then((response) => {
                this.lookups = response.data.lookups;
                this.account = response.data.account;
            })
            .catch((error) => toastr.error(e.response.message));
        
    }

    edit(item) {
        axiosRequest.dispatchGet('/api/chart/' + item.id + '/edit/')
            .then((response) => {
                this.account = response.data.data;
                this.lookups = response.data.lookups;
            });
    }

    save(cb) {
        let repeatMe = null;
        if(this.account.id) {
            repeatMe = axiosRequest.patch('chart','update',this.account);
        }
        else {
            repeatMe = axiosRequest.post('chart','store',this.account)
        }
        
        repeatMe.then((response) => cb())
            .catch((error) => toastr.error(e.response.message));
    }

    update(cb) {
        axiosRequest.patch('chart','update',this.account)
            .then((response) => cb())
            .catch((error) => toastr.error(e.response.message));
    }


    redirect() {
        axiosRequest.redirect('chart','');
    }
}

const state = {
    acctChart: new AccountChart(),
};

const mutations = {
    
};

const actions = {
    create: ({state}) => state.acctChart.create(),
    redirect: ({state}) => state.acctChart.redirect(),
    save: ({state},cb) => state.acctChart.save(cb),
    update: ({state},cb) => state.acctChart.update(cb),
    edit: ({state},payload) => state.acctChart.edit(payload)
};

const getters = {
    accounts: (state) => {return state.acctChart.accounts},
    account: (state) => {return state.acctChart.account},
    lookups: (state) => {return state.acctChart.lookups}
};

const accountChartsModule = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

export default accountChartsModule;
