<template>
    <modal modal-id="search" dialog-title="Bill Search" ftype="search" size="lg" @dismiss="" :unfold="toggle">
        <div class="form-inline">
            <div class="form-group">
                <input type="text" v-model="filterValue" class="form-control search-width" name="search" placeholder="Search">
            </div>
            <div class="form-group">
                <v-select  v-model="filterField" :options="options"></v-select>
            </div>
            <button type="submit" class="btn btn-default">Search</button>
        </div>
        <div>
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Tenant Code</th>
                        <th>Name</th>
                        <th>Contact No</th>
                        <th>Bill No</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </modal>
</template>

<script>

    import Modal from '../Modal.vue';

    import vSelect from "vue-select"

    export default {
        props: ["toggle"],
        components: {
            "modal": Modal,
            "vSelect" : vSelect
        },
        data() {
            return {
                options: [ {value: 'bill_no',label:'Bill No'},{value: 'contract_no',label:'Contract No'}],
                filterValue: '',
                filterField: ''
            }
        }
    }
</script>

<style>
    .search-width {
        width: 350px !important;
    }
</style>