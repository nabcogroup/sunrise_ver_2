<template>
    <form class="form-inline" @submit.prevent="onClickSearch">
        <div class="form-group">
            <input  name="fieldSearch" type="text" class="form-control" placeholder="Search" v-model="searchField"/>
        </div>
        <div class="form-group">
            <select name="fieldKey" id="fieldKey" class="form-control">
                <option>--Select Field--</option>
                <option  v-for="field in fieldList" value="field.value">{{field.text}}</option>
            </select>
        </div>
        <div class="form-group">
            <button class="btn btn-info" type="submit">Search</button>
        </div>
    </form>
</template>

<script>
    export default {
        props: {
            fieldList: {}
        },
        data() {
            return {
                searchField: ''
            }
        },
        methods: {
            onClickSearch: function() {
                this.$emit("trigger",this.searchField);
            }
        }
    }
</script>
