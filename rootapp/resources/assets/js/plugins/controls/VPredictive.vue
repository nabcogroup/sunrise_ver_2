<template>
    <div class="v-predictive-position" :class="{'v-hide': !configs.visible}">
        
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th v-for="(column, index) in configs.columns" 
                        :key="index" 
                        :style="column.style">
                        <template>
                            {{column.column}}
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(row,index) in filterData" 
                    :key="index" 
                    @click="onClick(row)">

                    <td v-for="(column,index) in configs.columns" :key="index" :style="column.style">
                        <template v-if="column.name === '$icon'">
                            <span :class="column.value"></span>
                        </template>
                        <template v-else>
                            {{row[column.name]}}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class='row'>
            <div class="col-md-2 col-md-offset-10" style="padding-top: 5px;padding-bottom: 5px">
                <button class="btn btn-danger btn-xs pull-right" @click="predictive.clearCache()" type="button">
                    <i class="fa fa-bolt"></i> Reset Cache</button>
            </div>
        </div>
    </div>
</template>

<script>

import {EventBus} from "./../../eventbus.js";

const apiStorage = () => ({
    
  store: (key,data,serialize = false) => {
      if(serialize) {
          localStorage.setItem(key,JSON.stringify(data));
      }
      else {
          localStorage.setItem(key,data);
      }
  },

  insertNew: (key,data) => {

  },

  get: (key) => {
      return localStorage.getItem(key);
  },

  isEmpty: (key) => {
      return (localStorage.getItem(key)) ? false : true;
  },

  clear: (key) => {
      localStorage.removeItem(key);
  }
})

class Predictive {
    
    constructor() {
        this.state = {
            predictives : []
        }

        this.newInsert = [];
    }

    fetch(url) {
        if(this.state.predictives.length === 0) {
            //check first if empty 
            if(apiStorage().isEmpty('_predictives')) {
                axiosRequest.dispatchGet(url).then((response) => {
                    this.state.predictives = response.data.data;
                    //get json to string
                    apiStorage().store('_predictives',response.data.data,true);
                });
            }
            else {
                this.state.predictives = JSON.parse(apiStorage().get('_predictives'));
            }
        }
    }

    insert(item) {
        
        let predPos = _.findIndex(this.state.predictives,(pred) => pred.description.toLowerCase() == item.description.toLowerCase())
        if(predPos >= 0) return false;
        this.newInsert.push(item);
        this.state.predictives.push(item);
    }

    filter(filterValue,preKey) {
        
        let filtered = [];
        
        if(filterValue && filterValue.length > 0) {
            //data exist
            this.state.predictives.forEach((row) => {
                if (row[preKey].toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) {
                    filtered.push(row);
                }
            })
        }
        else {
            filtered = this.state.predictives;
        }

        return filtered;

    }

    clearCache() {
        this.state.predictives = [];
        apiStorage().clear('_predictives');
    }

    store() {

        apiStorage().store('_predictives',this.state.predictives,true);
        //this.state.predictives = [];
    }
}

export default {

    name: "vPredictive",

    props: {
        filterValue: {
            required:true,
            default:null
        },
        configs: {
            required: true,
            type: Object,
            default: () => ({})
        }
    },

    mounted() {

        EventBus.$on('predictive.store',(response) => {
            this.predictive.store();
        });

        EventBus.$on('predictive.new',(item) => {
            this.predictive.insert(item);
        });
        
    },

    data() {
        return {
            hide: true,
            focus: false,
            predictive: new Predictive()
        }
    },

    methods: {
        update(value) 
        {
            if(value) {
                this.predictive.fetch(this.configs.api.url);
            }
        },
        onClick(item) {
            this.$emit('selected',item);
        }
    },
    
    computed: {
        filterData() {
            return this.predictive.filter(this.filterValue,this.configs.preKey);
        }
    },

    watch: {
        'configs.visible': 'update'
    }

}

</script>

<style scoped>
    
    .v-predictive-position {
        background: white;
        position: absolute;
        width: 100%;
        height: 250px;
        z-index: 3;
        overflow: scroll;
    }
    
    .v-hide {
        display:none; 
    }

    .table tbody tr:hover {
        cursor: pointer;
        background: #dce782;
    }
</style>
