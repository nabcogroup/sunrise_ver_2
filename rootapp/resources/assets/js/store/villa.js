import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const villaListStore = new Vuex.Store({
    state: {
        villas: [],
        statuses: [],
        search: {
            field: '',
            value: ''
        }
    },
    getters: {
        villas(state) {
            return state.villas;
        },
        statuses(state) {
            return state.statuses;
        }
    },
    mutations: {
        load(state, payload) {
            state.villas = payload.villas;
            state.statuses = payload.status;
        },
        redirectToRegister(state, id) {
            axiosRequest.redirect("villa", "register", id);
        },
        cancel(state, id) {
            
        }
    },
    actions: {
        load({
            commit,
            state
        }, payload) {

            axiosRequest.get('villa', 'list', state.search.field, state.search.value)
                .then((res) => {
                    commit('load', res.data);
                })
                .catch(err => {
                    payload.cbError(err.response.data.message);
                });

        },
        cancel({
            commit,
            state
        }, payload) {
            
        }
    }
});