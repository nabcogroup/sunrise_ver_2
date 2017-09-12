<template>
    <div :id="modalId" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" :class="modalSize" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="dismiss(false)" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{dialogTitle}}</h4>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <div v-if="buttonType == 'okOnly' ">
                        <button type="button" class="btn btn-info" @click="dismiss(false)">Ok</button>
                    </div>
                    <div v-else>
                        <button type="button" class="btn btn-default" @click="dismiss(false)">Close</button>
                        <button type="button" class="btn btn-primary" @click="dismiss(true)" v-if="ftype!='search'">
                            {{saveCaptionComputed}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vDialog",
        props: {
            dialogTitle: String,
            size: String,
            ftype: String,
            modalType: String,
            modalId: String,
            unfold: Boolean,
            value: Boolean,
            buttonType: String,
            saveCaption: String
        },
        data() {
            return {
                modalSize: ''
            }
        },
        methods: {
            dismiss(result) {
                if (result) {
                    this.$emit("dismiss", result);
                }
                else {
                    this.$emit("input", false);
                }

            }
        },
        mounted() {

            if (this.size == 'lg') {
                this.modalSize = 'modal-lg';
            }
            else {
                this.modalSize = 'modal-md';
            }

            $("#" + this.modalId).modal({backdrop: false, show: false, keyboard: false});
        },
        computed: {
          saveCaptionComputed() {
              return this.saveCaption || 'Save Changes';
          }
        },
        watch: {
            value(val) {
                if (val) {
                    $("#" + this.modalId).modal('show');
                }
                else {
                    $("#" + this.modalId).modal('hide');
                }
            }
        }
    }
</script>
<style>
    .temp-modal {
        display: none
    }
</style>