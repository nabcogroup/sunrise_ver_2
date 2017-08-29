<template>
    <v-dialog modal-id="search" dialog-title="Bill Search" ftype="search" size="lg" @dismiss="onDismiss" v-model="searchToggle">
        <div class="form-inline">
            <div class="form-group">
                <input type="text" v-model="search.value" class="form-control search-width" name="search" placeholder="Search">
            </div>
            <div class="form-group">
                <v-select  v-model="search.field" :options="search.options"></v-select>
            </div>
            <button type="button" class="btn btn-default" @click="onSearch">Search</button>
        </div>
        <div>
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Tenant Code</th>
                        <th>Name</th>
                        <th>Contract No</th>
                        <th>Bill No</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in search.data">
                        <td>{{item.code}}</td>
                        <td>{{item.full_name}}</td>
                        <td>{{item.contract_no}}</td>
                        <td>{{item.bill_no}}</td>
                        <td><button class="btn btn-info" @click="select(item.bill_no)">Select</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-dialog>
</template>

<script>

    import {EventBus} from "../../eventbus";


    export default {
        data() {
            return {
               searchToggle: false
            }
        },
        methods: {
            onSearch() {
                this.$store.dispatch('payments/search');
            },
            select(billNo) {
                this.searchToggle = false;
                this.$emit("select",billNo);
            },
            onDismiss(result) {
                this.$emit("cancel");
            }
        },
        mounted() {
            EventBus.$on("openSearchBillDialog", () => this.searchToggle = true);
        },
        computed: {
            search() {
                return this.$store.getters['payments/search'];
            }
        },
        watch: {
            searchToggle(val) {
                if(val) {
                    this.$store.commit('payments/clear');
                }
            }
        }
    }
</script>

<style>
    .search-width {
        width: 350px !important;
    }
</style>