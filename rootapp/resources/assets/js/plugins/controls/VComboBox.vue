<template>
    <select class="form-control" @change="onChange($event.target.value)" :disabled="disabled" :value="value">
        <option v-if="includeDefault" value="">--Select--</option>
        <option 
            v-for="(option,index) in options" 
            :value="option[keyValue]" 
            :key="index" >{{option[keyText]}}</option>
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
            value: ""
        },
        mounted() {
            
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
