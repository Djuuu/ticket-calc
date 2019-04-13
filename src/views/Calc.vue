<template>
    <div class="p-3">

        <section class="f-row items-center justify-between">
            <label for="target" class="inline-block">
                Target
            </label>
            <input type="number" id="target" min="0" max="1000" step="0.01" maxlength="3" autofocus
                   style="width: 6rem;"
                   v-model.number.lazy="target" @change="targetChanged($event)"/>
            <div class="inline-block text-center" style="width: 120px;">
                <auto-toggle-button class="my-1" v-model="auto"></auto-toggle-button>
                <button type="button" class="btn btn-primary clear-btn my-1"
                        @click="reset()"
                        :disabled="this.target === null && this.ticketTotal === 0">
                    Clear
                </button>
            </div>
        </section>

        <section class="solution-buttons-container pb-1">
            <solution-buttons v-if="solutions && auto"
                              :solutions="solutions"
                              @select="selectSolution"/>
        </section>

        <section class="f-col">
            <div class="w-full text-center my-3" v-if="ticketQuantities.length === 0">
                <router-link to="/settings" class="btn btn-primary-reverse border-2 border-primary">
                    + Add tickets
                </router-link>
            </div>
            <ticket-quantity-row v-for="(ticketQuantity, index) in ticketQuantities" :key="index"
                                 :ticket-quantity="ticketQuantity"
                                 :buttons-disabled="calcButtonsDisabled" />
        </section>

        <section class="f-col">
            <div class="f-row mt-2">
                <span class="col-start">Ticket total</span>
                <div class="col-end-value">
                    <span class="input-value result-value"
                          :class="{'the-price-is-right': ticketTotal && this.thePriceIsRight}">
                        {{ ticketTotal | fixed2 }}
                    </span>
                </div>
            </div>
            <div class="f-row mt-2" v-if="target && balance">
                <span class="col-start">
                    {{ balanceLabel }}
                </span>
                <div class="col-end-value">
                    <span class="input-value result-value font-semibold" :class="{
                        'the-price-is-right': this.thePriceIsRight,
                        'has-remaining':      this.hasRemaining,
                        'has-extra':          this.hasExtra,
                    }">
                        {{ balance | abs | fixed2 }}
                    </span>
                </div>
            </div>
        </section>

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
                target:           32,
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

    section {
        @apply py-2 border-b-2;
    }
    section:last-child {
        @apply border-b-0;
    }
    .col-start {
        @apply flex-grow pl-2;
    }
    .col-end-value {
        @apply text-right pr-6;
    }

    hr {
        width: 104%;
        margin-left: -2%;
    }

    .clear-btn {
        width: 115px;
    }
    .solution-buttons-container {
        min-height: 3.4rem;
    }

    .result-value {
        @apply inline-block bg-gray-300 py-1 px-3 rounded-lg align-bottom leading-tight;
        min-width: 4.5rem;
    }
    .has-remaining      { @apply text-positive; }
    .has-extra          { @apply text-negative; }
    .the-price-is-right { @apply text-equal font-semibold; }

</style>
