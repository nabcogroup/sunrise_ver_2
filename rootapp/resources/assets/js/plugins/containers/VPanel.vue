<template>
    <div>
        <div v-if="classic" class="x-panel">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-12">
                        <h3><i v-if="headIcon" :class="headIcon"></i> {{header}}</h3>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <slot></slot>
            </div>
            <div class="panel-footer">
                <slot name="panel-footer"></slot>
            </div>
        </div>
        <div v-else="" class="panel" :class="panelTheme === undefined ? 'panel-primary' : panelTheme">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-12">
                        <slot name="header">
                            <h4><i v-if="headIcon" :class="headIcon"></i> {{header}}</h4>
                        </slot>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <slot></slot>
            </div>
            <div class="panel-footer">
                <slot name="panel-footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vPanel",
        props: ["panelTheme", "classic","headIcon","header"]
    }
</script>
