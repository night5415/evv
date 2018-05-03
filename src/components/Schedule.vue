<template> 
  <div class="container grid-body">  
    <h2 class="header">{{msg}}</h2>  
    <table class="table table-hover">
      <thead>
        <tr>
          <th style="text-align:center">Actions</th>
          <th>Appt. Time</th>
          <th>Participant</th>
          <th>Location</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="a in assignedApplications">
              <td style="min-width:105px; text-align:center;">
                <i title="Lock Appointment" class="far fa-2x fas fa-lock" v-on:click="showSignature"></i> 
                <i title="Start Appointment" class="fas fa-2x fa-stopwatch" v-on:click="startAppointment"></i>
              </td>
              <td>{{a.time}}</td>
              <td>{{a.participant}}</td>
              <td>{{a.location}}</td>
              <td>{{a.start}}</td>
              <td>{{a.end}}</td>
              <td><i title="Start Appointment" class="far fa-2x fa-times-circle"></i></td>
          </tr> 
      </tbody>  
    </table>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      msg: null,
      assignedApplications: [
        {
          id: 1,
          time: "8:00 AM",
          participant: "skip dog",
          location: "Home",
          start: null,
          end: null
        },
        {
          id: 2,
          time: "10:00 AM",
          participant: "shane jane",
          location: "Office",
          start: null,
          end: null
        },
        {
          id: 3,
          time: "1:00 PM",
          participant: "tina go",
          location: "Home",
          start: null,
          end: null
        },
        {
          id: 4,
          time: "5:00 PM",
          participant: "fred lite",
          location: "School",
          start: null,
          end: null
        },
        {
          id: 5,
          time: "N/A",
          participant: "bob joe",
          location: "N/A",
          start: null,
          end: null
        }
      ]
    };
  },
  mounted: function() {
    var me = this,
      d = new Date();

    this.msg = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  },
  methods: {
    showSignature() {
      this.$router.push({ path: `/Lock` });
    },
    startAppointment() {
      var me = this,
        d = new Date(),
        mess = `Starting Appointment at ${d.getHours()}:${d.getMinutes()}`;

      Notification.requestPermission(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(mess);
        }
      });
    }
  }
};
</script>

<style scoped>
th {
  text-align: center;
}
i {
  padding: 0 5px;
  cursor: pointer;
  color: rgb(97, 97, 97);
}
.header {
  text-align: center;
  padding: 2px;
}
.grid-body {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 750px) {
  .grid-body {
    width: 100vw;
    padding: 2em;
    border-radius: 0;
    box-shadow: 0px 0px 25px #fff;
    position: relative;
    top: 0;
    height: 100vh;
    overflow: auto;
  }
}
</style>