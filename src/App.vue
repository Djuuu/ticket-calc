<template>

    <div id="app" class="min-h-screen f-col text-secondary text-xl">

        <h1 class="text-center font-semibold py-2 bg-gray-200">

            Ticket-Calc

            <router-link to="/about" class="text-xs inline-block absolute top-0 right-0 mt-3 mr-4">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                     class="fa-info-circle fa-w-16 fa-2x w-5 h-5">
                    <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" class=""></path>
                </svg>
            </router-link>
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
        max-height: calc(100vh - 7.5rem);
    }
</style>
