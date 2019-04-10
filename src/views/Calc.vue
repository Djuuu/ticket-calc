<template>
    <div class="container f-col p-3">

        <div class="flex my-3">
            <label class="col-start">Target</label>
            <div class="col-end">
                <input type="number" min="0" step="0.01" autofocus
                       v-model.number.lazy="target" @change="targetChanged($event)"/>
            </div>
        </div>

        <div class="flex">
            <div class="col-start-full">
                <solution-buttons v-if="solutions && auto"
                                  :solutions="solutions"
                                  @select="selectSolution"/>
            </div>
            <span class="col-end pb-1">
                <auto-toggle-button v-model="auto"></auto-toggle-button>
            </span>
        </div>

        <hr>

        <div class="f-col">

            <div class="w-full text-center my-3" v-if="ticketQuantities.length === 0">
                <router-link to="/settings" class="btn btn-primary-reverse border-2 border-primary">
                    + Add tickets
                </router-link>
            </div>

            <ticket-quantity-row v-for="(ticketQuantity, index) in ticketQuantities" :key="index"
                                 :ticket-quantity="ticketQuantity"
                                 :buttons-disabled="calcButtonsDisabled" />
        </div>

        <hr>

        <div class="f-col">
            <div class="f-row my-2">
                <span class="col-start">Ticket total</span>
                <div class="col-end-value">
                    <span class="input-value result-value">{{ ticketTotal | fixed2 }}</span>
                </div>
            </div>
            <div class="f-row my-2" :class="{'invisible': !target}">
                <span class="col-start">
                    {{ balanceLabel }}
                </span>
                <div class="col-end-value">
                    <span class="input-value result-value font-semibold" :class="balanceClass">
                        {{ balance | abs | fixed2 }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex justify-end mt-4">
            <div class="col-end">
                <button class="btn btn-primary" type="button"
                        @click="reset()"
                        :disabled="this.target === null && this.ticketTotal === 0">
                    Clear
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    import {cloneDeep, map, round, sumBy} from 'lodash';
    import {mapGetters}                   from 'vuex'

    import AutoToggleButton  from '@/components/AutoToggleButton';
    import SolutionButtons   from "@/components/SolutionButtons";
    import TicketQuantityRow from "@/components/TicketQuantityRow";
    import TicketQuantity    from '@/models/ticket-quantity';
    import Calculator        from "@/services/calculator";

    export default {
        name:  'Calc',
        components: {
            AutoToggleButton,
            SolutionButtons,
            TicketQuantityRow,
        },
        props: {
            msg: String
        },
        data() {
            return {
                target:           null,
                ticketQuantities: [],
                solutions:        null,
                auto:             true,
            };
        },
        created() {
            this.ticketQuantities = map(this.tickets, t => new TicketQuantity(t));
        },
        computed: {
            ...mapGetters([
                'tickets'
            ]),
            calcButtonsDisabled() {
                return this.auto;
            },
            ticketTotal() {
                return round(
                    sumBy(this.ticketQuantities, tq => tq.total()),
                    2
                );
            },
            balance() {
                return round(this.target - this.ticketTotal, 2)
            },
            hasRemaining()    { return this.balance > 0; },
            hasExtra()        { return this.balance < 0; },
            thePriceIsRight() { return this.balance === 0; },
            balanceLabel() {
                return (this.hasRemaining || this.thePriceIsRight)
                    ? 'Remaining'
                    : 'Extra';
            },
            balanceClass() {
                return {
                    'the-price-is-right': this.thePriceIsRight,
                    'has-remaining':      this.hasRemaining,
                    'has-extra':          this.hasExtra,
                };
            }
        },
        methods: {
            targetChanged(event) {

                if (this.tickets.length === 0) { return; }

                this.solutions = new Calculator(this.tickets)
                    .optimizeCalc(this.target);

                // Force blur to hide keyboard
                event.target.blur();
            },
            selectSolution(solution) {
                this.ticketQuantities = cloneDeep(solution.ticketQuantities);
            },
            reset() {
                this.target = null;
                this.ticketQuantities.forEach(tq => tq.quantity = 0);
                this.auto = true;
                this.solutions = null;
            }
        },
    }
</script>

<style>

    .col-start {
        @apply flex-grow pl-2;
    }
    .col-start-full {
        @apply flex-grow;
        max-width: calc(100% - 10rem);
    }
    .col-end {
        @apply inline-block text-center;
        width: 10rem;
    }
    .col-end-value {
        @apply text-right pr-8;
    }

    hr {
        width: 104%;
        margin-left: -2%;
    }

    .result-value {
        @apply bg-gray-300 py-1 px-3 rounded-lg;
    }
    .has-remaining      { @apply text-positive; }
    .has-extra          { @apply text-negative; }
    .the-price-is-right { @apply text-equal; }

    .vue-js-switch         .v-switch-core  { @apply bg-grayBlue; }
    .vue-js-switch.toggled .v-switch-core  { @apply bg-primary; }
    .vue-js-switch .v-switch-label         { @apply text-base; }
    .vue-js-switch .v-switch-label.v-left  { @apply ml-5; }
    .vue-js-switch .v-switch-label.v-right { @apply mr-1; }

</style>
