
import {ErrorValidations, cloneObject, copiedValue, reIndexing,validation} from "../../../helpers/helpers";

const state = {
    bill: {
        bill_no: '',
        payments: [],
        instance: {},
        paymentSummary: {
            total_payment: 0,
            total_cost: 0
        }
    },
    contract: {
        tenant: {},
        villa: {}
    },
    search: {},
    cloneOfInstance: {},
    lookups: [],
    errors: new ErrorValidations(),
    options: {
        loadingSave: false,
        loadingSearch: false,
        currentTabIndex: 'received'
    },
}

const mutations = {
    clearPayment(state) {
        state.bill.payments = [];
    },
    validate(state, payload) {
        //validate on client side
        const result = validation().validate(state.cloneOfInstance, state.bill.payments);
        payload.cb(result);
    },
    createInstance(state) {
        state.cloneOfInstance = cloneObject(state.bill.instance);
    },
    edit(state,payload) {
        copiedValue(payload.payment, state.cloneOfInstance);
    },
    store(state,payload) {
        const trigger = payload.trigger;
        const result = validation().validate(state.cloneOfInstance, state.bill.payments);
        if(result.isValid) {
            if(trigger === 'createInstance') {
                state.bill.payments.push(state.cloneOfInstance);
                reIndexing(state.bill.payments);
                payload.cb(true);
            }
            else {
                let p = state.bill.payments.find( item => item.id === state.cloneOfInstance.id);
                copiedValue(state.cloneOfInstance,p);
                payload.cb(true);
            }    
        }
        else {
            toastr.error(result.error);
            payload.cb(false);
        }
    },
    convertPayment(state,payload) {
        const convertion = state.lookups[payload.source].find(item => {
            return item.code == state.cloneOfInstance[payload.needle];
        });
        state.cloneOfInstance[payload.target] = convertion.name;
    },
    removePayment(state, id) {
        state.bill.payments = state.bill.payments.filter((payment) => {
            return payment.id !== id
        });
        reIndexing(state.bill.payments);
    },
    redirectToPrint(state) {
        axiosRequest.redirect('bill', 'show', state.bill.bill_no, "_blank");
    }
}

const actions = {
    create({commit, state}, payload) {

        state.bill = payload.bill;
        state.contract = payload.contract;
        state.lookups = payload.lookups;

        reIndexing(state.bill.payments);

        commit('createInstance');
    },
    save({commit, state}, payload) {
        state.options.loadingSave = true;
        axiosRequest
            .post('bill', 'store', state.bill)
            .then(r => {
                state.options.loadingSave = false;
                //commit('redirectToPrint', {billId: r.data.bill.billNo});
                axiosRequest.redirect('contract', '');
            })
            .catch(e => {
                if (e.response.status === 422)
                    toastr.error(e.response.data.payments[0]);
                else
                    toastr.error(e.response.data.message);
                state.options.loadingSave = false;
            });
    },
    prepare({commit, state}) {
        const cloneOfInstance = state.cloneOfInstance;
        axiosRequest.dispatchGet('/api/bill/prepare', cloneOfInstance)
            .then(r => {
                state.bill.payments = r.data;
                reIndexing(state.bill.payments);
            })
            .catch(e => {
                toastr.error("Internal errors occured");
            })
    }
}

const getters = {
    bill(state) {
        return state.bill;
    },
    payments(state) {
        return state.bill.payments;
    },
    contract(state) {
        return state.contract;
    },
    lookups(state) {
        return state.lookups;
    },
    totalPayment(state) {
        const sum = _.sumBy(state.bill.payments, (p) => parseInt(p.amount)) || 0;
        return {
            total_payment: sum,
            total_cost: state.contract.amount
        };
    },
    viewIcon(state) {
        return state.options.loadingSave ? "fa-refresh fa-spin" : "fa-save";
    },
    option(state) {
        return state.options;
    },
    cloneOfInstance(state) {
        return state.cloneOfInstance;
    }
}

const billModule = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default billModule;

