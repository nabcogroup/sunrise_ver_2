<template>
    <div class="x-panel is-margin-bottom">
        <div class="panel-heading ">
            VILLA DETAILS
        </div>
        <div class="panel-body">
            <div class="col-md-12" style="margin-bottom: 10px">
                <select class="form-control" @change="selected()" v-model="contract.villa_id">
                    <option value="0" selected="true">--SELECT VILLA--</option>
                    <option v-for="villa in villas" :value="villa.id">{{ villa.villa_no }}</option>
                </select>
                <error :errorDisplay="errors.get('villa_id')">{{errors.get('villa_id')}}</error>
            </div>
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-body" style="padding-left:0px; padding-right:0px;">
                        <slider :slides="villaobject.villa_galleries"></slider>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <p>Details:<strong> {{ villaobject.description }}</strong></p>
                <p>Villa Class:<strong> {{ villaobject.full_villa_class }} </strong></p>
                <p>Rate per Month: <strong> {{ villaobject.rate_per_month | toCurrencyFormat }} QR</strong></p>
                <p>Status: <strong> {{ villaobject.full_status }} </strong></p>
            </div>
        </div>
    </div>
</template>

<script>
    import Slider from '../Slider.vue';
    import ErrorLabel from '../ErrorLabel.vue';

    export default {
        name: "villa",
        props: ['viewModel'],
        components: {'slider': Slider, 'error': ErrorLabel},
        methods: {
            selected: function () {
                this.viewModel.select();
                this.viewModel.recal();
            }
        },
        computed: {
            villas() {
                return this.viewModel.data.villa_list;
            },
            contract() {
                return this.viewModel.data;
            },
            errors() {
                return this.viewModel.errors;
            },
            villaobject() {
                if (this.viewModel.villa !== undefined)
                    return this.viewModel.villa;

            }
        }

    }

</script>
