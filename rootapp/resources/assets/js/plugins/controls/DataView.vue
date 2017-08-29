<template>
    <div>
        <table id="grid" class="table table-condensed table-hover table-bordered">
            <thead>
            <tr class="info">
                <th class="text-center">No</th>
                <th v-for="key in grid.columns"
                    :style="key.style"
                    @click="sortBy(key)"
                    class="text-center"
                    :class="{info:sortKey == key.name}">
                    {{ key.column }}
                    <span
                            v-if="isArrowVisible(key.name)"
                            class="fa fa-fw" :class="sortOrders[key.name] > 0 ?
                            'fa-long-arrow-down' : 'fa-long-arrow-up'">
                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
                <slot name="body" :items="grid"></slot>
            </tbody>
            <tfoot v-if="grid.footers">
            <tr class="active">
                <slot name="footer" :items="grid"></slot>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    export default {
        name: "grid",
        props: ['grid'],
        data() {
            let sortOrders = {};
            let sortKey = "";
            this.grid.columns.forEach((key) => {
                sortOrders[key.name] = 1;
                if(key.default !== undefined && key.default == true) {
                    sortKey = key.name;
                }
            });

            return {
                sortKey: sortKey,
                editVisible: false,
                sortOrders: sortOrders
            }
        },
        computed: {
            filteredData() {
                let sortKey = this.sortKey;
                let data = this.data;

                let order = this.sortOrders[sortKey] || 1
                if(sortKey) {
                    data = data.slice().sort(function(a,b) {
                        a = a[sortKey]
                        b = b[sortKey]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    });
                }
                this.$emit('sorted',sortKey);

                return data;
            },
            actionButtons() {
                return this.grid.actions;
            }
        },
        methods: {
            sortBy: function(key) {
                if(key.static) return false;
                this.sortKey = key.name;
                this.sortOrders[key.name] = this.sortOrders[key.name] * -1;
            },
            actionTrigger: function(action,id) {
                this.$emit('action',action,id);
            },
            isArrowVisible(name) {
                return this.sortKey === name;
            },
            isIncludeEdit(key) {
                return (key.editable && !key.static);
            },
            inputTypeIs(type) {
                return this.inputType == type;
            },
            enableEdit(e) {
                console.log(this.$refs[e]);
            }

        }
    }
</script>


<style>

</style>