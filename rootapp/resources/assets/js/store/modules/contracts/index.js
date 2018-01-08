import {
    ErrorValidations,
    copiedValue
} from "../../../helpers/helpers";


const state = {
    contracts: {
        data: []
    },
    contractForTerminateId: 0,
    status: "pending",
    contractForTerminate: {
        id: 0,
        contract_no: '',
        tenant_name: '',
        description: '',
        date_termination: moment(),
        password: '',
        ref_no: ''
    },
    contract: {
        register_tenant: {
            tenant_address: {}
        },
        tenant: {},
        villa: {}
    },
    rate_per_month: 0,
    tenant_default: {
        tenant_address: {}
    },
    lookups: {
        contract_type: [],
        tenant_type: []
    },
    filter: {
        location: ''
    },
    errors: {
        terminateError: new ErrorValidations(),
        contractError: new ErrorValidations(),
        renewError: new ErrorValidations()
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
            state.contractForTerminate.villa_no = payload.villa_no;
            state.contractForTerminate.contract_no = payload.contract_no;
            state.contractForTerminate.tenant_name = payload.full_name;
        }
    }
};

const actions = {
    load({
        commit,
        state
    }, payload) {
        let url = "/api/contract/list/" + state.status;
        if (payload) {
            url = payload.url;
        }
        axiosRequest.dispatchGet(url)
            .then(r => {
                commit('load', {
                    data: r.data
                });
            }).catch(e => toastr.error(e.response.message))
    },
    create({state}) {
        axiosRequest.get('contract', 'create').then((r) => {
            state.contract = {};
            state.contract = r.data.data;
            state.lookups = r.data.lookups;
            state.tenant_default = state.contract.register_tenant;
        });
    },
    renew({state,commit}, payload) {
        axiosRequest.get('contract', 'renew', payload.id)
            .then(r => {
                state.contract = {};
                state.contract = r.data.oldContract;
                state.lookups = r.data.lookups;
                payload.cb();
            })
            .catch(e => {
                toastr.error(e.response.data.message);
            });
    },
    update({state,commit}, payload) {
        
        var data = {
            id: state.contract.id,
            contract_type : state.contract.contract_type,
            extra_days: state.contract.extra_days,
            prep_series: state.contract.prep_series,
            prep_bank: state.contract.prep_bank,
            prep_due_date: state.contract.prep_due_date,
            prep_ref_no: state.contract.prep_ref_no,
            period_start: state.contract.period_start,
            period_end: state.contract.period_end,
            amount: state.contract.amount
        };

        axiosRequest.post('contract', 'renew', data)
            .then(r => commit('createBill', r.data.data.id))
            .catch(e => {if (e.response.status === 422) state.errors.renewError.register(e.response.data);});
    },
    recalc({state}, payload) {

        const data = {
            villa_id: state.contract.villa_id,
            period_start: state.contract.period_start,
            custom_rate: payload !== undefined ? payload.rate : 0,
            period_end: state.contract.period_end
        };
        axiosRequest.post("contract", "recalc", data)
            .then((r) => state.contract.amount = r.data.amount)
            .catch((e) => toastr.errors(e.response.message));
    },
    save({state}) {
        let contract = {};
        
        //cleansing of data
        copiedValue(state.contract, contract, 
            ["full_status", "is_extra", 
            "payable_per_month", "tenant_id", 
            "total_year_month", "total_received_payment",
            "villa_list","full_contract_type","full_period_start","full_period_end"]);
        
        //remove villa first
        axiosRequest.post("contract", "store", contract)
            .then((r) => axiosRequest.redirect("bill", "create", r.data.data.id))
            .catch((error) => {
                if (error.response.status == 422)
                    state.errors.contractError.register(error.response.data);
                toastr.error("Unable to save");
                if (cbError) cbError();
            });
    },
    cancel({commit,state}, payload) {
        axiosRequest.post("contract", "cancel", {
                id: payload.contractId
            })
            .then(r => {
                if (r.data.isOk) {
                    payload.done();
                }
            })
            .catch(e => payload.cbError(e.response.data.message));

    },
    terminate({
        commit,
        state
    }, payload) {

        axiosRequest.post("contract", "terminate", state.contractForTerminate)
            .then((r) => {
                if (r.data.isOk) {
                    payload.success();
                }
            })
            .catch((e) => {
                if (e.response.status === 422) {
                    state.errors.terminateError.register(e.response.data);
                    toastr.error("Unable to save!!!");
                } else {
                    toastr.error(e.response.data.message);
                }



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
    },
    searchTenant({
        state,
        commit
    }) {

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
        const v = _.find(state.contract.villa_list, (item) => {
            return item.id == state.contract.villa_id;
        }) || {};
        return v;

    },
    villas(state) {
        return _.filter(state.contract.villa_list, (item => item.location == state.filter.location));
    },
    labels(state) {
        if (state.contract.register_tenant.type == 'individual') {
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
    stateErrors(state) {
        return state.errors.terminateError;
    },
    stateContractError(state) {
        return state.errors.contractError;
    },
    stateRenewError(state) {
        return state.errors.renewError;
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