<template>
    <div class="panel panel-info">
        <div class="panel-heading">
            <span></span>
            <strong>Tenant Information</strong>
        </div>
        <div class="panel-body">
            <div class="row">
                <p>
                    <strong class="col-md-2">Code:</strong>
                    <span class="col-md-10">{{tenant.code}}</span>
                </p>
                <p>
                    <strong class="col-md-2">Full Name:</strong>
                    <span class="col-md-10">{{tenant.full_name}}</span>
                </p>
            </div>
            <hr/>
            <div class="row">
                <p>
                    <strong class="col-md-2">Villa No:</strong>
                    <span class="col-md-10">{{villa.villa_no}}</span>
                </p>
                <p>
                    <strong class="col-md-2">Description:</strong>
                    <span class="col-md-10">{{villa.description}}</span>
                </p>
                <p>
                    <strong class="col-md-2">Rate/Month:</strong>
                    <span class="col-md-10">{{villa.rate_per_month}}</span>
                </p>
            </div>
            <hr/>
            
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tenantData: {},
            villaData: {}
        },
        computed: {
            tenant() {
                return this.tenantData;
            },
            villa() {
                return this.villaData;
            }

        }
    }
</script>