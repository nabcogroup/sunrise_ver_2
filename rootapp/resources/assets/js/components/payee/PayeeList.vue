<template>
    <v-panel header="Payees">
        <div class="row">
            <div class="col-md-2 col-md-offset-10">
                <button class="btn btn-info btn-block" @click="onAddPayee">
                    <i class="fa fa-plus " aria-hidden="true"></i> Add Payee</button>
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
                        {name: 'name', column: 'Name', filter:true},
                        {name: 'full_address', column: 'Address'},
                        {name: 'contact_no', column: 'Contact No',filter:true},
                        {name: 'fax_no', column: 'Fax No'},
                        {name: '$action', column: ' ', static: true, class: 'text-center', style: 'width:5%'}
                    ],
                    actions: [
                        {key: 'edit', name: 'Edit'}
                    ],
                    source: {
                        url: 'api/payee/list'
                    }
                }
            }
        },
        methods: {
            onAddPayee() {
                axiosRequest.redirect('payee','create');
            },
            doAction(a, item, index) {
              if(a.key === 'edit') {
                this.$store.dispatch('payees/redirectToRegister', {id: item.id});
              }
            }
        }

    }

</script>
