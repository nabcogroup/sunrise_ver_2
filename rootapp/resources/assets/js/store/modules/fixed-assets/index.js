import {ErrorValidations,copiedValue} from "../../../helpers/helpers";

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
        state.errorValidations.clearAll();
    },
    edit(state,payload) {
        copiedValue(payload.data, state.data);
        state.lookups = payload.lookups;
        state.errorValidations.clearAll();
    },
    clear(state) {
        state.errorValidations.clearAll();
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
    edit({state,commit},payload) {
        console.log(payload);
        axiosRequest.dispatchGet("api/fixed-asset/edit/" + payload.id)
            .then((result) => commit('edit',{data: result.data.fixedAsset,lookups:  result.data.lookups }))
            .catch(errors => toastr.error(errros.response.message));
    },
    save({state},cb) {
        if(state.data.id !== 0) {
            axiosRequest.post("fixed-asset","update",state.data).then(result => {
                toastr.success(result.data.message);
                cb();
            })
            .catch((errors) => {
                if(errors.response.status === 422) {
                    state.errorValidations.register(errors.response.data)
                }
            });
        }
        else {
            axiosRequest.post("fixed-asset","store",state.data).then(result => {
                toastr.success(result.data.message);
                cb();
            })
            .catch((errors) => {
                if(errors.response.status === 422) {
                    state.errorValidations.register(errors.response.data)
                }
            });
        }
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
    },
    errorValidations(state) {
        return state.errorValidations;
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
