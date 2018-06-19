<template>
    <div class="panel panel-info wrap">
        <div class="panel-heading">
            <h5>{{titleHead}}</h5>
        </div>
        <div class="panel-group wrap" id="bs-collapse">
            <div class="panel panel-success active" v-for="(item,i) in items" :key="i">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        {{item.title}}
                    </h4>
                </div>
                <div id="one" class="panel-collapse">
                    <div class="panel-body">
                        <ul>
                            <li v-for="(subItem,index) in item.data" :key="index">
                                <a href="#" @click="onClick(subItem)" :style="subItem.disabled ? 'color:red': ''  ">{{subItem.title}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VReportListPanel',
        props: {
            titleHead: {
                type: String,
                default: ''
            },
            items: {
                type: Object,
                default:{},
                required: true
            }
        },
        methods: {
            onClick(data) {
                this.$emit('itemClicked',data);
            }
        }
    }
</script>
