import TicketQuantity  from "@/models/ticket-quantity";
import TicketSelection from "@/models/ticket-selection";

import {clone, concat, drop, head, round} from 'lodash';

export default class Calculator {

    tickets = [];

    /**
     * @param {Ticket[]} tickets
     */
    constructor(tickets) {
        this.tickets = tickets;
    }

    /**
     * @returns {{
     *     under: {diff: number|null, solutions: Array}
     *     over:  {diff: number|null, solutions: Array},
     *     exact: {diff: number,      solutions: Array},
     * }}
     */
    static getEmptySolutionsArray() {
        return {
            under: {diff: null, solutions: []},
            over:  {diff: null, solutions: []},
            exact: {diff: 0,    solutions: []},
        };
    }

    /**
     * @param {number} target
     * @returns {{
     *     under: {diff: number|null, solutions: Array},
     *     over:  {diff: number|null, solutions: Array},
     *     exact: {diff: number,      solutions: Array}
     * }}
     */
    optimizeCalc(target) {

        if (target <= 0) {
            return Calculator.getEmptySolutionsArray();
        }

        return this.optimize(
            this.calc(target),
            target
        );
    }

    /**
     * Computes all available solutions
     *
     * @param {number} target
     * @returns {TicketSelection[]}
     */
    calc(target) {
        return this.calcTicketGroupSolutions(this.tickets, target);
    }

    /**
     * Computes all available solutions
     *
     * @param {Ticket[]} ticketGroup
     * @param {number} target
     * @returns {TicketSelection[]}
     */
    calcTicketGroupSolutions(ticketGroup, target) {

        let firstTicketSolutions = Calculator.calcTicketSolutions(head(ticketGroup), target);

        if (ticketGroup.length === 1) {
            return firstTicketSolutions.map(ticketQuantity => new TicketSelection([ticketQuantity]))
        }

        let assembledSolutions = [];

        firstTicketSolutions.forEach(firstTicketQuantity => {

            let remainingTarget = round(target - firstTicketQuantity.total(), 2);

            let remainingTicketSolutions = this.calcTicketGroupSolutions(drop(ticketGroup), remainingTarget);

            remainingTicketSolutions.forEach(remainingTicketSelection => {

                assembledSolutions.push(
                    new TicketSelection(
                        concat([firstTicketQuantity], remainingTicketSelection.ticketQuantities)
                    )
                );
            });
        });

        return assembledSolutions;
    }

    /**
     * @param {Ticket} ticket
     * @param {number} target
     * @returns {TicketQuantity[]}
     */
    static calcTicketSolutions(ticket, target) {

        let ticketQuantity = new TicketQuantity(ticket);

        const upperTarget = target + ticket.value;

        let solutions = [];

        while (ticketQuantity.total() < upperTarget) {

            solutions.push(clone(ticketQuantity));

            ticketQuantity.add();
        }

        return solutions;
    }

    /**
     * @param {TicketSelection[]} solutions
     * @param {number}            target
     */
    optimize(solutions, target) {

        let optimized = Calculator.getEmptySolutionsArray();

        solutions.forEach(solution => {

            let key;
            if (solution.total() > target) {
                key = 'over';
            } else if (solution.total() < target) {
                key = 'under';
            } else {
                key = 'exact';
            }

            if (key === 'exact') {
                optimized.exact.solutions.push(solution);
            } else if (optimized.exact.solutions.length === 0) {

                let diff = round(Math.abs(target - solution.total()), 2);

                if (optimized[key].diff === null || (diff < optimized[key].diff)) {
                    optimized[key].solutions = [solution];
                    optimized[key].diff = diff;
                } else if (diff === optimized[key].diff) {
                    optimized[key].solutions.push(solution);
                }
            }
        });

        if (optimized.exact.solutions.length > 0) {
            // reset approximate solutions since we have exact ones
            optimized.under = {diff: null, solutions: []};
            optimized.over  = {diff: null, solutions: []};
        }

        return optimized;
    }
}
