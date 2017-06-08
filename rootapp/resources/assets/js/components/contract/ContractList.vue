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
            </div>
        </div>
    </div>
</template>


<script>

    import GridView from '../GridView.vue';
    import Modal from '../Modal.vue';
    import {ContractListModel} from './ContractListModel';

    export default {
        name: "list",
        data() {
            return {
                contract: new ContractListModel(),
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
            'modal': Modal
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
                } else {
                    
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

                }
                else if (a.key == 'view') {
                    this.contract.redirectToRead(id);
                }
            },
            onDismissal(result, fn) {
                var that = this;

                if (result) {
                    this.renewal.save(function () {
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
            }
        }
    }


</script>
