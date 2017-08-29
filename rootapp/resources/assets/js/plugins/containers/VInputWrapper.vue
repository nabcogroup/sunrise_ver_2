<template>
    <div :class="{'form-group' : excludeRow === undefined  }">
        <label v-if="label"
               :for="modelName"
               :class="labelClass !== undefined ? labelClass : 'col-md-3'">
                {{label}}
            <span v-if="required && customDisplay" class="text-danger">{{customDisplay}}</span>
            <span v-else-if="required" class="text-danger">*</span>
        </label>
        <div :class="controlClass !== undefined ? controlClass : 'col-md-9'">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vInputWrapper",
        props: ["label","modelName", "labelClass","controlClass","required","customDisplay","excludeRow"],
        mounted() {

        }

    }
</script>