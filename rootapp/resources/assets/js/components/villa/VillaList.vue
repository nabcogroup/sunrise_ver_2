<template>
    <v-panel header="Villas">
        <div class="row">
            <div class="col-md-2 col-md-offset-10">
                <button class="btn btn-info btn-block" @click="addNew()"> <i class="fa fa-plus"></i> Add New </button>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-9">
               <v-live-view :grid="gridView" @action="doAction"></v-live-view>
            </div>
            <div class="col-md-3">
                <div class="list-group">
                    <a href="#" class="list-group-item" v-for="(count,index) in villas.status" :key="index">
                        <i class="fa fa-home fa-fw fa-lg"></i> {{count.full_status}}
                        <span class="badge" :class="count.tag_color">{{count.count}}</span>
                    </a>
                </div>
            </div>
        </div>
    </v-panel>
</template>

<script>
    import {mapGetters} from "vuex";
import { EventBus } from '../../eventbus';

    export default {
        name: 'list',
        data()  {
            return {
                villas: [],
                filterKey: "",
                filterFields: [
                    {name: 'villa_no', text: 'Villa No' },
                    {name: 'location', text: 'Location'},
                    {name: 'villa_class', text: 'Class'},
                    {name: 'rate_per_month', text: 'Rate/Month'},
                    {name: 'status', text: 'Status'},
                ],
                gridView: {
                    columns: [
                        {name: 'villa_no', column: 'Villa No', style: 'width:10%',class:'text-center', filter: true},
                        {name: 'full_location', column: 'Location',filter: true},
                        {name: 'electricity_no', column: 'Electricity No',class:'text-center'},
                        {name: 'water_no', column: 'Water No',class:'text-center'},
                        {name: 'qtel_no', column: 'QTel No',class:'text-center'},
                        {name: 'full_villa_class', column: 'Class',class:'text-center'},
                        {name: 'rate_per_month', column: 'Rate/Month', class:'text-right', dtype:'currency'},
                        {name: 'full_status', column: 'Status', class:'text-center',style: 'width:10%',filter: true,bindClass: 'tag_color'},
                        {name: '$action', column: '',static:true, class: 'text-center'},
                    ],
                    source: {
                      url: '/api/api_villa/list',
                      pointer: 'villas'
                    },
                    actions: [
                        {key:'edit', name:'Edit'},
                        {key:'remove',name:'Remove'}
                    ]
                },
            }
        },
        mounted() {
            EventBus.$on('liveview.fetched',(data) => this.villas = data)
        },
        methods: {
            doAction(a,item,index) {
                if(a.key == 'edit') {
                    this.$store.commit('villas/redirectToRegister',item.id);
                }
            },
            addNew() {
                this.$store.commit('villas/redirectToRegister',0);
            }
        }
    }
</script>

<style>
    .badge-info {
        background-color: #3a87ad;
    }

    .badge-error {
        background-color: #b94a48;
    }
</style>