<template>
    <div class="row">
        <div class="col-md-6">
            <div class="panel panel-info wrap">
                <div class="panel-heading">
                    <h5>General Reports</h5>
                </div>
                <div class="panel-group wrap" id="bs-collapse">
                    <div class="panel panel-success active" v-for="(report,i) in reportList" :key="i">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#" href="#one">
                                    {{report.title}}
                                </a>
                            </h4>
                        </div>
                        <div id="one" class="panel-collapse">
                            <div class="panel-body">
                                <ul>
                                    <li v-for="data in report.data">
                                        <a href="#">{{report.title}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h5>General Reports</h5>
                </div>
                <div class="panel-body">
                    <table class="table table-condensed table-striped">
                        <thead>
                            <tr class="info">
                                <th class="text-center">No.</th>
                                <th v-for="(column,i) in columns" :key="i" class="text-center">{{column.column}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,i) in reportList" :key="i">
                                <td class="text-center">{{(i + 1)}}</td>
                                <td v-for="column in columns" :style="column.style">
                                    <div v-if="column.name==='$parameters'">
                                        <div class="form-horizontal" v-if="item.inputs">
                                            <div class="form-group" v-for="input in item.inputs ">
                                                <label class="col-md-3 text-right">{{input.label}}:</label>
                                                <div class="col-md-9" v-if="input.type === 'dropdown'">
                                                    <select class="form-control" v-model="item.models[input.model]">
                                                        <option v-for="lookup in dlookups[input.selection]" :value="lookup.code">
                                                            {{lookup.name}}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="col-md-9" v-else-if="input.type === 'text'">
                                                    <input type="text" class="form-control" :placeholder="input.placeholder" v-model="item.models[input.model]">
                                                </div>
                                                <div class="col-md-9" v-else-if="input.type === 'number'">
                                                    <input type="number" class="form-control" :placeholder="input.placeholder" v-model="item.models[input.model]">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div v-else-if="column.name==='$action'" class="text-center">
                                        <button class="btn btn-success" @click="viewReport(i)">
                                            <i class="fa fa-eye"></i>
                                        </button>
                                    </div>
                                    <span v-else>
                                        {{item[column.name]}}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import GridView from "../GridView.vue";
import Accordion from "../../plugins/controls/Accordion.vue";

export default {
    props: ['list', 'dlookups'],
    name: "generalReports",
    components: {
        Accordion,
        GridView
    },
    methods: {
        viewReport(id) {

            const report = this.list.find((item, index) => {
                return index === id;
            })

            let query = '';
            if (report.models) {
                query = "?" + $.param(report.models);
            }
            var url = window.Laravel.baseUrl + "/reports/" + report.report_name + query;
            window.open(url, "_blank");
        }
    },
    data() {
        return {
            columns: [
                { name: 'report_title', column: 'Report Name', },
                { name: '$parameters', column: 'Parameters', style: "width:40%" },
                { name: '$action', column: '', static: true, class: 'text-center', style: 'width:5%' },
            ],
            reports: []
        }
    },
    computed: {
        reportList() {
            return this.list;
        }
    }
}
</script>

