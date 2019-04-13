<template>
    <div class="f-row py-2 mb-2 border shadow rounded">

        <span class="col-start f-row">
            <span class="flex-grow"> {{ ticketQuantity.ticket.name }} </span>
            <span class="mx-3">         @                             </span>
            <span class="flex-grow"> {{ ticketQuantity.ticket.value | fixed2 }}</span>
        </span>

        <div class="inline-block text-center" style="width: 8rem;">
            <button class="btn-square btn-primary align-middle text-xl"
                    :disabled="buttonsDisabled"
                    @click="ticketQuantity.sub()">
                -
            </button>
            <span class="input-value inline-block align-middle w-12"
                  :class="{'font-semibold': ticketQuantity.quantity}">
                {{ ticketQuantity.quantity }}
            </span>
            <button class="btn-square btn-primary align-middle text-xl"
                    :disabled="buttonsDisabled"
                    @click="ticketQuantity.add()">
                +
            </button>
        </div>

    </div>
</template>

<script>
    import TicketQuantity from "@/models/ticket-quantity";

    export default {
        name:  'TicketQuantityRow',
        props: {
            buttonsDisabled: {
                type: Boolean,
                default: true,
            },
            ticketQuantity: {
                type: TicketQuantity,
                required: true,
            }
        }
    }
</script>

<style>
</style>
