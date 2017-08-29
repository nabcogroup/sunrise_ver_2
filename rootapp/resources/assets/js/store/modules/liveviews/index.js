
const state = {
    filter: {
        field: '',
        value: '',
        label: ''
    },
    items: {
        data:[]
    },
    cache: {},
    selectedFilter: -1,
    sortKey: '',
    sortOrders: '',
    fetchLoading: false
}

const mutations = {
    loadData(state, payload) {
        state.fetchLoading = true;
        if(payload.pointer){
            state.items = payload.data[payload.pointer];
        }
        else {
            state.items = payload.data;
        }
        state.cache = payload.data;
        state.fetchLoading = false;
    },
    doFilter(state,payload) {
        state.filter.field = payload.field;
        state.filter.label = payload.label;
    },
    filterWrap(state , index) {
        if(state.selectedFilter === index) {
            state.selectedFilter = -1;
        }
        else {
            state.selectedFilter = index;
        }
    },
    initSort(state,payload) {

        let sortOrders = {};
        let sortKey = "";

        payload.grid.columns.forEach((key) => {
            sortOrders[key.name] = 1;
            if (key.default !== undefined && key.default === true) {
                sortKey = key.name;
            }
        });

        state.sortKey = sortKey;
        state.sortOrders = sortOrders;

    },
    clearFilter(state) {
        state.filter.field = "";
        state.filter.label = "";
        state.filter.value = "";
    }
}


const actions = {

    fetchData({ state, commit }, payload) {
        let url = "";
        let query = "";
        if (payload.paramUrl === undefined) {
            const source = payload.grid.source;
            let params = "";

            if (source.params) {
                _.forEach(source.params, (value, key) => {
                    params = params + "/" + value;
                });
            }

            if (state.filter.field.length > 0) {
                query = "?filter_field=" + state.filter.field + "&filter_value=" + state.filter.value;
            }

            url = source.url + params + query;
            state.selectedFilter = -1;
            state.filter.value = '';
        }
        else {
            url = payload.paramUrl;
        }

        state.fetchLoading = true;
        axiosRequest.dispatchGet(url)
            .then(response => commit('loadData',{data:response.data,pointer: payload.grid.source.pointer || false}))
            .catch(errors => {
                toastr.error("Loading error")
                state.fetchLoading = false;
            });
    }
}

const getters = {
    filteredData(state) {
        let sortKey = state.sortKey;
        let data = state.items.data;
        let order = state.sortOrders[sortKey] || 1;

        if (sortKey) {
            data = data.slice().sort(function (a, b) {
                a = a[sortKey]
                b = b[sortKey]
                return (a === b ? 0 : a > b ? 1 : -1) * order
            });
        }

        return data;
    },
    cache(state) {
        return state.cache;
    }

}


const liveviewsModule  = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default liveviewsModule;

