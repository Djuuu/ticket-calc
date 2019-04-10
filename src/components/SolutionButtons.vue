<template>
    <div>

        <button class="solution-btn solution-btn-exact"
                v-for="(solution, index) in solutions['exact'].solutions" :key="'exact-' + index"
                @click="$emit('select', solution)">
            ==
        </button>

        <button class="solution-btn solution-btn-over"
                v-for="(solution, index) in solutions['over'].solutions" :key="'over-' + index"
                @click="$emit('select', solution)">
            &gt; {{ solutions['over'].diff | fixed2 }}
        </button>

        <button class="solution-btn solution-btn-under"
                v-for="(solution, index) in solutions['under'].solutions" :key="'under-' + index"
                @click="$emit('select', solution)">
            &lt;
            {{ solutions['under'].diff | fixed2 }}
        </button>

    </div>
</template>

<script>
    export default {
        name: 'SolutionButtons',
        props: {
            solutions: {
                type: Object,
                required: true,
            }
        }
    }
</script>

<style>
    .solution-btn {
        @apply py-1 px-3 rounded-full text-white font-bold;
        margin: .125rem;
        margin-top: 0;
    }
    .solution-btn:focus {
        @apply outline-none;
    }

    .solution-btn.solution-btn-exact { @apply bg-equalBg; }
    .solution-btn.solution-btn-over  { @apply bg-positiveBg; }
    .solution-btn.solution-btn-under { @apply bg-negativeBg; }
</style>
