<template>
    <v-dialog modal-id="about" dialog-title="About" v-model="toggle" button-type="okOnly">
        <div class="row">
            <div class="col-md-3">Version</div>
            <div class="col-md-9">{{info.ver}}</div>
        </div>
        <div class="row">
            <div class="col-md-3">Developer</div>
            <div class="col-md-9">{{info.dev}}</div>
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
                info: {}
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
                if(nv && _.isEmpty(this.info)) {
                    this.fetchData();
                }
            }
        }
    }
</script>