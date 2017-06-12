<template>
    <div class="x-panel is-margin-bottom">
        <div class="panel-heading">
            TENANT REGISTRATION
        </div>
        <div class="panel-body">
            <div class='form-group'>
                <label class='col-md-3 text-right'>Tenant Type:</label>
                <div class='col-md-9'>
                    <select class='form-control' name='type'
                            v-model='tenant.type'>
                        <option v-for='lookup in lookups.tenant_type' v-bind:value='lookup.code'>{{lookup.name}}</option>
                    </select>
                </div>
            </div>

            <div class='form-group'>
                <label class='col-md-3 text-right'>{{labels.fullName}}: <span class="text-danger">*</span></label>
                <div class='col-md-9'>
                    <input type='text' class='form-control' name='register_tenant.full_name'
                           v-model='tenant.full_name'>
                    <error :errorDisplay="errors.get('register_tenant.full_name')">
                        {{errors.get('register_tenant.full_name')}}
                    </error>
                </div>
            </div>

            <!-- Company / Representative -->
            <div class='form-group text-right'>
                <label for='reg_name' class='col-md-3'>{{labels.regName}}: </label>
                <div class='col-md-9'>
                    <input type='text' class='form-control' name='register_tenant.reg_name'
                           v-model='tenant.reg_name' id='reg_name'>
                </div>
            </div>

            <!-- Qatar Id / CR No -->
            <div class='form-group text-right'>
                <label for='reg_id' class='col-md-3 text-right'>{{labels.regNo}}: <span class="text-danger">*</span></label>
                <div class='col-md-9'>
                    <input type='text' class='form-control' name='register_tenant.reg_id'
                           v-model='tenant.reg_id'>
                    <error :errorDisplay="errors.get('register_tenant.reg_id')">
                        {{errors.get('register_tenant.reg_id')}}
                    </error>
                </div>
            </div>

            <!-- Birthday / Validity Date -->
            <div class="form-group">
                <label class="col-md-3 text-right">{{labels.regDate}}: <span class="text-danger">*</span></label>
                <div class="col-md-9">
                    <dtpicker dp-name="register_tenant.reg_date" @pick="tenant.reg_date = $event"
                              :value="tenant.reg_date"></dtpicker>
                    <error :errorDisplay="errors.get('register_tenant.reg_date')">
                        {{errors.get('register_tenant.reg_date')}}
                    </error>
                </div>
            </div>

            <div class="form-group" v-show="showGender">
                <label class="col-md-3 text-right">Gender:</label>
                <div class="col-md-9">
                    <select class="form-control" name="gender" v-model="tenant.gender">
                        <option value="male" selected="true">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <hr/>

            <div class="form-group">
                <label class="col-md-3 text-right">Email Address: <span class="text-danger">*</span></label>
                <div class="col-md-9">
                    <input name="register_tenant.email_address" type="text" class="form-control"
                           v-model="tenant.email_address">
                    <error :errorDisplay="errors.get('register_tenant.email_address')">
                        {{errors.get('register_tenant.email_address')}}
                    </error>
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-3 text-right">Tel No:</label>
                <div class="col-md-9">
                    <input name="tel_no" type="text" class="form-control"
                           v-model="tenant.tel_no">
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-3 text-right">Mobile No: <span class="text-danger">(tel no or mobile)*</span></label>
                <div class="col-md-9">
                    <input name="register_tenant.mobile_no" type="text" class="form-control"
                           v-model="tenant.mobile_no">
                    <error :errorDisplay="errors.get('register_tenant.mobile_no')">
                        {{errors.get('register_tenant.mobile_no')}}
                    </error>
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-3 text-right">Fax No:</label>
                <div class="col-md-9">
                    <input name="fax_no" type="text" class="form-control"
                           v-model="tenant.fax_no">
                </div>
            </div>
            <hr/>

            <div class="form-group">
                <label class="col-md-3 text-right">Address 1: <span class="text-danger">*</span> </label>
                <div class="col-md-9">
                    <input name="register_tenant.address_instance.address_1"
                           type="text" class="form-control"
                           v-model="tenant.address_instance.address_1">
                    <error :errorDisplay="errors.get('register_tenant.address_instance.address_1')">
                        {{errors.get('register_tenant.address_instance.address_1')}}
                    </error>
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-3 text-right">Address 2:</label>
                <div class="col-md-9">
                    <input name="address_2" type="text" class="form-control"
                           v-model="tenant.address_instance.address_2">
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-3 text-right">City: <span class="text-danger">*</span></label>
                <div class="col-md-3 text-right">
                    <input name="register_tenant.address_instance.city" id="register_tenant.address_instance.city"
                           type="text" class="form-control"
                           v-model="tenant.address_instance.city">
                    <error :errorDisplay="errors.get('register_tenant.address_instance.city')">
                        {{errors.get('register_tenant.address_instance.city')}}
                    </error>
                </div>
                <label class="col-md-3 text-right">Postal Code: <span class="text-danger">*</span></label>
                <div class="col-md-3">
                    <input name="register_tenant.address_instance.postal_code"
                           id="register_tenant.address_instance.postal_code" type="text" class="form-control"
                           v-model="tenant.address_instance.postal_code">
                    <error :errorDisplay="errors.get('register_tenant.address_instance.postal_code')">
                        {{errors.get('register_tenant.address_instance.postal_code')}}
                    </error>
                </div>
            </div>
        </div>
    </div>
</template>


<script>


    //import widget
    import ErrorLabel from '../ErrorLabel.vue';
    import DateTimePicker from '../DateTimePicker.vue';

    export default {
        name: "TenantRegister",
        props: ['viewModel'],
        components: {
            'error': ErrorLabel,
            'dtpicker': DateTimePicker
        },
        computed: {
            lookups() {
                return this.viewModel.lookups;
            },
            tenant() {
                return this.viewModel.data.register_tenant;
            },
            labels() {
                if(this.tenant.type == 'individual') {
                    return {
                        regName : "Company",
                        fullName : "Full Name",
                        regDate : "Birthday",
                        regNo : "Qatar Id"
                    }
                }
                else {
                    return {
                        regName : "Representative",
                        fullName : "Business Name",
                        regDate : "Validity Date",
                        regNo : "CR No"
                    }
                }
            },
            showGender() {
                return this.viewModel.isIndividual();
            },
            errors() {
                return this.viewModel.errors;
            }
        }
    }

</script>
