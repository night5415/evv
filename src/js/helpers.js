 export default {
   install: (Vue) => {
     Vue.prototype.$helpers = {
       _getGeoCords: function () {
         return new Promise(function (resolve, reject) {
           navigator.geolocation.getCurrentPosition(function (params) {
             resolve(params);
           });
         });
       },

       _sendNotification: function (message) {
         var element = document.getElementById('notifi');
         element.classList.remove("hide");
         element.innerText = message;
         //clear it back out
         setTimeout(function () {
           element.classList.add("hide");
           element.innerText = '';
         }, 5000);
       },

       _addLocalStorage: function (key, obj) {
         localStorage.setItem(key, JSON.stringify(obj));
       },

       _getLocalStorage: function (key) {
         return JSON.parse(localStorage.getItem(key));
       }
     };
   }
 };
