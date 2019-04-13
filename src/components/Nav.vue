<template>
    <nav class="text-center font-semibold text-2xl p-4">
        <router-link to="/" :exact="$route.name !== 'calc'">
            Calc
        </router-link>
        |
        <router-link to="/settings">
            Settings
        </router-link>
        |
        <router-link to="/about">
            About
        </router-link>
    </nav>
</template>

<style>
    .router-link-active {
        @apply text-primary;
    }
</style>
