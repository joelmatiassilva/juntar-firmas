<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
          <!-- section section-shaped section-lg my-0 -->
          <!-- shape shape-style-1 bg-gradient-default -->

        </div>
        <div class="container">
          <div class="row">
              <div class="col">
                <object width="500" height="500" data="pdf/proyecto2018.pdf"></object>
              </div>
                <div class="col">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>Firma con</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/facebook.svg">
                                    Facebook
                                </base-button>

                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>O ingrese los siguientes datos</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Nombre"
                                            addon-left-icon=""  v-model="nombre" >
                                </base-input>
                                <base-input alternative
                                            placeholder="DNI"
                                            addon-left-icon="" v-model="dni">
                                </base-input>

                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="processForm">Firmar</base-button>
                                </div>
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
      nombre: '',
      dni: ''
    }
  },
  methods: {
    processForm () {
      console.log({ nombre: this.nombre, dni: this.dni })
      // alert('Processing!')
      // Make a request for a user with a given ID
      axios.get('/user?ID=12345')
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
    }
  }

};
</script>
<style>
</style>
