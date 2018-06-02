<template> 
  <div class="container grid-body">  
    <h2 class="header">{{msg}}</h2>  
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
                <i title="Lock Appointment" class="far fa-2x fas fa-lock" v-on:click="showSignature"></i> 
                <i title="Start Appointment" class="fas fa-2x fa-stopwatch" v-on:click="startAppointment"></i>
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
      msg: null,
      appointments: []
    };
  },
  mounted: function() {
    let me = this,
      d = me.$moment(),
      url =
        "https://middleman20180526011226.azurewebsites.net/api/schedule/current",
      //url = "http://localhost:60745/api/schedule/current",
      securityToken = me.$helpers._getLocalStorage("securityContext"),
      params = {
        empIds: securityToken.data.SecurityContext.Person.Id,
        _dc: me.$moment().valueOf(),
        startDate: d.startOf("day").format(),
        endDate: d.endOf("day").format(),
        securityToken: securityToken.data.securityToken
      };

    //set header text
    this.msg = d.format("MMMM Do YYYY");

    //copy paste from stack overflow :)
    let esc = encodeURIComponent;
    let query = Object.keys(params)
      .map(k => esc(k) + "=" + esc(params[k]))
      .join("&");
    //make call to scheduling endpoint
    fetch(`${url}?${query}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "user-agent": "Mozilla/4.0 MDN Example",
        "content-type": "application/json"
      }
    })
      .then(data => data.json())
      .then(obj => {
        obj.data.forEach(v => me.appointments.push(v));
        me.$helpers._addLocalStorage("schedule", obj.data);
      })
      .then(function() {
        me.$helpers._removeLoadingImg();
      })
      .catch(function(err) {
        me.$helpers._sendNotification(err);
      });
  },
  methods: {
    showSignature() {
      this.$router.push({ path: `/Lock` });
    },
    startAppointment() {
      var me = this,
        d = me.$moment();

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
  text-align: center;
  padding: 2px;
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
.row-click {
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