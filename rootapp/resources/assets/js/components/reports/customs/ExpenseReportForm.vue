<template>
    <div class="form-horizontal">
        <div class="form-group">
            <label for="properties" class="col-md-3">Properties:</label>
            <div class="col-md-9">
                <select class="form-control"
                    v-model="params.models.location" @change="onLocationChange">
                    <option v-if="params.models.location === ''" value="">--SELECT PROPERTIES--</option>
                    <option v-for="(lookup,index) in lookups.villa_location" 
                        :value="lookup.code"
                        :key="index">{{lookup.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="villas" class="col-md-3">Villas:</label>
            <div class="col-md-9">
                <select class="form-control"
                    v-model="params.models.villa_no">
                    <option v-if="params.models.villa_no === ''" value="">--SELECT VILLAS--</option>
                    <option v-for="(lookup,index) in lupVilla" 
                        :value="lookup.villa_no"
                        :key="index">{{lookup.villa_no}}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="month_from" class="col-md-3">Month From:</label>
            <div class="col-md-9">
                <select class="form-control"
                    v-model="params.models.month_from">
                    <option v-if="params.models.month_from === ''" value="">--SELECT MONTH FROM--</option>
                    <option v-for="(lookup,index) in months" 
                        :value="lookup.code"
                        :key="index">{{lookup.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="month_to" class="col-md-3">Month To:</label>
            <div class="col-md-9">
                <select class="form-control"
                    v-model="params.models.month_to">
                    <option v-if="params.models.month_to === ''" value="">--SELECT MONTH TO--</option>
                    <option v-for="(lookup,index) in months" 
                        :value="lookup.code"
                        :key="index">{{lookup.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="month_to" class="col-md-3">Year:</label>
            <div class="col-md-9">
                <input type="text" v-model="params.models.year" class="form-control"/>
            </div>
        </div>
    </div>
</template>
<script>
    import { EventBus } from '../../../eventbus';
    export default {
        name: 'ExpenseReportForm',
        props: ["params"],
        data() {
            return {
                lookups: {
                    villa_location:[],
                },
                villas: []
            }
        },
        beforeMount() {
            EventBus.$on('form.notify',(data) => {
                this.lookups = data;
            });
        },
        beforeDestroy() {
            this.params.models.location = '';
            this.params.models.villa_no = '';
            this.params.models.month_from = '';
            this.params.models.month_to = '';
            this.params.models.month_year = '';
        },
        methods: {
            onLocationChange(value) {
                const url = `/api/reports/lookups/expense_property?source=villas&location=${this.params.models.location}`;
                axiosRequest.dispatchGet(url)
                    .then(r => {
                        this.params.models.villa_no = "";
                        this.villas = r.data.villas;
                    });
            }
        },
        computed: {
            lupVilla() {
                return this.villas;
            },
            months() {
                return this.lookups.months
            }
        },

        
    }
</script>