<template>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="period_start" class="col-md-3">Period Start</label>
            <div class="col-md-9">
              <dtpicker dp-name="period_start" :value="viewModel.data.period_start" @pick="viewModel.data.period_start = $event"></dtpicker>
                <error :errorDisplay="viewModel.errors.get('period_start')">{{viewModel.errors.get('period_start')}}</error>
            </div>
        </div>
        <div class="form-group">
            <label for="period_end" class="col-md-3">Period End</label>
            <div class="col-md-9">
                <dtpicker dp-name="period_end" :value="viewModel.data.period_end" @pick="viewModel.data.period_end = $event"></dtpicker>
                <error :errorDisplay="viewModel.errors.get('period_end')">{{viewModel.errors.get('period_end')}}</error>
            </div>
        </div>
        <div class="form-group">
            <label for="amount" class="col-md-3">Amount</label>
            <div class="col-md-9">
                <input type="text" class="form-control" name="amount" id="amount" v-model="viewModel.data.amount" required>
                <error :errorDisplay="viewModel.errors.get('amount')">{{viewModel.errors.get('amount')}}</error>
            </div>
        </div>
    </form>
</template>
<script>

    import ErrorLabel from '../ErrorLabel.vue';
    import DateTimePicker from '../DateTimePicker.vue';

    export default {
      props:["viewModel"],
      components: {
        'error': ErrorLabel,
        'dtpicker': DateTimePicker
      }
    }
</script>
