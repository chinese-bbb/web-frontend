import Vue from 'vue';
import {
  complaintStateClassMapping,
  complaintStateMapping,
  complaintTypeMapping,
  DateFilter,
  calcUserName,
  sexMapping,
} from '@/filters';

Vue.filter('date', DateFilter);
Vue.filter('complaintType', complaintTypeMapping);
Vue.filter('complaintState', complaintStateMapping);
Vue.filter('complaintStateClass', complaintStateClassMapping);
Vue.filter('userName', calcUserName);
Vue.filter('gender', sexMapping);
