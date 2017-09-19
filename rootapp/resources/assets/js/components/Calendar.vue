<template>
    <div></div>
</template>

<script>
    export default {
        props: {
                events: Object,
                url: String,
                editable: Boolean
        },
        data() {
            return {
                cal: null
            }
        },
        mounted() {
            let that = this;
            this.cal = $(this.$el);
            let defaultBackground = "#3a87ad";
            let prevClickedEvent;
            let args = {
                lang: 'en',
                header: {
                    left:   'title',
                    center: '',
                    right:  'today prev,next'
                },
                height: "300px",
                allDaySlot: false,
                slotEventOverlap: false,
                events: this.events,
                eventClick:function(event,jsEvent,view)
                {
                    if(prevClickedEvent) {
                        prevClickedEvent.backgroundColor = defaultBackground;
                    }
                    event.backgroundColor  = "#f4c9a0";
                    prevClickedEvent = event;
                    that.cal.fullCalendar('rerenderEvents');
                    that.$emit('onEventClicked', event);
                }
            }
            
            this.cal.fullCalendar(args);
        },
        watch: {
            events(val) {
                return val;
            }
        }
    }
</script>