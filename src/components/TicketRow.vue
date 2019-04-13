<template>
    <div class="f-row p-3 mb-2 border shadow rounded">

        <span class="w-1/2">{{ ticket.name }}</span>
        <span class="mx-2"> @ </span>
        <span class="flex-grow">{{ ticket.value | fixed2 }}</span>

        <button class="btn-round btn-primary" @click="dropTicketFromStore(index)" title="Delete"> x </button>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    import Ticket from "@/models/ticket";

    export default {
        name: 'TicketRow',
        props: {
            index: {
                type: Number,
                required: true,
            },
            ticket: {
                type: Ticket,
                required: true,
            }
        },
        methods: {
            ...mapActions([
                'dropTicket',
            ]),
            dropTicketFromStore(index) {
                this.dropTicket(index);
            }
        }
    }
</script>

<style>
</style>
