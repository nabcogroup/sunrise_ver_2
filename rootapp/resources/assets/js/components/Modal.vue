<template>
    <div :id="modalId" class="modal fade"  tabindex="-1" role="dialog">
        <div class="modal-dialog" :class="modalSize" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="dismiss(false)"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{dialogTitle}}</h4>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="dismiss(false)"  >Close</button>
                    <button type="button" class="btn btn-primary" @click="dismiss(true)">
                        <span v-if="ftype=='search'">Search</span><span v-else>Save changes</span>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modal",
        props: {
            dialogTitle: String,
            size: String,
            ftype: String,
            modalType: String,
            modalId: String,
            unfold: Boolean,

        },
        data() {
            return {
                modalSize: ''
            }
        },
        methods: {
            dismiss(result) {
                this.$emit("dismiss",result);
            }
        },
        mounted() {
            
            if(this.size == 'lg') {
                this.modalSize = 'modal-lg';
            }
            else {
                this.modalSize = 'modal-md';
            }

            $("#"+this.modalId).modal({backdrop:false,show:false,keyboard:false});
        },
        watch: {
            unfold(val) {
                if(val) {
                    $("#"+this.modalId).modal('show');
                }
                else {
                    $("#"+this.modalId).modal('hide');
                }
            }
        }
    }
</script>
<style>
    .temp-modal {display:none}
</style>