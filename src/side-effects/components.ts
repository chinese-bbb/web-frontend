import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Logo from '@/components/logo.vue';
import fadeInDefinition from '@/components/fade-in-transition';

Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('logo', Logo);
Vue.component('fade-in-transition', fadeInDefinition);
