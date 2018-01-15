<script>
    import {Bar, mixins} from "vue-chartjs"

    export default {
        extends: Bar,
        mixins: [mixins.reactiveData],
        name: "VLineChart",
        data() {
            return {
                chartData: {
                    labels: [],
                    datasets: []
                },
            }
        },
        props: ['dataSource', 'options'],
        mounted() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                axiosRequest.dispatchGet(this.dataSource.api)
                    .then((response) => {
                        let valueData = [];
                        let labels = [];
                        let backgrounds =[];
                        response.data.forEach((item) => {
                            valueData.push(item[this.dataSource.valueName])
                            labels.push(item[this.dataSource.label])
                            backgrounds.push("#2D5F73");
                        })

                        this.chartData.labels = labels;

                        this.chartData.datasets.push({data: valueData,backgroundColor:backgrounds});

                        this.renderChart(this.chartData, this.options)
                    })
            }
        }
    }
</script>