import Vue  from 'vue';
import Vuex from 'vuex';

import Storage from "@/services/storage";

Vue.use(Vuex);

export default new Vuex.Store({
    state:     {
        tickets: [],
    },
    plugins: [
        new Storage('ticket-calc').plugin
    ],
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
