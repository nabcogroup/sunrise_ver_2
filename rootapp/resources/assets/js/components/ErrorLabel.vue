<template>
    <div v-show="errorDisplay">
        <span class="text-danger"><i class="fa fa-times-rectangle"></i> <small><slot></slot></small></span>
    </div>
</template>

<script>
    export default {
        props: {
            errorDisplay: false,
            errorText: ''
        }
    }
</script>