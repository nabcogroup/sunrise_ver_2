export const toggleModal = {
    data() {
        return {
            toggle: false
        }
    },
    methods: {
        openDialog() {
            this.toggle = true;
        },
        closeDialog() {
            this.toggle = false;
        },
        toggleDialog() {
            this.toggle = !this.toggle;
        }
    }
}

