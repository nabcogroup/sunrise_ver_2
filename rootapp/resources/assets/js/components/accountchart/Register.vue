<template>
  <v-panel header="Account Chart Entry">
      
  </v-panel>
</template>

<script>
  import {mapState} from "vuex";

    export default {
      props: ["chartId"],
      beforeMount() {
        
      },
      computed: {
        ...mapState("accountCharts",{
          account : state => state.account
        })
      }
      

    }
</script>
