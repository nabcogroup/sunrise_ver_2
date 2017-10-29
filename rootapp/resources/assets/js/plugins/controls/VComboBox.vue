<template>
    <select class="form-control" @change="onChange($event.target.value)" :disabled="disabled">
        <option v-if="includeDefault" value="">--Select--</option>
        <option v-for="(option,index) in options" :value="option[keyValue]" :key="index" :selected="value === option[keyValue]">{{option[keyText]}}</option>
    </select>
</template>

<script>

    export default {
        name: "vComboBox",
        props: {
            options: Array,
            dvalue: "",
            dtext: "",
            includeDefault: false,
            disabled: false,
            value: String
        },
        mounted() {
            console.log(this.value);
        },
        methods: {
            onChange(value) {
                this.$emit('input', value);
                this.$emit('change',value);
            }
        },
        computed: {
            keyValue() {
                return this.dvalue || "value";
            },
            keyText() {
                return this.dtext || "text";
            }
        }
    }
    
</script>
