<template>
  <div>
    <div class='input-group date' ref="$dtPicker">
        <input type='text' :disabled="disabled" class="form-control" :name="name" :value="value"/>
        <span class="input-group-addon">
            <span class="fa fa-calendar"></span>
        </span>
    </div>
  </div>
</template>

<script>

const jQuery = window.$ || require("jquery");
const moment = window.moment || require("moment");

//import "eonasdan-bootstrap-datetimepicker";

const events = ["hide", "show", "change", "error", "update"];

export default {
  name: "VDtPicker",
  props: {
    //v-model two-way or one-way bind
    value: {
      default: null,
      required: true,
      validator(value) {
        return ( value === null || value instanceof Date || typeof value === "string" || value instanceof String || value instanceof moment);
      }
    },
    // http://eonasdan.github.io/bootstrap-datetimepicker/Options/
    configs: {
      type: Object,
      default: () => ({})
    },
    dtFormat: {
        default: 'L',
        type: String
    },
    disabled:{
        default: false,
        type: Boolean
    },
    /**
    * You can set this to true when component is wrapped in input-group
    * Note: inline and wrap mode wont work together
    */
    wrap: {
      type: Boolean,
      default: false
    },
    name: String,
    errorVal: {
      type:Object,
      default: null
    }
  },
  data() {
    return {
      initValue: null,
      dp: null,
      // jQuery DOM
      elem: null
    };
  },
  mounted() {
    
    // Return early if date-picker is already loaded
    /* istanbul ignore if */
    if (this.dp) return;
    // Handle wrapped input
    
    // Cache DOM
    this.elem = jQuery(this.$refs.$dtPicker);
    
    // Init date-picker
    this.elem.datetimepicker(this.configs);
    // Watch for changes
    this.elem.on("dp.change", this.onChange);
    
    // Store data control
    this.dp = this.elem.data("DateTimePicker");
    
    
    //check if date is a string
    this.initValue = this.value;
    if(this.initValue == null) {
        this.initValue = moment();
    }
    else if(typeof this.initValue === 'string') {
        this.initValue = moment(this.initValue);
    }
    else {

    }
    
    // Set initial value
    this.dp.date(this.initValue);
    this.dp.format(this.dtFormat);
    
    // Register remaining events
    this.registerEvents();
  },
  //destroy memory
  beforeDestroy() {
    // Free up memory
    /* istanbul ignore else */
    if (this.dp) {
      this.dp.destroy();
      this.dp = null;
      this.elem = null;
    }
  },
  watch: {
    /**
       * Listen to change from outside of component and update DOM
       *
       * @param newValue
       */
    value(newValue) {
      this.dp && this.dp.date(newValue || null);
    },
    /**
       * Watch for any change in options and set them
       *
       * @param newConfig Object
       */
    configs(newConfig) {
      this.dp &&
        this.dp.options(Object.assign({}, this.dp.options(), newConfig));
    }
  },
  methods: {
      /**
       * Update v-model upon change triggered by date-picker itself
       *
       * @param event
       */
    onChange(event) {
      let formattedDate = event.date ? event.date.format(this.dp.format())
        : null;
        
      this.$emit("input", formattedDate);
    },
    /**
       * Emit all available events
       */
    registerEvents() {
      events.forEach(name => {
        this.elem.on(`dp.${name}`, (...args) => {
          this.$emit(`dp-${name}`, ...args);
        });
      });
    }
  }
};
</script>