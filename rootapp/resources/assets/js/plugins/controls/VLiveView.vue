<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <transition name="v-slide-fade">
                    <div v-if="filterProperty.field" class="live-views-badge">
                        <span>{{filterProperty.label}}</span>
                        <a href="#" class="live-views-close" @click="clear()">&times;</a>
                    </div>
                </transition>
            </div>
        </div>
        <div class="row">
            <transition name="v-slide-fade">
                <div v-if="fetchLoading" class="v-view-loading-container" key="loading">
                    <div class="v-view-loading">
                        <span class="fa fa-spinner fa-pulse fa-3x fa-fw"></span><br>
                        Loading...
                    </div>
                </div>
                <div v-else class="col-md-12" key="fetched">

                    <table id="grid" class="table table-condensed table-hover table-live-views">
                        <thead>
                            <tr>
                                <th class="text-center">No</th>
                                <th v-for="(key,index) in grid.columns"
                                    :style="key.style"
                                    @click.self="sortBy(key)"
                                    class="text-left"
                                    :class="{info:sort.key == key.name}"
                                    :key="index">
                                    {{ key.column }}
                                    
                                    <span
                                            v-if="isArrowVisible(key.name)"
                                            class="fa fa-fw" :class="sort.orders[key.name] > 0 ?
                                    'fa-long-arrow-down' : 'fa-long-arrow-up'"></span>

                                    <a class="filter"
                                    href="#"
                                    @click.prevent.stop="filterProperty.toggle(index)"
                                    v-if="key.filter"><i class="fa fa-filter"></i></a>

                                    <transition name="v-slide-fade">
                                        <div v-if="filterProperty.selectedFilter === index" class="filter-wrapper" ref="filterWrapper">
                                            <div class="panel panel-primary wrap">
                                                <div class="panel-heading">Filter Panel - {{key.column}}</div>
                                                <div class="panel-body">
                                                    <div class="form-group">
                                                        <input type="text" v-model="filterProperty.value" class="form-control">
                                                    </div>
                                                    <button class="btn btn-info btn-block" @click.stop="filter(key.filterBind || key.name ,key.column)">
                                                        Filter
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-if="filteredData.length === 0">
                            <td :colspan="grid.columns.length" class="text-center"><h3 class="text-warning">
                                No Record found</h3>
                            </td>
                        </tr>
                        <tr v-for="(entry , index) in filteredData" :key="index">
                            <slot name="table-column" :props="{items: entry, index: index}">
                                <td class="text-center">{{index + 1}}</td>
                                <td v-for="key in grid.columns" :class="key.bindClass ? entry[key.bindClass] : key.class" :style="key.style">

                                    <strong v-if="key.isBold">{{tableRender(entry, key)}}</strong>
                                    <span v-else>{{tableRender(entry, key)}}</span>

                                    <div v-if="key.name ==='$action'" class="btn-group">
                                        <button type="button"
                                                class="btn btn-primary dropdown-toggle btn-sm"
                                                data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                            Action <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li v-for="action in actionButtons">
                                                <a href="#" @click='actionTrigger(action,entry,index)'>{{action.name}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-else-if="key.name ==='$markDelete'" class='text-center'
                                         @click='actionTrigger("delete",entry["id"])'>
                                        <button class="btn btn-danger btn-xs" type="button"><i class="fa fa-close"></i>
                                        </button>
                                    </div>
                                    <div v-else-if="key.name === '$switch'">
                                        <vswitch v-model="entry[key.bind]" :is-disabled="entry[key.disabled]"></vswitch>
                                    </div>
                                </td>
                            </slot>
                        </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <slot name="table-footer"></slot>
                            </tr>
                        </tfoot>
                    </table>

                    <pagination 
                        :param="liveViewModel.state.data" @click="fetchData($event)">
                    </pagination>

                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {EventBus} from "../../eventbus";
    import Pagination from "../controls/Pagination.vue";
    import {cloneObject} from "../../helpers/helpers";
    
    class LiveViewModel {

        constructor(configs) {

            this.state = {
                data: [],
                cache: [],
                fetchLoading: false
            }
            
            this.sort = {
                orders: [],
                key: ''
            }

            this.configs = configs;

            this.filterProperty = {
                field: '',
                value: '',
                label: '',
                selectedFilter: -1,
                clear() {
                    this.field = ''
                    this.value = ''
                    this.selectedFilter = -1
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

            this.initSort();
        }

        initSort() {
            let sortOrders = {};
            let sortKey = "";
            this.configs.columns.forEach((key) => {
                sortOrders[key.name] = 1;
                if (key.default !== undefined && key.default === true) {
                    sortKey = key.name;
                }
            });
            this.sort.key = sortKey;
            this.sort.orders = sortOrders;
        }

        filter(field,label) {
            //this.filterProperty.clear();
            this.filterProperty.label = label;
            this.filterProperty.field = field;
            this.filterProperty.selectedFilter = -1;
            this.fetchData();
        }

        clear() {
            this.filterProperty.clear();
            this.fetchData();
        }

        scopeData() {
            let sortKey = this.sort.key;
            let data = this.state.data.data || [];
            let order = this.sort.orders[sortKey] || 1;
            if (sortKey) {
                data = data.slice().sort(function (a, b) {
                    a = a[sortKey]
                    b = b[sortKey]
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                });
            }

            return data;
        }

        fetchData(url) {
            let query = "";
            
            if (typeof(url) === 'undefined') {
                const source = this.configs.source;
                let params = "";
                if (source.params) {
                    _.forEach(source.params, (value, key) => {
                        params = params + "/" + value;
                    });
                }

                if (this.filterProperty.field.length > 0) {
                    query = "?filter_field=" + this.filterProperty.field + "&filter_value=" + this.filterProperty.value;
                }
                
                url = source.url + params + query;
                
                //reseting
                //this.filterProperty.clear();
            }
            

            this.state.fetchLoading = true;
            axiosRequest.dispatchGet(url)
                .then(response => {
                    this.state.fetchLoading = false;
                    if(this.configs.source.pointer){
                        this.state.data = response.data[this.configs.source.pointer];
                    }
                    else {
                        this.state.data = response.data;
                    }

                    EventBus.$emit('liveview.fetched',response.data);
                })
                .catch(errors => {
                    
                    toastr.error("Loading error")
                    
                    this.state.fetchLoading = false;
                    
                    //EventBus.$emit('liveview.fetched',this.state.data);

                });
        }
    }


    export default {
        name: "vLiveView",
        props: ["grid"],
        components: {Pagination},
        data() {
            return {
                liveViewModel: {},
                editVisible: false,
            }
        },
        beforeMount() {
            this.liveViewModel = new LiveViewModel(this.grid)
            //listen to view fetch will call by the client
            EventBus.$on("onLiveViewFetch", response => {
                this.liveViewModel.fetchData();
            });

            
        },
        mounted() {
            let lazyLoad = this.grid.lazyLoad || false;
            if(!lazyLoad) {
                this.fetchData();
            }
        },
        computed: {
            filteredData() {
                return this.liveViewModel.scopeData();
            },
            filterProperty() {
                return this.liveViewModel.filterProperty;
            },
            sort() {
                return this.liveViewModel.sort;
            },
            fetchLoading() {
                return this.liveViewModel.state.fetchLoading;
            },
            actionButtons() {
                return this.grid.actions;
            }
        },
        methods: {
            fetchData(url) {
                this.$emit("beforeFetch",{filter: cloneObject(this.liveViewModel.filterProperty)})
                this.liveViewModel.fetchData(url);
            },
            sortBy: function (key) {
                if (key.static) return false;
                this.liveViewModel.sort.key = key.name
                this.liveViewModel.sort.orders[key.name] = this.liveViewModel.sort.orders[key.name] * -1;
            },
            tableRender: function (entry, key) {
                let value = entry[key.name];
                if (key.dtype === 'date') {
                    value = moment(value).format('L');
                }
                else if (key.dtype === 'currency') {
                    value = accounting.formatNumber(value) + " QR";
                }

                return value;
            },
            actionTrigger: function (action, id) {
                this.$emit('action', action, id);
            },
            isArrowVisible(name) {
                return this.liveViewModel.sort.key === name;
            },
            filter(field, label) {
                this.liveViewModel.filter(field,label + ' - ' + this.liveViewModel.filterProperty.value)
                this.$emit("onFilter",cloneObject(this.filterProperty));
            },
            clear() {
                this.$emit("onFilter",cloneObject(this.filterProperty));
                this.liveViewModel.clear();
            }
        }
    }
</script>

<style scope>
    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .v-slide-fade-enter-active {
        transition: all .3s ease;
    }
    .v-slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .v-slide-fade-enter, .v-slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .v-view-loading-container {
        width: 100%;
        height: 350px;
        position:relative;

    }

    .v-view-loading {
        position:absolute;
        top:30%;
        left: 40%;
        font-size: 40px;

    }
</style>