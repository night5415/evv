<template>
    <div class="detail-body">  
        <div v-if="data">
            <div class="header"><span class="title">{{data.Subject}}</span><br><span class="description">{{data.Description}}</span></div> 
            <div v-if="data.AssignedEmployee">
            <h3>Employee</h3> 
            <div class="grid-container">
                <div>{{data.AssignedEmployee.FullName}}</div>
            </div>
            <hr>
        </div>
         <div v-if="data.Address">
            <h3>Address</h3>
            <div class="grid-container">
                <div>Contact:</div>
                <div>{{data.Address.ContactLastName}}, {{data.Address.ContactFirstName}}</div>
                <div>Address:</div>
                <div>{{data.Address.Street1}}</div>
                <div>City:</div>
                <div>{{data.Address.City}}</div>
                <div>State:</div>
                <div>{{data.Address.StateProvince.Description}}</div>
                <div>Postal</div>
                <div>{{data.Address.PostalCode}}</div> 
            </div> 
            <hr>
        </div>
        <div v-if="data.MasterEventBillingInfo">
            <h3>Billing Info</h3>
            <div class="grid-container">
                <div>Credential:</div>
                <div>{{data.MasterEventBillingInfo.Credential.Name}}</div>
            </div>
            <hr>
            <div v-if="data.MasterEventBillingInfo.Participant">
            <h3>Participant</h3>
            <div class="grid-container">
                <div>Name:</div>
                <div>{{data.MasterEventBillingInfo.Participant.FullName}}</div>
                <div>Auth:</div>
                <div>{{data.MasterEventBillingInfo.ParticipantAuthorization.AuthorizationNumber}}</div>
            </div> 
            <hr> 
            </div>
        </div> 
        <div class="completed" v-if="data.IsCompleted">
            <h1>completed!!</h1>
        </div>
        </div>
         <div class="loading" v-else>
            <b-progress :value="counter" :max="max" show-progress animated></b-progress>
        </div> 
        <i v-on:click="showSchedule" class="fas fa-arrow-left fa-2x back"></i> 
    </div> 
</template>

<script>
export default {
  data() {
    return {
      data: null,
      max: 10,
      counter: 0,
      completed: false
    };
  },
  methods: {
    name() {},
    showSchedule() {
      this.$router.push({
        path: `/Schedule`
      });
    }
  },
  mounted: function() {
    let me = this,
      status =
        me.$route.query.status === "EventCompleted"
          ? "completedevent"
          : "scheduledevent",
      endPoint = `/api/schedule/${status}`,
      securityToken = me.$helpers._getLocalStorage("securityContext"),
      params = {
        EventId: me.$route.query.id,
        _dc: me.$moment().valueOf(),
        securityToken: securityToken.data.securityToken
      };

    me.$helpers
      ._callProxyUsingParams(endPoint, params)
      .then(data => data.text())
      .then(text => {
        var value = JSON.parse(text);
        me.data = value.data[0];
      })
      .catch(function(err) {
        me.$helpers._sendNotification(err);
      });
  }
};
</script>

<style scoped>
.title {
  font-size: 2em;
  font-weight: 600;
}
.description {
  font-size: 1em;
  font-style: italic;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.header {
  text-align: center;
  padding: 0 0 20px 0;
}
.back {
  position: fixed;
  bottom: 25px;
  right: 25px;
  border-radius: 50%;
  padding: 15px;
  background-color: red;
  color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  cursor: pointer;
}
.completed {
  color: green;
  position: absolute;
  bottom: 25px;
  left: calc(50% - 110px);
  width: 220px;
}
.grid-container {
  display: grid;
  grid-gap: 1em 1em;
  grid-template-columns: 30% 50%;
  max-width: 750px;
  padding: 0 25px;
}

.detail-body {
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
@media only screen and (max-width: 750px) {
  .detail-body {
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
.loading {
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: 20vh;
}
</style>