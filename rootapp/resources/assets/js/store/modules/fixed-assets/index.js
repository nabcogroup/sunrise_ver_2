import {ErrorValidations} from "../../../helpers/helpers";

const state = {
    data:{

    },
    errorValidations: new ErrorValidations()
}


const mutations = {
    create(state,data) {
        state.data = data;
    }
}

const actions = {
    create({state,commit}) {
        axiosRequest.getApi("api/fixed-asset/create")
            .then(result => commit('create',data))
            .catch(errors => {
                if(errors.response.status === 422) {
                    state.errorValidations.register(errors.response.data)
                }
            });
    },
    get() {

    },
    save() {

    },
    update() {

    }
}

const getters = {
    list(state) {
        return state.list;
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