<template>
    <li :class="{'active':selected}">
        <a href="#" @click.prevent="onClick"><slot></slot></a>
    </li>
</template>

<script>

    import {EventBus} from "../../eventbus";


    export default {
        name: "vTab",
        props: ["text","tabId"],
        data() {
            return {
                selected: false
            }
        },
        methods: {
            onClick() {
                EventBus.$emit("onVTabClick",this.tabId);
            }
        }
    }
</script>