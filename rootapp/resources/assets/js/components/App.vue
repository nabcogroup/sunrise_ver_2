<template>
    <div name="app">
        <div class="container-page">
            <div class="page-header">
                <h3>{{pageTitle}}</h3>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                ptitle: 'Application'
            }
        },
        props: ['pageTitle']
    }
</script>

