<template>
    <v-panel :header="'Report Parameters - ' + titleHead" head-icon="fa fa-paste">
        <template v-if="templateType === 'custom'">
            <slot name="template"></slot>
        </template>
        <template v-else>
            <div class="form-horizontal">
                <div class="form-group" v-for="(component,i) in config.components" :key="i">
                    <label class="col-md-3">{{component.label}}:</label>
                    <div class="col-md-9">
                        <template v-if="component.type=='dropdown'">
                            <select class="form-control"
                                v-model="models[component.model]" 
                                @change="onChange(component,$event.target.value)">
                                
                                <option v-if="component.default === ''" value="">{{component.default_text}}</option>
                                <option v-for="(lookup,index) in lookups[input.selection]" 
                                    :value="lookup[component.value || 'code']"
                                    :key="index">
                                        {{lookup[component.text || 'name']}}
                                </option>
                            </select>
                        </template>
                        <template v-else-if="component.type=='date'">
                            <v-dt-picker v-model="models[component.model]"></v-dt-picker>
                        </template>
                        <template v-else>
                            <input class="form-control" 
                                :type="component.type"
                                v-model="models[component.model]"/>
                        </template>
                    </div>
                </div>
            </div>
        </template>
        <template slot="panel-footer">
            <div class="row">
                <div class="col-md-2 col-md-offset-10">
                    <button class="btn-info btn btn-block" v-if="visible" @click="onViewReportClick">View Report</button>
                </div>
            </div>
        </template>
    </v-panel>
</template>

<script>
export default {
    props: {
        titleHead: {
            type: String,
            default: ''
        },
        configs: {
            type: Object,
            required: true
        },
        components: {
            required: true,
        },
        models: {
            required: true
        },
        templateType: {

        }
    }
}
</script>

