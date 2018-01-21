<template>
  <div class="col-md-12">
      <p><span>Total Amount:</span><span>{{totalAmount}}</span></p>
  </div>
</template>


<script>
import axios from 'axios';
  export default {
    data() {
      return {
        totalAmount: '',
        url: '/api/bill/get_balance_total',
        field: '',
        value: ''
      }
    },
    methods: {
      filter: function(){
        axios.get(this.url + '?filter_field' + '=' + this.field + '&filter_value' + '=' + this.value)
        .then(response => this.totalAmount = response.data)
        .catch(function(error){
          console.log(error);
        });
      }
    }

  }
</script>
