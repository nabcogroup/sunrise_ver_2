<template>
    <label class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" v-model="value" :disabled="isDisabled">
        <span class="custom-control-indicator"></span>
    </label>
</template>


<script>
    export default {
        name: "vswitch",
        props: {
            value: Boolean,
            isDisabled: Boolean
        },
        data() {
            return {
                toggle: false
            }
        },
        methods: {
            onClick(value) {
                this.$emit("@input",value);
            }
        }

    }
</script>
