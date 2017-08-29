<template>
    <v-panel :header="'Report Parameters - ' + report_title" head-icon="fa fa-paste">
        <div v-if="!isEmpty(selected.params)">
            <div class="form-horizontal">
                <div v-for="(input,i) in selected.params.inputs" :key="i" class="form-group">
                    <label class="col-md-3">{{input.label}}:</label>
                    <div class="col-md-9">
                        <select class="form-control"
                                v-if="input.type=='dropdown'"
                                v-model="selected.params.models[input.model]">
                            <option
                                    v-if="input.default === ''" value="">{{input.default_text}}
                            </option>
                            <option v-for="lookup in selected.params.lookups[input.selection]"
                                    :value="lookup.code">{{lookup.name}}
                            </option>
                        </select>
                        <dt-picker v-if="input.type=='date'"
                                   :value="selected.params.models[input.model]"
                                   @pick="selected.params.models[input.model] = $event"></dt-picker>
                        <input class="form-control" v-if="input.type=='number'"
                               type="number"
                               v-model="selected.params.models[input.model]"/>
                    </div>
                </div>
            </div>
        </div>
        <template slot="panel-footer">
            <div class="row">
                <div class="col-md-2 col-md-offset-10">
                    <button class="btn-info btn btn-block" v-if="selected.report_name" @click="onViewReportClick">
                        View Report
                    </button>
                </div>
            </div>
        </template>
    </v-panel>
</template>

<script>
    import {EventBus} from "../../eventbus";

    export default {
        props: ["params"],
        data() {
            return {
                selected: {
                    report_name: '',
                    params: {},
                },
                report_title: ''
            }
        },
        methods: {
            onNotify(response) {

                this.report_title = response.report_title;
                const params = this.params.params.find((item) => {
                    return item.report_id === response.id;
                });

                if (params !== undefined) {

                    if (params.lookups !== undefined
                        && params.lookups.length === 0)
                    {

                        axiosRequest.get("reports", "lookups", response.report_name).then(r => {
                            params.lookups = r.data;
                        });

                    }

                    this.selected.params = params;

                }
                else {
                    this.selected.params = {};
                }
                this.selected.report_name = response.report_name;
            },
            onViewReportClick() {
                this.$emit("viewReportClick", this.selected);
            },
            isEmpty(value) {
                return _.isEmpty(value);
            }
        },
        mounted() {
            EventBus.$on("onReportSelected", response => this.onNotify(response));
        }
    }
</script>