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
        myUrl = "https://middleman20180526011226.azurewebsites.net/api/login",
        params = {
          username: this.username,
          password: this.password
        };

      fetch(myUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "user-agent": "Mozilla/4.0 MDN Example",
          "content-type": "application/json"
        },
        body: JSON.stringify(params)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(obj) {
          if (obj.success) {
            me.$helpers._addLocalStorage("securityContext", obj);
            me.$router.push({ path: `/schedule` });
          } else {
            me.$helpers._sendNotification(obj.message);
          }
        })
        .catch(function(err) {
          me.$helpers._sendNotification(err);
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
  transition: all 0.5s;
}
@media only screen and (max-width: 750px) {
  .login-form {
    margin: 0 auto;
    max-width: 90%;
    color: #fff;
    background-color: #fff;
    padding: 2em;
    border-radius: 6px;
    position: relative;
    top: 10vh;
    box-shadow: 0px 0px 0px #fff;
  }
  button {
    width: 100%;
  }
}
</style>