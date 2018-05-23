<template>
    <div class="v-predictive-position" :class="{'v-hide': hide}">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th></th>
                <th style="width:80%">Description</th>
                <th style="width:20%">Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><i class="fa fa-tags"></i></td>
                <td style="width:80%">Repair Maintenance</td>
                <td style="width:20%">3500</td>
            </tr>
            <tr>
                <td><i class="fa fa-tags"></i></td>
                <td style="width:80%">Water Pump</td>
                <td style="width:20%">3500</td>
            </tr>
            <tr>
                <td><i class="fa fa-tags"></i></td>
                <td style="width:80%">Basin Mixer</td>
                <td style="width:20%">3500</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import {EventBus} from "./../../eventbus.js";

export default {
    name: "vPredictive",
    data() {
        return {
            hide: true
        }
    },
    mounted() {
        EventBus.$on('predictive.open', () => {
            this.open();
        });

        EventBus.$on('predictive.close', () => {
            this.close();
        });

        EventBus.$on('predictive.toggle', () => {
            if(this.hide) {
                this.open();
            }
            else {
                this.close();
            }
                
        });

    },
    methods: {
        open() {
            this.hide = false;
        },
        close() {
            this.hide = true;
        }
    },
    
}
</script>

<style scoped>
    .v-predictive-position {
        background: white;
        position: absolute;
        width: 100%;
        height: 250px;
        z-index: 3;
        overflow: scroll;
    }
    .v-hide {
        display:none; 
    }

    .table tbody tr:hover {
        cursor: pointer;
        background: #dce782;
    }
</style>
