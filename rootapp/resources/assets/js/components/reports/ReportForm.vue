<template>
    <v-panel :header="'Report Parameters - ' + title" head-icon="fa fa-paste">
        <div v-if="!isEmpty(selected.params)">
            <template v-if="selected.params.templateType === 'custom'">
                <expense-report-form :params="selected.params"></expense-report-form>
            </template>
            <template v-else>
                <div class="form-horizontal">
                    <div v-for="(input,i) in selected.params.inputs" :key="i" class="form-group">
                        <label class="col-md-3">{{input.label}}:</label>
                        <div class="col-md-9">
                            <template v-if="input.type=='dropdown'">
                                <select class="form-control"
                                    v-model="selected.params.models[input.model]" 
									@change="onChange(input,$event.target.value)">
                                    <option v-if="input.default === ''" value="">{{input.default_text}}</option>
                                    <option v-for="(lookup,index) in selected.params.lookups[input.selection]" 
                                        :value="lookup[getLookupValue(input.value)]"
                                        :key="index">
                                            {{lookup[getLookupText(input.text)]}}
                                    </option>
                                </select>
                            </template>
                            <template v-else-if="input.type=='date'">
                                <v-dt-picker v-model="selected.params.models[input.model]"></v-dt-picker>
                            </template>
                            <template v-else-if="input.type=='number'">
                                <input class="form-control" v-if="input.type=='number'"
                                type="number"
                                v-model="selected.params.models[input.model]"/>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <template slot="panel-footer">
            <div class="row">
                <div class="col-md-2 col-md-offset-10">
                    <button class="btn-info btn btn-block" v-if="selected.report_name" @click="onViewReportClick">View Report</button>
                </div>
            </div>
        </template>
    </v-panel>
</template>

<script>
import { EventBus } from "../../eventbus";

import ExpenseReportForm from "./customs/ExpenseReportForm";

class CommandFunctions {
  constructor(types) {
    this.types = types;
  }

  autoDate(models, actions, value) {
	
	models[actions.bind_from] = moment()
      .startOf("year")
      .month(value - 1)
      .format("MM/DD/YY");

    models[actions.bind_to] = moment()
      .startOf("year")
      .month(value)
      .subtract(1, "days")
      .format("MM/DD/YY");
  }

  execute(models, actions, value) {
    switch (this.types) {
      case "autoDate":
        this.autoDate(models, actions, value);
        break;
      default:
    }
  }
}

const func = {
  autoDate: (models, actions, value) => {
    models[actions.bind_from] = moment()
      .startOf("year")
      .month(value - 1)
      .format("MM/DD/YY");
    models[actions.bind_to] = moment()
      .startOf("year")
      .month(value)
      .subtract(1, "days")
      .format("MM/DD/YY");
  }
};

export default {
  components: { ExpenseReportForm },
  data() {
    return {
      selected: {
        report_name: "",
        params: {}
      },
      title: ""
    };
  },
  methods: {
    onNotify(response) {
      this.title = response.title;
      let param = response.param;
      if (response.param !== undefined) {
        if (param.lookups !== undefined && param.lookups.length === 0) {
          axiosRequest
            .get("reports", "lookups", response.reportName)
            .then(r => {
              if (param.templateType === "custom") {
                EventBus.$emit("form.notify", r.data);
              } else {
                param.lookups = r.data;
              }
            });
        }

        this.selected.params = param;
      } else {
        this.selected.params = {};
      }
      this.selected.report_name = response.reportName;
    },
    onChange(input, value) {
      if (input.actions) {
        let cf = new CommandFunctions(input.actions.func);
        cf.execute(this.selected.models, input.actions, value);
      }
    },
    onViewReportClick() {
      this.$emit("viewReportClick", this.selected);
    },
    isEmpty(value) {
      return _.isEmpty(value);
    },
    getLookupValue(value) {
      return value || "code";
    },
    getLookupText(value) {
      return value || "name";
    }
  },
  mounted() {
    EventBus.$on("report.selected", response => this.onNotify(response));
  }
};
</script>