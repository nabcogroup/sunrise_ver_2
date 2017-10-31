<template>
    <div class="row">
        <div class="col-md-12">
            <v-panel header="Fixed Asset Register">
                
                <div class="pull-right">
                    <a href="#" @click.prevent="enableEditing" v-if="lockEdited"><i class="fa fa-pencil"></i> Edit</a>
                </div>
                
                <v-tab-group v-model="fixedAssetTab" v-if="showTab">
                    <v-tab tab-id="summary">Summary</v-tab>
                    <v-tab tab-id="depreciation">Depreciation Value</v-tab>
                </v-tab-group>

                <div class="tab-content" style="margin-top:15px; ">
                    <div class="col-md-8">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label for="purchase_date" class="col-md-2 text-right">Purchase Date:</label>
                                <div class="col-md-4">
                                    <dt-picker
                                            :value="data.purchase_date"
                                            :disabled="lockEdited"
                                            @pick="data.purchase_date =$event"></dt-picker>
                                    <error-span v-model="errorValidations" name="purchase_date"></error-span>
                                </div>
                                <label for="property" class="col-md-2 text-right">Property</label>
                                <div class="col-md-4">
                                    <v-combo-box 
                                                v-model="data.property"
                                                :options="lookups.villa_location"
                                                :includeDefault="true"
                                                :disabled="lockEdited"
                                                dvalue="code" dtext="name">
                                    </v-combo-box>
                                    <error-span v-model="errorValidations" name="property"></error-span>
                                </div>
                            </div>
                            <v-input-wrapper 
                                label="Description:" 
                                label-class="col-md-2 text-right"
                                control-class="col-md-10">
                                <textarea class="form-control" v-model="data.description" :disabled="lockEdited"></textarea>
                                <error-span v-model="errorValidations" name="description"></error-span>
                            </v-input-wrapper>
                            <div class="form-group">
                                <label for="fixed_asset_type" class="col-md-2 control-label">Asset Type:</label>
                                <div class="col-md-4">
                                    <v-combo-box 
                                        v-model="data.fixed_asset_type" 
                                        :options="lookups.fixed_asset_type"
                                        :includeDefault="true"
                                        :disabled="lockEdited"
                                        dvalue="code"
                                        dtext="name"></v-combo-box>
                                    <error-span v-model="errorValidations" name="fixed_asset_type"></error-span>
                                </div>
                                <label for="cost" class="col-md-2">Serial No:</label>
                                <div class="col-md-4">
                                    <input class="form-control" type="text" v-model="data.serial_no" :disabled="lockEdited">
                                    <error-span v-model="errorValidations" name="serial_no"></error-span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="cost" class="col-md-2 control-label">Purchase Cost:</label>
                                <div class="col-md-4">
                                    <input class="form-control" type="number" v-model="data.cost" :disabled="lockEdited">
                                    <error-span v-model="errorValidations" name="cost"></error-span>
                                </div>
                                <label for="cost" class="col-md-2">Depreciation Year:</label>
                                <div class="col-md-4">
                                    <input class="form-control" type="number" v-model="data.year_span" :disabled="lockEdited">
                                    <error-span v-model="errorValidations" name="year_span"></error-span>
                                </div>
                            </div>
                            <v-input-wrapper label="Salvage Value:" 
                                    label-class="col-md-2 text-right"
                                    control-class="col-md-4">
                                <input class="form-control" v-model="data.salvage_value" :disabled="lockEdited">
                                <error-span v-model="errorValidations" name="salvage_value"></error-span>
                            </v-input-wrapper>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn-info btn-block" @click="save" v-if="!lockEdited">Save</button>
                        <hr/>
                        <div class="x-panel" v-if="showSummary">
                            <div class="panel-header row">
                                <div class="col-md-12">
                                    <a href="#" class="pull-right" style="padding: 10px "><i class="fa fa-refresh fa-2x"></i></a>
                                </div>
                            </div>
                            <div class="panel-body">
                                <strong class="text-danger">Depreciation/Year</strong>
                                <h3>{{data.depreciation_amount | toCurrencyFormat}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </v-panel>
        </div>
    </div>
</template>

<script>
    import {ErrorValidations} from "../../helpers/helpers";
    import {mapGetters, mapState} from "vuex";

    export default {
        props: ["id"],
        mounted() {
            if (this.id) {
                this.$store.dispatch("fixedAsset/edit", {id: this.id});
                this.enableReading();
            }
            else {
                this.$store.dispatch("fixedAsset/create");
            }
        },
        data() {
            return {
                fixedAssetTab: "summary",
                showTab: false,
                showSummary: false,
                lockEdited: false
            };
        },
        computed: {
            ...mapGetters("fixedAsset", {
                lookups: "lookups",
                errorValidations: "errorValidations"
            }),
            ...mapState("fixedAsset", {
                data: state => state.data
            })
        },
        methods: {
            save() {
                this.$store.dispatch("fixedAsset/save", () => {
                   this.$store.redirectToList();
                });
            },
            enableReading() {
                this.showTab = true;
                this.showSummary = true;
                this.lockEdited = true;
            },
            enableEditing() {
                this.showTab = false;
                this.showSummary = false;
                this.lockEdited = false;
            }
            
        }
    };
</script>
