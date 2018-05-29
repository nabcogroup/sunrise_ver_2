


class LiveViewModel {

    constructor() {

        this.state = {
            data: [],
            cache: [],
            fetchLoading: false
        }

        this.sort = {
            orders: '',
            key: ''
        }

        this.filter = {
            field: '',
            value: '',
            label: '',
            selectedFilter: -1,
            clear() {
                this.value = ''
                this.selectedFilter = -1
            },
            clearAll() {
                this.field = ''
                this.value = ''
                this.selectedFilter = -1
            },
            filter(label,value) {
                this.label = label
                this.value = value
            },
            toggle(index) {
                if(this.selectedFilter === index) {
                    this.selectedFilter = -1;
                }
                else {
                    this.selectedFilter = index;
                }
            }
        }
    }

    sort(configs) {
        let sortOrders = {};
        let sortKey = "";
        configs.columns.forEach((key) => {
            sortOrders[key.name] = 1;
            if (key.default !== undefined && key.default === true) {
                sortKey = key.name;
            }
        });
        this.sort.key = sortKey;
        this.sort.orders = sortOrders;
    }


    fetchData(configs,url) {
        let query = "";
        
        if (typeof(url) === 'undefined') {
            const source = configs.source;
            let params = "";
            if (source.params) {
                _.forEach(source.params, (value, key) => {
                    params = params + "/" + value;
                });
            }

            if (this.filter.field.length > 0) {
                query = "?filter_field=" + this.filter.field + "&filter_value=" + this.filter.value;
            }

            url = source.url + params + query;
            
            //reseting
            this.filter.clear();
        }
        

        this.state.fetchLoading = true;
        axiosRequest.dispatchGet(url)
            .then(response => {
                this.state.fetchLoading = false;
                if(configs.source.pointer){
                    this.state.data = response.data[configs.source.pointer];
                }
                else {
                    this.state.data = response.data;
                }
                
                //this.state.cache = this.
            })
            .catch(errors => {
                toastr.error("Loading error")
                this.state.fetchLoading = false;
            });
    }

    
}

const state = {
    liveViewModel: new LiveViewModel(),
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
    fetchData: ({ state }, payload) => state.liveViewModel.fetchData(payload.grid)
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

