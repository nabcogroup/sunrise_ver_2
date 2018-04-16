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
            <div class="row">
                <div class="col-md-12">
                    <v-live-view :grid="gridView" @action="doAction" @onFilter="onFilter"></v-live-view>
                </div>
                <div class="col-md-4 col-md-offset-8">
                    <v-total-summary :config="totalSummaryConfig"></v-total-summary>
                </div>
            </div>


        </v-panel>
    </div>
</template>

<script>
    import {EventBus} from "../../eventbus";

    export default {

        data() {
            return {
                gridView: {
                    columns: [
                        {name: 'bill_no', column: 'Bill No', class: 'text-center', filter: true},
                        {name: 'full_location', column: 'Property', class: 'text-center', filter: true},
                        {name: 'villa_no', column: 'Villa No', class: 'text-center', style: "width:10%", filter: true},
                        {name: 'contract_no', column: 'Contract No', class: 'text-center', filter: true},
                        {name: 'full_name', column: 'Name'},
                        {name: 'period', column: 'Period', class: 'text-center'},
                        {name: 'contract_status', column: 'Status', class: 'text-center'},
                        {name: 'total_balance', column: 'Total Balance', class: 'text-right'},
                        {name: 'total_payment_due', column: 'Due Balance', class: 'text-right'},
                        {name: 'last_payment', column: 'Last Payment', class: 'text-center'},
                        {name: '$action', column: '', static: true, class: 'text-center'}
                    ],
                    actions: [
                        {key: 'update', name: 'Update'},
                        {key: 'view', name: 'View Bill'}
                    ],
                    source: {
                        url: 'api/bill/list'
                    }
                },
                totalSummaryConfig: {
                    url: '/api/bill/get_balance_total',
                    keyValue: {
                        key1: {
                            label: 'Total Bill Payment',
                            key: 'total_payment'
                        },
                        key2: {
                            label: 'Paid Bill Total',
                            key: 'total_clear_payment'
                        },
                        totalLabel: 'Total Balance'
                    },
                    type: 'live'
                }

            }

        },
        mounted() {
            EventBus.$emit("TotalSummary.init",null);
        },
        methods: {
            redirectToUpdatePayment(billNo) {
                axiosRequest.redirect("bill", "edit", billNo);
            },
            doAction(a, item, index) {
                if (a.key == 'update') {
                    this.redirectToUpdatePayment(item.bill_no);
                }
                else {
                    window.open(item.link);
                }

            },
            onFilter(value) {
                console.log(value);
                EventBus.$emit("TotalSummary.init", value);
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
