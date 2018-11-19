<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
          <!-- section section-shaped section-lg my-0 -->
          <!-- shape shape-style-1 bg-gradient-default -->

        </div>
        <div class="container">
          <div class="row">
              <div class="col">
                <object width="500" height="500" data="static/dist/pdf/proyecto2018.pdf"></object>
              </div>
                <div class="col">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Ingresa tus datos</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Nombre"
                                            addon-left-icon=""  v-model="postData.name" id="name" :required="true">
                                </base-input>
                                <base-input alternative
                                            placeholder="DNI"
                                            addon-left-icon="" v-model="postData.dni" id="dni" :required="true">
                                </base-input>

                                <!-- ############### Social network buttons ############-->
                                <div class="text-muted text-center mb-3">
                                    <small>Y firmá con</small>
                                </div>
                                <div class="btn-wrapper text-center">
                                    <base-button type="neutral" v-on:click="onSignInFacebook">
                                        <img slot="icon" src="static/dist/img/icons/common/facebook.svg">
                                        Facebook
                                    </base-button>

                                    <base-button type="neutral" v-on:click="onSignInGoogle">
                                        <img slot="icon" src="static/dist/img/icons/common/google.svg">
                                        Google
                                    </base-button>
                                </div>
                              </br>
                                <div class="text-center" id="image">
                                </div>
                                <!-- ###################################################-->

                                <div class="text-center">
                                    <small>O sin redes sociales:    </small>
                                    <base-button type="primary" class="my-4" @click="processForm">Firmar</base-button>
                                </div>
                                <div id="status"><small>No firmaste todavia</small></div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios'

export default {
  name: 'JuntarFirmas',
  data: function() {
    return {
      postData: {
        name: '',
        dni: '',
        sn: '',
        sn_id: '',
        sn_name: '',
        email: '',
        img_url: ''
      },
      url_post_petition: 'https://www.acvi.org.ar/sign_petition'
    }
  },
  methods: {
    onSignInFacebook () {
      console.log('onSignInFacebook: ' + this.postData.name)
      if (this.postData.name !== '' && this.postData.dni !== '') {
        fb_login();
      } else {
        console.log('no tiene dni')
      }
    },
    onSignInGoogle () {
      console.log('onSignInGoogle: ' + this.postData.name)
      if (this.postData.name !== '' && this.postData.dni !== '') {
        onSignIn();
      } else {
        console.log('no tiene dni')
      }
    },
    processForm () {
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': "*",
            'withCredentials': true
        }
      };
      if (this.postData.name !== '' && this.postData.dni !== '') {
        axios.post(this.url_post_petition, this.postData, axiosConfig)
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      } else {
        console.log('no tiene dni')
      }
    }
  }

};

  ////////////////////////////////////////////////////////////////////////////
  ////////////////// FACEBOOK ////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Sin firmar ';
    }
  }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '303204730435087',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      /*
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
      */
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Gracias por firmar ' + response.name + '!';
      });
    }

      var _name;
      var _id;

    function fb_login(){
      var mydata;
      var user_id;


      FB.login(function(response) {

          if (response.authResponse) {
              console.log('Welcome!  Fetching your information.... ');
              //console.log(response); // dump complete info
              //access_token = response.authResponse.accessToken; //get access token
              user_id = response.authResponse.userID; //get FB UID

              FB.api('/me', function(response) {
                  user_email = response.email; //get user email
                  // you can store this data into your database
                  console.log(response);
                  mydata = response;
                  _name = response.name;
                  _id = response.id;


                  // PARA CUANDO TENGA MAIL //var data = "&sn=FB" + "&id=" + user_id + "&email=" + mydata.email;
                  //JOEL: TOMAR EL NOMBRE Y EL DNI
                  var data = "name=" + $('#name').val() + "&dni=" + $('#dni').val() + "&sn=FB" + "&sn_name=" + _name + "&sn_id=" + _id;
                  var full_data = data

                  $.ajax({
                      url: '/sign_petition',
                      data: full_data,
                      method: 'POST',
                      success: function(res){
                          toastr.success(res);
                      },
                      error: function(res){
                          toastr.error(res);
                      }
                  });
              });

          } else {
              //user hit cancel button
              console.log('User cancelled login or did not fully authorize.');

          }
      },
      {
          scope: 'email'
      });

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

  }

  (function() {
      var e = document.createElement('script');
      e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
      e.async = true;
      //document.getElementById('fb-root').appendChild(e);
  }());


      ////////////////////////////////////////////////////////////////////////////
      ////////////////// GOOGLE //////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////
      var a2;

      function onSignIn() {
      console.log('google method')
        // Check input fields ////////////////////////////////////////////////////
        /*
        JOEL
        var form = document.getElementById("notification_form")
        if (form.name.value == "" || form.dni.value == ""){
          toastr.error("Por favor completa los campos Nombre y DNI para firmar");
          return false
        }
        */

//        gapi.load('auth2', function() {
          console.log('init google');
          console.log(gapi);
          let auth2 = gapi.auth2.init({
            client_id: '743011207515-6a7frj1nj1h7johnh6edhfk5u4q913u0.apps.googleusercontent.com',
            fetch_basic_profile: true,
            scope: 'email'
          });
          console.log('listo')
          a2 = auth2;
          console.log(a2);

          // Sign the user in, and then retrieve their ID.
          auth2.signIn().then(function() {
            var googleUser = auth2.currentUser.get()
            console.log(auth2.currentUser.get().getId());
            var profile = googleUser.getBasicProfile();
            console.log("ID: " + profile.getId()); // Don't send this directly to your server!
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log("Image URL: " + profile.getImageUrl());
            console.log("Email: " + profile.getEmail());

            // The ID token you need to pass to your backend:
            var id_token = googleUser.getAuthResponse().id_token;
            console.log("ID Token: " + id_token);

            document.getElementById("status").innerHTML ="La peticion ha sido firmada por: " + profile.getName();

            var img = document.createElement("img");
            img.src = profile.getImageUrl();
            var src = document.getElementById("image");
            src.appendChild(img);

            //JOEL: TOMAR EL DNI Y EL NOMBRE
            var data = "name=" + $('#name').val() + "&dni=" + $('#dni').val() + "&sn=GL" + "&sn_id=" + profile.getId() + "&sn_name=" + profile.getName() + "&email=" + profile.getEmail() + "&img_url=" + profile.getImageUrl();
            var full_data = data



        $.ajax({
            url: '/sign_petition',
            data: full_data,
            method: 'POST',
            success: function(res){
                toastr.success(res);
            },
            error: function(res){
                toastr.error(res);
            }
        });

          });
//        });

      };


      function signOut() {
        //var auth2 = gapi.auth2.getAuthInstance();
        a2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementById("status").innerHTML =""
      });
  }

</script>
<style>
</style>
