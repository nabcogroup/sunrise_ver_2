<template>
    <div>
        <table id="grid" class="table table-condensed table-hover v-gridview-table">
            <thead>
                <tr class="active">
                    <th v-if="!grid.excludeIndex">No</th>
                    <th v-for="(key,index) in grid.columns" 
                            :style="key.style" 
                            class="text-left active" 
                            :class="{info:gridViewController.sort.key == key.name}" 
                            :key="index">

                        {{ key.column }}

                        <!-- button for sorting -->
                        <div class='v-gridview-button-group'>
                            
                            <span v-if="key.filter"  
                                @click.prevent.stop="filterProperty.toggle(index)">
                                <i  class="fa fa-fw fa-filter"></i>
                            </span>
                            
                            <span v-if="key.sorted" @click.prevent="sortBy(key)">
                                <i v-if="isArrowVisible(key.name)" class="fa fa-fw" :class="gridViewController.sort.orders[key.name] > 0 ?
                                    'fa-long-arrow-down' : 'fa-long-arrow-up'">
                                </i>
                                <i v-else class="fa fa-fw fa-sort"></i>
                            </span>
                        </div>

                        <!-- filter -->
                        <template  v-if="key.filter">
                        <transition name="v-slide-fade">
                            <div v-if="filterProperty.selectedFilter === index" class="v-gridview-filter" ref="filterWrapper">
                                <div class="panel panel-primary wrap">
                                    <div class="panel-heading">Filter Panel</div>
                                    <div class="panel-body">
                                        <div class="form-group">
                                            <input type="text" class="form-control" v-model="gridViewController.filterProperty.value">
                                        </div>
                                        <button class="btn btn-info btn-block" @click.prevent="filter(key.name,key.column)" type="button">Filter</button>
                                    </div>
                                </div>
                            </div>
                        </transition>
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(entry,entryIndex) in filteredData" :key="entryIndex" :class="{'danger' : grid.selected === entryIndex }">
                    <!-- auto numeric by default -->
                    <td v-if="!grid.excludeIndex">{{entryIndex + 1}}</td>

                    <td v-for="(key, columnIndex) in grid.columns" :class="key.class" :style="key.style" :key="columnIndex">
                        <div v-if="key.editable">
                            <!-- checkbox -->
                            <input v-if="key.itype == 'selector'" type="checkbox" v-model="entry[key.bind]" />
                            <!-- plain text -->
                            <input type="text" class="form-control" :class="key.class" v-else-if="key.itype == 'text'" v-model="entry[key.bind]">
                            <!-- text area -->
                            <textarea class="form-control" v-else-if="key.itype == 'textarea'" v-model="entry[key.bind]"></textarea>
                            <!-- dropdown -->
                            <select v-model="entry[key.bind]" v-if="key.itype == 'dropdown'" class="form-control">
                                <option v-if="key.customDefault === undefined" value="">--SELECT--</option>
                                <option v-for="(lookup,index) in lookups[key.selection]" :value="lookup.code" :key="index">{{lookup.name}}</option>
                            </select>
                        </div>
                        <div v-else>
                            <span v-if="key.dtype === 'date'">{{entry[key.name] | toDateFormat }}</span>
                            <span v-else-if="key.dtype === 'currency'">{{entry[key.name] | toCurrencyFormat }}</span>
                            <span v-else-if="key.dtype === 'period'">{{entry[key.from] | toDateFormat}} - {{entry[key.to] | toDateFormat}}</span>
                            <span v-else>{{entry[key.name]}}</span>
                        </div>

                        <div v-if="key.name=='$action'" class="btn-group">
                            <button type="button" 
                                class="btn btn-primary dropdown-toggle btn-sm" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" aria-expanded="false">
                                Action <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li v-for="(action,actionIndex) in actionButtons" :key="actionIndex">
                                    <a href="#" @click.prevent='actionTrigger(action.key,entry,entryIndex)'>{{action.name}}</a>
                                </li>
                            </ul>
                        </div>
                        <div v-if="key.name=='$markDelete'" class='text-center'>
                            <button class="btn btn-danger btn-xs" type="button" @click='actionTrigger("delete",entry,entryIndex)'>
                                <i class="fa fa-close"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr v-if="data.length == 0">
                    <td :colspan="grid.columns.length" class="text-center">
                        <h3 class="text-warning">No Record found</h3>
                    </td>
                </tr>
            </tbody>
            <tfoot class="v-gridview-footer" v-if="grid.hasFooter">
                <slot name="footer-slot"></slot>
            </tfoot>
        </table>
        <div class="row">
            <div class="col-md-12">
                <small class="text-primary">Total Row: {{ totalRow }}</small>
            </div>
        </div>
    </div>
