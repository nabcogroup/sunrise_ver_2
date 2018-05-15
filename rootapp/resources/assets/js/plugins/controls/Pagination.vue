<template>
    <ul class="v-pagination-row">
        <li>
            <div class="group-button">
                <button type="button" class="btn btn-default" :disabled="param.previous_page === null"
                        @click="onClick(param.first_page)">
                    <i class="fa fa-angle-double-left"></i>
                </button>
                <button type="button" class="btn btn-default" :disabled="param.previous_page === null"
                        @click="onClick(param.previous_page)">
                    <i class="fa fa-angle-left"></i>
                </button>
                <input text="text" disabled v-bind:value="currentPage"/>
                <button type="button" class="btn btn-default" @click="onClick(param.next_page)"
                        :disabled="param.next_page === null">
                    <i class="fa fa-angle-right"></i>
                </button>
                <button type="button" class="btn btn-default" @click="onClick(param.last_page)"
                        :disabled="param.next_page === null">
                    <i class="fa fa-angle-double-right"></i>
                </button>
            </div>
        </li>
        <li>
            <span class="text-muted"> Total Record: {{param.total}}</span>
        </li>
    </ul>

</template>

<script>
    export default {
        name: 'pagination',
        props: ['param'],
        data() {
            return {
                total: 1,
            }
        },
        methods: {
            onClick(step) {
                this.$emit('click', step);
            }
        },
        computed: {
            currentPage() {
                return this.param.current_page;
            }
        }
    }


</script>


<style scoped>
    .v-pagination-row {
        list-style: none;
        margin: 0;
        padding:0;
        width:100%;
    }



    .v-pagination-row li {
        display: inline-block;
        margin-right: 15px;
    }
</style>