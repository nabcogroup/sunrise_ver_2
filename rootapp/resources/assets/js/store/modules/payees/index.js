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

    create() {
        if(_.isEmpty(this.payee)) {
            axiosRequest.get('payee','create').then(r => {
                this.payee = r.data.data;
                this.lookups = r.data.lookups;
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

   
   

}

const state = {
    payee: new Payee(new ErrorValidations()),
    errors: new ErrorValidations()
}

const mutations = {
    clearPayee(state) {
        state.payee.single= {};
    }
}

const actions = {
    redirectToRegister: (state,payload) => axiosRequest.redirect("payee","edit",payload.id),
    create: ({state,commit}) => state.payee.create(),
    save: ({commit,state},payload) =>  {
        state.payee.save(() => toastr.success("Payee successfully added"));
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

 