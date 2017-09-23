<template>
    <v-dialog modal-id="about" dialog-title="About" v-model="toggle" button-type="okOnly">
        <div class="row">
            <div class="col-md-3">Version</div>
            <div class="col-md-9">{{info.ver}}</div>
        </div>
        <div class="row">
            <div class="col-md-3">Developer</div>
            <div class="col-md-9" @click="easterEgg = !easterEgg">{{info.dev}}</div>
        </div>
        <div class="row" v-if="easterEgg">
            <div class="col-md-3">Head Dev</div>
            <div class="col-md-9"><span class="label label-danger">{{info.devteam.head.name}} - {{info.devteam.head.linkedin}}</span></div>
            <div class="col-md-3">FrontEnd Dev</div>
            <div class="col-md-9"><span class="label label-danger">{{info.devteam.dev.name}} - {{info.devteam.dev.linkedin}}</span></div>
        </div>
        <div class="row">
            <div class="col-md-3">Repository</div>
            <div class="col-md-9">{{info.repo}}</div>
        </div>
        <div class="row">
            <div class="col-md-3">Environment</div>
            <div class="col-md-9">{{info.env}}</div>
        </div>
        
    </v-dialog>
</template>

<script>
    import {EventBus} from "../../eventbus";

    export default {
        name: "infoModal",
        data() {
            return {
                toggle:false,
                easterEgg: false,
                info: {
                    devteam: {
                        head: {},
                        dev:{}
                    }
                }
            }
        },
        mounted() {
          EventBus.$on("openInfo",() => this.toggle = true);
        },
        methods: {
            fetchData() {
                axios.get("/api/about").then(r => {

                    this.info = r.data;
                })
            }
        },
        watch: {
            toggle(nv) {
                if(nv && this.info.ver === undefined) {
                    this.fetchData();
                }
            }
        }
    }
</script>