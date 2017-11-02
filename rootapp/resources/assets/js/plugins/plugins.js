
import Accordion from "./controls/Accordion.vue";

import vSelect from "vue-select"
import DateTimePicker from "./controls/DateTimePicker.vue";
import ErrorSpan from "./controls/ErrorSpan.vue";

import DataView from "./controls/DataView.vue";
import GridView from "./controls/GridView.vue";
import VLiveView from "./controls/VLiveView.vue";
import VComboBox from "./controls/VComboBox.vue";

import VInput from "./controls/VInput.vue";

import VDialog from "./containers/VDialog.vue";
import VPanel from "./containers/VPanel.vue";
import VTab from "./containers/VTab.vue";
import VTabGroup from "./containers/VTabGroup.vue";
import VInputWrapper from "./containers/VInputWrapper.vue";
import VSwitch from "./controls/VSwitch.vue";
import VSearch from "./controls/VSearch.vue";


const MyPlugins = {
    install(Vue,options) {

        Vue.component(Accordion.name, Accordion);
        Vue.component('dataView',DataView);
        Vue.component('vSelect',vSelect);
        Vue.component(DateTimePicker.name,DateTimePicker);
        Vue.component(ErrorSpan.name,ErrorSpan);
        Vue.component(GridView.name,GridView);
        Vue.component(VDialog.name,VDialog);
        Vue.component(VInput.name,VInput);
        Vue.component(VPanel.name,VPanel);
        Vue.component(VLiveView.name,VLiveView);
        Vue.component(VTab.name,VTab);
        Vue.component(VTabGroup.name,VTabGroup);
        Vue.component(VInputWrapper.name,VInputWrapper);
        Vue.component(VComboBox.name,VComboBox);
        Vue.component(VSwitch.name,VSwitch);
        Vue.component(VSearch.name,VSearch);

    }
}

export default MyPlugins;