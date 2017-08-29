<template>
  <div>
    <v-panel header="Tenant Register">
      <div class="row">
        <div class="col-md-2 col-lg-2" align="center"> <img src="http://via.placeholder.com/250x220" class="img-responsive">
        <button class="btn btn-danger btn-block">Upload Profile Image</button>
         </div>
        <div class=" col-md-10 col-lg-10 ">
          <div class="form-group row">
              <label class='col-md-3 text-right'>Tenant Type:</label>
              <div class='col-md-9'>
                <select class='form-control' name='type'
                        v-model='tenant.type'>
                    <option v-for='lookup in lookups.tenant_type' v-bind:value='lookup.code'>{{lookup.name}}</option>
                </select>
              </div>
          </div>
          <div class='form-group row'>
              <label class='col-md-3 text-right'>{{ labels.fullName }}: <span class="text-danger">*</span></label>
              <div class='col-md-9'>
                  <input type='text' class='form-control' name='register_tenant.full_name'
                         v-model='tenant.full_name'>
              </div>
          </div>
          <div class="form-group row">
            <label class='col-md-3 text-right'>{{ labels.regName }}: <span class="text-danger">*</span></label>
            <div class='col-md-9'>
                <input type='text' class='form-control' name='register_tenant.reg_name'
                       v-model='tenant.reg_name' id='reg_name'>
            </div>
          </div>
          <div class="form-group row">
            <label for='reg_id' class='col-md-3 text-right'>{{ labels.regNo }}: <span class="text-danger">*</span></label>
            <div class='col-md-3'>
                <input type='text' class='form-control' name='register_tenant.reg_id'
                       v-model='tenant.reg_id'>
            </div>
            <label class="col-md-3 text-right">{{ labels.regDate }}: <span class="text-danger">*</span></label>
            <div class="col-md-3">
                <dt-picker dp-name="register_tenant.reg_date" @pick="tenant.reg_date = $event"
                          :value="tenant.reg_date"></dt-picker>
            </div>
          </div>

          <div class="form-group row">
            <div v-if="showGender">
            <label class="col-md-3 text-right">Gender:</label>
            <div class="col-md-3">
                <select class="form-control" name="gender" v-model="tenant.gender">
                    <option value="male" selected="true">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
          </div>
          </div>
          <div class="form-group row">
            <div class="col-md-3">

            </div>
                  <div class="col-md-9">
                      <hr />
                  </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 text-right">Email Address: <span class="text-danger">*</span></label>
            <div class="col-md-3">
                <input name="register_tenant.email_address" type="text" class="form-control"
                       v-model="tenant.email_address">
            </div>
            <label class="col-md-3 text-right">Mobile No: <span class="text-danger">(tel no or mobile)*</span></label>
            <div class="col-md-3">
                <input name="register_tenant.mobile_no" type="text" class="form-control"
                       v-model="tenant.mobile_no">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 text-right">Tel No:</label>
            <div class="col-md-3">
                <input name="tel_no" type="text" class="form-control"
                       v-model="tenant.tel_no">
            </div>
            <label class="col-md-3 text-right">Fax No:</label>
            <div class="col-md-3">
                <input name="fax_no" type="text" class="form-control"
                       v-model="tenant.fax_no">
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-3">

            </div>
                  <div class="col-md-9">
                      <hr />
                  </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 text-right">Address 1: <span class="text-danger">*</span> </label>
            <div class="col-md-9">
                <input name="register_tenant.address_instance.address_1"
                       type="text" class="form-control"
                       v-model="tenant.tenant_address.address_1">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 text-right">Address 2:</label>
            <div class="col-md-9">
                <input name="address_2" type="text" class="form-control"
                       v-model="tenant.tenant_address.address_2">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 text-right">City: <span class="text-danger">*</span></label>
            <div class="col-md-3 text-right">
                <input name="register_tenant.address_instance.city" id="register_tenant.address_instance.city"
                       type="text" class="form-control"
                       v-model="tenant.tenant_address.city">
            </div>
            <label class="col-md-3 text-right">Postal Code: <span class="text-danger">*</span></label>
            <div class="col-md-3">
                <input name="register_tenant.address_instance.postal_code"
                       id="register_tenant.address_instance.postal_code" type="text" class="form-control"
                       v-model="tenant.tenant_address.postal_code">
            </div>
          </div>


        </div>

      </div>
      <div class="row">
          <div class="col-md-2 col-md-offset-10">
              <button type="submit" @click="save" class="btn btn-info btn-block">Save</button>
          </div>
      </div>
    </v-panel>
  </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";


const confirmation = {
    PayeeSave: (cb) => {
        bbox.confirm({
            title: "Update Tenant",
            message: "Do you want to update Tenant?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: (result) => {
                cb(result)
            }
        })
    }
}

  export default {
    props: ['model'],
    methods: {
      save() {
        confirmation.PayeeSave((result) => {
            if (result) {
                    this.$store.dispatch('tenants/save')
            }
        });
      }
      },
    computed: {
    ...mapGetters('tenants', {
        tenant: 'tenant',
        lookups: 'lookups',
        labels: 'labels',
        showGender: 'showGender',

    })
    },
    mounted() {
      this.$store.commit('tenants/fetchData', {tenant: this.model.tenant, lookups: this.model.lookups})

    }
  }
</script>