</template>

<script>

class GridViewController {

    constructor(configs) {
        
        this.data = []
        this.filterData = [];
        this.configs = configs

        this.sort = {
            key: "",
            orders: {}
        }

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


        this.init();

    }

    init() {
        let sortOrders = {};
        let sortKey = "";

        this.configs.columns.forEach((key) => {
            sortOrders[key.name] = 1;
            if (key.default !== undefined && key.default == true) {
                sortKey = key.name;
            }
        });

        this.sort.key = sortKey;
        this.sort.orders = sortOrders;
    }


    scopeData() {
        
        let sortKey = this.sort.key;
        let order = this.sort.orders[sortKey] || 1
        let data = [];
        
        //filtering
        if(this.filterProperty.field !== '') {
            
            //clear data
            data = [];
            
            //filtering
            this.data.forEach((item) => {
                if(item[this.filterProperty.field].toLowerCase().indexOf(this.filterProperty.value.toLowerCase()) >= 0) {
                    data.push(item);
                }
            });

        }
        else {
            data = this.data;
        }
        

        //sorting
        if (sortKey) {
            data = data.slice().sort(function(a, b) {
                a = a[sortKey]
                b = b[sortKey]
                return (a === b ? 0 : a > b ? 1 : -1) * order
            });
        }
        
        return data;
    }

    sortBy(key) {
        
        if (key.static) return false;
        this.sort.key = key.name;
        this.sort.orders[key.name] = this.sort.orders[key.name] * -1;
    }

    fetchData(data) {
        this.data = data;
    }

    filter(field,label) {
        this.filterProperty.field = field;

        this.filterProperty.label = label;
    }
}

export default {
    name: "gridView",
    props: ['data', 'grid', 'lookups'],
    data() {
        return {
            editVisible: false,
            gridViewController : new GridViewController(this.grid),
            totalRow: 0
        }
    },
    mounted() {
        this.fetchData(this.data);
    },
    computed: {
        filteredData() {
            let data = this.gridViewController.scopeData() || [];
            //Emit Event
            this.$emit('sorted', this.gridViewController.sort.key);
            
            this.totalRow = data.length;
            
            return data;
        },
        filterProperty() {
            return this.gridViewController.filterProperty;
        },
        actionButtons() {
            return this.grid.actions;
        },
    },
    methods: {
        sortBy: function(key) {
           this.gridViewController.sortBy(key);
        },
        fetchData() {
            this.gridViewController.fetchData(this.data);
        },
        filter(name,label) {
            this.gridViewController.filter(name,label);
        },
        render: function(entry, key) {
            //check pipe period_start|period_end
            let keypos = key.name.indexOf("|"),
                glue = key.glue || " - ",
                value = "";

            if (keypos >= 0) {
                let names = key.name.split('|');
                for (var i = 0; i < names.length; i++) {
                    if (key.dtype == 'date') {
                        entry[names[i]] = moment(entry[names[i]]).format('D, MMM, Y');
                    }
                    value += entry[names[i]] + glue;
                }
                value = value.substring(0, value.length - 3);
            }
            else {
                value = entry[key.name];
                if (key.dtype == 'date') {
                    value = moment(value).format('D, MMM, Y');
                }
                if (key.dtype == 'currency') {
                    value = accounting.formatNumber(value) + " QR";
                }
            }

            return value;

        },
        actionTrigger: function(action, id, index) {
            this.$emit('action', action, id, index);
        },
        isArrowVisible(name) {
            return this.gridViewController.sort.key === name;
        },
        isIncludeEdit(key) {
            return (key.editable && !key.static);
        },
        inputTypeIs(type) {
            return this.inputType == type;
        },
        onPaginateClick(url) {
            this.$emit("paginateClick", url);
        }
    },
    watch:{
        'data': 'fetchData'
    }
}
</script>


<style>
    .v-gridview-table {
        font-size: 0.75rem ;
    }
    .v-gridview-table th {
        position: relative;
        padding-top: 10px !important;
        padding-bottom: 10px !important;
        font-size: 12px;
        
    }

    .v-gridview-table thead th {
        border: 1px solid darkgrey;
    }

    .v-gridview-footer {
        background: #f5f5f5;
    }

    .v-gridview-button-group {
        position: absolute;
        top: 25%;
        right: 0;
        cursor: pointer;
        color: darkgray;
        width: auto;    
    }

    .v-gridview-filter {
        position: absolute;
        top: 100%;
        left: 60%;
        z-index: 999;
        width: 250px;
    }
    
</style>