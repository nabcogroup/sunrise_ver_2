import { ErrorValidations } from "../../../helpers/helpers";

class Payee {
    
    constructor(errorValidations) {
        this.data = [];
        this.payee = {};
        this.lookups = { payee_type: []}
        this.errorValidations = errorValidations;
    }

    fetch(id) {
        axiosRequest.dispatchGet("/api/payee/edit/" + id).then(r => {
            this.payee = r.data.data;
            this.lookups = r.data.lookups;
        });
    }

    create(option = null) {
        if(_.isEmpty(this.payee)) {
            axiosRequest.get('payee','create').then(r => {
                this.payee = r.data.data;
                this.lookups = r.data.lookups;
                if(option) {
                    this.payee.name = option;
                }
            });
        }
    }

    clear() {
        this.payee = {};
    }

    save(callback) {
        let repeatMe;
        if(this.payee.id) {
            repeatMe = axiosRequest.patch('payee','update',this.payee);
        }
        else {
            repeatMe = axiosRequest.post('payee','store',this.payee);
        }
        
        repeatMe.then(r => {
                this.clear();
                callback();
        })
        .catch(e => {
            if(e.response.status === 422) {
                this.errorValidations.register(e.response.data)
            }
        })
    }

    addAttribute(option) {

        this.payee.name = option.name;
    }
   

}

const state = {
    payee: new Payee(new ErrorValidations()),
    errors: new ErrorValidations()
}

const mutations = {
    clearPayee(state) {
        state.payee.clear();
    },
    addPayeeAttribute: (state,payload) => state.payee.addAttribute(payload.option)
}

const actions = {
    redirectToRegister: (state,payload) => axiosRequest.redirect("payee","edit",payload.id),
    create: ({state,commit},payload) => state.payee.create(payload.option),
    save: ({commit,state},cb) =>  {
        state.payee.save(cb);

    },
    edit: ({state},payload) => state.payee.fetch(payload.id)
}

const getters = {
    payee(state) {
        return state.payee.payee;
    },
    payeeTypes(state) {
        return state.payee.lookups.payee_type;
    },
    errors(state) {
        return state.payee.errorValidations;
    }
}

export default {
    namespaced:true,
    actions,
    state,
    getters,
    mutations
}

 