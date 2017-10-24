import {ErrorValidations} from "../../../helpers/helpers";

const state = {
    data:{

    },
    lookups: {
        villa_location: [],
        fixed_asset_type: []
    },
    errorValidations: new ErrorValidations()
}


const mutations = {
    create(state,data) {
        state.data = data.data.data;
        state.lookups = data.data.lookups;
    },
    edit(state,payload) {
        state.data = payload.data;
    }
}

const actions = {
    create({state,commit}) {
        axiosRequest.dispatchGet("api/fixed-asset/create")
            .then(result => commit('create',result))
            .catch(errors => {
                toastr.error(errors.response.message);
            });
    },
    save({state},cb) {
        
        axiosRequest.post("fixed-asset","store",state.data).then(result => {
            toastr.success(result.data.message);
            cb();
        })
        .catch((errors) => {
            if(errors.response.status === 422) {
                state.errorValidations.register(errors.response.data)
            }
        });
    },
    redirect() {
        axiosRequest.redirect("fixed-asset","");
    },
    update() {

    }
}

const getters = {
    lookups(state) {
        return state.lookups || [];
    }
}

const fixedAssetModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}


export default fixedAssetModule;
