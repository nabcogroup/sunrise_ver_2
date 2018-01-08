<template>
    <v-dialog dialog-title="Terminate Contract" modal-id="terminateContract" v-model="toggle" @dismiss="save">
        <form class="form-horizontal" @keydown="validations.clear($event.target.name)">
            <div class="x-read-group">
                <label class="col-md-3 x-label">Villa No:</label>
                <label class="col-md-9 x-desc">{{contractForTerminate.villa_no}}</label>
            </div>
            <div class="x-read-group">
                <label class="col-md-3 x-label">Tenant Name:</label>
                <label class="col-md-9 x-desc">{{contractForTerminate.tenant_name}}</label>
            </div>
            <div class="x-read-group">
                <label class="col-md-3 x-label">Contract No:</label>
                <label class="col-md-9 x-desc">{{contractForTerminate.contract_no}}</label>
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
                    <error-span :value="errors" name="ref_no"></error-span>
                </div>
            </div>
            <div class="form-group">
                <label for="date_termination" class="col-md-3">Termination Date:</label>
                <div class="col-md-9">
                    <dt-picker dp-name="date_termination" @pick="contractForTerminate.date_termination = $event" :value="contractForTerminate.date_termination"></dt-picker>
                    <error-span v-model="errors" name="date_termination"></error-span>
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
</template>

<script>


import { ErrorValidations } from '../../helpers/helpers';
import {mapGetters,mapState} from 'vuex';

import { EventBus } from "../../eventbus";
import { toggleModal } from "../mixins";


export default {
    mixins: [toggleModal],
    data() {
        return {
            validations: new ErrorValidations(),
        }
    },
    beforeMount() {
        EventBus.$on("contracts.terminate.open",(value) => {
            this.$store.commit("contracts/setContractForTerminate",value);
            this.openDialog();
        });
    },
    methods: {
        save(result) {
            const onResult = {
                success: (result) => {
                    toastr.success("contract successfully terminated");
                    this.closeDialog();
                    EventBus.$emit("contracts.terminate.close",true);
                }
            };
            
            this.$store.dispatch("contracts/terminate",onResult);
        }
    },
    computed: {
        ...mapGetters('contracts', {
            contractForTerminate: 'contractForTerminate',
        }),
        ...mapState('contracts', {
            errors: state => state.errors.terminateError
        })
    }
}
</script>