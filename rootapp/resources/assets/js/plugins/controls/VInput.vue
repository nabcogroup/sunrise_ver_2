<template>
    <div class="v-input-container">
        <div class="input-group">
            <input type="text" @focus="isShowDropdown = !isShowDropdown" v-model="values.label" readonly ref="textbox" class="form-control">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button" @click="isShowDropdown = !isShowDropdown">
                    <i class="fa" :class="isShowDropdown ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                </button>
            </span>
        </div>
        <div class="v-input-list" v-show="isShowDropdown">
            <div class="form-group">
                <input type="text" placeholder="Search" v-model="search" class="form-control" ref="searchText" />
            </div>
            <ul>
                <li v-for="option in options">
                    <a href="#" :data-value="option[configs.option.key]" @click.prevent="select(option)">
                        <i class="fa fa-cubes fa-fw v-input-icon"></i> {{option[configs.option.label]}}</a>
                </li>
            </ul>

            <template v-if="showAdd">
                <div class="row">
                    <div class="col-md-3 col-md-offset-9">
                        <button class="btn btn-info btn-xs" @click.prevent="onInsert" type="button"><i class="fa fa-plus"></i></button>
                    </div>
                </div>
            </template>
        </div>
       
    </div>
</template>

<script>

export default {

    name: "vInput",
    props: ["value", "itemText", "itemValue","configs"],
    data() {
        return {
            isShowDropdown: false,
            values: {
                label: '',
                value: ''
            },
            rows:[],
            search: '',
        }
    },
    methods: {
        fetch() {
            const url = this.configs.api.url;
            if(this.rows.length > 0) return false;
                
            axiosRequest.dispatchGet(url).then((resp) => {
                this.rows = resp.data.data;
            });
        },
        update() {
            const val = this.values.value;
            this.$emit('input', val);
        },
        onChange(nv) {
            if (nv.length > 0) {
                this.isShowDropdown = true;
            }
            else {
                this.isShowDropdown = false;
            }
        },
        select(values) {
            const option = this.rows.find((item) => {
                return item[this.configs.option.key] == values[this.configs.option.key];
            });

            this.values.value = option[this.configs.option.key];
            this.$refs.textbox.focus();
            this.update();
        },
        setLabel(nv) {
            const option = this.rows.find((item) => {
                return item[this.configs.option.key] == nv;
            });

            this.values.label = option !== undefined ? option[this.configs.option.label] : '';
        },
        onInsert() {
            this.rows = [];
            this.$emit('insert',this.search);
        },
    },
    computed: {
        options() {
           let options = [];
           this.showAdd = false;
           if (this.search.length > 0) {
                this.rows.forEach((item) => {
                    if (item[this.configs.option.label].toLowerCase().indexOf(this.search.toLowerCase()) >= 0) {
                        options.push(item);
                    }
                });
            }
            else {
                options = this.rows;
            }

            if(options && options.length === 0) {
                this.showAdd = true;
            }


            return options;

        },
        label() {
            return this.values.label;
        }
    },
    watch: {
        value(nv) {
            this.values.value = nv;
            this.setLabel(nv);
        },
        isShowDropdown(nv) {
            if (nv) {
                this.search = "";
                setTimeout(() => this.$refs.searchText.focus(), 500)
                this.fetch()    
            }
        }
    }
}
</script>

<style scoped>

.v-input-container {
    position: relative;
}

.v-input-icon {
    margin-right: 15px;
}

.v-input-list {
    background: #fff;
    height: 250px;
    overflow: scroll;
    padding: 10px;
    position: absolute;
    top: 35px;
    left: 0;
    z-index: 3;
    width: 100%;
}

.v-input-list ul {
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
}

.v-input-list ul li {
    display: block;
    border-bottom: 1px solid whitesmoke;
}

.v-input-list ul li a {
    text-decoration: none;
    color: #333;
    padding: 5px;
    display: block;
}

.v-input-list a:hover {
    background: #ccc;
}

.label {
    font-size: 12px;
    color: red;
    font-weight: bold;
}
</style>