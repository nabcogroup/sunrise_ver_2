class AjaxRequest {
    

    constructor() {
        this.data = []
        this.config = {
            villa: {list : '/api/villa/list/'}
        };
    }

    post(controller,action) {
        
        var ctrl = this.config[controller];

        return axios.post(ctrl[controller]);
            
    }

    get(controller,action) {
        
        return axios.get('/api/'+controller+'/'+action);
    }

}