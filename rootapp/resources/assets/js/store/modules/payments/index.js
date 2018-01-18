import {ErrorValidations, cloneObject, copiedValue,validation} from "../../../helpers/helpers";

const state = {
    bill: {
        bill_no: '',
        payments: [],
        instance: {},
    },
    contract: {
        tenant: {},
        villa: {}
    },
    search: {
        field: '',
        value: '',
        options: [
            {value: 'bill', label: 'Bill No'},
            {value: 'contract', label: 'Contract No'},
            {value: 'villa', label: 'Villa No'}
        ],
        data: []
    },
    cloneOfInstance: {},
    lookups: {
        bank_accounts: {}
    },
    errors: new ErrorValidations(),
    options: {
        loadingSave: false,
        loadingSearch: false,
        currentTabIndex: 'received'
    },
}

const mutations = {

    clearSearch(state) {
        state.search.data = [];
        state.search.field = "";
        state.search.value = "";
    },
    createInstance(state) {
        state.cloneOfInstance = cloneObject(state.bill.instance);
    },
    edit(state,payload) {
        copiedValue(payload.payment, state.cloneOfInstance);
    },
    replace(state,payload) {

        let p = state.bill.payments.find(item => item.id === payload.item.id);

        p.replace_ref = cloneObject(p);

        p.date_deposited = "";

        state.cloneOfInstance.id = p.id;

        copiedValue(state.cloneOfInstance,p,["replace_ref"]);

        payload.cb(true);

    },
    store(state,payload) {
        const trigger = payload.trigger;
        const result = validation().validate(state.cloneOfInstance, state.bill.payments);

        if(result.isValid) {
            if(trigger === 'createInstance') {
                state.bill.payments.push(state.cloneOfInstance);
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
    cancelPayment(state,payload) {

        var status = state.lookups.payment_status.find(item => {
            return item.code == 'cancelled';
        });

        payload.value.status = status.code;
        payload.value.full_status = status.name;
        
    },
    pendingPayment(state,payload) {

        var status = state.lookups.payment_status.find(item => {
            return item.code == 'pending_case';
        });

        payload.value.status = status.code;
        payload.value.full_status = status.name;

    },
    bouncePayment(state,payload) {
        var status = state.lookups.payment_status.find(item => {
            return item.code == 'bounce';
        });
        payload.value.status = status.code;
        payload.value.full_status = status.name;
    },
    depositPayment(state,payload) {
        var status = state.lookups.payment_status.find(item => {
            return item.code == 'deposit';
        });
        payload.value.status = status.code;
        payload.value.full_status = status.name;
    },
    convertPayment(state,payload) {
        
        const convertion = state.lookups[payload.source].find(item => {
            return item.code == state.cloneOfInstance[payload.needle];
        });
        if(convertion)
            state.cloneOfInstance[payload.target] = convertion.name;
        else 
            state.cloneOfInstance[payload.target] = "";
    },
    redirectToPrint(state) {
        if (state.bill.bill_no !== '')
            axiosRequest.redirect('bill', 'show', state.bill.bill_no, "_blank");
    },
    updateDeposit(state, payload) {
        const payment = state.bill.payments.find((item) => {
            return item.id === payload.id;
        });
        if (payment) {
            //payment.date_deposited = moment().format();
        }
    },
    calculateReplace(state, cb) {
        const replace = state.bill.payments.filter(item => {
            return item.status == 'replace';
        });

        let amount = 0;
        let replaceNo = "";
        if (replace) {
            amount = _.sumBy(replace, item => parseFloat(item.amount));
            replace.forEach(item => {
                replaceNo = replaceNo + item.payment_no + ",";
            });

            replaceNo = replaceNo.substring(0,replaceNo.length - 1);
        }

        state.cloneOfInstance.remarks = "Cheques being replace " + replaceNo;
        state.cloneOfInstance.amount = amount;

        cb();
    }
}

const actions = {
    edit({commit, state}, payload) {

        state.options.loadingSearch = true;
        state.options.currentTabIndex = 'received';

        axiosRequest.get('bill', 'edit', state.bill.bill_no)
            .then(res => {

                state.bill = res.data.bill;
                state.bill.instance = res.data.paymentInstance;
                state.contract = res.data.contract;
                state.lookups = res.data.lookups;

                state.bill.payments.forEach(p => {
                    if(p.status == 'clear') {
                        p.status_flag = 'clear';
                    }
                    else {
                        p.status_flag = 'received';
                    }
                });

                state.options.loadingSearch = false;
                commit('createInstance');
            })
            .catch(err => {
                toastr.error(err.response.data.message);
                this.options.loadingSearch = false;
            });

    },
    search({commit, state}, payload) {
        axiosRequest.get('bill', 'search', state.search.field.value, state.search.value)
            .then((r) => state.search.data = r.data)
            .catch((e) => toastr.errors(e.response.data.message));
    },
    update({commit, state}, payload) {
        //update only the received portion
        const payments = state.bill.payments;

        state.options.loadingSave = true;
        //console.log(payments);
        axiosRequest.post('bill', 'update', {id: state.bill.id, payments: payments})
            .then(res => {

                toastr.success(res.data.message);

                state.options.loadingSave = false;
                state.options.currentTabIndex = 'received';

                payload.done()
            })
            .catch(err => {
                state.options.loadingSave = false;
                if (err.response.status === 422) {
                    state.errors.register(err.response.data);
                    toastr.error(state.errors.get('payments'));
                }
            });
    }
}

const getters = {
    contract(state) {
        return state.contract;
    },
    bill(state) {
        return state.bill;
    },
    filtered(state) {

        let payments = [];

        if ((state.options.currentTabIndex === 'received')) {
            //const exception = ["received", "bounce", "deposit", "replace","pending_case","cancelled"];
            payments = state.bill.payments.filter(item => {
                return (item.status_flag !== "clear" && item.payment_mode === 'payment');
            });
        }
        else {
            payments = state.bill.payments.filter(item => {
                return item.status === state.options.currentTabIndex;
            });
        }

        return payments;
    },
    footerAmount(state) {
        return _.sumBy(state.bill.payments, (p) => {
            if (p.status == state.options.currentTabIndex)
                return parseInt(p.amount)
            else
                return 0;
        });
    },
    totalPayment(state) {
        const payments = _.sumBy(state.bill.payments, (p) => {
            if (p.status === 'clear')
                return parseInt(p.amount);
            else
                return 0
        });

        return {
            total_payment: payments,
            total_cost: state.contract.amount
        }
    },
    options(state) {
        return state.options;
    },
    search(state) {
        return state.search;
    },
    cloneOfInstance(state) {
        return state.cloneOfInstance;
    },
    lookups(state) {
        return state.lookups;
    },
    isPaymentStatusReplace(state) {
        const item = state.bill.payments.find((item) => {
            if (item.status === 'replace') {
                return true
            }
        });

        return (item === undefined) ? false : true;
    },
    bankDeposited(state) {
        const bank = _.find(state.lookups.bank_accounts, (item) => {
            return item.account_no === state.cloneOfInstance.bank_account;
        });
        return bank !== undefined ? bank.bank_name : '';
    }
}

const paymentModule = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default paymentModule;

