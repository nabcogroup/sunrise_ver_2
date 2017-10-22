import {ErrorValidations} from "../../../helpers/helpers";

const state = {
    list:[] 
}


const mutations = {
    'GETALL': (state,data)  => {
        state.list = data;
    }
}

const actions = {
    'GETALL': ({ state, commit }) => {
        axiosRequest.get('fixed-asset','')
            .then(r => commit(r.data));
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