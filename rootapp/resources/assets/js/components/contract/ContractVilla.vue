<template>
    <v-panel header="VILLA DETAILS">
        <div class="col-md-12" style="margin-bottom: 10px">
            <select class="form-control" @change="selected()" v-model="contract.villa_id">
                <option value="0" selected="true">--SELECT VILLA--</option>
                <option v-for="villa in villas" :value="villa.id">{{villa.full_location}} - {{villa.villa_no }}
                </option>
            </select>
            <error :errorDisplay="stateContractError.get('villa_id')">{{stateContractError.get('villa_id')}}</error>
        </div>
        <div v-if="selectedVilla">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-body" style="padding-left:0px; padding-right:0px;">
                        <slider :slides="selectedVilla.villa_galleries"></slider>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <p>Details:<strong> {{ selectedVilla.description }}</strong></p>
                <p>Villa Class:<strong> {{ selectedVilla.full_villa_class }} </strong></p>
                <p>Rate per Month: <strong> {{ selectedVilla.rate_per_month | toCurrencyFormat }} QR</strong></p>
                <p>Status: <strong> {{ selectedVilla.full_status }} </strong></p>
            </div>
        </div>
    </v-panel>
</template>

<script>
    import Slider from '../Slider.vue';
    import ErrorLabel from '../ErrorLabel.vue';
    import {mapGetters} from "vuex";

    export default {
        name: "villa",
        components: {'slider': Slider, 'error': ErrorLabel},
        methods: {
            selected: function () {
                this.$store.dispatch('contracts/recalc');
            }
        },
        computed: mapGetters('contracts', {
            villas: 'villas',
            contract: 'contract',
            stateContractError: 'stateContractError',
            selectedVilla: 'selectedVilla'
        })
    }

</script>
