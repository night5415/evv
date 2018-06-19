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
       },

       _addLoadingImg: function () {
         var img = document.createElement('img');
         img.src = '/static/images/loading.gif';
         img.classList.add("_loading");
         img.classList.add("hide");
         img.id = 'imgLoading';
         document.body.appendChild(img);
         setTimeout(function () {
           img.classList.remove("hide");
         }, 100);
       },

       _removeLoadingImg: function () {
         var element = document.getElementById('imgLoading');
         if (element) {
           element.classList.add("hide");
           //remove from DOM
           setTimeout(function () {
             document.body.removeChild(element);
           }, 500);
         }
       },

       _callProxyUsingParams: function (url, params) {
         let esc = encodeURIComponent,
           local = "http://localhost:60745",
           prod = "https://middleman20180526011226.azurewebsites.net",
           query = Object.keys(params)
           .map(k => esc(k) + "=" + esc(params[k]))
           .join("&");

         //make call to scheduling endpoint
         return fetch(`${prod}${url}?${query}`, {
           method: "GET",
           mode: "cors",
           headers: {
             "user-agent": "Mozilla/4.0 MDN Example",
             "content-type": "application/json"
           }
         })
       }
     };
   }
 };
