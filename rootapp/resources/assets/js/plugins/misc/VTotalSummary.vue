<template>

    <table class="table table-bordered" id="totales">
        <tbody>
        <tr>
            <th scope="row">{{keyValue1.label}}</th>
            <td>{{v1 | toCurrencyFormat}}</td>
        </tr>
        <tr>
            <th scope="row">{{keyValue2.label}}</th>
            <td>{{v2 | toCurrencyFormat}}</td>
        </tr>
        <tr>
            <th scope="row">{{config.keyValue.totalLabel}}</th>
            <td>{{totalBalance | toCurrencyFormat}}</td>
        </tr>
        </tbody>
    </table>

</template>


<script>
    import {EventBus} from "../../eventbus";

    export default {
        name: "VTotalSummary",
        props: {
            config: {
                default: null,
                type: Object
            },
            api: {
                default: null
            },
            keyValue: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                v1: 0,
                v2: 0,
                filter: {
                    type: Object,
                    default: null
                },
            }
        },
        beforeMount() {

            if (this.config.type === 'live') {
                EventBus.$on("TotalSummary.init", (response) => {
                    this.filter = response;
                    this.fetchData();
                });
            }
        },
        mounted() {

            if (this.config.filter) {
                this.filter = this.config.filter;
            }
        },
        methods: {
            fetchData() {

                if (this.filter !== null) {

                    const query = "?filter_field=" + this.filter.field + "&filter_value=" + this.filter.value;

                    this.config.url = this.config.url + query;

                }

                axiosRequest.dispatchGet(this.config.url)
                    .then((response) => {
                        this.v1 = response.data[this.config.keyValue.key1.key]
                        this.v2 = response.data[this.config.keyValue.key2.key]
                    })
                    .catch((err) => {
                        toastr.error("Summary Error");
                    });
            }
        },
        computed: {
            totalBalance() {
                return this.v1 - this.v2;
            },
            keyValue1() {
                return this.config.keyValue.key1
            },
            keyValue2() {
                return this.config.keyValue.key2
            }
        }

    }
</script>


<style scope>
    #totales {
        width: 100%;
    }

    #totales th {
        text-align: center;
    }

    #totales td {
        text-align: right;
    }

</style>