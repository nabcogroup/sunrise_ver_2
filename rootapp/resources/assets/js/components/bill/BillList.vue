<template>
    <div>
        <v-panel header="Pending Bill">
            <v-live-view :grid="gridView" @action="doAction"></v-live-view>
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
                        {name: 'total_payment', column: 'Total Payment', class: 'text-right'},
                        {name: 'total_balance', column: 'Total Balance', class: 'text-right'},
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
