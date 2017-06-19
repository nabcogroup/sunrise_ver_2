import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const contractListStore = new Vuex.Store({
    state: {
        contracts: [],
        filterContracts: [],
        status: ['pending', 'active'],

    },
    getters: {
        filterContracts(state) {
            return state.filterContracts;
        }
    },
    mutations: {
        load(state, payload) {
            if (state.contracts.length > 0) {
                payload.data.forEach(item => {
                    state.contracts.push(item);
                });
            } else {
                state.contracts = payload.data;
            }
        },
        filter(state, payload) {
            state.filterContracts = state.contracts.filter(item => {
                return item.status.toLowerCase() == state.status[payload.statusIndex]
            });
        },
        redirectToRegister(state) {
            axiosRequest.redirect("contract", "register");
        },
        redirectToRead(state, id) {
            axiosRequest.redirect('contract', 'show', id, '_blank');
        },
        createBill(state, id) {
            let contract = _.find(state.contracts, (item) => {
                return item.id == id
            });
            axiosRequest.redirect("bill", "create", contract.contract_no);
        },
        cancel(state, payload) {
            let contract = _.find(state.contracts, (item) => {
                return item.id == payload.contractId
            });
            state.contracts.splice(state.contracts.indexOf(contract), 1);
        },
        find(state, payload) {
            let c = _.find(state.contracts, (item) => {
                return item.id == payload.id;
            });
            payload.cb(c);
        }
    },
    actions: {
        load({
            commit,
            state
        }, payload) {
            let status = state.status[payload.statusIndex];
            axiosRequest.get('contract', 'list', status)
                .then(r => {
                    commit('load', {
                        data: r.data
                    });
                    commit('filter', {
                        statusIndex: payload.statusIndex
                    });
                })
                .catch(e => {
                    payload.cbError(e.response.message);
                })
        },
        filter({
            commit,
            state
        }, payload) {

            commit('filter', {
                statusIndex: payload.statusIndex
            });

            if (state.filterContracts.length == 0) {
                let status = state.status[payload.statusIndex];
                axiosRequest.get('contract', 'list', status)
                    .then(r => {
                        commit('load', {
                            data: r.data
                        });
                        commit('filter', {
                            statusIndex: payload.statusIndex
                        });
                    })
                    .catch(e => {
                        payload.cbError(e.response.message);
                    })
            }
        },
        cancel({
            commit,
            state
        }, payload) {
            axiosRequest.post("contract", "cancel", {
                    id: payload.contractId
                })
                .then(r => {
                    if (r.data.isOk) {
                        commit('cancel', {
                            contractId: payload.contractId
                        });
                        commit('filter', {
                            statusIndex: payload.statusIndex
                        });
                    }
                })
                .catch(e => {
                    payload.cbError(e.response.data.message);
                });
        },
        remove({
            commit
        }, payload) {

            setTimeout(() => {
                commit('cancel', {
                    contractId: payload.contractId
                });
                commit('filter', {
                    statusIndex: payload.statusIndex
                });
            }, 100);
        }
    }
});

export const contractTerminateStore = new Vuex.Store({
    state: {
        info: {
            id: 0,
            contract_no: '',
            tenant_name: '',
            description: '',
            password: '',
            ref_no: ''
        }
    },
    getters: {
        info(state) {
            return state.info;
        }
    },
    mutations: {
        create(state, payload) {
            state.info.id = payload.id;
            state.info.contract_no = payload.contract_no;
            state.info.tenant_name = payload.tenant_name;
        }
    },
    actions: {
        save({
            commit,
            state
        }, payload) {
            axiosRequest.post("contract", "terminate", state.info)
                .then((r) => {
                    if (r.data.isOk) {
                        payload.success(state.info.id);
                    }
                })
                .catch((e) => {
                    if (e.response.status === 422) {
                        payload.error(422, e.response.data);
                    } else {
                        payload.error(500, e.response.data.message);
                    }
                });
        }
    }

});