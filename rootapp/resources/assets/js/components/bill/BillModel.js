
import {validatePayment} from './PaymentValidation';
import {ErrorValidations, cloneObject} from '../../helpers/helpers';

export class BillState {
    constructor() {
        this.data = {
            bill: {
                payments: [],
                instance: {},
                paymentSummary: {
                    total_payment: 0,
                    total_cost: 0
                }
            },
            filteredPayments: [],
            contract : {
                tenant: {},
                villa: {}
            },
            cloneOfInstance : {},
            lookups : {},
            errors: new ErrorValidations()
        };

        this.options = {
            loadingSave: false,
            loadingSearch: false,
            billNo: "",
            currentTabIndex: 0
        }
    }

    createBill(contractNo) {
        axiosRequest.get('bill', 'create', contractNo)
            .then(r => {
                this.data.bill = r.data.bill;
                this.data.bill.paymentSummary = r.data.paymentSummary;
                this.data.contract = r.data.contract;
                this.data.lookups = r.data.lookups;

                this.createInstance();
            })
            .catch(e => {
                toastr.errors(e.response.message);
            });
    }

    getBill() {

        this.options.loadingSearch = true;
        this.options.currentTabIndex = 0;
        axiosRequest.get('bill','edit',this.options.billNo)
            .then(res => {

                this.data.bill = res.data.bill;
                this.data.bill.paymentSummary = res.data.paymentSummary;
                this.data.bill.instance = res.data.paymentInstance;
                this.data.contract = res.data.contract;
                this.data.lookups = res.data.lookups;

                this.options.loadingSearch = false;

                this.createInstance();
                this.filterPayment('received',0);

            })
            .catch(err => {
                toastr.error(err.response.data.message);
                this.options.loadingSearch = false;
            });
    }

    filterPayment(status,index) {
        this.data.filteredPayments = this.data.bill.payments.filter(item => {
            return item.status_flag == status;
        });
        this.options.currentTabIndex = index;
    }

    createInstance() {
        this.data.cloneOfInstance = cloneObject(this.data.bill.instance);
        this.data.cloneOfInstance.isCash = false;
    }

    mergeCheque() {

        let referenceNo = "";
        let amount = 0;

        this.data.bill.payments.forEach(item => {
            if(item.selected) {
                referenceNo = referenceNo + item.payment_no + ",";
                amount += parseInt(item.amount);
            }
        });

        this.data.cloneOfInstance.reference_no = referenceNo.substring(0,referenceNo.length-1);

        this.data.cloneOfInstance.amount = amount;


    }

    changePaymentType() {

        if(this.data.cloneOfInstance.payment_type == "cash") {
            this.data.cloneOfInstance.payment_no = "Cash";
            this.data.cloneOfInstance.bank = "Cash";
            this.data.cloneOfInstance.isCash = true;
        }
        else {
            this.data.cloneOfInstance.payment_no = "";
            this.data.cloneOfInstance.bank = "";
            this.data.cloneOfInstance.isCash = false;
        }
    }

    insert(isReindexing = false) {

        const paymentMode = this.data.lookups.payment_mode.find( item => {
            return item.code == this.data.cloneOfInstance.payment_mode;
        });

        this.data.cloneOfInstance.full_payment_mode = paymentMode.name;

        const paymentType = this.data.lookups.payment_term.find( item => {
            return item.code == this.data.cloneOfInstance.payment_type;
        });

        this.data.cloneOfInstance.full_payment_type = paymentType.name;

        //delete object isCash property
        if(this.data.cloneOfInstance.isCash !== undefined) {
            delete this.data.cloneOfInstance.isCash
        }

        this.data.bill.payments.push(this.data.cloneOfInstance);

    }

    validate(cb) {
        //validate on client side

        const result = validatePayment().validateAll(this.data.cloneOfInstance,this.data.bill.payments);
        console.log(result);
        cb(result);
    }

    insertNew() {
        this.insert();
        this.reindexing();
    }

    addNewCheque() {
        this.insert();
        this.filterPayment('received',0);

    }

    reindexing() {
        //create index
        for(var i = 0; i < this.data.bill.payments.length; i++) {
            this.data.bill.payments[i].id = i;
        }
    }

    removePayment(id) {
        this.data.bill.payments.splice(id,1);
        this.reindexing();
    }
    redirectToPrint(billNo) {
        axiosRequest.redirect('bill','show',billNo,"_blank");
    }
    save(cbSuccess, cbError) {

        this.options.loadingSave = true;
        axiosRequest.post('bill','store',this.data.bill)
            .then(r => {
                let billNo = r.data.data.billNo;
                this.redirectToPrint(billNo);
                cbSuccess(billNo);
            })
            .catch(e => {
                
                if(e.response.status == 422) {
                    toastr.error(e.response.data.payments[0]);
                }
                else {
                    toastr.error(e.response.data.message);
                }

                this.options.loadingSave = false;
            });
    }

    update() {
        this.options.loadingSave = true;
        axiosRequest.post('bill','update',this.data.bill)
            .then(res => {
                toastr.success(res.data.message);
                this.options.loadingSave = false;
                this.options.currentTabIndex = 0;
                this.getBill();
            })
            .catch(err => {
                this.options.loadingSave = false;
            });
    }

