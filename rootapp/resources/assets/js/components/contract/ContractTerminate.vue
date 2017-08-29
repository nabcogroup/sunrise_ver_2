<template>
    <div>
        <v-dialog dialog-title="Terminate Contract" modal-id="terminateContract" v-model="unfoldModal" @dismiss="onDismissal">
            <form class="form-horizontal" @keydown="validations.clear($event.target.name)">
                <div class="x-read-group">
                    <label class="col-md-3 x-label">Contract No:</label>
                    <label class="col-md-9 x-desc">{{contractForTerminate.contract_no}}</label>
                </div>
                <div class="x-read-group">
                    <label class="col-md-3 x-label">Tenant Name:</label>
                    <label class="col-md-9 x-desc">{{contractForTerminate.tenant_name}}</label>
                </div>
                <div class="form-group">
                    <label for="description" class="col-md-3">Description</label>
                    <div class="col-md-9">
                        <textarea name="description" id="description" rows="5" class="form-control" v-model="contractForTerminate.description"></textarea>
                        <error-span :value="errors" name="description"></error-span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ref_no" class="col-md-3">Ref No:</label>
                    <div class="col-md-9">
                        <input type="text" name="ref_no" id="ref_no" class="form-control" v-model="contractForTerminate.ref_no" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-md-3">Password:</label>
                    <div class="col-md-9">
                        <input type="password" name="password" id="password" class="form-control" v-model="contractForTerminate.password" />
                        <error-span :value="errors" name="password"></error-span>
                    </div>
                </div>
            </form>
        </v-dialog>
    </div>
</template>

<script>


import { ErrorValidations } from '../../helpers/helpers';
import {mapGetters,mapState} from 'vuex';

export default {
    props: ['isOpen', 'value'],
    data() {
        return {
            validations: new ErrorValidations(),
            unfoldModal: false
        }
    },
    methods: {
        onDismissal(result) {
            if (result) {
                const onResult = {
                    error: (status,errors) => {
                        if(status == 422) {
                            this.validations.register(errors);
                        }
                        else {
                            toastr.error(errors);
                        }
                    },
                    success: (result) => {
                        toastr.success("contract successfully terminated");
                        this.$emit("save",result);
                    }
                };
                this.$store.dispatch("contracts/terminate",onResult);
            }
            else {
                this.$emit('cancel');
            }
        },
        open() {
            this.unfoldModal = true;
        },
        close() {
            this.unfoldModal = false;
        }
    },
    computed: {
        ...mapGetters('contracts', {
            contractForTerminate: 'contractForTerminate',
        }),
        ...mapState('contracts', {
            errors: state => state.errors.terminateError
        })
    },
    watch: {
        isOpen(nv, ov) {
            if (nv) {
                this.open();
            }
            else {
                this.close();
            }
        }
    }
}
</script>