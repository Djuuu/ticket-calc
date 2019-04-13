<template>

    <div id="app" class="min-h-screen f-col text-secondary text-xl">

        <h1 class="text-center font-semibold py-3 mb-2 bg-gray-200" v-if="$route.name !== 'about'">
            Ticket-Calc
        </h1>

        <router-view class="app-content container flex-grow overflow-auto overflow-x-hidden"/>

        <app-nav class="bg-gray-200 fixed w-full bottom-0"></app-nav>
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
    .app-content {
        max-height: calc(100vh - 8.2rem);
    }
</style>
