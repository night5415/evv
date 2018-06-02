<template>
    <div class="sig-body"> 
        <div class="sig-parent"> 
           <h3>Parent</h3>
           <canvas class="sig-canvas parentCanvas" height="300" width="600" ></canvas>  
        </div>  
        <div class="sig-parent"> 
           <h3>Employee</h3>
           <canvas class="sig-canvas employeeCanvas" height="300" width="600" ></canvas>  
        </div> 
    </div>
</template>

<script>
import SignaturePad from "signature_pad";
export default {
  mounted: function(params) {
    var employeeCanvas = document.querySelector(".employeeCanvas");
    employeeCanvas.width = window.innerWidth;

    new SignaturePad(employeeCanvas, {
      backgroundColor: "rgba(255, 255, 255, 0)",
      penColor: "rgb(0, 0, 0)",
      velocityFilterWeight: 0.7,
      minWidth: 0.5,
      maxWidth: 2.5,
      throttle: 16, // max x milli seconds on event update, OBS! this introduces lag for event update
      minPointDistance: 3
    });

    var parentCanvas = document.querySelector(".parentCanvas");
    parentCanvas.width = window.innerWidth * 0.5;

    new SignaturePad(parentCanvas, {
      backgroundColor: "rgba(255, 255, 255, 0)",
      penColor: "rgb(0, 0, 0)",
      velocityFilterWeight: 0.7,
      minWidth: 0.5,
      maxWidth: 2.5,
      throttle: 16, // max x milli seconds on event update, OBS! this introduces lag for event update
      minPointDistance: 3
    });
  },
  methods: {
    name() {}
  },
  data() {
    return {
      key: true
    };
  }
};
</script>

<style scoped>
h3 {
  color: rgb(97, 97, 97);
  position: relative;
  right: 25px;
  padding: 5px 0;
}
canvas {
  background-color: darkgray;
  box-shadow: 0px 0px 10px #8887bb;
}
.sig-body {
  margin: 0 auto;
  width: 75vw;
  min-width: 600px;
  padding: 2em;
  background-color: #fff;
  border-radius: 6px 6px 0px 0px;
  box-shadow: 0px 0px 25px #8887bb;
  position: relative;
  top: 5vh;
  height: 95vh;
  overflow: auto;
  transition: all 0.2s;
}
.sig-parent {
  width: 600px;
  margin: 0 auto;
}
@media only screen and (max-width: 880px) {
  .sig-body {
    width: 100vw;
    border-radius: 0;
    box-shadow: 0px 0px 25px #fff;
    position: relative;
    top: 0;
    height: 100vh;
  }
}
</style>