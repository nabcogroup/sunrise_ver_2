import {
    cloneObject,
    copiedValue,
    ErrorValidations
} from "../../../helpers/helpers";


var moment = moment || require('moment');

//class helper
class InstanceStorage {

    constructor(instance = null) {
        this._instance = instance;
    }

    set(entry) {
        this._instance = entry;
    }

    get() {
        return this._instance;
    }

    getClone() {
        return cloneObject(this._instance)
    }
}

class Validator {

    constructor() {
        this._rules = [];
    }

    validate(inputs) {

        let messageErrors = {}
        _.each(this._rules, (value, key) => {
            if (typeof (inputs[key]) === undefined) {
                return;
            }

            //break sem
            let attributes = value.split('|')
            let option = {
                type: 'string',
                condition: ''
            }
            
            if (attributes.length > 1) {
                option.type = attributes[1]
                option.condition = typeof (attributes[2]) == 'undefined' ? '' : attributes[2]
            }
            
            let inputVal = typeof(inputs[key]) !== "undefined" ? inputs[key] : '';
            switch (option.type) {
                case 'string':
                    if (inputVal.length === 0 || inputVal === null) {
                        messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                    }
                    break;
                case 'integer':
                    
                    let intRegex = /^\d+$/;
                    if (inputVal === null || isNaN(inputVal) ) {
                        messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                    }
                    else if(!intRegex.test(inputVal)) {
                      messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                    }
                    else {
                        if(option.condition !== '') {
                            //check additional condition met
                            if (inputVal === option.condition) {
                                messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                            }        
                        }
                    }
                    break;
                case 'date': 
                    


                    break;
                default:

                    break;
            }
        })
        return messageErrors;
    }

    setRules(rules) {
        this._rules = rules;
    }

}

//validation
class ItemHandler {
    
    constructor() {
        
        /**
         * @TODO: adding tag
         */
        this.items = {
            data: [],
            deletedItems: []
        };

        this.autoKeyId = 0;

        this.isEditMode = false;

    }
    

    add(item) {
        
        let newKeyId = this.items.data.length;
        newKeyId = (newKeyId === 0) ? 1 : this.items.data[newKeyId - 1].key + 1;
        item.key = newKeyId;
        
        this.items.data.push(item);

    }

    update(item,key) {
        const temp = _.find(this.items.data,(i) => i.key === key)
        copiedValue(item,temp);

    }

    remove(id) {

        /***************
            @TODO: seperate stack for deletion of stored when removed
            to notify server the removal of deleted item
        */
        if (this.items.data.length > 0) {
            this.items.data = _.filter(this.items.data, (item) => {
                if(item.key === id && item.id && item.transaction_no) {
                    this.items.deletedItems.push(item.id);
                }
                return item.key !== id;
            });
        } 
        else {
            //do nothing

        }
        
    }

    find(key) {
        return _.find(this.items.data,(item) => item.key === key);
    }

    clear() {
        this.items.data = [];
    }

    all() {
        return this.items.data;
    }

    sum(column) {
        return _.sumBy(this.items.data, (item) => parseFloat(item[column]));
    }
}

class Expense {

    constructor() {
        
        this.state = {
            current: null,
            entry: {},
            items: new ItemHandler(),
            expenses: []
        };

        this.instanceStorage = {};

        this.lookups = {
            villas: []
        };

        this.validator = new Validator();

        this.errors = new ErrorValidations();

    }

    //end point
    fetch() {
        axiosRequest.get('expenses', '').then(r => {
            this.state.expenses = r.data.data;
        });
    }

    create(data) {
        
        axiosRequest.get('expenses', 'create').then(r => {
            
            this.instanceStorage = new InstanceStorage(r.data.data);
            
            this.state.entry = this.instanceStorage.getClone();
            
            this.validator.setRules(r.data.rules);
            
            this.lookups = r.data.lookups;
        })

    }

    save() {
        
        axiosRequest.post('expenses', 'store', { transactions: this.state.items.all() })
            .then(r => {
                toastr.success('Save successfully!!!');
            })
            .catch(e => {
                if (e.response.status === 422) {
                    this.errors.register(e.response.data);
                }
            });
    }

    edit(transactionNo) {
        axiosRequest.dispatchGet(`/api/expenses/${transactionNo}/edit/`)
        .then(r => {
            this.state.items.clear();
            _.each(r.data.data, (entry) => {
                this.state.state = 'edit';
                this.registerItem(entry);
            })
        })
        .catch(e => {
            if (e.response.status === 422) {
                this.errors.register(e.response.data);
            }
        });
    }

    clearEntry() {
        this.errors.clearAll();
        this.state.current = null;
        copiedValue(this.instanceStorage.get(),this.state.entry);
    }

    registerItem(entry,isEdit = false) {
        
        var account = _.find(this.lookups.accounts, (item) => item.code == entry.acct_code);
        var property = _.find(this.lookups.villa_location, (item) => item.code == entry.location);
        var villa = _.find(this.lookups.villas, (item) => item.id == entry.villa_id);
        var payee = _.find(this.lookups.payees, (item) => item.id == entry.payee_id);
        
        entry.account = entry.acct_code + " - " + account.description;
        entry.property = property.name;
        entry.villa = villa.villa_no;
        entry.payee = payee.name;
        entry.payment_date = moment(entry.payment_date).format("L")
        entry.doc_date = moment(entry.doc_date).format("L")
        
        if(isEdit) {
            this.state.items.update(entry,this.state.current)
        }
        else {
            this.state.items.add(entry)
        }
            

    }

    insertItem() {
        
        this.errors.register(this.validator.validate(this.state.entry));
        if (this.errors.hasError())
            return false;
        
        //if key exist it is meant for editing
        if(this.state.current !== null) 
            this.registerItem(this.state.entry,true)
        else 
            this.registerItem(cloneObject(this.state.entry))


        this.clearEntry();
    }

    editItem(key) {
        const editExpense = this.state.items.find(key) 
        copiedValue(editExpense, this.state.entry,['account','id','key','payee','property','villa']);
        this.state.current = editExpense.key;
    }

    removeItem(key) {
        this.state.items.remove(key);
    }
    
}

const state = {
    expense: new Expense(),
    options: {
        isPayeeLoaded: false,
        isPayeeCreated: false,
    },
}


const mutations = {
    removeItem: (state, payload) => state.expense.removeItem(payload.key),
    insertItem: (state) => state.expense.insertItem(),
    editItem: (state,payload) => state.expense.editItem(payload.key),
    clear: (state) => state.expense.clearEntry(),
}

const actions = {
    create: ({ state, commit }) => state.expense.create(),
    save: ({ commit, state }) => state.expense.save(),
    edit: ({ commit, state }, payload) => state.expense.edit(payload.transactionNo),
    fetch: ({state}) => state.expense.fetch()
}

const getters = {
    expense: (state) => state.expense.state, 
    expenses: (state) => state.expense.state.expenses,
    lookups: (state) => state.expense.lookups,
    errors: (state) => state.expense.errors,
    options: (state) => state.options,
    filtered_villas: (state) => {
        const filters = state.expense.lookups.villas.filter((item) => {
            return item.location === state.expense.state.entry.location
        });
        return filters;
    }
}

const expenditureModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

export default expenditureModule;