    totalAmount() {
        const sum = _.sumBy(this.data.bill.payments, (p) => {return parseInt(p.amount) } );
        this.data.bill.paymentSummary.total_payment = sum;
    }

}

export const createGridColumn = function(value) {
        function columnFactory(value) {
            let grid = {};
            switch(value) {
                case 1:
                    grid.columns = [
                        {name: 'selected', column: '', style:'width:3%', class:'text-center', editable:true,bind:'selected',itype:"selector" },
                        {name: 'effectivity_date', column: 'Date', style:'width:10%', class:'text-center', default:true, dtype:'date'},
                        {name: 'payment_no', column: 'No',style:'width:10%',class:'text-center'},
                        {name: 'full_payment_mode', column: 'Payment Mode',class:'text-center'},
                        {name: 'full_payment_type', column: 'Payment Type',class:'text-center'},
                        {name: 'bank', column: 'Bank',style:'width:10%',class:'text-center'},
                        {name: 'amount', column: 'Amount', style:"width:10%",class:'text-right', dtype:'currency'},
                        {name: 'reference_no', column: 'Reference No',style:"width:10%",class:"text-center" },
                        {name: 'full_status', column: 'Status',style:"width:10%", class:'text-center' },
                        {name: 'remarks', column: 'Remarks',style:'width:20%',class:'text-center'}];
                    grid.footers =[
                        {span: 9},
                        {span: 1, label: 'Total', slot:true}];
                    break;

                case 2:
                    grid.columns =  [
                        {name: 'effectivity_date', column: 'Date', style:'width:10%', class:'text-center', default:true, dtype:'date'},
                        {name: 'payment_no', column: 'No',style:'width:10%',class:'text-center'},
                        {name: 'full_payment_mode', column: 'Payment Mode',class:'text-center'},
                        {name: 'full_payment_type', column: 'Payment Type',class:'text-center'},
                        {name: 'bank', column: 'Bank',style:'width:10%',class:'text-center'},
                        {name: 'amount', column: 'Amount', style:"width:10%",class:'text-right', dtype:'currency'},
                        {name: 'reference_no', column: 'Reference No',style:"width:10%",class:"text-center" },
                        {name: 'full_status', column: 'Status',style:"width:10%", class:'text-center' },
                        {name: 'remarks', column: 'Remarks',style:'width:20%',class:'text-center'}]
                     grid.footers =[
                        {span: 8},
                        {span: 1, label: 'Total', slot:true}];
                    break;
                case 3:
                    grid.columns = [
                        {name: 'effectivity_date', column: 'Date', style:'width:10%', class:'text-center', dtype: 'date'},
                        {name: 'payment_no', column: 'Payment No',style:'width:10%',class:'text-center',editable:true, bind:'payment_no', itype:'text'},
                        {name: 'reference_no', column: 'Reference No',style:"width:10%",class:"text-center",editable:true, bind:'reference_no', itype:'text'},
                        {name: 'bank', column: 'Bank', editable:true,bind:'bank',editable:true, bind:'bank', itype:'text'},
                        {name: 'full_payment_mode', column: 'Payment Mode',class:'text-center',
                            editable:true,bind:'payment_mode', itype:'dropdown',selection:'payment_mode'},
                        {name: 'full_payment_type', column: 'Payment Type',class:'text-center'},
                        {name: 'period_start|period_end', column: 'Period',class:'text-center', dtype: 'date'},
                        {name: 'amount', column: 'Amount', style:"width:10%",class:'text-right',editable:true, bind:'amount', itype:'text'},
                        {name: 'full_status', column: 'Status',style:"width:10%", class:'text-center'},
                        {name: '$markDelete',column: '',static:true}
                    ];
                    break;
                default:
                    grid.columns = [
                        {name: 'effectivity_date', column: 'Date', style:'width:10%', class:'text-center', default:true, dtype:'date'},
                        {name: 'payment_no', column: 'No',style:'width:10%',class:'text-center'},
                        {name: 'full_payment_mode', column: 'Payment Mode',class:'text-center'},
                        {name: 'full_payment_type', column: 'Payment Type',class:'text-center'},
                        {name: 'bank', column: 'Bank',style:'width:10%',class:'text-center'},
                        {name: 'amount', column: 'Amount', style:"width:10%",class:'text-right', dtype:'currency'},
                        {name: 'reference_no', column: 'Reference No',style:"width:10%",class:"text-center" },
                        {name: 'full_status', column: 'Status',style:"width:10%", class:'text-center', editable:true,bind:'status',itype:'dropdown',selection:'payment_status'},
                        {name: 'remarks', column: 'Remarks',style:'width:20%',class:'text-center', editable:true,bind:'remarks',itype:'textarea'},
                        {name: '$custom',column: '',static:true}];
                    grid.footers =[
                        {span: 8},
                        {span: 1, label: 'Total', slot:true}];
                    break;
            }

            return grid
        }

        return columnFactory(value);
}

