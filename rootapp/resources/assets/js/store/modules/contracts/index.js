import {ErrorValidations} from "../../../helpers/helpers";

const state = {
    contracts: {data: []},
    contractForTerminateId: 0,
    status: "pending",
    contractForTerminate: {
        id: 0,
        contract_no: '',
        tenant_name: '',
        description: '',
        password: '',
        ref_no: ''
    },
    contract: {
        register_tenant: {
            tenant_address: {}
        }
    },
    tenant_default: {
        tenant_address: {}
    },
    lookups: {
        contract_type: [],
        tenant_type: []
    },
    errors: {
        terminateError: new ErrorValidations(),
        contractError: new ErrorValidations()
    }
};

const mutations = {
    load(state, payload) {
        state.contracts = payload.data;
    },
    redirectToRegister(state) {
        axiosRequest.redirect("contract", "register");
    },
    redirectToRead(state, id) {
        axiosRequest.redirect('bill', 'show', id, '_blank');
    },
    createBill(state, contract_no) {
        axiosRequest.redirect("bill", "create", contract_no);
    },
    cancel(state, payload) {
        state.contracts = state.contracts.data.filter((item) => {
            return item.id != payload.contractId
        });
    },
    setContractForTerminate(state, payload) {

        if (payload) {
            state.contractForTerminate.id = payload.id
            state.contractForTerminate.contract_no = payload.contract_no;
            state.contractForTerminate.tenant_name = payload.full_name;
        }
    }
};

const actions = {
    load({commit, state}, payload) {
        let url = "/api/contract/list/" + state.status;
        if (payload) {
            url = payload.url;
        }

        axiosRequest.dispatchGet(url)
            .then(r => {
                commit('load', {data: r.data});
            }).catch(e => toastr.error(e.response.message))
    },
    create({state}) {
        axiosRequest.get('contract', 'create').then((r) => {
            state.contract = r.data.data;
            state.lookups = r.data.lookups;
            state.tenant_default = state.contract.register_tenant;
        });
    },
    recalc({state}) {
        const data = {
            villa_id: state.contract.villa_id,
            period_start: state.contract.period_start,
            period_end: state.contract.period_end
        };
        axiosRequest.post("contract", "recalc", data)
            .then((r) => {
                state.contract.amount = r.data.amount;
            })
            .catch((e) => {
                toastr.errors(e.response.message);
            });
    },
    save({state}) {
        //remove villa first
        axiosRequest.post("contract", "store", state.contract)
            .then((r) => {
                axiosRequest.redirect("bill", "create", r.data.data.id);
            })
            .catch((error) => {
                if (error.response.status == 422)
                    state.errors.contractError.register(error.response.data);
                    toastr.error("Unable to save");
                if (cbError) cbError();
            });
    },
    cancel({commit, state}, payload) {

        axiosRequest.post("contract", "cancel", {id: payload.contractId})
            .then(r => {
                if (r.data.isOk) {
                    payload.done();
                }
            })
            .catch(e => payload.cbError(e.response.data.message));

    },
    terminate({commit, state}) {

        axiosRequest.post("contract", "terminate", state.contractForTerminate)
            .then((r) => {
                if (r.data.isOk) {
                    axiosRequest.redirect("contract","");
                }
            })
            .catch((e) => {
                if (e.response.status === 422) {
                    state.errors.terminateError.register(e.response.data);
                    toastr.error("Unable to save!!!");
                }
                else {
                    toastr.error(e.response.data.message);
                }



            });
    },
    remove({commit}, payload) {
        setTimeout(() => {
            commit('cancel', {
                contractId: payload.contractId
            });
            commit('filter', {
                statusIndex: payload.statusIndex
            });
        }, 100);
    },
    searchTenant({state, commit}) {

        const regId = state.contract.register_tenant.reg_id;
        state.contract.register_tenant = state.tenant_default;
        state.contract.register_tenant.reg_id = regId;


        axiosRequest.get('tenant', 'search', state.contract.register_tenant.reg_id)
            .then(r => {
                state.contract.register_tenant = r.data;
                toastr.success("Tenant found");
            })
            .catch(e => {
                toastr.error(e.response.data.message)
            })
    },
};
const getters = {
    contracts(state) {
        return state.contracts;
    },
    contract(state) {
        return state.contract;
    },
    contractForTerminate(state) {
        return state.contractForTerminate
    },
    status(state) {
        return state.status;
    },
    tenant(state) {
        return state.contract.register_tenant;
    },
    lookups(state) {
        return state.lookups;
    },
    showGender(state) {
        return state.contract.register_tenant.type === 'individual';
    },
    selectedVilla(state) {
        return _.find(state.contract.villa_list, (item) => {
            return item.id === state.contract.villa_id;
        });
        return false;
    },
    villas(state) {
        return state.contract.villa_list;
    },
    labels(state) {
        if (state.contract.register_tenant.type == 'individual') {
            return {
                regName: "Company",
                fullName: "Full Name",
                regDate: "Birthday",
                regNo: "Qatar Id"
            }
        }
        else {
            return {
                regName: "Representative",
                fullName: "Business Name",
                regDate: "Validity Date",
                regNo: "CR No"
            }
        }
    },
    stateErrors(state) {
        return state.errors.terminateError;
    },
    stateContractError(state) {
        return state.errors.contractError;
    }
};

const contractModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

export default contractModule;


