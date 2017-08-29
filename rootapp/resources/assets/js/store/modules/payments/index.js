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
        let req = isEmpty(entity, 'payment_no', 'bank', 'amount');
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
    },
    contract: {
        tenant: {},
        villa: {}
    },
    search: {
        field: {},
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
    clear(state) {
        state.search.data = [];
        state.search.field = "";
        state.search.value = "";
    },
    createInstance(state) {
        state.cloneOfInstance = cloneObject(state.bill.instance);
        state.cloneOfInstance.isCash = false;
    },
    addNew(state) {
        const paymentMode = state.lookups.payment_mode.find(item => {
            return item.code == state.cloneOfInstance.payment_mode;
        })
        state.cloneOfInstance.full_payment_mode = paymentMode.name;

        const paymentType = state.lookups.payment_term.find(item => {
            return item.code == state.cloneOfInstance.payment_type;
        })
        state.cloneOfInstance.full_payment_type = paymentType.name;

        //delete object isCash property
        if (state.cloneOfInstance.isCash !== undefined) {
            delete state.cloneOfInstance.isCash
        }

        state.bill.payments.push(state.cloneOfInstance);
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

        state.cloneOfInstance.reference_no = replaceNo;
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
            const exception = ["received", "bounce", "deposit", "replace"];
            payments = state.bill.payments.filter(item => {
                for (var i = 0; i < exception.length; i++) {
                    let stat = (item.status_flag === exception[i] && item.payment_mode === 'payment');
                    if (stat) return stat;
                }
            });
        }
        else {
            payments = state.bill.payments.filter(item => {
                return item.full_status.toLowerCase() === state.options.currentTabIndex;
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

