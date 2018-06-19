<template> 
  <div class="container grid-body">  
    <div class="header">
      <div class="left"><i id="btnDayBack" class="far fa-arrow-alt-circle-left" v-on:click="dayBackward"></i></div>
      <div class="center">{{title}}</div>
      <div class="right"><i id="btnDayForward" class="far fa-arrow-alt-circle-right" v-on:click="dayForward"></i></div>
    </div> 
    <table class="table table-hover">
      <thead>
        <tr>
          <th style="text-align:center">Actions</th> 
          <th>Type</th>
          <th>Time</th> 
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="a in appointments">
              <td style="min-width:105px; text-align:center;">
                <i title="Lock Appointment" class="far fa-2x fas fa-lock" v-on:click="showSignature(a)"></i> 
                <i title="Start Appointment" class="fas fa-2x fa-stopwatch" v-on:click="startAppointment(a)"></i>
              </td> 
              <td class="row-click" v-on:click="showDetails(a)">{{a.EventType}}</td>  
              <td class="row-click" v-on:click="showDetails(a)">{{a.EventStartDate | timeFormat }} - {{a.EventEndDate | timeFormat}}</td>
              <td><i title="Cancel Appointment" class="far fa-2x fa-times-circle"></i></td>
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
      title: null,
      appointments: [],
      date: null
    };
  },
  mounted: function() {
    let me = this,
      date = me.$moment();

    this.date = date;
    me.getSchedule();
  },
  methods: {
    getSchedule() {
      let me = this,
        endPoint = `/api/schedule/current`,
        securityToken = me.$helpers._getLocalStorage("securityContext"),
        params = {
          empIds: securityToken.data.SecurityContext.Person.Id,
          startDate: me.date.startOf("day").format(),
          endDate: me.date.endOf("day").format(),
          _dc: me.$moment().valueOf(),
          securityToken: securityToken.data.securityToken
        };
      //set header text
      me.title = me.date.format("MMMM Do");
      //lets clear the current array
      me.appointments.splice(0, me.appointments.length);

      me.$helpers
        ._callProxyUsingParams(endPoint, params)
        .then(data => data.json())
        .then(obj => {
          if (obj.data.length > 0) {
            obj.data.forEach(v => me.appointments.push(v));
          } else {
            me.$helpers._sendNotification(`No Appointments for ${this.title}`);
          }
        })
        .then(function() {
          me.$helpers._removeLoadingImg();
        })
        .catch(function(err) {
          me.$helpers._sendNotification(err);
        });
    },
    showSignature(appt) {
      this.$router.push({ path: `/Lock`, query: { id: appt.MasterEventId } });
    },
    startAppointment(appt) {
      var me = this,
        d = me.$moment(),
        appointment = {
          id: appt.MasterEventId,
          startTime: d.format("h:mm:ss a"),
          lockTime: null,
          lat: null,
          long: null,
          parent: null,
          emp: null
        };
      //add our started appt. to localstorage
      localStorage.setItem(appt.MasterEventId, JSON.stringify(appointment));
      //pop a notification
      me.$helpers._sendNotification(
        `Starting Appointment at ${d.format("h:mm:ss a")}`
      );
    },
    showDetails(appt) {
      //this passes the event ID in the URL
      this.$router.push({
        path: `/Detail`,
        query: { id: appt.MasterEventId, status: appt.EventStatus }
      });
    },
    dayForward() {
      let me = this;
      me.date.add(1, "day");
      me.getSchedule();
    },
    dayBackward() {
      let me = this;
      me.date.subtract(1, "day");
      me.getSchedule();
    }
  },

  filters: {
    timeFormat: function(date) {
      if (date) {
        var dateTime = new Date(date);
        return `${dateTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        })}`;
      }
    }
  }
};
</script>

<style scoped>
th,
td {
  text-align: center;
}
i {
  padding: 0 5px;
  cursor: pointer;
  color: rgb(97, 97, 97);
}
.header {
  display: grid;
  grid-template-columns: 25% 50% 25%;
}
.left {
  justify-self: left;
  font-size: 2.2em;
}
.right {
  justify-self: right;
  font-size: 2.2em;
}
.center {
  justify-self: center;
  font-size: 2em;
  font-weight: 600;
}
.grid-body {
  margin: 0 auto;
  width: 75vw;
  max-width: 960px;
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
.row-click,
.fa-arrow-alt-circle-left,
.fa-arrow-alt-circle-right {
  cursor: pointer;
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