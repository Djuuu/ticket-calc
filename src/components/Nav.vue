<template>

    <nav class="text-center font-semibold text-2xl p-6">
        <router-link to="/">Calc</router-link>
        |
        <router-link to="/settings">Settings</router-link>
        |
        <router-link to="/about">About</router-link>
    </nav>

</template>

<style>

    .router-link-exact-active {
        @apply text-primary;
    }

</style>
