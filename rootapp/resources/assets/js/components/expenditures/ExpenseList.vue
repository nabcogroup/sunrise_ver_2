<template>
    <v-panel header="Expenses">
        <div class="row">
            <div class="col-md-10">
                <v-search :config="searchObj" @click="onSearch"></v-search>
            </div>
            <div class="col-md-2">
                <button class="btn btn-info btn-block" @click="$store.commit('expenditures/redirectToRegister')"><i
                        class="fa fa-plus" aria-hidden="true"></i> Add Expenses</button>
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


    import {mapGetters} from "vuex";
    import {EventBus} from "../../eventbus";

    export default {
        data() {
            return {
                gridView: {
                    columns: [
                        {name: 'payment_date', column: 'Payment Date', class: 'text-center', dtype: 'date'},
                        {name: 'location', column: 'Villa Location', class: 'text-center', filter: true},
                        {name: 'villa', column: 'Villa No', class: 'text-center', filter:true},
                        {name: 'expense_type', column: 'Expense Type', class: 'text-center', filter: true},
                        {name: 'payee', column: 'Paid To', class: 'text-center'},
                        {name: 'amount', column: 'Amount', class: 'text-center'},
                        {name: '$action', column: ' ', static: true, class: 'text-center', style: 'width:5%'}
                    ],
                    actions: [
                        {key: 'edit', name: 'Edit'}
                    ],
                    source: {
                        url: 'api/expenses',
                        params: {property: ''}
                    }
                },
                searchObj: {
                    api: '/api/property',
                    source: 'villa_location',
                    keyValue: 'code',
                    keyText: 'name'
                },
                returnValue: ''
            }
        },
        methods: {
            onSearch(value) {
                console.log(value);
                this.gridView.source.params.property = value;
                EventBus.$emit("onLiveViewFetch");
            },
            doAction(a, item, index) {

              if(a.key === 'edit') {
                  this.$store.commit('expenditures/redirectToRegister', {id: item.id});
              }
            }
        }
    }

</script>
