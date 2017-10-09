export class HttpService {

    constructor(namespace) {
        this.namespace = namespace;
    }
    create() {
        this.http = axios;
    }

    apiGet(params) {
        
        const baseUrl = _.find(this.namespace,(item) => {
            
        });

        const url  = "/api/" + urls;
        return this.http.get(url)
    }





}