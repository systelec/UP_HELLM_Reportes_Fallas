<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalAddUsuario" persistent max-width="50%">
      <v-card>
        <v-card-title dark class="blue-grey darken-4 elevation-2">
          <v-icon dark x-large>people_outline</v-icon>
          <v-spacer></v-spacer>
          <span class="headline grey--text">Agregar nuevo usuario</span>
          <v-spacer></v-spacer>
          <v-btn color="pink" flat icon @click.native="hideModal">
            <v-icon x-large>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" class="formRegister">
            <v-layout row wrap align-center justify-center>
              <v-flex xs12 md10>
                <v-text-field
                  prepend-icon="person"
                  label="Nombre"
                  name="name"
                  v-model="usuario.name"
                  :rules="rules.name"
                  :counter="10"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md10>
                <v-text-field
                  prepend-icon="person"
                  label="Apellido"
                  name="lastname"
                  v-model="usuario.lastname"
                  :rules="rules.lastname"
                  :counter="10"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md10>
                <v-text-field
                  prepend-icon="email"
                  label="E-mail"
                  name="email"
                  v-model="usuario.email"
                  :rules="rules.email"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md10>
                <v-text-field
                  prepend-icon="usuario_circle"
                  v-model="usuario.username"
                  name="username"
                  label="Username"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md10>
                <v-text-field
                  prepend-icon="lock"
                  v-model="usuario.password"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md10>
                <v-select
                  :items="usuarioTipo"
                  v-model="usuario.type"
                  label="Permiso de usuario por Roles (Por defecto usuario)"
                  single-line
                  :menu-props="'auto'"
                  prepend-icon="vpn_lock"
                  hide-details
                ></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn dark color="green" @click.native="submitForm" block>Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      usuario: {
        name: null,
        lastname: null,
        email: null,
        username: null,
        password: null,
        type: null,
        grupo: null
      },
      payload: { content: null, current_page: 1, per_page: 200 },
      valid: false,
      rules: {
        name: [v => !!v || 'El campo name es requerido'],
        lastname: [v => !!v || 'El campo lastname es requerido'],
        email: [
          v => !!v || 'El campo email es requerido',
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'No es un email valido'
        ]
      },
      usuarioTipo: ['Admin', 'User']
    }
  },
  computed: {
    ...mapGetters(['modalAddUsuario'])
  },
  methods: {
    ...mapMutations(['MODAL_ADD_USUARIO']),
    ...mapActions(['createUsuario']),
    hideModal() {
      this.MODAL_ADD_USUARIO(false)
    },
    save() {
      this.payload.content = this.usuario
      this.createUsuario(this.payload)
      this.MODAL_ADD_USUARIO(false)
    },
    submitForm() {
      if (this.valid) {
        this.save()
      } else {
        return false
      }
    }
  }
}
</script>
