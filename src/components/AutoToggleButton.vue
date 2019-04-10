<template>

    <toggle-button :value="value" @input="$emit('input', $event)" :sync="true"
                   :labels="{checked: 'AUTO', unchecked: 'MANUAL'}"
                   :width="115" :height="30" :margin="3"
                   :css-colors="true"/>

</template>

<script>
    export default {
        name: 'AutoToggleButton',
        props: {
            value: {type: Boolean, default: false},
        }
    }
</script>

<style>

    .vue-js-switch         .v-switch-core  { @apply bg-grayBlue; }
    .vue-js-switch.toggled .v-switch-core  { @apply bg-primary; }
    .vue-js-switch .v-switch-label         { @apply text-base; }
    .vue-js-switch .v-switch-label.v-left  { @apply ml-5; }
    .vue-js-switch .v-switch-label.v-right { @apply mr-1; }

</style>
