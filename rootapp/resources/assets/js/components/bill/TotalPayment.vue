<template>
    <div class="x-total-panel" style="margin: 15px 0">
        <p class="x-read-group"><span class="col-md-7 x-total-label">Total Cost:</span> <span class="col-md-5 x-total-desc">{{ totalCost | toCurrencyFormat }}</span></p>
        <p class="x-read-group"><span class="col-md-7 x-total-label">Total Payment:</span> <span class="col-md-5 x-total-desc">{{ totalPayment | toCurrencyFormat }}</span></p>
        <p class="x-read-group"><span class="col-md-7 x-total-label">Balance:</span> <span class="col-md-5 x-total-desc">{{ balance | toCurrencyFormat }}</span></p>
    </div>
</template>

<script>
    export default {
        props: ['payment'],
        computed: {
            totalPayment() {
                return (this.payment.total_payment !== undefined) ?  this.payment.total_payment : 0;
            },
            totalCost() {
                return (this.payment.total_cost !== undefined) ?  this.payment.total_cost : 0;
            },
            balance() {
                 return this.totalCost - this.totalPayment;
            }
        }
    }



</script>