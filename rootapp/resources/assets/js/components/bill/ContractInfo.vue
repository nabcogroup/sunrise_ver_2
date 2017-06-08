<template>
    <div class="panel panel-info">
        <div class="panel-body">
            <p class="row">
                <strong class="col-md-3">Contract No:</strong>
                <span class="col-md-9">{{contract.contract_no}}</span>
            </p>
            <p class="row">
                <strong class="col-md-3">Type:</strong>
                <span class="col-md-9">{{contract.full_contract_type}}</span>
            </p>
            <p class="row">
                <strong class="col-md-3">Period:</strong>
                <span class="col-md-9">{{contract.period_start}} - {{contract.period_end}}</span>
            </p>
            <p class="row">
                <strong class="col-md-3">Amount:</strong>
                <span class="col-md-9">{{contract.amount}}</span>
            </p>
            <p class="row">
                <strong class="col-md-3">Status:</strong>
                <span class="col-md-9">{{contract.full_status}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            contractData: {}
        },
        computed: {
            contract() {
                return this.contractData;
            }
        }
    }
</script>