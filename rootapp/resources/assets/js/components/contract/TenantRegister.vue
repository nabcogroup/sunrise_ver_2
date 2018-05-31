<template>
    <v-panel head-icon="fa fa-user-circle-o" header="TENANT REGISTRATION">
        <v-input-wrapper label-class="col-md-3 text-right" label="Tenant Type" model-name="type">
            <select class='form-control' name='type' v-model='tenant.type'>
                <option v-for='lookup in lookups.tenant_type' v-bind:value='lookup.code'>{{lookup.name}}</option>
            </select>
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" :label="labels.fullName" :required="true" model-name="register_tenant.full_name">
            <input type='text' class='form-control' 
                    name='register_tenant.full_name' 
                    v-model='tenant.full_name'>
            <error-span v-model="stateContractError" name="register_tenant.full_name"></error-span>
        </v-input-wrapper>

        <!-- Company / Representative -->
        <v-input-wrapper label-class="col-md-3 text-right" :label="labels.regName" model-name="register_tenant.reg_name">
            <input type='text' class='form-control' name='register_tenant.reg_name' v-model='tenant.reg_name' id='reg_name'>
        </v-input-wrapper>

        <!-- Qatar Id / CR No -->
        <v-input-wrapper label-class="col-md-3 text-right" :label="labels.regNo" :required="true" model-name="register_tenant.reg_id">
            <div class="input-group">
                <input type='text' class='form-control' name='register_tenant.reg_id' v-model='tenant.reg_id'>
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" @click.prevent="searchTenant">
                        <i class="fa fa-search"></i>
                    </button>
                </span>
            </div>
            <error-span v-model="stateContractError" name="register_tenant.reg_id"></error-span>
        </v-input-wrapper>

        <!-- Birthday / Validity Date -->
        <v-input-wrapper :label="labels.regDate" label-class="col-md-3 text-right" :required="true" model-name="register_tenant.reg_date">
            <v-dt-picker v-model="tenant.reg_date"></v-dt-picker>
            <error-span v-model="stateContractError" name="register_tenant.reg_date"></error-span>
        </v-input-wrapper>
        <v-input-wrapper v-show="showGender" label="Gender" label-class="col-md-3 text-right" model-name="gender">
            <select class="form-control" name="gender" v-model="tenant.gender">
                <option value="male" selected="true">Male</option>
                <option value="female">Female</option>
            </select>
        </v-input-wrapper>

        <hr/>

        <v-input-wrapper 
            label-class="col-md-3 text-right" 
            label="Email Address" 
            :required="true" 
            model-name="register_tenant.email_address">
            
            <input name="register_tenant.email_address" type="text" class="form-control" v-model="tenant.email_address">
            <error-span v-model="stateContractError" name="register_tenant.email_address"></error-span>
        
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" label="Tel No" model-name="tel_no">
            <input name="tel_no" type="text" class="form-control" v-model="tenant.tel_no">
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" label="Mobile No" :required="true" custom-display="(tel no or mobile)*" model-name="register_tenant.mobile_no">
            <input name="register_tenant.mobile_no" type="text" class="form-control" v-model="tenant.mobile_no">
            <error-span v-model="stateContractError" name="register_tenant.mobile_no"></error-span>
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" label="Fax No" model-name="tenant.fax_no">
            <input name="fax_no" type="text" class="form-control" v-model="tenant.fax_no">
        </v-input-wrapper>
        
        <hr/>

        <v-input-wrapper label-class="col-md-3 text-right" :required="true" label="Address" model-name="register_tenant.tenant_address.address_1">
            <input name="register_tenant.tenant_address.address_1" type="text" class="form-control" v-model="tenant.tenant_address.address_1">
            <error-span v-model="stateContractError" name="register_tenant.tenant_address.address_1"></error-span>
        </v-input-wrapper>

        <v-input-wrapper label-class="col-md-3 text-right" label="Address 2" model-name="tenant.tenant_address.address_2">
            <input name="address_2" type="text" class="form-control" v-model="tenant.tenant_address.address_2">
        </v-input-wrapper>

        <div class="form-group">
            <v-input-wrapper :exclude-row="true" label-class="col-md-3 text-right" control-class="col-md-3" label="City" :required="true" model-name="register_tenant.tenant_address.city">
                <input name="register_tenant.tenant_address.city" id="register_tenant.tenant_address.city" type="text" class="form-control" v-model="tenant.tenant_address.city">
                <error-span v-model="stateContractError" name="register_tenant.tenant_address.city"></error-span>
            </v-input-wrapper>
            <v-input-wrapper :exclude-row="true" label-class="col-md-3 text-right" control-class="col-md-3" label="Postal Code" :required="true" model-name="register_tenant.tenant_address.postal_code">
                <input name="register_tenant.tenant_address.postal_code" id="register_tenant.tenant_address.postal_code" type="text" class="form-control" v-model="tenant.tenant_address.postal_code">
                <error-span v-model="stateContractError" name="register_tenant.tenant_address.postal_code"></error-span>
            </v-input-wrapper>
        </div>
    </v-panel>
</template>

<script>


//import widget
import ErrorLabel from '../ErrorLabel.vue';

import { mapGetters, mapActions } from "vuex";

export default {
    name: "TenantRegister",
    components: {
        'error': ErrorLabel,
    },
    methods: {
        ...mapActions('contracts', ['searchTenant'])
    },
    computed: {
        ...mapGetters('contracts', {
            tenant: 'tenant',
            lookups: 'lookups',
            labels: 'labels',
            showGender: 'showGender',
            stateContractError: 'stateContractError'
        })
    }
}

</script>
