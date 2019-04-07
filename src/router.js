import Vue    from 'vue';
import Router from 'vue-router';

import About    from '@/views/About.vue';
import Calc     from '@/views/Calc.vue';
import Settings from '@/views/Settings.vue';

Vue.use(Router);

export default new Router({
    mode:   'history',
    base:   process.env.BASE_URL,
    routes: [
        {path: '/',         name: 'calc',     component: Calc},
        {path: '/settings', name: 'settings', component: Settings},
        {path: '/about',    name: 'about',    component: About}
    ]
})
