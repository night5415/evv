<template>
  <div class="login-form"> 
    <form v-on:submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Username:</label>
      <input type="text" class="form-control" id="email" v-model="username" placeholder="Enter Username" name="email">
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" id="pwd" v-model="password" placeholder="Enter Password" name="pswd">
    </div> 
    <button type="submit" class="btn btn-primary">Submit</button>
  </form> 
  </div>
</template> 
<script>
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    // Form handler
    onSubmit: function(evnt, form) {
      var me = this,
        formData = new FormData(),
        url = "https://test-lighthouse.abpathfinder.net/~api/login";

      formData.append("source", "pathfinder");
      formData.append("loginUserName", this.username);
      formData.append("loginPassword", this.password);
      formData.append("timeZone", "America/Chicago");
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(function(response) {
          return response.text();
        })
        .then(function(response) {
          //bad JSON
          var obj = eval(`(${response})`);
          if (obj.success) {
            localStorage.setItem("securityContext", JSON.stringify(obj));
            me.$router.push({ path: `/schedule` });
          } else {
            Notification.requestPermission(function(permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                var notification = new Notification(obj.errors.reason);
              }
            });
          }
        })
        .catch(function(err) {
          Notification.requestPermission(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              var notification = new Notification(err);
            }
          });
        });
    }
  }
};
</script>

<style scoped>
.login-form {
  margin: 0 auto;
  max-width: 50%;
  color: #fff;
  background-color: #fff;
  padding: 2em;
  border-radius: 6px;
  position: relative;
  top: 25vh;
  box-shadow: 0px 0px 25px #8887bb;
}
</style>