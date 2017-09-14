<template>
    <div class="row">
        <div class="col-md-4">
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
                                    <li v-for="(data,index) in report.data">
                                        <a href="#" @click="onReportClick(data)">{{data.report_title}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <report-form :params="params" @viewReportClick="viewReport" ></report-form>
        </div>
    </div>
</template>

<script>

    import ReportForm from "./ReportForm.vue";
    import {EventBus} from "../../eventbus";

    export default {
        components: {ReportForm},
        props: ['list', 'params'],
        name: "reportList",
        methods: {
            viewReport(selected) {
                if (selected.report_name) {
                    let query = '';
                    if(selected.params) {
                        const report = selected.params;
                        if (report.models) {
                            query = "?" + $.param(report.models);
                        }
                    }

                    var url = window.Laravel.baseUrl + "/reports/" + selected.report_name + query;
                    window.open(url, "_blank");
                }

            },
            onReportClick(value) {
                EventBus.$emit("onReportSelected",value);
            }
        },
        data() {
            return {
                columns: [
                    {name: 'report_title', column: 'Report Name',},
                    {name: '$parameters', column: 'Parameters', style: "width:40%"},
                    {name: '$action', column: '', static: true, class: 'text-center', style: 'width:5%'},
                ],
                reports: [],
                selected: {
                    report_name: '',
                    params: [],
                }
            }
        },
        computed: {
            reportList() {
                return this.list;
            }
        }
    }
</script>

