<template>  
  <div id="app">  
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
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
    console.log("mounted");
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
      key: "test"
    };
  }
};
</script> 
<style>
body {
  margin: 0;
  padding: 0;
}
#app {
}
.background-accent {
  height: 40vh;
  width: 100vw;
  box-shadow: 0px 0px 25px #8887bb;
  background-color: deepskyblue;
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
