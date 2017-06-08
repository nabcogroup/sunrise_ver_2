<template>
    <div class="nb-sidebar cold-md-2">
        <div class="nb-sidebar-brand">
            <div class="wrapper">
                <a :href="logo.url" id="logo">
                    <img :src="logo.imgPath" class="circle">
                    SUNRISE WEB PORTAL
                </a>
            </div>
        </div>
        <ul class="nb-sidebar-nav">
            <li class="dropdown" v-for="menu in menus">
                <a href="#" class="dropdown-toggle" ref="dropdown">
                    <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" ></i> &nbsp;
                    <span>{{menu.name}}</span>
                    <span class="pull-right"><i class="fa fa-chevron-down fa-fw"></i></span>
                </a>
                <ul class="nb-dropdown-menu" role="menu">
                    <li v-for="submenu in menu.submenus"><a :href="submenu.url">{{submenu.name}}</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['logo','menus'],
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
        }
    }
</script>


<style>

</style>