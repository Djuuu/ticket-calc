<template>
    <div id="app" class="text-secondary text-xl">
        <app-nav></app-nav>
        <router-view/>
    </div>
</template>

<script>
    import AppNav from '@/components/Nav';

    export default {
        components: {
            'app-nav': AppNav
        }
    }
</script>

<style>
</style>
