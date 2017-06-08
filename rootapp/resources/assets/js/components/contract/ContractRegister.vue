<template>
    <form class="form-horizontal" @submit.prevent="save()" @keydown="viewModel.errors.clear($event.target.name)">
        <div class="row">
            <div class="col-md-6">
                <tenant-register :viewModel="viewModel"></tenant-register>
            </div>
            <div class="col-md-6">
                <contract-villa :viewModel="viewModel"></contract-villa>
                <contract-entry :viewModel="viewModel"></contract-entry>
            </div>
            <div class="col-md-3 col-md-offset-9">
                <button class="btn btn-info btn-block" type="submit">Save</button>
            </div>
        </div>
    </form>
</template>

<script>

    import TenantRegister from './TenantRegister.vue';
    import ContractVilla from './ContractVilla.vue';
    import ContractEntry from './ContractEntry.vue';

    import {ContractRegisterModel} from './ContractRegisterModel';

    export default {
        name: "Register",
        components: {
            'tenantRegister': TenantRegister,
            'contractVilla': ContractVilla,
            'contractEntry': ContractEntry
        },
        data() {
            return {
                viewModel: new ContractRegisterModel()
            }
        },
        mounted() {
            this.viewModel.create();
        },
        methods: {
            save() {
                this.viewModel.save();
            }
        }
    }
</script>