
import {ErrorValidations} from "../../../helpers/helpers";

const state = {
    villas: [],
    statuses: [],
    villa: {
        villa_galleries: []
    },
    lookups: {},
    villa_newImages: [],
    errors: new ErrorValidations(),
    search: {
        field: '',
        value: ''
    }
}

const mutations = {
    load(state, payload) {
        state.villas = payload.villas;
        state.statuses = payload.status;
    },
    redirectToRegister(state, id) {
        axiosRequest.redirect("villa", "register", id);
    },
    redirectToVilla(state) {
        axiosRequest.redirect('villa');
    },
    insertImage(state,payload) {
        state.villa_newImages.push(payload.file);
    },
    removeImage(state,payload) {
        state.villa_newImages = state.villa_newImages.filter((item,index) => {
           return item.id !== payload.id;
        });
    }
}

const actions = {
    load({commit, state}, payload) {
        axiosRequest.get('villa', 'list', state.search.field, state.search.value)
            .then((res) => {
                commit('load', res.data);
            })
            .catch(err => {
                payload.cbError(err.response.data.message);
            });
    },
    create({state}, id) {
        axiosRequest.get("villa", "create", id)
            .then(res => {
                state.villa = res.data.instance;
                state.lookups = res.data.lookups;
            })
            .catch(err => {
                toastr.errors(err.response.message);
            })
    },
    save({commit, state}) {

        let formData = new FormData();

        //take villa data
        Object.keys(state.villa).forEach(key => {
            if (key === 'villa_galleries') {
                let villaGalleries = state.villa.villa_galleries;
                //take galleries which has mark deleted
                if (villaGalleries.length > 0) {
                    for (var i = 0; i < villaGalleries.length; i++) {
                        if (villaGalleries[i].delete_mark == true) {
                            formData.append('villaGalleriesDeleteMark[]', villaGalleries[i].id);
                        }
                    }
                }
            }
            else {
                formData.append(key, state.villa[key]);
            }
        });

        //check for new image galleries
        if (state.villa_newImages.length > 0) {
            for (var i = 0; i < state.villa_newImages.length; i++) {
                formData.append('galleries[]', state.villa_newImages[i]);
            }
        }

        axiosRequest
            .postMultiForm('villa', 'store', formData)
            .done(resp => {
                commit('redirectToVilla');
            })
            .fail(err => {
                if (err.status === 422) {
                    state.errors.register(err.responseJSON);
                }
            });
    }
}

const getters = {
    villas(state) {
        return state.villas;
    },
    statuses(state) {
        return state.statuses;
    },
    villa(state) {
        return state.villa;
    },
    lookups (state) {
        return state.lookups;
    },
    errors(state) {
        return state.errors;
    }
}


const villaModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

export default villaModule;
