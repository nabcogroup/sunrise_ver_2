<template>
    <div class="row">
        <div class="col-lg-12">
            <ul class="nav nav-tabs">

                <li :class="{'active': status=='pending'}" @click="change('pending')"><a href="#pending">Pending</a></li>
                <li :class="{'active': status=='active'}"><a href="#active" @click="change('active')">Active</a></li>

                <div class="actions">
                    <a href="#" class="btn btn-default pull-right" role="button" @click="create">
                        <i class="fa fa-plus fa-1x" aria-hidden="true"></i> Add Contract
                    </a>
                </div>

            </ul>
            <div class="tab-content">
                <div id="pending" class="tab-pane fade in active">
                    <gridview
                            :data="contractData"
                            :grid="gridView"
                            @action="doAction">
                    </gridview>
                </div>
                <modal dialog-title="Terminate Contract" modal-id="terminateContract" :unfold="unfoldModal" @dismiss="onDismissal">
                    <form class="form-horizontal" @keydown="errors.clear($event.target.name)">
                        <div class="x-read-group">
                            <label class="col-md-3 x-label">Contract No:</label>
                            <label class="col-md-9 x-desc">{{termination.data.contract_no}}</label>
                        </div>
                        <div class="x-read-group">
                            <label class="col-md-3 x-label">Tenant Name:</label>
                            <label class="col-md-9 x-desc">{{termination.data.name}}</label>
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-md-3">Description</label>
                            <div class="col-md-9">
                                <textarea name="description" id="description" rows="5" class="form-control" v-model="termination.data.description"></textarea>
                                <error :errorDisplay="errors.get('description')">
                                    {{errors.get('description')}}
                                </error>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ref_no" class="col-md-3">Ref No:</label>
                            <div class="col-md-9">
                                <input type="text" name="ref_no" id="ref_no" class="form-control" v-model="termination.data.ref_no" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-md-3">Password:</label>
                            <div class="col-md-9">
                                <input type="password" name="password" id="password" class="form-control" v-model="termination.data.password"/>
                                <error :errorDisplay="errors.get('password')">
                                    {{errors.get('password')}}
                                </error>
                            </div>
                        </div>
                    </form>
                </modal>
            </div>
        </div>
    </div>
</template>


<script>

    import GridView from '../GridView.vue';
    import Modal from '../Modal.vue';
    import ErrorLabel from '../ErrorLabel.vue';

    import {ContractListModel,ContractTerminationModel} from './ContractListModel';

    export default {
        name: "list",
        data() {
            return {
                contract: new ContractListModel(),
                termination: new ContractTerminationModel(),
                gridView: {
                    columns: [
                        {name: 'created_at', column: 'Date', default: true, dtype: 'date', class: 'text-center'},
                        {name: 'contract_no', column: 'Contract No', class: 'text-center'},
                        {name: 'bill_no', column: 'Bill No', class: 'text-center'},
                        {name: 'villa_no', column: 'Villa No', class: 'text-center'},
                        {name: 'tenant_name', column: 'Tenant', class: 'text-center'},
                        {name: 'period_start|period_end', column: 'Period',class:'text-center', dtype: 'date'},
                        {name: 'amount', column: 'Amount', dtype: 'currency', class: 'text-center'},
                        {name: 'status', column: 'Status', class: 'text-center'},
                        {name: 'action', column: '', static: true, class: 'text-center'}],
                    actions: [
                        {key: 'create', name: 'Create Bill'},
                        {key: 'cancelled', name: 'Cancelled'},
                    ],
                    options: {
                        loading: true
                    }
                },
                status: 'pending',
                unfoldModal: false
            }
        },
        components: {
            'gridview': GridView,
            'modal': Modal,
            'error': ErrorLabel
        },
        created(){

            //default status is active
            this.status = 'pending';

            this.contract.reload(this.status);

        },
        methods: {
            create() {
                this.contract.redirectToRegister();
            },
            change(status) {
                this.status = status;
                this.contract.reload(status);
                
                //dynamic
                if (status == 'pending') {
                    this.gridView.actions = [
                        {key: 'create', name: 'Create Bill'},
                        {key: 'cancelled', name: 'Cancelled'}
                    ]
                }
                else {
                    
                    this.gridView.actions = [
                        {key: 'view', name: 'View PDF'},
                        {key: 'terminated', name: 'Terminate'}
                    ]
                }
            },
            doAction(a, id) {
                if (a.key == 'create') {
                    this.contract.createBill(id);
                }
                else if (a.key == 'renew') {
                    this.renewal.create(id, () => {
                        this.unfoldModal = true;
                    });
                }
                else if (a.key == 'cancelled') {
                    this.contract.cancel(id,this.status);
                }
                else if (a.key == 'terminated') {
                    let contract = this.contract.find(id);
                    bbox.confirm({
                        message: 'Do you want to terminate the contract no ' + contract.contract_no,
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
                        callback:(result) => {
                            if(result) {
                                this.termination.clear(contract.id,contract.contract_no,contract.tenant_name);
                                this.unfoldModal = true;
                            }
                        }
                    });
                }
                else if (a.key == 'view') {
                    this.contract.redirectToRead(id);
                }
            },
            onDismissal(result, fn) {
                if (result) {
                    this.termination.save((id) => {
                        this.contract.remove(id,this.status);
                        this.unfoldModal = false;
                    });
                }
                else {
                    this.unfoldModal = false;
                }
            }
        },
        computed: {
            contractData() {
                return this.contract.filterData;
            },
            errors() {
                return this.termination.errors;
            }
        }
    }
</script>
