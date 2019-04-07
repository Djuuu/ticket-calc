<template>

    <div class="container f-col p-3">

        <h1 class="text-3xl font-semibold">
            Tickets
        </h1>

        <div class="f-col my-3">
            <div class="f-row px-3 my-2" v-for="ticket in tickets">

                <span class="w-1/2">{{ ticket.name }}</span>
                <span class="mx-2"> @ </span>
                <span class="flex-grow">{{ ticket.value | fixed2 }}</span>

                <button class="btn-round btn-primary"> x </button>
            </div>
        </div>

        <h2 class="mt-8 text-2xl font-semibold">
            Add a ticket
        </h2>

        <div class="f-row flex-wrap my-3">

            <div class="w-1/2 px-3">
                <label class="block text-s tracking-wide font-semibold mb-2"
                       for="ticket-name">
                    Name
                </label>
                <input class="block w-full border rounded "
                       id="ticket-name" type="text" placeholder="Name"
                       v-model="newTicket.name">
            </div>
            <div class="w-1/2 px-3">
                <label class="block text-s tracking-wide font-semibold mb-2"
                       for="ticket-value">
                    Value
                </label>
                <input class="block w-full border rounded "
                       id="ticket-value" type="number" min="0" step="0.01" placeholder="Value"
                       v-model="newTicket.value">
            </div>

            <div class="w-full text-center my-3">
                <button class="btn btn-primary-reverse border-2 border-primary" type="submit" @click="addTicket">
                    + Add ticket
                </button>
            </div>
        </div>
    </div>

</template>

<script>

    import {clone} from 'lodash';

    import Ticket from '@/models/ticket';

    export default {
        name:  'Settings',
        props: {
        },
        data() {
            return {

                tickets: [
                    new Ticket('Lorem', 12),
                    new Ticket('Ipsum', 7.5),
                ],
                newTicket: {
                    name: '',
                    value: null,
                },
            };
        },
        methods: {
            addTicket() {
                this.tickets.push(clone(this.newTicket));
                this.resetNewTicket();
            },
            resetNewTicket() {
                this.newTicket.name = '';
                this.newTicket.value = null;
            }
        }
    }
</script>

<style>

</style>
