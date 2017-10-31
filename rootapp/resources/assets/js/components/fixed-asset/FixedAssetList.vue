<template>
    <v-panel header="Fixed Asset">
        <div class="row">
            <div class="col-md-2 col-md-offset-10">
                <button class="btn btn-info btn-block" @click="create">
                    <i class="fa fa-plus"></i> Add Fixed Assets
                </button>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-12">
                <v-live-view :grid="gridView" @action="doAction"></v-live-view>
            </div>
        </div>

    </v-panel>
</template>

<script>
    import {mapGetters} from "vuex";
    import FixedAssetRegisterDialog from "./FixedAssetRegisterDialog.vue";
    import FixedAssetFrame from "./FixedAssetFrame.vue";
    import {EventBus} from "../../eventbus";

    export default {
        data() {
            return {
                gridView: {
                    columns: [
                        {name: 'full_purchase_date', column: 'Purchase Date', filter: true, class: 'text-center', style: 'width:10%'},
                        {name: 'full_fixed_asset_type', column: 'Asset Type', filter: true, filterBind: 'fixed_asset_type', class:'text-center',style:'width:10%'},
                        {name: 'description', column: 'Description', filter: true},
                        {name: 'full_property', column: 'Property', filter: true},
                        {name: 'cost', column: 'Cost', filter: true, dtype: 'currency', class: 'text-right'},
                        {name: 'tag_code', column: 'Tag No', filter: true},
                        {name: '$action', column: ' ', static: true, class: 'text-center', style: "width:5%"}
                    ],
                    actions: [
                        {key: 'edit', name: 'Edit'}
                    ],
                    source: {
                        url: '/api/fixed-asset'
                    }
                }
            }
        },
        methods: {
            create() {
                this.$store.commit('fixedAsset/createNew');
            },
            doAction(a, item, index) {
                if(a.key === 'edit') {
                    this.$store.dispatch('fixedAsset/redirectToUpdate',{id: item.id});
                }
            },
            refresh() {
                EventBus.$on('fixedAsset.frame.close', () => {
                    this.$store.dispatch('fixedAsset/redirect')
                })
            }
        }
    };
</script>
