<template>
    <div>
        <div v-if="type=='modal'">
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Name</label>
                <div class="col-md-9">
                <input class="form-control" v-model="payee.name">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Address</label>
                <div class="col-md-9">
                    <textarea class="form-control" rows="3" v-model="payee.full_address"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Contact No</label>
                <div class="col-md-9">
                    <input class="form-control" v-model="payee.contact_no">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Fax No</label>
                <div class="col-md-9">
                    <input class="form-control" v-model="payee.fax_no">

                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Email Address</label>
                <div class="col-md-9">
                    <input class="form-control" v-model="payee.email_address">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Contact Person</label>
                <div class="col-md-9">
                    <input class="form-control" v-model="payee.contact_person">

                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Payee Type</label>
                <div class="col-md-9">
                    <select class="form-control" v-model="payee.payee_type">
                        <option value="">SELECT PAYMENT TYPE</option>
                        <option v-for ="look in payeeTypes" v-bind:value="look.code" >{{ look.name }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-else>
            <form @submit.prevent="save()">
                <div class="col-md-10 col-md-offset-1">
                    <div class="panel panel-default wrap">
                        <div class="panel-heading" style="background-color:#3f51b5!important;"><h3 style="color:white;">Payee Register</h3></div>
                        <div class="panel-body" style="background-color:#f6f6f6;">
                            <div class="col-md-10 col-md-offset-1">
                                <div class="form-group row">
                                    <label class="col-md-2 col-form-label">Name</label>
                                    <div class="col-md-10">
                                    <input class="form-control" v-model="payee.name">
                                    <error-span :value="errors" name="name"></error-span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-2 col-form-label">Address</label>
                                    <div class="col-md-10">
                                        <textarea class="form-control" rows="3" v-model="payee.full_address"></textarea>
                                        <error-span :value="errors" name="full_address"></error-span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-2 col-form-label">Contact No</label>
                                    <div class="col-md-4">
                                        <input class="form-control" v-model="payee.contact_no">
                                        <error-span :value="errors" name="contact_no"></error-span>
                                    </div>
                                    <label class="col-md-2">Fax No.</label>
                                    <div class="col-md-4">
                                        <input class="form-control" v-model="payee.fax_no">
                                        <error-span :value="errors" name="fax_no"></error-span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-2 col-form-label">Email Address:</label>
                                    <div class="col-md-4">
                                        <input class="form-control" v-model="payee.email_address">
                                        <error-span :value="errors" name="email_address"></error-span>
                                    </div>
                                    <label class="col-md-2">Contact Person</label>
                                    <div class="col-md-4">
                                        <input class="form-control" v-model="payee.contact_person">
                                        <error-span :value="errors" name="contact_person"></error-span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-2 col-form-label">Payee Type</label>
                                    <div class="col-md-4">
                                        <select class="form-control" v-model="payee.payee_type">
                                            <option value="">SELECT PAYMENT TYPE</option>
                                            <option v-for ="look in payeeTypes" v-bind:value="look.code" >{{ look.name }}</option>
                                            <error-span :value="errors" name="payee_type"></error-span>
                                        </select>
                                    </div>
                                    <label class="col-md-2"></label>
                                    <div class="col-md-4"></div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <div class="row">
                                <div class="col-md-2 col-md-offset-10">
                                    <button type="submit" class="btn btn-info btn-block">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "../../eventbus";

const confirmation = {
  PayeeSave: cb => {
    bbox.confirm({
      title: "Create Payee",
      message: "Do you want to create Payee?",
      buttons: {
        confirm: {
          label: "Yes",
          className: "btn-success"
        },
        cancel: {
          label: "No",
          className: "btn-danger"
        }
      },
      callback: result => {
        cb(result);
      }
    });
  }
};

export default {
    beforeMount() {
        EventBus.$on("payee.in.saving", response => {
            this.save(false);
        });
    },
    mounted() {

        EventBus.$on('payee.in.attributes',(option) => {
            this.$store.commit('payees/addPayeeAttribute',option);
        });

        if(!this.payeeId || this.payeeId === '') {
            this.$store.dispatch("payees/create",{option: this.option || null });
        }
        else {
            this.$store.dispatch("payees/edit",{id: this.payeeId})
        }

    },
  props: ["type","payeeId","option"],
  computed: mapGetters("payees", {
    payee: "payee",
    payeeTypes: "payeeTypes",
    errors: "errors"
  }),
  methods: {
    save(hasConfirmation = true) {
        if(hasConfirmation) {
            confirmation.PayeeSave(result => {
                if (result) {
                    this.$store.dispatch("payees/save",() => {
                        toastr.success("Payee successfully added")
                        this.$emit('saved');
                    });
                }
            });
        }
        else {
            this.$store.dispatch("payees/save",() => {
                toastr.success("Payee successfully added")
                this.$emit('saved');
            });
        }
    }
  }
};
</script>
