<template>
    <div class="row">
        <div class="col-lg-12">
            <ul class="nav nav-tabs">
                <li :class="{'active': status==0}" @click="change(0)">
                    <a href="#pending">Pending</a>
                </li>
                <li :class="{'active': status==1}">
                    <a href="#active" @click="change(1)">Active</a>
                </li>
                <div class="actions">
                    <a href="#" class="btn btn-default pull-right" role="button" @click="create">
                        <i class="fa fa-plus fa-1x" aria-hidden="true"></i> Add Contract
                    </a>
                </div>
    
            </ul>
            <div class="tab-content">
                <div id="pending" class="tab-pane fade in active">
                    <gridview :data="contractList" :grid="gridView" @action="doAction">
                    </gridview>
                </div>
                <terminate-dialog :isOpen="terminateModalState" :init-value="initValue" @cancel="onTerminateCancel" @save="onTerminateSave"></terminate-dialog>
            </div>
        </div>
    </div>
</template>


<script>

import GridView from '../GridView.vue';
import Modal from '../Modal.vue';
import ErrorLabel from '../ErrorLabel.vue';
import ContractTerminate from './ContractTerminate.vue';

import { contractListStore } from '../../store/contract';

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
    store: contractListStore,
    data() {
        return {
            gridView: {
                columns: [
                    { name: 'created_at', column: 'Date', default: true, dtype: 'date', class: 'text-center' },
                    { name: 'contract_no', column: 'Contract No', class: 'text-center' },
                    { name: 'bill_no', column: 'Bill No', class: 'text-center' },
                    { name: 'villa_no', column: 'Villa No', class: 'text-center' },
                    { name: 'tenant_name', column: 'Tenant', class: 'text-center' },
                    { name: 'period_start|period_end', column: 'Period', class: 'text-center', dtype: 'date' },
                    { name: 'amount', column: 'Amount', dtype: 'currency', class: 'text-center' },
                    { name: 'status', column: 'Status', class: 'text-center' },
                    { name: 'action', column: '', static: true, class: 'text-center' }],
                actions: [
                    { key: 'create', name: 'Create Bill' },
                    { key: 'cancelled', name: 'Cancelled' },
                ],
                options: {
                    loading: true
                }
            },
            status: 'pending',
            initValue: {},
            terminateModalState: false,

        }
    },
    components: {
        'gridview': GridView,
        'modal': Modal,
        'error': ErrorLabel,
        'terminateDialog': ContractTerminate
    },
    mounted() {

        //default status is active
        this.status = 0;
        this.$store.dispatch('load', { statusIndex: this.status });
    },
    methods: {
        create() {
            this.$store.commit('redirectToRegister');
        },
        change(status) {
            this.status = status;
            this.$store.dispatch('filter', { statusIndex: this.status });
            //this.contract.reload(status);
            //dynamic
            if (status == 0) {
                this.gridView.actions = [
                    { key: 'create', name: 'Create Bill' },
                    { key: 'cancelled', name: 'Cancelled' }
                ]
            }
            else {
                this.gridView.actions = [
                    { key: 'view', name: 'View PDF' },
                    { key: 'terminated', name: 'Terminate' }
                ]
            }
        },
        doAction(a, id) {
            if (a.key == 'create') {
                this.$store.commit('createBill', id);
            }
            else if (a.key == 'cancelled') {
                confirmation.cancel((result) => {
                    this.$store.dispatch('cancel',
                        {
                            contractId: id,
                            cbError: (errMessage) => {
                                toastr.errors(errMessage);
                            },
                            statusIndex: this.status
                        });
                });
            }
            else if (a.key == 'terminated') {
                let contract = null;
                this.$store.commit('find', { id: id, cb: (res) => { contract = res; } });
                confirmation.terminated(contract.contract_no, (result) => {
                    if (result) {
                        this.initValue = contract;
                        this.terminateModalState = true;
                    }
                });
            }
            else if (a.key == 'view') {
                this.$store.commit('redirectToRead', id);
            }
        },
        onTerminateCancel() {
            this.terminateModalState = false;
        },
        onTerminateSave(contractId) {
            this.$store.dispatch('remove', { contractId: contractId, statusIndex: this.status });
            this.terminateModalState = false;
        },
    },
    computed: {
        contractList() {
            return this.$store.getters.filterContracts;
        }

    }
}
</script>
