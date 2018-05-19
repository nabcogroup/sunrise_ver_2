export class ErrorValidations {

    constructor() {
        let that = this;
        this.errors = {};
        this.exceptions = {
            errors:[],
            add: function(name,description) {
                that.errorExceptions
                    .errors.push(
                        {
                            name:name,
                            description:description}
                        );
            }
        };
    }

    get(field) {
        if(this.errors[field]) {
            if(this.errors[field] instanceof Array) {
                return this.errors[field][0];
            }
            else {
                return this.errors[field];
            }
        }
        return "";
    }

    hasError() {
        return !(_.isEmpty(this.errors));
    }

    register(errors) {
        this.errors = errors;
    }

    clear(field) {
        if(this.errors[field]) {
            delete this.errors[field][0];
        }
    }

    clearAll() {
        this.errors = {};
    }

    all() {
        return this.errors;
    }

}

//validation
export class Validator {

    constructor() {
        this._rules = [];
    }

    validate(inputs) {
        let messageErrors = {}
        _.each(this._rules, (value, key) => {
            if (typeof (inputs[key]) === 'undefined') {
                return;
            }

            //break sem
            let attributes = value.split('|')
            let option = {
                type: 'string',
                condition: ''
            }

            option.condition = typeof (attributes[0]) === 'undefined' ? 'required' : attributes[0]
            if (attributes.length > 1) {
                option.type = attributes[1] ? attributes[1] : 'string';
            }

            let inputVal = typeof (inputs[key]) !== "undefined" ? inputs[key] : '';

            switch (option.type) {
                case 'string':
                    if (option.condition === 'required') {
                        if (inputVal.length === 0 || inputVal === null) {
                            messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                        }
                    }
                    break;
                case 'integer':
                    let intRegex = /^\d+?/;
                    if (option.condition === 'required' || option.condition === 'nonzero') {
                        if (inputVal === null || isNaN(inputVal)) {
                            messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                        } 
                        else if (!intRegex.test(inputVal)) {
                            messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                        }
                    }

                    if (option.condition === 'nonzero') {
                        //check additional condition met
                        if (inputVal === 0) {
                            messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                        }
                    }

                    break;
                case 'currency':

                    let numerRegex = /^\d+?|^\d+\.\d{2}?/;
                    if (option.condition === 'required' || option.condition === 'nonzero') {
                        if (inputVal === null || isNaN(inputVal)) {
                            messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                        } 
                        else if (!intRegex.test(inputVal)) {
                            messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                        }
                    }

                    if (option.condition === 'nonzero') {
                        //check additional condition met
                        if (inputVal === 0) {
                            messageErrors[key] = "This field " + key.toUpperCase() + " is required";
                        }
                    }
                    break;
                case 'date':
                    var formatDate = moment(inputVal);
                    if (!formatDate.isValid()) {
                        messageErrors[key] = "This field " + key.toUpperCase() + " must be validate date";
                    }
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

//class helper
export class InstanceStorage {

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


export class ItemHandler {

    constructor() {

        /**
         * @TODO: adding tag
         */
        this.items = {
            latestKey: 0,
            data: [],
            deletedItems: []
        };
        this.autoKeyId = 0;
        this.isEditMode = false;
    }

    add(item) {
        this.items.latestKey = this.items.latestKey + 1;
        item.key = this.items.latestKey;
        this.items.data.push(item);
    }

    update(editValue, key) {
        const temp = _.find(this.items.data, (i) => i.key === key)
        copiedValue(editValue, temp);
    }

    remove(key) 
    {
        /******************************************************
            @TODO: seperate stack for deletion of stored when removed
            to notify server the removal of deleted item
        ***************************************************/
        if (this.items.data.length > 0) {
            this.items.data = _.filter(this.items.data, (item) => {
                if (item.key === key && item.id) {
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
        return _.find(this.items.data, (item) => item.key === key);
    }

    clear() {
        this.items.data = [];
        this.items.latestKey = 0;
    }

    all() {
        return this.items.data;
    }

    sum(column) {
        return _.sumBy(this.items.data, (item) => parseFloat(item[column]));
    }
}


export class AxiosRequest {

    post(controller,action,data) {
        return axios.post('/api/'+controller+'/'+action,data);
    }

    patch(controller,action,data) {
        return axios.patch('/api/'+controller+'/'+action,data);
    }

    get(controller,action) {
        var qs = "";
        if(arguments.length >= 3) {
            for(var i=2;i < arguments.length; i++) {
                qs += arguments[i] + '/';
            }
        }
        qs = qs.substring(0,qs.length-1);
        var url = '/api/'+controller+'/'+ action + (qs!=="" ? "/" + qs : qs);
        return axios.get(url);
    }

    dispatchGet(url,parameters) {
        if(parameters) {
            url = url + "?" + $.param(parameters);
        }
        return axios.get(url);
    }

    route(url) {
        var img = window.imagePath;
        window.location.href = url;
        return this;
    }

    redirect(controller,action = '',data = null,target = '_self') {
        var baseUrl = window.Laravel.baseUrl;
        
        var urlObj = {
            controller: controller,
            action: (action !== '') ? '/' + action : '',
            data: (data !== null) ? '/' + data : '',
            toUrlString() {
                return urlObj.controller + urlObj.action + urlObj.data;
            }
        }
        
        var url = baseUrl +  "/" + urlObj.toUrlString();
        window.open(url,target);
    }

    postMultiForm(controller,action,formData) {
       return $.ajax({
                url         : '/api/'+controller+'/'+action,
                type        : 'POST',
                data        : formData,
                headers: {'X-CSRF-TOKEN': window.Laravel.csrfToken},
                processData : false,
                contentType : false,
        });
    }
}

export const cloneObject = function(objInstance) {
    if(typeof objInstance === "object")
        return JSON.parse(JSON.stringify(objInstance));
    else 
        return false;

}

export const copiedValue = (source,target, exclude = new Array()) => {
    _.forEach(source, (value,key) => {
        if(exclude.length > 0) {
            if(_.indexOf(exclude,key) < 0) {
                target[key] = value;
            }
        }
        else {
            target[key] = value;
        }
    });
}

export const validation = () => {

    let duplicateOrEmpty = (entity, compArray, field) => {
        
        for (let i = 0; i < compArray.length; i++) {
            let item = compArray[i];
            if (entity[field] === item[field]) return true;
        }
        
        return false;
    }

    let isEmpty = (value, ...args) => {
        for (let i = 0; i <= args.length; i++) {
            if (_.trim(value[args[i]]).length === 0) return args[i];
        }
        return "";
    }

    let dateRangePeriod = (startPeriod, startEnd) => {
        if (moment(startPeriod).isAfter(moment(startEnd)) ||
            moment(startPeriod).isSame(moment(startEnd))) {
            return true;
        }
        return false;
    }

    let isNonNumeric = (numValue) => {
        if (isNaN(numValue)) {
            return true
        }
        return false;
    }

    function validate(entity,items) {

        let result = {
            key: "",
            isValid: true,
            message: "",
            error(value, key) {
                this.key = key;
                this.isValid = false;
                this.message = value;
            },
            ok() {
                this.message = "";
                this.isValid = true;
                this.key = "";
            }
        };

        //check required
        let req = false;
        if (entity.payment_type === 'bank')
            req = isEmpty(entity, 'payment_no', 'bank', 'amount');
        else
            req = isEmpty(entity, 'payment_no', 'amount');

        if (req) {
            result.error("field is required", req);
            return result;
        }

        if (isNonNumeric(entity.amount)) {
            result.error("Amount must be numeric", "amount");
            return result;
        }

        return result;
    }

    return {
        validate: validate
    }
}



export const reIndexing = (items,key = 'id') => {
    items.forEach(function (item, index) {
        index = index + 1;
        item[key] = index
    });
}

