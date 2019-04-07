import Vue  from 'vue';
import Vuex from 'vuex';

import Ticket from "@/models/ticket";

Vue.use(Vuex);

export default new Vuex.Store({
    state:     {
        tickets: [
        ],
    },
    getters: {
        tickets: state => state.tickets,
    },
    mutations: {
        addTicket(state, ticket) {
            state.tickets.push(ticket);
        },
        dropTicket(state, index) {
            state.tickets.splice(index, 1);
        },
    },
    actions:   {
        addTicket({commit}, ticket) {
            commit('addTicket', ticket);
        },
        dropTicket({commit}, index) {
            commit('dropTicket', index);
        },
    },
})
