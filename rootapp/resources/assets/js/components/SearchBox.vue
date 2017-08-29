<template>
    <div class="form-inline">
        <div class="form-group">
            <input  name="fieldSearch" type="text" class="form-control" placeholder="Search" v-model="searchValue"/>
        </div>
        <div class="form-group">
            <select name="searchField" id="searchField" class="form-control" v-model="searchField">
                <option>--Select Field--</option>
                <option  v-for="field in fieldList" :value="field.name">{{field.text}}</option>
            </select>
        </div>
        <div class="form-group">
            <button class="btn btn-info" @click="onClickSearch">Search</button>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            fieldList: {}
        },
        data() {
            return {
                searchValue: '',
                searchField: ''
            }
        },
        methods: {
            onClickSearch: function() {
                this.$emit("trigger",this.searchField,this.searchValue);
            }
        }
    }
    
</script>
