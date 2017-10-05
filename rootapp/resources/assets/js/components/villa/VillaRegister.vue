<template>
    <div>
        <form id="frmVillaEntry"
              @submit.prevent="onSave"
              class="form-horizontal"
              enctype="multipart/form-data"
              @keydown="errors.clear($event.target.name)">

            <div class="form-group">
                <div class="col-md-8">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="form-group">
                                <label for="location" class="col-md-2 text-right">Location:</label>
                                <div class="col-md-10">
                                    <select name="location" v-model="villa.location" class="form-control">
                                        <option v-for="lookup in lookups.villa_location"
                                                v-bind:value="lookup.code">{{lookup.name}}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group ">
                                <label for="villa_no" class="col-md-2 text-right">Villa No:</label>
                                <div class="col-md-10">
                                    <input name="villa_no" type="text" class="form-control" v-model="villa.villa_no">
                                    <error-label :error-display="errors.get('villa_no')">{{errors.get('villa_no')}}
                                    </error-label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="description" class="col-md-2 text-right">Description:</label>
                                <div class="col-md-10">
                                    <textarea name="description" rows="5" class="form-control"
                                              v-model="villa.description"></textarea>
                                    <error-label :error-display="errors.get('description')">{{errors.get('description')}}</error-label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="electricity_no" class="col-md-2 text-right">Electrity No:</label>
                                <div class="col-md-4">
                                    <input name="electricity_no" type="text" class="form-control"
                                           v-model="villa.electricity_no">
                                    <error-label :error-display="errors.get('electricity_no')">
                                        {{errors.get('electricity_no')}}
                                    </error-label>
                                </div>

                                <label for="water_no" class="col-md-2 text-right">Water No:</label>
                                <div class="col-md-4">
                                    <input name="water_no" type="text" class="form-control" v-model="villa.water_no">
                                    <error-label :error-display="errors.get('water_no')">{{errors.get('water_no')}}
                                    </error-label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="qtel_no" class="col-md-2 text-right">QTel No:</label>
                                <div class="col-md-4">
                                    <input name="qtel_no" type="text" class="form-control" v-model="villa.qtel_no">
                                    <error-label :error-display="errors.get('qtel_no')">{{errors.get('qtel_no')}}
                                    </error-label>
                                </div>

                                <label for="capacity" class="col-md-2 text-right">Capacity:</label>
                                <div class="col-md-4">
                                    <input name="capacity" type="number" class="form-control" v-model="villa.capacity">
                                    <error-label :error-display="errors.get('capacity')">{{errors.get('capacity')}}
                                    </error-label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="rate_per_month" class="col-md-2 text-right">Rate per Month:</label>
                                <div class="col-md-4">
                                    <input name="rate_per_month" type="text" class="form-control"
                                           v-model="villa.rate_per_month">
                                    <error-label :error-display="errors.get('rate_per_month')">
                                        {{errors.get('rate_per_month')}}
                                    </error-label>
                                </div>

                                <label for="villa_class" class="col-md-2 text-right">Villa Class:</label>
                                <div class="col-md-4">
                                    <select name="villa_class" v-model="villa.villa_class" class="form-control">
                                        <option v-for="lookup in lookups.villa_type" v-bind:value="lookup.code">
                                            {{lookup.name}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <button class="btn btn-info btn-block" :disabled="btnDisabled" type="submit">Save</button>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="col-md-12">
                                <image-upload @dispatch="onDispatch"></image-upload>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <grid-view
                                    :data="villa.villa_galleries"
                                    :grid="grid"
                                    @action="onDelete"
                            >
                            </grid-view>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <slider :slides="villa.villa_galleries"></slider>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </div>
</template>

<script>

    import ImageUpload from '../ImageUpload.vue';
    import GridView from '../GridView.vue';
    import Slider from '../Slider.vue';
    import ErrorLabel from '../ErrorLabel.vue';

    

    import {mapGetters} from 'vuex';

    export default {
        props: ['villaId'],
        components: {
            'imageUpload': ImageUpload,
            'gridView': GridView,
            'slider': Slider,
            'errorLabel': ErrorLabel
        },
        data() {
            return {
                btnDisabled: false,
                grid: {
                    columns: [
                        {name: 'image_name', column: 'Image Name', static: true, style: 'width:10%'},
                        {name: 'mime_type', column: 'Mime Type', static: true},
                        {
                            name: 'delete_mark',
                            column: '',
                            style: 'width:5%;text-align:center',
                            editable: true,
                            bind: 'delete_mark',
                            itype: 'selector'
                        }
                    ]
                }
            }
        },
        mounted() {
            //create initialize
            this.$store.dispatch('villas/create', this.villaId);
        },
        methods: {
            onSave() {
                let that = this;
                bbox.confirm({
                    title: 'Confirmation',
                    message: 'Do you want to save?',
                    buttons: {
                        confirm: {
                            label: 'Yes',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'No',
                            className: 'btn-danger'
                        }
                    },
                    callback: (result) => {
                        if (result) {
                            this.$store.dispatch('villas/save')
                        }
                    }
                });
            },
            onDispatch(file) {
                if (file) {
                    this.$store.dispatch('villas/insertImage', {file: file});
                    //this.viewModel.insert(file.file);
                }
            },
            onDelete(a, id) {
                this.$store.dispatch('villas/removeImage', {id: id});
                //this.viewModel.remove(id);
            }
        },
        computed: mapGetters('villas', {
            villa: 'villa',
            lookups: 'lookups',
            errors: 'errors'
        })
    }
</script>
