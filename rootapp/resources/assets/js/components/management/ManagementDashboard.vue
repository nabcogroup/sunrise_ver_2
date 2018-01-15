<template>
    <div class="row">
        <div class="col-md-6">
            <v-panel header="Projected Rental Income Sales Chart">
                <div class="col-md-4">
                    <v-combo-box :options="[{value:'income',text:'Income'},{value:'receivable',text:'Receivable'}]"></v-combo-box>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="col-md-12">
                    <v-line-chart :data-source="dataSource" :options="options"></v-line-chart>
                </div>
            </v-panel>
        </div>
        <div class="col-md-6">
            <v-panel header="Projected Rental Income Sales List">
                <v-list-value :data-source="dataSource"></v-list-value>
            </v-panel>
        </div>
    </div>

</template>

<script>

    export default {
        name: "ManagementDashboard",
        data() {
            return {
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {beginAtZero: true}
                        }]
                    }
                },
                dataSource: {
                    api: "/api/management",
                    valueName:"rental_income",
                    label:"full_location"
                }
            }
        }
    }
</script>