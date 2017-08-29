<template>
    <form class="form-horizontal" @submit.prevent="save()" @keydown="errors.clear($event.target.name)">
        <div class="row">
            <div class="col-md-6">
                <tenant-register></tenant-register>
            </div>
            <div class="col-md-6">
                
                <contract-villa></contract-villa>
                
                <contract-entry></contract-entry>
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

    const confirmation = {
        contractSave: (cb) => {
            bbox.confirm({
                title: "Create Contract",
                message: "Do you want to create contract? Note: Please review your detail before saving..",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: (result) => {
                    cb(result)
                }
            })
        }
    }


    export default {
        name: "Register",
        components: {
            'tenantRegister': TenantRegister,
            'contractVilla': ContractVilla,
            'contractEntry': ContractEntry
        },
        mounted() {
            this.$store.dispatch('contracts/create');
        },
        methods: {
            save() {
                confirmation.contractSave((result) => {
                    if (result) {
                        this.$store.dispatch('contracts/save');
                    }
                });
            }
        },
        computed: {
            errors() {
                return this.$store.getters['contracts/stateContractError']
            }
        }
    }
</script>