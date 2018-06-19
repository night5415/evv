<template>  
  <div id="app">  
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css">
    <div class="content"> 
      <div class="background-accent"></div>  
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template> 
 <script>
export default {
  mounted: function() {
    // if ("serviceWorker" in navigator) {
    //   try {
    //     navigator.serviceWorker.register("./static/sw.js");
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  },
  updated: function() {},
  created: function() {},
  destroyed: function() {},
  beforeCreate: function() {},
  beforeUpdate: function() {},

  methods: {
    myMethod() {
      alert();
    }
  },
  data() {
    return {
      online: navigator.onLine
    };
  }
};
</script> 
<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
#app {
}
.background-accent {
  height: 40vh;
  width: 100vw;
  box-shadow: 0px 0px 25px #8887bb;
  background-color: #005662;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.content {
  width: 100vw;
  max-width: 960px;
  min-width: 200px;
  margin: 0 auto;
}
@media only screen and (max-width: 750px) {
  .background-accent {
    display: none;
  }
}
</style>
