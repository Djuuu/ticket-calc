
import {join, map, round, sumBy} from 'lodash'

export default class TicketSelection {

    ticketQuantities = [];

    /**
     * @param {TicketQuantity[]} ticketQuantities
     */
    constructor(ticketQuantities = []) {
        this.ticketQuantities = ticketQuantities;
    }

    /**
     * @returns {number}
     */
    total() {

        const ticketQuantityTotalSum = sumBy(
            this.ticketQuantities,
                ticketQuantity => ticketQuantity.total()
        );

        return round(ticketQuantityTotalSum, 2);
    }

    /**
     * @returns {string}
     */
    toString() {
        return join(
            map(
                this.ticketQuantities,
                    ticketQuantity => {
                        return '(' + ticketQuantity.toString() + ')';
                    }),
            ' '
        ) + ' = ' + this.total();
    }
}
