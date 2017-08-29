import {ErrorValidations, cloneObject} from "../../../helpers/helpers";

const validatePayment = function () {

    let duplicateOrEmpty = (entity, compArray, field) => {
        for (let i = 0; i < compArray.length; i++) {
            let item = compArray[i];
            if (entity[field] === item[field]) return true;
        }
        return false;
    }

    let isEmpty = (value, ...args) => {
        for (let i = 0; i <= args.length; i++) {
            if (_.trim(value[args[i]]).length === 0) return args[i];
        }
        return "";
    }

    let validateDate = (entity, ...arg) => {
        for (var i; i < arg.length; i++) {
            let d = moment((entity[arg[i]]));
            if (d == null || !d.isValid()) {
                return arg[i];
            }
        }
        return "";
    }

    let dateRangePeriod = (startPeriod, startEnd) => {
        if (moment(startPeriod).isAfter(moment(startEnd)) ||
            moment(startPeriod).isSame(moment(startEnd))) {
            return true;
        }
        return false;
    }

    let isNonNumeric = (numValue) => {

        if (isNaN(numValue)) {
            return true
        }
        return false;
    }


    function validateAll(entity, payments) {

        let result = {
            key: "",
            isValid: true,
            message: "",
            error(value, key) {
                this.key = key;
                this.isValid = false;
                this.message = value;
            },
            ok() {
                this.message = "";
                this.isValid = true;
                this.key = "";
            }
        };

        //check required
        let req = false;
        if (entity.payment_type === 'bank')
            req = isEmpty(entity, 'payment_no', 'bank', 'amount');
        else
            req = isEmpty(entity, 'payment_no', 'amount');

        if (req) {
            result.error("field is required", req);
            return result;
        }

        if (isNonNumeric(entity.amount)) {
            result.error("Amount must be numeric", "amount");
            return result;
        }

        if (payments.length > 0 && entity.payment_type.toLowerCase() === 'cheque') {
            //check duplicate cheque no
            if (duplicateOrEmpty(entity, payments, 'payment_no')) {
                result.error("Duplicate cheque no", "payment_no");
                return result;
            }
        }

        //check if valid date
        let vdate = validateDate(entity, 'created_at', 'period_start', 'period_end');
        if (vdate.length > 0) {
            result.error("Date must be valid date", vdate);
            return result;
        }

        if (dateRangePeriod(entity.period_start, entity.period_end)) {
            result.error("Start should be later thant End date", "period_start");
            return result;
        }

        return result;
    }

    return {
        validateAll: validateAll
    }
}
const reIndexing = (payments) => {
    payments.forEach(function (payment, index) {
        index = index + 1;
        payment.id = index
    });
}

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
    create(state, payload) {
        state.bill = payload.bill;
        state.contract = payload.contract;
        state.lookups = payload.lookups;
    },
    createInstance(state) {
        state.cloneOfInstance = cloneObject(state.bill.instance);
        state.cloneOfInstance.isCash = false;
    },
    validate(state, payload) {
        //validate on client side
        const result = validatePayment().validateAll(state.cloneOfInstance, state.bill.payments);
        payload.cb(result);
    },
    insert(state, payload) {
        const payment_type = state.lookups.payment_term.find(item => {
            return item.code == state.cloneOfInstance.payment_type;
        })
        state.cloneOfInstance.full_payment_type = payment_type.name;
        //delete object isCash property
        if (state.cloneOfInstance.isCash !== undefined) {
            delete state.cloneOfInstance.isCash
        }
        state.bill.payments.push(state.cloneOfInstance);
        reIndexing(state.bill.payments);
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
        axiosRequest.get('bill', 'create', payload.contractNo)
            .then(r => {
                state.bill = r.data.bill;
                state.contract = r.data.contract;
                state.lookups = r.data.lookups;
                commit('createInstance');
            })
            .catch(e => {
                toastr.errors(e.response.message);
            });
    },
    save({commit, state}, payload) {
        state.options.loadingSave = true;
        axiosRequest
            .post('bill', 'store', state.bill)
            .then(r => {
                state.options.loadingSave = false;
                commit('redirectToPrint', {billNo: state.bill.bill_no});
                axiosRequest.redirect('bill', 'create', state.contract.contract_no);
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

