<template>
    <ul class="nav nav-tabs">
        <slot></slot>
    </ul>
</template>

<script>
    import {EventBus} from "../../eventbus";

    export default {
        name: "vTabGroup",
        props: ['value'],
        data() {
            return {
                selected: 0
            }
        },
        mounted() {
            let children = this.$children;
            _.forEach(children, (child,index) => {
                 const tabId = child.$props.tabId;
                 child.$data.selected = false;
                 if(tabId === this.value) {
                    child.$data.selected = true;
                 }
            })

            EventBus.$on("onVTabClick", (r) => this.update(r));

        },
        methods: {
            clickSlot() {
                console.log("click");
            },
            update(tabId) {
                this.$emit('input',tabId);
            }
        },
        watch: {
            value(nv) {
                let children = this.$children;
                _.forEach(children, (child,index) => {
                    const tabId = child.$props.tabId;
                    child.$data.selected = false;
                    if(tabId === nv) {
                        child.$data.selected = true;
                    }
                })
            }
        }
    }
</script>