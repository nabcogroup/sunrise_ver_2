<template>
    <div class='input-group date' ref="$dtPicker">
        <input type='text' :disabled="disabled" class="form-control" name="dpName" :value="defaultValue"/>
        <span class="input-group-addon">
            <span class="fa fa-calendar"></span>
        </span>
    </div>
</template>

<script>
    export default {
        name: "dtPicker",
        props:{
            dpName: "",
            value: "",
            disabled: false,
            dpformat: 'L'
        },
        data() {
            let dateFormat = (this.dpformat === undefined) ? 'L' : this.dpformat;
            return {
                dateFormat: dateFormat
            }
        },
        mounted() {
            let dtPicker = this.$refs.$dtPicker;
            $(dtPicker).datetimepicker({format: this.dateFormat}).on('dp.change',(e) => {
                if(e.date) {
                    this.onChange(e.date.format(this.dateFormat));
                }
                else {
                    this.onChange(moment().format(this.dateFormat));
                }
            });
        },

        methods: {
            onChange(dtValue) {
                this.$emit('pick',dtValue);
            }
        },
        computed: {
            defaultValue() {
                if(moment(this.value).isValid()) {
                    return moment(this.value).format(this.dateFormat);
                }
                return moment().format(this.dateFormat);
            }
        }
    }

</script>

