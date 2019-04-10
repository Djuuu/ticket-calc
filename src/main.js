import Vue            from 'vue';
import {ToggleButton} from 'vue-js-toggle-button'

import '@/assets/css/tailwind.css';
import '@/assets/css/app.css';
import '@/registerServiceWorker';

import App    from '@/App.vue';
import router from '@/router';
import store  from '@/store';

Vue.config.productionTip = false;

// Third-party components
Vue.component('ToggleButton', ToggleButton);

// Custom filters
Vue.filter('abs', value => Math.abs(value));
Vue.filter('fixed2', value => Number.parseFloat(value).toFixed(2));

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
