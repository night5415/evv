 export default {
   install: (Vue) => {
     Vue.prototype.$helpers = {
       _getGeoCords: function () {
         if (navigator.geolocation) {
           return navigator.geolocation.getCurrentPosition(showPosition);
         } else {
           _sendNotification("Geolocation is not supported by this browser.");
         }
       },

       _sendNotification: function (message) {
         if (Notification.permission === "granted") {
           var notification = new Notification(message);
         } else {
           Notification.requestPermission(function (permission) {
             // If the user accepts, let's create a notification
             var notification = new Notification(message);
           });
         }
       },

       _addLocalStorage: function (key, obj) {
         localStorage.setItem(key, JSON.stringify(obj));
       },

       _getLocalStorage: function (key) {
         return JSON.parse(localStorage.getItem(key));
       },

       //    _navigate: function (url) {
       //      me.$router.push({
       //        path: url
       //      });
       //    }
     };
   }
 };
