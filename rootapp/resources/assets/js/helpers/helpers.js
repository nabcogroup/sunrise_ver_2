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