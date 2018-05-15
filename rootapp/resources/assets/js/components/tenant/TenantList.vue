<template>
    <v-panel header="Tenant">
        <div class="row">
            <div class="col-md-2 col-md-offset-10">
                <button class="btn btn-info btn-block" @click="create">
                    <i class="fa fa-plus"></i> Add Tenant
                </button>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-12">
                <v-live-view :grid="gridView" @action="doAction"></v-live-view>
            </div>
        </div>
    </v-panel>
</template>

<script>
    export default {
        data() {
            return {
                gridView: {
                    columns: [
                        {name: 'full_name', column: 'Name', filter: true},
                        {name: 'reg_id', column: 'Qatar / CR ID', filter: true,class:'text-center'},
                        {name: 'email_address', column: 'Email Address',class:'text-center'},
                        {name: 'mobile_no', column: 'Mobile No', filter: true,class:'text-center'},
                        {name: 'status', column: 'Status', bindClass:'tag_color'},
                        {name: '$action', column: '', static: true, class: 'text-center'},

                    ],
                    actions: [
                        {key: 'edit', name: 'Edit'},
                        {key: 'link', name: 'History'}
                    ],
                    source: {
                        url: 'api/tenant/list'
                    }
                }
            }
        },
        methods: {
            doAction(a, item, index) {
                if(a.key == 'edit') {
                    this.$store.commit('tenants/toEdit',item.id);
                }
                else {
                    this.$store.commit('tenants/redirectToLedger',{url: item.link});
                }

            },
            create() {
                 this.$store.commit('tenants/toCreate');
            }
        }
    }
</script>
