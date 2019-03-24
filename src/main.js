import Vue from 'vue';

import '@/assets/css/tailwind.css';
import '@/assets/css/app.css';

import App    from './App.vue';
import './registerServiceWorker';
import router from './router';
import store  from './store';

Vue.config.productionTip = false;

// Custom filters
Vue.filter('abs', value => Math.abs(value));
Vue.filter('fixed2', value => Number.parseFloat(value).toFixed(2));

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
