// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import helpers from './js/helpers';
import moment from 'vue-moment';
import firebase from 'firebase';



// Initialize Firebase
let config = {
  apiKey: "AIzaSyCDl_bdMSZz2QwVMkENlXleKqRZ6Ko6Wpk",
  authDomain: "work-eb14c.firebaseapp.com",
  databaseURL: "https://work-eb14c.firebaseio.com",
  projectId: "work-eb14c",
  storageBucket: "work-eb14c.appspot.com",
  messagingSenderId: "656216784014"
};

firebase.initializeApp(config);

Vue.use(BootstrapVue);
Vue.use(helpers);
Vue.use(moment);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});

window.addEventListener('online', function () {
  //visual display
  var element = document.getElementById('no-wifi');
  element.classList.add("hide");
  //get access to firebase DB
  var rootRef = firebase.database().ref();
  var db = rootRef.child("status");
  var newStoreRef = db.push();
  //add new record to db
  newStoreRef.set({
    status: 'online',
    date: new Date()
  });

});
window.addEventListener('offline', function () {
  var element = document.getElementById('no-wifi');
  element.classList.remove("hide");
});
