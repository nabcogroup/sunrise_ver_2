import {ErrorValidations} from '../../helpers/helpers';


export class VillaListViewModel {

    constructor() {
        this.data = {
            list: [],
            status: []
        };
    }


    getList() {

        axiosRequest.get("villa","list")
            .then(res => {
                this.data.list = res.data.villas;
                this.data.status = res.data.status;
            })
            .catch(err => {
                toastr.errors(err.response.message);
            })
    }

    redirectToRegister(id = null) {
        axiosRequest.redirect("villa","register",id);

    }
}

export class VillaEntryViewModel {

    constructor() {
        this.data = {
            villa: {
                villa_galleries: []
            },
            villa_newImages: []
        };
        this.lookups = {};
        this.errors = new ErrorValidations();
    }

    create(id) {
        axiosRequest.get("villa","create",id)
            .then(res => {
                this.data.villa = res.data.instance;
                this.lookups = res.data.lookups;
            })
            .catch(err => {
                toastr.errors(err.response.message);
            })
    }

    insert(file) {
        this.data.villa_newImages.push(file);
    }

    redirect() {
        axiosRequest.redirect('villa');
    }

    save() {

        let formData = new FormData();

        //take villa data
        Object.keys(this.data.villa).forEach(key => {
            if(key !== 'villa_galleries') {
                formData.append(key,this.data.villa[key]);
            }
        });

        let villaGalleries = this.data.villa.villa_galleries || [];

        //take galleries which has mark deleted
        if(villaGalleries.length > 0 ) {
            for(var i = 0; i < villaGalleries.length; i++) {
                if(villaGalleries[i].delete_mark == true) {
                    formData.append('villaGalleriesDeleteMark[]',villaGalleries[i].id);
                }
            }
        }

        //check for new image galleries
        if(this.data.villa_newImages.length > 0) {
            for(var i=0; i < this.data.villa_newImages.length; i++) {
                formData.append('galleries[]', this.data.villa_newImages[i]);
            }
        }

        axiosRequest
            .postMultiForm('villa','store',formData)
            .done(resp => {
                this.redirect();
            })
            .fail(err => {
                if(err.status === 422) {
                    this.errors.register(err.responseJSON);
                }
            });
    }
}