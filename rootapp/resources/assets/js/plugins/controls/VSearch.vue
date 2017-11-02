<template>
  <div class="form-horizontal">
    <div class="form-group row">
        <div class="col-md-4">
            <select class="form-control" @change="onChange($event.target.value)">
                <option value="">--Select--</option>
                <option v-for="(options,index) in options" :value="options[config.keyValue]" :key="index" :selected="value === options[config.keyValue]">{{options[config.keyText]}}</option>
            </select>
        </div>
        <div class="col-md-2">
            <button class="btn btn-primary" @click="onSearchClick">Search</button>
        </div>
    </div>
    
  </div>
</template>

<script>

export default {
    name: 'vSearch',
    props: ['config','value'],
    data() {
        return {
            options: [],
            currentValue:''
        }
    },
    mounted() {
       axiosRequest.dispatchGet(this.config.api).then((result) => {
           this.options = result.data[this.config.source];
       });
    },
    methods: {
        onChange(value) {
          this.currentValue = value;
        },
        onSearchClick() {
            this.$emit('click', this.currentValue);
        }
    }
};

</script>

