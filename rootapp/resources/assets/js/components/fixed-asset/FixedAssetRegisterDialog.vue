<template>
  <v-dialog dialog-title="Fixed Asset Entry" modal-id="fixedAssetEntry" v-model="toggle" @dismiss="save">
      
  </v-dialog>
</template>

<script>


import { ErrorValidations } from '../../helpers/helpers';
import { toggleModal } from "../mixins";

import {mapGetters,mapState} from 'vuex';
import { EventBus } from "../../eventbus";

export default {
    mixins: [toggleModal],
    data() {
        return {
            validations: new ErrorValidations(),
        }
    },
    beforeMount() {
        this.open();
    },
    methods: {
        close() {
            EventBus.$emit("fixedAsset.entry.close",true);
        },
        open() {
             EventBus.$on("fixedAsset.entry.open",(value) => {
                 this.openDialog();
             });
        }
    }
}
</script>
