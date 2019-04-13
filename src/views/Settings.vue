<template>
    <div class="p-3">

        <h2 class="text-2xl font-semibold">
            Tickets
        </h2>

        <div class="f-col my-3">
            <ticket-row v-for="(ticket, index) in tickets" :key="index"
                        :ticket="ticket" :index="index" />
        </div>

        <h2 class="mt-4 text-xl font-semibold">
            Add a ticket
        </h2>

        <ticket-form />

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    import TicketForm from "@/components/TicketForm";
    import TicketRow  from "@/components/TicketRow";

    export default {
        name:  'Settings',
        components: {
            TicketForm,
            TicketRow,
        },
        computed: {
            ...mapGetters([
                'tickets'
            ]),
        }
    }
</script>

<style>
</style>
