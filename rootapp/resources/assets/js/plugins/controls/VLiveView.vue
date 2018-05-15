<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <transition name="v-slide-fade">
                    <div v-if="filter.field" class="live-views-badge">
                        <span>{{filter.label}}</span>
                        <a href="#" class="live-views-close" @click="clearFilter">&times;</a>
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
                                    :class="{info:sortKey == key.name}"
                                    :key="index">
                                    {{ key.column }}
                                    
                                    <span
                                            v-if="isArrowVisible(key.name)"
                                            class="fa fa-fw" :class="sortOrders[key.name] > 0 ?
                                    'fa-long-arrow-down' : 'fa-long-arrow-up'"></span>

                                    <a class="filter"
                                    href="#"
                                    @click.prevent.stop="filterWrap(index)"
                                    v-if="key.filter"><i class="fa fa-filter"></i></a>

                                    <transition name="v-slide-fade">
                                        <div v-if="selectedFilter === index" class="filter-wrapper" ref="filterWrapper">
                                            <div class="panel panel-primary wrap">
                                                <div class="panel-heading">Filter Panel - {{key.column}}</div>
                                                <div class="panel-body">
                                                    <div class="form-group">
                                                        <input type="text" v-model="filter.value" class="form-control">
                                                    </div>
                                                    <button class="btn btn-info btn-block" @click.stop="doFilter(key.filterBind || key.name ,key.column)">
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

                    <pagination :param="$store.state.liveviews.items" @click="fetchData({paramUrl:$event,grid:grid})"></pagination>

                </div>
            </transition>
        </div>
    </div>
</template>

<script>

    import {EventBus} from "../../eventbus";
    import Pagination from "../controls/Pagination.vue";
    import {cloneObject} from "../../helpers/helpers";

    import {mapGetters, mapActions, mapMutations, mapState} from "vuex";
    
    export default {
        name: "vLiveView",
        props: ["grid"],
        components: {Pagination},
        data() {
            return {
                editVisible: false,
            }
        },
        beforeMount() {
            //listen to view fetch will call by the client
            EventBus.$on("onLiveViewFetch", response => {
                this.$store.commit('liveviews/clearFilter');
                this.fetchData({grid: this.grid})
            });

            //initialize sorting
            this.$store.commit('liveviews/initSort', {grid: this.grid});

        },
        mounted() {

            let lazyLoad = this.grid.lazyLoad || false;
            if(!lazyLoad) {
                this.fetchData({grid: this.grid});
            }
        },
        computed: {
            ...mapGetters('liveviews', {filteredData: 'filteredData'}),
            ...mapState('liveviews', {
                filter: state => state.filter,
                selectedFilter: state => state.selectedFilter,
                sortKey: state => state.sortKey,
                sortOrders: state => state.sortOrders,
                fetchLoading: state => state.fetchLoading
            }),

            actionButtons() {
                return this.grid.actions;
            }
        },
        methods: {
            fetchData(grid) {
                this.$emit("beforeFetch",{filter: cloneObject(this.$store.state.liveviews.filter)})
                this.$store.dispatch("liveviews/fetchData",grid);
            },
            ...mapMutations('liveviews', ['loadData', 'filterWrap']),
            sortBy: function (key) {
                if (key.static) return false;
                this.$store.state.liveviews.sortKey = key.name;
                this.$store.state.liveviews.sortOrders[key.name] = this.$store.state.liveviews.sortOrders[key.name] * -1;
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
                return this.$store.state.liveviews.sortKey === name;
            },
            doFilter(field, label) {

                this.filter.field = field;
                this.filter.label = label + ' - ' + this.filter.value;
                this.$emit("onFilter",cloneObject(this.filter));
                this.fetchData({grid: this.grid});
            },
            clearFilter() {
                this.$store.commit('liveviews/clearFilter');
                this.$emit("onFilter",cloneObject(this.filter));
                this.fetchData({grid:this.grid});
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