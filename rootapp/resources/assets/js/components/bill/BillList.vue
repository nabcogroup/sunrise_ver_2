<template>
    <div>
        <div class="row">
            <div class="col-md-3 col-md-offset-9">
                <div class="btn-group pull-right">
                    <a href="#" class="btn btn-default"><i class="fa fa-print"></i></a>
                    <a href="#" class="btn btn-default"><i class="fa fa-file-pdf-o"></i></a>
                </div>
            </div>
        </div>
        <hr>
        <v-panel header="Pending Bill">
            <v-live-view :grid="gridView" @action="doAction" @beforeFetch="onFetch"></v-live-view>
        </v-panel>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                gridView: {
                    columns: [
                        {name: 'bill_no', column: 'Bill No', class: 'text-center',filter:true},
                        {name: 'full_location', column: 'Property', class: 'text-center', filter:true},
                        {name: 'villa_no', column: 'Villa No', class: 'text-center',style:"width:10%", filter:true},
                        {name: 'contract_no', column: 'Contract No', class: 'text-center', filter:true},
                        {name: 'full_name', column: 'Name'},
                        {name: 'period', column: 'Period', class: 'text-center'},
                        {name: 'contract_status', column: 'Status', class: 'text-center'},
                        {name: 'total_balance', column: 'Total Balance', class: 'text-right'},
                        {name: 'last_payment', column: 'Last Payment', class: 'text-center'},
                        {name: '$action', column: '', static: true, class: 'text-center'}
                    ],
                    actions: [
                        {key: 'update', name: 'Update'}
                    ],
                    source: {
                        url: 'api/bill/list'
                    }
                }
            }
        },

        methods: {
            redirectToUpdatePayment(billNo) {
                axiosRequest.redirect("bill","edit",billNo);
            },
            doAction(a,item,index) {

                this.redirectToUpdatePayment(item.bill_no);
            },
            onFetch(value) {
                console.log(value.filter);
            }
        }
    }
</script>


<!-- methods: {
    doAction(a,id) {
        if(a.key == 'update') {
            this.$store.commit('bill/update',id);
        }
    }
} -->
