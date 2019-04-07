<template>

    <div class="container f-col p-3">

        <div class="flex my-3">
            <label class="col-start">Target</label>
            <div class="col-end">
                <input type="number" min="0" step="0.01" v-model.number="target" @change="targetChanged()"/>
            </div>
        </div>

        <div class="flex">
            <div class="col-start-full">
                <template v-if="solutions && mode === 'auto'">
                    <button class="solution-btn solution-btn-exact"
                            v-for="(solution, index) in solutions['exact'].solutions" :key="'exact-' + index"
                            @click="setSolution(solution)">
                        ==
                    </button>
                    <button class="solution-btn solution-btn-over"
                            v-for="(solution, index) in solutions['over'].solutions" :key="'over-' + index"
                            @click="setSolution(solution)">
                        &gt; {{ solutions['over'].diff | fixed2 }}
                    </button>
                    <button class="solution-btn solution-btn-under"
                            v-for="(solution, index) in solutions['under'].solutions" :key="'under-' + index"
                            @click="setSolution(solution)">
                        &lt;
                        {{ solutions['under'].diff | fixed2 }}
                    </button>
                </template>
            </div>
            <span class="col-end">
                <button class="btn btn-primary" type="button" v-if="mode === 'manual'" @click="mode = 'auto'">Auto</button>
                <button class="btn btn-primary" type="button" v-if="mode === 'auto'" @click="mode = 'manual'">Manual</button>
            </span>
        </div>

        <hr>

        <div class="f-col">
            <div class="f-row my-2" v-for="(ticketQuantity, index) in ticketQuantities" :key="index">
                <span class="col-start f-row">
                    <span class="flex-grow"> {{ ticketQuantity.ticket.name }} </span>
                    <span class="mx-3">         @                             </span>
                    <span class="flex-grow"> {{ ticketQuantity.ticket.value | fixed2 }}</span>
                </span>
                <div class="col-end">
                    <button class="btn-square btn-primary align-middle text-xl" :disabled="mode === 'auto'" @click="ticketQuantity.sub()">
                        -
                    </button>
                    <span class="input-value inline-block align-middle mx-2 w-12">
                        {{ ticketQuantity.quantity }}
                    </span>
                    <button class="btn-square btn-primary align-middle text-xl" :disabled="mode === 'auto'" @click="ticketQuantity.add()">
                        +
                    </button>
                </div>
            </div>
        </div>

        <hr>

        <div class="f-col">
            <div class="f-row my-2">
                <span class="col-start">Ticket total</span>
                <div class="col-end-value">
                    <span class="input-value result-value">{{ ticketTotal | fixed2 }}</span>
                </div>
            </div>
            <div class="f-row my-2">
                <span class="col-start">
                    {{ remainingLabel }}
                </span>
                <div class="col-end-value">
                    <span class="input-value result-value" :class="remainingClass">{{ balance | abs | fixed2 }}</span>
                </div>
            </div>
        </div>

        <div class="flex justify-end my-8">
            <div class="col-end">
                <button class="btn btn-primary mr-2" type="button" @click="reset()">Clear</button>
            </div>
        </div>
    </div>

</template>

<script>

    import {map, round, sumBy, cloneDeep} from 'lodash';
    import {mapGetters}        from 'vuex'

    import TicketQuantity from '@/models/ticket-quantity';
    import Calculator     from "@/services/calculator";

    export default {
        name:  'Calc',
        props: {
            msg: String
        },
        data() {
            return {
                target:           null,
                mode:             'auto',
                ticketQuantities: [],
                solutions:        null,
            };
        },
        created() {
            this.ticketQuantities = map(this.tickets, t => new TicketQuantity(t));
        },
        computed: {
            ...mapGetters([
                'tickets'
            ]),
            hasRemaining()    { return this.balance >= 0; },
            hasExtra()        { return this.balance < 0; },
            thePriceIsRight() { return this.balance === 0; },
            remainingLabel() {
                return this.hasRemaining ? 'Remaining' : 'Extra';
            },
            remainingClass() {
                if (this.thePriceIsRight) {
                    return 'the-price-is-right';
                }
                return this.hasRemaining ? 'has-remaining' : 'has-extra';
            },
            ticketTotal() {
                return round(
                    sumBy(this.ticketQuantities, tq => tq.total()),
                    2
                );
            },
            balance() {
                return round(this.target - this.ticketTotal, 2)
            }
        },
        methods: {
            targetChanged() {
                this.solutions = new Calculator(this.tickets)
                    .optimizeCalc(this.target);
            },
            setSolution(solution) {
                this.ticketQuantities = cloneDeep(solution.ticketQuantities);
            },
            reset() {
                this.target = null;
                this.ticketQuantities.forEach(tq => tq.quantity = 0);
                this.mode = 'auto';
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

    .solution-btn {
        @apply py-1 px-3 rounded-full text-white font-bold;
        margin: .125rem;
    }
    .solution-btn.solution-btn-exact { @apply bg-equalBg; }
    .solution-btn.solution-btn-over  { @apply bg-positiveBg; }
    .solution-btn.solution-btn-under { @apply bg-negativeBg; }

    .result-value {
        @apply bg-gray-300 py-1 px-3 rounded-lg;
    }
    .has-remaining      { @apply text-positive; }
    .has-extra          { @apply text-negative; }
    .the-price-is-right { @apply text-equal; }

</style>
