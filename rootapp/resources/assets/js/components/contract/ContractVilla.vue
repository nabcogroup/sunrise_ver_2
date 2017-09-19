<template>
    <v-panel header="VILLA DETAILS">
        <div class="row">
            <div class="col-md-6">
                <v-combo-box v-model="filter.location" :options="lookups.villa_location" dvalue="code" dtext="name" :include-default="true"></v-combo-box>
            </div>
            <div class="col-md-6">
                <v-combo-box v-model="contract.villa_id" :options="villas" dvalue="id" dtext="villa_no" :include-default="true" @change="selected"></v-combo-box>
                <error :errorDisplay="stateContractError.get('villa_id')">{{stateContractError.get('villa_id')}}</error>
            </div>
        </div>
        <div v-if="selectedVilla">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-body" style="padding-left:0px; padding-right:0px;">
                       
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <p>Details:
                    <strong> {{ selectedVilla.description }}</strong>
                </p>
                <p>Villa Class:
                    <strong> {{ selectedVilla.full_villa_class }} </strong>
                </p>
                <p>Rate per Month:
                    <strong> {{ selectedVilla.rate_per_month | toCurrencyFormat }} QR</strong>
                </p>
                <p>Status:
                    <strong> {{ selectedVilla.full_status }} </strong>
                </p>
            </div>
        </div>
    </v-panel>
</template>

<script>
import Slider from '../Slider.vue';
import ErrorLabel from '../ErrorLabel.vue';
import { mapGetters, mapState } from "vuex";

export default {
    name: "villa",
    components: { 'slider': Slider, 'error': ErrorLabel },
    methods: {
        selected: function() {
            this.$store.dispatch('contracts/recalc');
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters('contracts', {
            villas: 'villas',
            contract: 'contract',
            stateContractError: 'stateContractError',
            lookups: 'lookups'
        }),
        ...mapState('contracts', {
            filter: state => state.filter
        }),
        fullVilla() {
            return
        },
        selectedVilla() {
            var selected = _.find(this.villas, (item) => {
                if(item.id == this.contract.villa_id) {
                    return true;
                }
            });
            return selected;
        }
    }

}

</script>
