<template> 
    <div id="canvas-container" class="sig-body">  
      <div id="btnParent" class="left btn" v-on:click="showParent">
        <i class="fas fa-child"></i>
      </div>
      <div id="btnEmp" class="right btn" v-on:click="showEmployee">
        <i class="fas fa-user"></i>
      </div>

      <div id="btnSubmit" class="right btn slide" v-on:click="showConfirm">
        <i class="fas fa-check"></i>
      </div> 

      <div id="parentContainer" class="signature-container "> 
        <span class="canvas-title">Parent</span>
        <canvas id="parentCanvas" height="500" width="500" class="sig-canvas parentCanvas"></canvas> 
        <div class="signature-line">
          <i class="fas fa-times"></i>
        </div>
      </div>

      <div id="employeeContainer" class="signature-container shrink"> 
        <span class="canvas-title">Employee</span>
        <canvas id="employeeCanvas" height="500" width="500" class="sig-canvas employeeCanvas"></canvas> 
        <div class="signature-line">
          <i class="fas fa-times"></i>
        </div>
      </div>   
            
    </div>   
</template>

<script>
import SignaturePad from "signature_pad";
import firebase from "firebase";

export default {
  data() {
    return {
      seen: false,
      lockTime: null,
      lat: null,
      long: null,
      eventId: null
    };
  },
  mounted: function(params) {
    var me = this,
      parentCanvas = document.querySelector(".parentCanvas"),
      employeeCanvas = document.querySelector(".employeeCanvas"),
      geoLocation = me.$helpers._getGeoCords();

    me.signaturePad(parentCanvas);
    me.signaturePad(employeeCanvas);
    //set event ID
    me.eventId = me.$route.query.id;
    //locktime
    me.lockTime = me.$moment().format("h:mm:ss a");
    //location
    geoLocation.then(function(param) {
      me.lat = param.coords.latitude;
      me.long = param.coords.longitude;
    });
  },
  methods: {
    signaturePad(canvas) {
      return new SignaturePad(canvas, {
        backgroundColor: "rgba(255, 255, 255, 0)",
        penColor: "rgb(0, 0, 0)",
        velocityFilterWeight: 0.7,
        throttle: 16, // max x milli seconds on event update, OBS! this introduces lag for event update
        minPointDistance: 3
      });
    },
    orientation() {
      var canvas = document.querySelector(".parentCanvas");

      if (screen.orientation.angle === 0) {
      } else {
      }
    },
    showConfirm: function() {
      var me = this,
        appt = JSON.parse(localStorage.getItem(me.eventId)),
        parent = document.getElementById("parentCanvas"),
        employee = document.getElementById("employeeCanvas");

      appt.lat = me.lat;
      appt.long = me.long;
      appt.lockTime = me.lockTime;
      appt.parent = parent.toDataURL();
      appt.emp = employee.toDataURL();

      //pop a notification
      me.$helpers._sendNotification(
        `Appointment has been Locked at ${appt.lockTime}`
      );

      //save to db
      var rootRef = firebase.database().ref();
      var db = rootRef.child("appt");
      var newStoreRef = db.push();
      newStoreRef.set(appt);

      localStorage.setItem(me.eventId, JSON.stringify(appt));
      // just a little pause
      setTimeout(() => {
        me.$router.push({
          path: `/Schedule`
        });
      }, 2000);
    },
    bckToSchedule: function() {
      this.$router.push({ path: `/Schedule` });
    },
    showParent: function() {
      var emp = document.getElementById("employeeContainer"),
        par = document.getElementById("parentContainer"),
        btnEmp = document.getElementById("btnEmp"),
        btnSubmit = document.getElementById("btnSubmit");

      emp.classList.add("shrink");
      par.classList.remove("shrink");

      btnSubmit.classList.add("slide");
      btnEmp.classList.remove("slide");
    },
    showEmployee: function() {
      var emp = document.getElementById("employeeContainer"),
        par = document.getElementById("parentContainer"),
        btnEmp = document.getElementById("btnEmp"),
        btnSubmit = document.getElementById("btnSubmit");

      par.classList.add("shrink");
      emp.classList.remove("shrink");

      btnEmp.classList.add("slide");
      btnSubmit.classList.remove("slide");
    }
  }
};
</script>

<style scoped>
.canvas-title {
  z-index: 3;
  font-size: 2em;
  font-weight: 600;
  position: absolute;
  top: 1em;
  left: 1em;
  color: rgb(97, 97, 97);
  pointer-events: none;
}
.fa-times {
  color: rgb(97, 97, 97);
  font-size: 3em;
}
.btn {
  border-radius: 50%;
  background-color: #4fb3bf;
  position: fixed;
  bottom: calc(50vh - 50px);
  height: 100px;
  width: 100px;
  z-index: 2;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.4s;
}
.btn i {
  color: #fff;
  font-size: 3em;
  position: relative;
  top: 18px;
}
.btn:active {
  transform: scale(0.95);
}
.left {
  left: -20px;
}
.right {
  right: -20px;
}
.sig-body {
  margin: 0 auto;
  width: 75vw;
  max-width: 960px;
  background-color: #fff;
  border-radius: 6px 6px 0px 0px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: relative;
  top: 5vh;
  height: 95vh;
  transition: all 0.2s;
}

.shrink {
  opacity: 0;
  z-index: -20;
}

.slide {
  right: -150px;
}

.signature-line {
  position: absolute;
  bottom: 40px;
  left: 25px;
  border-bottom: 4px solid rgb(97, 97, 97);
  width: 90%;
  pointer-events: none;
}

.signature-container {
  position: absolute;
  bottom: 0;
  max-height: 500px;
  width: 100%;
  overflow: hidden;
  transition: all 0.5s;
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

  .signature-container {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
}

/* @media screen and (orientation: landscape) {
  .confirm {
    position: fixed;
    bottom: 25px;
    right: 25px;
    cursor: pointer;
  }
  .hack {
    width: 100%;
    height: 100px;
  }
}

@media screen and (orientation: portrait) {
  .confirm {
    width: 93%;
    bottom: 0;
    right: 0;
    cursor: pointer;
    position: relative;
  }
  .hack {
    width: 100%;
    height: 0;
  }
} */
</style>