// CONTRACT
import ContractView from './components/contract/ContracView.vue';
import ContractTenantRegister from './components/contract/ContractTenantRegister.vue';
import ContractVilla from './components/contract/ContractVilla.vue';
import ContractCreate from './components/contract/ContractCreate.vue';
import ContractActive from './components/contract/ContractActive.vue';
import ContractPending from './components/contract/ContractPending.vue';
import ContractModal from './components/contract/ContractModal.vue';

Vue.component('contract-view',ContractView);
Vue.component('contract-tenantregister',ContractTenantRegister);
Vue.component('contract-villa', ContractVilla);
Vue.component('contract-create', ContractCreate);
Vue.component('contract-pending', ContractPending);
Vue.component('contract-modal', ContractModal);

// END CONTRACT

// ************* USER'S LIST *****************
import UsersList from './components/users/userslist.vue';
import UserProfile from './components/users/userprofile.vue';

Vue.component('users-list', UsersList);
Vue.component('user-profile', UserProfile);

// ********** USER'S END ********************
