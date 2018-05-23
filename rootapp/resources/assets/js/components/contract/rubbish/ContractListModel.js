
import {ErrorValidations}  from '../../helpers/helpers';

export class ContractListModel {

    constructor() {
        this.data = [];
        this.filterData = [];
        this.errors = new ErrorValidations;
    }

    reload(status) {
        //reset filter
        this.filterData = [];
        this.filterData = this.filter(status);
        if(this.filterData.length === 0) {
            axiosRequest.get("contract", "list",status)
                .then(res => {

                    if (this.data.length > 0) {
                        res.data.forEach((item) => {
                            this.data.push(item);
                        });
                    }
                    else {
                        this.data = res.data;
                    }

                    this.filterData = this.filter(status);
                })
                .catch(err => {
                    toastr.errors(err.response.message);
                });
        }
    }

    filter(status = "pending") {
        return this.data.filter((item) => {
            return item.status.toLowerCase() == status;
        });
    }

    find(id) {
        return _.find(this.data,(item) => { return item.id == id; });
    }

    remove(id,status) {

        let contract = _.find(this.data,(item) => { return item.id == id});
        let index = this.data.indexOf(contract);

        this.data.splice(index,1);
        this.filterData = this.filter(status);

    }

    redirectToRegister() {
        axiosRequest.redirect("contract","register");
    }

    redirectToRead(id) {

        axiosRequest.redirect('contract', 'show', id, '_blank');

    }

    cancel(contractId,status) {
        bbox.confirm({
            title: "Contract cancel confirmation",
            message: "Do you want to cancel the contract?",
            callback: (result) => {
                if(result) {
                    axiosRequest.post("contract","cancel",{id : contractId})
                        .then(r => {
                            if(r.data.isOk) {
                                this.remove(contractId,status);
                            }
                        })
                        .catch(e => {
                            toastr.errors(e.response.message);
                        });
                }
            }
        });
    }

    createBill(contractId) {

        var item = _.find(this.data,function(item) {
            return item.id == contractId;
        });

        axiosRequest.redirect("bill","create",item.contract_no);
    }


}

export class ContractRenewModel {

    constructor() {

        this.data = {
           period_start: moment().format('L'),
           period_end: moment().format('L')
        };
        this.errors = new ErrorValidations();
    }

    clear() {
        this.data = {
           period_start: moment().format('L'),
           period_end: moment().format('L')
        };
    }

    create(id = 0,callback) {        
        axiosRequest.get('contract','renew',id)
            .then(r => {
                this.data = r.data;
                callback();
            })
            .catch(e => {
                toastr.error(e.response.data.message);
        });
    }
    redirectToBill(id) {
        axiosRequest.redirect('bill','create',id);
    }

    save(cbSuccess) {
        var data = {
            id: this.data.id,
            period_start: this.data.period_start,
            period_end: this.data.period_end,
            amount: this.data.amount
        };

        axiosRequest.post('contract','renew',data)
            .then(r => {
                cbSuccess(r.data.data.id);
            })
            .catch(e => {
                if(e.response.status = 422) {
                    this.errors.register(e.response.data);
                }
            });
    }
}

export class ContractTerminationModel {

    constructor() {

        this.data = {
            id  : 0,
            contract_no: 0,
            name: '',
            description: '',
            ref_no: '',
            password: ''
        }

        this.errors = new ErrorValidations();
    }

    clear(id,contract_no,tenant_name) {
        this.data.id = id;
        this.data.contract_no = contract_no;
        this.data.name = tenant_name;
        this.data.description = '';
        this.data.ref_no = '';
        this.data.password = '';
    }
    save(cb) {

        axiosRequest.post("contract","terminate",this.data)
            .then((r) => {
                if(r.data.isOk) {
                    toastr.success("Contract Terminated");
                    cb(this.data.id);
                }
            })
            .catch((e) => {
                if(e.response.status === 422) {
                    this.errors.register(e.response.data);
                }else {
                    toastr.error(e.response.data.message);
                }

            });
    }
}