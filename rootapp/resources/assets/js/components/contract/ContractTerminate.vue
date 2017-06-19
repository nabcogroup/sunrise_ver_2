<template>
    <div>
        <modal dialog-title="Terminate Contract" modal-id="terminateContract" :unfold="unfoldModal" @dismiss="onDismissal">
            <form class="form-horizontal" @keydown="validations.clear($event.target.name)">
                <div class="x-read-group">
                    <label class="col-md-3 x-label">Contract No:</label>
                    <label class="col-md-9 x-desc">{{info.contract_no}}</label>
                </div>
                <div class="x-read-group">
                    <label class="col-md-3 x-label">Tenant Name:</label>
                    <label class="col-md-9 x-desc">{{info.tenant_name}}</label>
                </div>
                <div class="form-group">
                    <label for="description" class="col-md-3">Description</label>
                    <div class="col-md-9">
                        <textarea name="description" id="description" rows="5" class="form-control" v-model="info.description"></textarea>
                        <error :errorDisplay="validations.get('description')">
                            {{validations.get('description')}}
                        </error>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ref_no" class="col-md-3">Ref No:</label>
                    <div class="col-md-9">
                        <input type="text" name="ref_no" id="ref_no" class="form-control" v-model="info.ref_no" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-md-3">Password:</label>
                    <div class="col-md-9">
                        <input type="password" name="password" id="password" class="form-control" v-model="info.password" />
                        <error :errorDisplay="validations.get('password')">
                            {{validations.get('password')}}
                        </error>
                    </div>
                </div>
            </form>
        </modal>
    </div>
</template>

<script>

import Modal from '../Modal.vue';
import ErrorLabel from '../ErrorLabel.vue';

import { contractTerminateStore } from '../../store/contract';
import { ErrorValidations } from '../../helpers/helpers';

export default {
    props: ['isOpen', 'initValue'],
    store: contractTerminateStore,
    components: {
        'error': ErrorLabel,
        'modal': Modal
    },
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
                this.$store.dispatch("save",onResult);
            }
            else {
                this.$emit('cancel');
            }
        },
        open() {
            this.$store.commit('create', this.initValue);
            this.unfoldModal = true;
        },
        close() {
            this.unfoldModal = false;
        }
    },
    computed: {
        info() {
            return this.$store.getters.info;
        }
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