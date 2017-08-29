<template>
    <v-panel header="Expenses">
        <div class="row">
            <div class="col-md-2 col-md-offset-10">
                <button class="btn btn-info btn-block" @click="$store.commit('expenditures/redirectToRegister')"><i
                        class="fa fa-plus" aria-hidden="true"></i> Add Expenses</button>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-12">
                <v-live-view :grid="gridView"></v-live-view>
            </div>
        </div>
    </v-panel>
</template>
<script>


    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                gridView: {
                    columns: [
                        {name: 'payment_date', column: 'Payment Date', class: 'text-center', dtype: 'date'},
                        {name: 'location', column: 'Villa Location', class: 'text-center'},
                        {name: 'villa', column: 'Villa No', class: 'text-center'},
                        {name: 'expense_type', column: 'Expense Type', class: 'text-center'},
                        {name: 'payee', column: 'Paid To', class: 'text-center'},
                        {name: 'amount', column: 'Amount', class: 'text-center'},

                    ],
                    source: {
                        url: 'api/expenses'
                    }
                }
            }
        }
    }

</script>
