<template>
    <v-dialog modal-id="transactionList" dialog-title="Transaction Entry" v-model="toggle" size="sm" button-type="cancelOnly">
        <div class="row">
            <!-- transaction -->
            <div class="form-group">
                <div class="col-md-12">
                    <input type="text" class="form-control" >
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered v-table-transaction">
                    <thead>
                        <tr>
                            <th style="width:10%">No</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(expense,index) in expenses" 
                            :key="expense.transaction_no"
                            @click="selectTransaction(expense.transaction_no)">
                            <td>{{index + 1}}</td>
                            <td>{{expense.transaction_no}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </v-dialog>
</template>

<script>

    import {EventBus} from "../../eventbus";
    import {toggleModal} from "../mixins";
    import {mapGetters} from "vuex";


    export default {
        
        name: "TransactionListDialog",
        mixins: [toggleModal],

        beforeMount() {
            EventBus.$on("list.open", (item) => {
                this.openDialog();
                this.$store.dispatch('expenditures/fetch');
            });
        },
        
        computed: mapGetters('expenditures', {
            expenses: 'expenses'
        }),
        
        methods: {
            selectTransaction(transactionNo) {
                this.closeDialog()
                this.$emit('selected',transactionNo)
            }
        }
    }
</script>

<style scope>
    .v-table-transaction th {
        background: #ccc;
        text-align: center;
    }

    .v-table-transaction tr:hover {
        background:burlywood;
        cursor: pointer;
    }
</style>