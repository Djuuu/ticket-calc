<template>
    <div class="f-row flex-wrap justify-around" style="min-height: 2.5rem;">

        <button class="solution-btn solution-btn-exact tracking-tighter"
                title="Use solution"
                v-for="(solution, index) in solutions['exact'].solutions" :key="'exact-' + index"
                @click="$emit('select', solution)">
            ===
        </button>

        <button class="solution-btn solution-btn-over tracking-tight"
                title="Use solution"
                v-for="(solution, index) in solutions['over'].solutions" :key="'over-' + index"
                @click="$emit('select', solution)">
            &gt; {{ solutions['over'].diff | fixed2 }}
        </button>

        <button class="solution-btn solution-btn-under tracking-tight"
                title="Use solution"
                v-for="(solution, index) in solutions['under'].solutions" :key="'under-' + index"
                @click="$emit('select', solution)">
            &lt; {{ solutions['under'].diff | fixed2 }}
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
        @apply py-1 px-3 mb-1 text-lg rounded-full text-white font-bold;
    }
    .solution-btn:focus {
        @apply outline-none;
    }
    .solution-btn.solution-btn-exact { @apply bg-equalBg; }
    .solution-btn.solution-btn-over  { @apply bg-positiveBg; }
    .solution-btn.solution-btn-under { @apply bg-negativeBg; }
</style>
