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
                            <strong class="col-md-4 x-label">Tenant:</strong><span class="col-md-8 x-desc">{{event.contract.tenant.full_name}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Villa No:</strong><span class="col-md-8 x-desc">{{event.contract.villa.villa_no}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Contract No:</strong><span class="col-md-8 x-desc">{{event.contract.contract_no}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Start:</strong><span class="col-md-8 x-desc">{{event.contract.period_start | toDateFormat}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">End:</strong><span class="col-md-8 x-desc">{{event.contract.period_end | toDateFormat}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Extra:</strong><span class="col-md-8 x-desc">{{event.contract.extra_days}}</span>
                        </p>
                        <p class="x-read-group">
                            <strong class="col-md-4 x-label">Final End:</strong><span class="col-md-8 x-desc">{{event.contract.period_end_extended | toDateFormat}}</span>
                        </p>
                    </div>
                    <div class="panel-footer">
                        <button class="btn btn-info btn-block" v-if="event.canRenew" @click="onRenewClicked(event.id)">Renew</button>
                        <button class="btn btn-danger btn-block" v-if="event.canRenew" @click="onTerminateClicked(event)">Terminate</button>
                    </div>
            </div>
        </div>
        <!-- renewal -->
        <renewal></renewal>
        <terminate-dialog></terminate-dialog>
        <!-- -->
    </div>
</template>

<script>
import Calendar from "../Calendar.vue";
import Renewal from "./Renewal.vue";

import { ContractRenewModel } from "./ContractListModel";
import ContractTerminate from './ContractTerminate.vue';

import { EventBus } from "../../eventbus";

const confirmation = {
    renew: (cb) => {
        bbox.confirm({
            title: "Contract renewal confirmation",
            message: "Do you want to renew the contract?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: (result) => {
                cb(result);
            }
        });
    },
    terminated: (value, cb) => {
        bbox.confirm({
            message: 'Do you want to terminate the contract no ' + value,
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: (result) => {
                cb(result);
            }
        });
    }
}



export default {
    name: "CalendarEntry",
    components: {
        "calendar": Calendar,
        "renewal": Renewal,
        "terminateDialog": ContractTerminate
    },
    data() {
        return {
            viewModel: new ContractRenewModel(),
            isOpenModal: false,
            events: {
                url: "/api/contract/calendar"
            },
            event: {
                contract: {
                    tenant: {},
                    villa: {}
                },
                period: {}
            }
        }
    },
    methods: {
        onEventClicked(event) {
            this.event = event;
        },
        onRenewClicked(id) {
            confirmation.renew((result) => {
                if (result) {
                    setTimeout(function() {
                        EventBus.$emit("contracts.renewal.open", id);
                    }, 500)
                }
            });
        },
        onTerminateClicked(value) {
            confirmation.terminated(value.contract_no, (isOpenDialog) => {
                if (isOpenDialog) {
                    setTimeout(function() {
                        EventBus.$emit("contracts.terminate.open", value);

                        EventBus.$on("contracts.terminate.close", (isClose) => {
                            if (isClose)
                                axiosRequest.redirect('contract', 'calendar')
                        });
                    }, 500)

                }
            });

        },
        onDismiss(result) {
            if (result) {
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