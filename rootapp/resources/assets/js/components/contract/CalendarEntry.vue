<<template>
    <div class="row">
        <div class="col-md-8">
            <div class="x-panel">
                <div class="panel-body">
                    <calendar :events="events" :editable="true" @onEventClicked="onEventClicked"></calendar>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="x-panel">
                    <div class="panel-body">
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Tenant:</strong><span class="col-md-8 x-desc">{{event.tenant_name}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Villa No</strong><span class="col-md-8 x-desc">{{event.villa_no}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Contract No</strong><span class="col-md-8 x-desc">{{event.contract_no}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Start</strong><span class="col-md-8 x-desc">{{event.period.start | toDateFormat}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">End</strong><span class="col-md-8 x-desc">{{event.period.end | toDateFormat}}</span>
                        </p>
                    </div>
                    <div class="panel-footer">
                        <button class="btn btn-info btn-block" v-if="event.canRenew" @click="onRenewClicked(event.id)">Renew</button>
                    </div>
            </div>
        </div>
        <modal dialog-title="Contract Renewal" modal-id="renewal" :unfold="isOpenModal" @dismiss="onDismiss">
            <renewal :view-model="viewModel"></renewal>
        </modal>
    </div>
</template>

<script>
    import Calendar from "../Calendar.vue";
    import Modal from "../Modal.vue";

    import Renewal from "./Renewal.vue";
    import {ContractRenewModel} from "./ContractListModel";
    
    export default {
        name: "CalendarEntry",
        components: {
            "calendar": Calendar,
            "renewal": Renewal,
            "modal": Modal
        },
        data() {
            return {
                viewModel: new ContractRenewModel(),
                isOpenModal: false,
                events: {
                    url: "/api/contract/calendar"
                },
                event: {
                    period: {}
                }
            }
        },
        methods: {
            onEventClicked(event) {
                this.event = event;
            },
            onRenewClicked(id) {
                this.viewModel.create(id,() => {
                    this.isOpenModal = true;
                })
            },
            onDismiss(result) {
                if(result) {
                    this.viewModel.save((id) => {
                        this.isOpenModal = true;
                        this.viewModel.redirectToBill(id);
                    });
                }
                else {
                    this.isOpenModal = false;
                }
                
            }
        }
    }
</script>