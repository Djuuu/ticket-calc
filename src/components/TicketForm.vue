<template>
    <form class="f-row flex-wrap my-3 p-1 border shadow-md rounded" @submit.prevent="addTicketToStore">

        <div class="w-1/2 px-1">
            <label class="block text-s tracking-wide mb-1"
                   for="ticket-name">
                Name
            </label>
            <input class="block w-full border rounded" ref="ticket-name-input"
                   id="ticket-name" type="text" placeholder="Name"
                   v-model.trim="ticket.name">
        </div>
        <div class="w-1/2 px-1">
            <label class="block text-s tracking-wide mb-1"
                   for="ticket-value">
                Value
            </label>
            <input class="block w-full border rounded" ref="ticket-value-input"
                   id="ticket-value" type="number" min="0" step="0.01" placeholder="Value"
                   v-model.number="ticket.value">
        </div>

        <div class="w-full text-center my-3">
            <button class="btn btn-primary-reverse border-2 border-primary" type="submit" title="Add ticket"
                    :disabled="!ticket.value">
                + Add ticket
            </button>
        </div>

    </form>
</template>

<script>
    import {clone}      from 'lodash';
    import {mapActions} from 'vuex'

    import Ticket from "@/models/ticket";

    export default {
        name: 'TicketForm',
        data() {
            return {
                ticket: new Ticket('', null)
            };
        },
        methods: {
            ...mapActions([
                'addTicket',
            ]),
            addTicketToStore() {
                this.addTicket(clone(this.ticket));
                this.resetNewTicket();

                // Force blur to hide keyboard
                this.$refs['ticket-name-input'].blur();
                this.$refs['ticket-value-input'].blur();
            },
            resetNewTicket() {
                this.ticket.name = '';
                this.ticket.value = null;
            },
        }
    }
</script>

<style>
</style>
