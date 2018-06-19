<template>
    <div class="row">
        <div class="col-md-4">
            <v-report-list-panel 
                title-head="General Reports" 
                :items="list" 
                @itemClicked="onReportClick"></v-report-list-panel>
        </div>
        <div class="col-md-8">
            <report-form @viewReportClick="viewReport" ></report-form>
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
                const param = this.params.params.find(item => {
                    return item.report_id === value.id;
                });
                
                EventBus.$emit("report.selected",{param: param,title: value.title,reportName: value.report_name});
            }
        },
        data() {
            return {
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

