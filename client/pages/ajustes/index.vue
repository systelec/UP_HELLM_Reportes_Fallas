<template>
  <div class="tabs elevation-3">
    <!-- <v-tabs height="50px" color="blue-grey" centered dark icons-and-text show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <template v-for="(item ,i) in items">
        <v-tab :key="i" @click="cambiarItemTag(item)">
          <span class="tabs-text">{{ item.title }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-tab>
      </template>
    </v-tabs>

    <v-card class="contenido">
      <component v-bind:is="componenteSeleccionado"/>
    </v-card>-->
  </div>
</template>

<style scoped>
.tabs-text {
  font-size: 10px;
}
.contenido {
  min-height: 20vh;
}
</style>


// <script>
// import General from '@/components/pages/Ajustes/General'
// import Alarma from '@/components/pages/Ajustes/Alarma'
// import Producto from '@/components/pages/Ajustes/Producto'
// import Tanque from '@/components/pages/Ajustes/Tanque'
// import Tag from '@/components/pages/Ajustes/Tag'
// import Tendencia from '@/components/pages/Ajustes/Tendencia'
// import Usuario from '@/components/pages/Ajustes/Usuario'

// export default {
//   components: {
//     General,
//     Alarma,
//     Producto,
//     Tag,
//     Tendencia,
//     Usuario,
//     Tanque
//   },
//   data() {
//     return {
//       componenteSeleccionado: 'Usuario',
//       items: [
//         {
//           icon: 'account_circle',
//           title: 'Usuarios',
//           components: 'Usuario'
//         },
//         {
//           icon: 'timeline',
//           title: 'Tendencias y limites',
//           components: 'Tendencia'
//         },
//         {
//           icon: 'next_week',
//           title: 'Productos',
//           components: 'Producto'
//         },
//         {
//           icon: 'beenhere',
//           title: 'Tanques',
//           components: 'Tanque'
//         },
//         {
//           icon: 'alarm_on',
//           title: 'Alarmas',
//           components: 'Alarma'
//         }
//       ]
//     }
//   },
//   methods: {
//     cambiarItemTag(item) {
//       this.componenteSeleccionado = item.components
//     }
//   }
// }
//
</script>