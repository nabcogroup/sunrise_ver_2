<template>
    <modal modal-id="search" dialog-title="Bill Search" ftype="search" size="lg" @dismiss="onDismiss" :unfold="toggle">
        <div class="form-inline">
            <div class="form-group">
                <input type="text" v-model="searchData.value" class="form-control search-width" name="search" placeholder="Search">
            </div>
            <div class="form-group">
                <v-select  v-model="searchData.filter" :options="searchData.options"></v-select>
            </div>
            <button type="button" class="btn btn-default" @click="search">Search</button>
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
                    <tr v-for="item in searchData.list">
                        <td>{{item.code}}</td>
                        <td>{{item.full_name}}</td>
                        <td>{{item.contract_no}}</td>
                        <td>{{item.bill_no}}</td>
                        <td><button class="btn btn-info" @click="select(item.bill_no)">Select</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </modal>
</template>

<script>

    import Modal from '../Modal.vue';
    import vSelect from "vue-select"

    import {SearchModel} from "./BillModel";

    export default {
        props: ["toggle"],
        components: {
            "modal": Modal,
            "vSelect" : vSelect
        },
        data() {
            return {
                searchModel: new SearchModel()
            }
        },
        methods: {
            search() {
                this.searchModel.search();
            },
            select(billNo) {
                this.$emit("select",billNo);

            },
            onDismiss(result) {
                this.$emit("cancel");
            }
        },
        computed: {
            searchData() {
                return this.searchModel.data;
            }
        },
        watch: {
            toggle(val) {
                console.log(val);
                if(val) {
                    this.searchModel.clear();
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