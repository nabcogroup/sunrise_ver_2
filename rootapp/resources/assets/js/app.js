
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */
window.Vue = require('vue');


/**************************
 * Vue Event
 *
 **************************/
window.VueEvent = new Vue();


/**
 * Vue Router include in vue
 */
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';

Vue.use(VeeValidate);
Vue.use(Vuex);

/**************************
*
*
**************************/
import Sidebar from './components/Sidebar.vue';
import VillaList from './components/villa/VillaList.vue';
import VillaRegister from './components/villa/VillaRegister.vue';
import ContractList from './components/contract/ContractList.vue';
import ContractRegister from './components/contract/ContractRegister.vue';
import ContractCalendarEntry from './components/contract/CalendarEntry.vue';
import BillRegister from './components/bill/BillRegister.vue';
import BillUpdateForm from './components/bill/BillUpdateForm.vue';

Vue.filter('toDateFormat', (value) => {
    
    if(isNaN(Date.parse(value))) {
        value = moment().format('L');
    }
    return moment(value).format('L');
});

Vue.filter('toCurrencyFormat', (value) => {

    if(isNaN(Number.parseFloat(value))) {

        value = 0;
    }
    return accounting.formatNumber(value)
});

new Vue({
    el: "#mainApp",
    components: {
        'villaList': VillaList,
        'villaRegister': VillaRegister,
        'contractList': ContractList,
        'contractRegister': ContractRegister,
        'billRegister': BillRegister,
        'billUpdateForm': BillUpdateForm,
        'contractCalendarEntry': ContractCalendarEntry,
        'sidebar' : Sidebar
    }
});


