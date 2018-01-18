<template>
    <div class="nb-sidebar cold-md-2">
        <div class="nb-sidebar-brand">
            <div class="wrapper">
                <a href="#" id="logo" @click="openInfo">
                    <img :src="logo.imgPath" class="circle">
                    {{title}}
                </a>
            </div>
        </div>
        <ul class="nb-sidebar-nav">
            <li class="dropdown" v-for="menu in menus" v-if="menu.visible">
                <a href="#" class="dropdown-toggle" ref="dropdown">
                    <i class="fa fa-lg" :class="menu.icon" aria-hidden="true" ></i> &nbsp;
                    <span>{{menu.name}}</span>
                    <span class="pull-right"><i class="fa fa-chevron-down fa-fw"></i></span>
                </a>
                <ul class="nb-dropdown-menu" role="menu">
                    <li v-for="submenu in menu.submenus" :class="submenu.name==='$separator' ? 'separator' : 'sub-menu'">
                        <span v-if="submenu.disabled" class="nav-disabled">{{submenu.name}}</span>
                        <a v-if="submenu.name !== '$separator' && !submenu.disabled" :href="submenu.url"  :style="submenu.unused ? 'color:red' : '' ">{{submenu.name}}</a>
                    </li>
                </ul>
            </li>
        </ul>
        <info-modal></info-modal>
    </div>
</template>

<script>

    import InfoModal from "./home/Info.vue";
    import {EventBus} from "../eventbus";

    export default {
        components: {InfoModal},
        props: ['logo','menus','title'],
        mounted() {

            let dropdowns = this.$refs.dropdown;
            $('.nb-dropdown-menu').hide();
            $(dropdowns).removeClass('active');
            $(dropdowns).on('click',function(e) {
                $('.nb-dropdown-menu').hide();
                $(dropdowns).parent().removeClass('active');
                let parent = $(this).parent();
                parent.addClass('active');
                parent.find('ul').show();

            });
        },
        methods: {
            openInfo() {
                EventBus.$emit("openInfo");
            }
        }
    }
</script>


<style>

</style>