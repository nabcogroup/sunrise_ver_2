<template>
    <v-panel header="Contract List">
        <v-tab-group v-model="$store.state.contracts.status">
            <v-tab tab-id="pending">Pending</v-tab>
            <v-tab tab-id="active">Active</v-tab>
        </v-tab-group>
        <div class="tab-content" style="margin-top:15px; ">
            <div id="pending" class="tab-pane fade in active">
                <v-live-view
                        :grid="gridView"
                        @action="doAction"></v-live-view>
            </div>
            <terminate-dialog
                    :isOpen="terminateModalState"
                    @cancel="onTerminateCancel"
                    @save="onTerminateSave">
            </terminate-dialog>
        </div>
    </v-panel>
</template>


<script>

    import ErrorLabel from '../ErrorLabel.vue';
    import ContractTerminate from './ContractTerminate.vue';

    import {mapGetters,mapActions,mapMutations} from "vuex";
    import {EventBus} from "../../eventbus";


    const confirmation = {
        cancel: (cb) => {
            bbox.confirm({
                title: "Contract cancel confirmation",
                message: "Do you want to cancel the contract?",
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
                    if (result) {
                        cb();
                    }
                }
            });
        },
        terminated: (value, cb) => {
            bbox.confirm({
                message: 'Do you want to terminate the contract no ' + value,
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
                    cb(result);
                }
            });
        }
    }

    export default {
        name: "list",
        data() {
            return {
                gridView: {
                    columns: [
                        {name: 'created_at', column: 'Date', default: true, class: 'text-center'},
                        {name: 'contract_no', column: 'Contract No', class: 'text-center', filter: true},
                        {name: 'villa_no', column: 'Villa No', class: 'text-center', filter: true},
                        {name: 'full_name', column: 'Tenant', class: 'text-left', filter: true},
                        {name: 'period', column: 'Period', class: 'text-center'},
                        {name: 'amount', column: 'Amount', class: 'text-right', filter: true},
                        {name: 'status', column: 'Status', class: 'text-center'},
                        {name: '$action', column: '', static: true, class: 'text-center'}],
                    actions: [
                        {key: 'create', name: 'Create Bill'},
                        {key: 'cancelled', name: 'Cancel'},
                    ],
                    source: {
                        url: '/api/contract/list',
                        params: {status: ''}
                    },
                },
                initValue: {},
                terminateModalState: false,
            }
        },
        components: {
            'error': ErrorLabel,
            'terminateDialog': ContractTerminate
        },
        methods: {
            ...mapMutations("contracts",["setContractForTerminate"]),
            create() {
                this.$store.commit('contracts/redirectToRegister');
            },
            doAction(a, item, index) {
                if (a.key == 'create') {
                    this.$store.commit('contracts/createBill', item.contract_no);
                }
                else if (a.key == 'cancelled') {
                    confirmation.cancel((result) => {
                        this.$store.dispatch('contracts/cancel',
                            {
                                contractId: item.id,
                                cbError: (errMessage) => {
                                    toastr.errors(errMessage);
                                },
                                done: (r) => {
                                    EventBus.$emit("onLiveViewFetch");
                                }
                            });
                    });
                }
                else if (a.key == 'terminated') {
                    confirmation.terminated(item.contract_no, (result) => {
                        if (result) {
                            this.setContractForTerminate(item);
                            this.terminateModalState = true;
                        }
                    });
                }
                else if (a.key == 'view') {
                    this.$store.commit('contracts/redirectToRead', item.id);
                }
            },
            onTerminateCancel() {
                this.terminateModalState = false;
            },
            onTerminateSave(contractId) {
                this.$store.dispatch('contracts/terminate', {contractId: contractId, statusIndex: this.status});
                this.terminateModalState = false;
            }
        },
        computed: {
            ...mapGetters('contracts', {
                contracts: 'contracts',
                status: 'status',
                contractForTerminate: 'contractForTerminate'
            })

        },
        watch: {
            status(nv) {
                //dynamic
                if (nv === 'pending') {
                    this.gridView.actions = [
                        {key: 'create', name: 'Create Bill'},
                        {key: 'cancelled', name: 'Cancel'}
                    ]
                }
                else {
                    this.gridView.actions = [
                        {key: 'view', name: 'View PDF'},
                        {key: 'terminated', name: 'Terminate'}
                    ]
                }

                this.gridView.source.params.status = nv;
                EventBus.$emit("onLiveViewFetch");
            }
        }


    }
</script>
