<template>
    <div class="f-row px-3 pb-3 mt-3 border-b last-child:border-b-0">

        <span class="w-1/2">{{ ticket.name }}</span>
        <span class="mx-2"> @ </span>
        <span class="flex-grow">{{ ticket.value | fixed2 }}</span>

        <button class="btn-round btn-primary" @click="dropTicketFromStore(index)"> x </button>

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
