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
        state.data = data.data;
        state.lookups = data.lookups;
    }
}

const actions = {
    create({state,commit}) {
        axiosRequest.getApi("api/fixed-asset/create")
            .then(result => commit('create',result))
            .catch(errors => {
                toastr.error(errors.response.message);
            });
    },
    get() {

    },
    save({state},payload) {
        axiosRequest.post("fixed-asset","",state.data).then(result => {
            toastr.success(result.data.message);
            payload();
        })
        .catch((errors) => {
            if(errors.response.status === 422) {
                state.errorValidations.register(errors.response.data)
            }
        });
    },
    update() {

    }
}

const getters = {
    lookups(state) {
        return lookups;
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