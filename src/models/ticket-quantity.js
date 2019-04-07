
import {round} from 'lodash'

export default class TicketQuantity {

    ticket;
    quantity = 0;

    /**
     * @param {Ticket} ticket
     * @param {number} quantity
     */
    constructor(ticket, quantity = 0) {
        this.ticket = ticket;
        this.quantity = quantity;
    }

    /**
     *
     */
    add() {
        this.quantity++;
    }

    /**
     *
     */
    sub() {
        if (this.quantity > 0) {
            this.quantity--;
        }
    }

    /**
     * @returns {number}
     */
    total() {
        return round(this.quantity * this.ticket.value, 2);
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.quantity + ' ' + this.ticket.toString();
    }
}
