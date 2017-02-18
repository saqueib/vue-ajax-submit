// required vue and vue-resource 
window.Vue = require('vue');
require('vue-resource');

// Other 
window.swal = require('sweetalert');
window.$ = window.jQuery = require('jquery');

// Directives
require('./directives/jquery.ajax-submit');
// require('./directives/vue-resource-submit');

import App from './App.vue';

new Vue({
  el: '#app',
  http: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },
  render: h => h(App)
});
