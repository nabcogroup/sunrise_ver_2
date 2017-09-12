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
                    <a href="#" :data-value="option[itemValue]" @click.prevent="select(option)">{{option[itemText]}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "vInput",
    props: ["value", "items", "itemText", "itemValue"],
    data() {
        return {
            isShowDropdown: false,
            values: {
                label: '',
                value: ''
            },
            search: ''
        }
    },
    methods: {
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
            const option = this.items.find((item) => {
                return item[this.itemValue] == values[this.itemValue];
            });

            this.values.value = option[this.itemValue];
            this.$refs.textbox.focus();
            this.update();
        },
        setLabel(nv) {
            const option = this.items.find((item) => {
                return item[this.itemValue] == nv;
            });
            
            this.values.label = option !== undefined ? option[this.itemText] : '';
        }
    },
    computed: {
        options() {

            let options = [];
            
            if (this.search.length > 0) {
                this.items.forEach((item) => {
                    if (item[this.itemText].toLowerCase().indexOf(this.search.toLowerCase()) >= 0) {
                        options.push(item);
                    }
                });
            }
            else {
                options = this.items;
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
                setTimeout(() => {
                    this.$refs.searchText.focus();
                }, 500)
            }
        }
    }
}
</script>

<style scoped>
.v-input-container {
    position: relative;
}

.v-input-list {
    background: #fff;
    height: 150px;
    overflow: scroll;
    padding: 10px;
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    z-index: 3;
}

.v-input-list ul {
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
}

.v-input-list ul li {
    display: block;
}

.v-input-list a {
    text-decoration: none;
    color: #333;
    padding: 5 0;
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