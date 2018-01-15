<template>
    <table class="table table-bordered">
        <tbody>
            <tr v-for="item in data">
                <td>{{item.label}}</td>
                <td>{{item.value | toCurrencyFormat}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "VListValue",
        data() {
            return {
                data: []
            }
        },
        props: ["dataSource"],

        mounted() {
            axiosRequest.dispatchGet(this.dataSource.api).then((response) => {

                response.data.forEach((item) => {

                    const ob = {
                        label: item[this.dataSource.label],
                        value: item[this.dataSource.valueName]
                    };
                    this.data.push(ob);

                });
            });
        }
    }
</script>