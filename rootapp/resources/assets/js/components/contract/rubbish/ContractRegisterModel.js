import {ErrorValidations} from '../../helpers/helpers';

export class ContractRegisterModel {

    constructor() {
        this.lookups = [];
        this.errors = new ErrorValidations();
        this.data = {
            register_tenant: {
                address_instance: {}
            }
        }

        this.villa = {};

    }
    create() {
        axiosRequest.get('contract','create').then((r) => {
            this.data = r.data.data;
            this.lookups = r.data.lookups;
        });
    }
    select() {
        this.villa = _.find(this.data.villa_list,(i) => {
           return i.id == this.data.villa_id;
        });
    }

    recal(cbSuccess,cbError) {

        var data = {
            villa_id: this.data.villa_id,
            period_start: this.data.period_start,
            period_end: this.data.period_end
        };
        axiosRequest.post("contract","recalc",data)
            .then((r) => {
                this.data.amount = r.data.amount;
                if(cbSuccess) cbSuccess(r.data);
            })
            .catch((e) => {
                toastr.errors(e.response.message);
            });
    }

    isIndividual() {
        return this.data.register_tenant.type == "individual" ? true : false;
    }

    save(cbSuccess,cbError) {
        axiosRequest.post("contract","store",this.data)
            .then((r) => {
                if(cbSuccess) cbSuccess(r.data);
                axiosRequest.redirect("bill","create",r.data.data.id);
            })
            .catch((error) => {
                if(error.response.status == 422)
                    this.errors.register(error.response.data);
                if(cbError) cbError();
            });
    }
}
