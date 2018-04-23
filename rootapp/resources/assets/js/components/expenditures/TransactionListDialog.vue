<template>
    <v-dialog modal-id="transactionList" dialog-title="Transaction Entry" v-model="toggle" @dismiss="save" size="sm">
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
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>Transaction</th>
                    </tr>
                    </thead>
                    <tbody>

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
            save() {

            }
        }
    }
</script>