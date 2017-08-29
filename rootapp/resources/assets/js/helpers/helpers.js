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

    register(errors) {
        this.errors = errors;
    }

    clear(field) {
        if(this.errors[field]) {
            delete this.errors[field][0];
        }
    }
    all() {
        return this.errors;
    }

}

export class AxiosRequest {

    post(controller,action,data) {
        return axios.post('/api/'+controller+'/'+action,data);
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
        var url = baseUrl + "/" + controller + "/" + (action !== null ? action : "") + (data !== null ? "/" + data : "");
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
    return JSON.parse(JSON.stringify(objInstance));
}

export const copiedValue = (source,target, exclude = new Array()) => {
    _.forEach(source, (value,key) => {
        target[key] = value;
    });
}
