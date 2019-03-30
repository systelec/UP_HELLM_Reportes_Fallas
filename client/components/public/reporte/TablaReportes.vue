<template>
  <div>
    <v-switch class="ml-1" v-model="reconocida" label="Considerar solor alarmas o causas"></v-switch>
    <v-card color="blue-grey lighten-5">
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs12 text-xs-right>
            <v-layout row>
              <template v-for="(item, i) in itemsTipos">
                <v-checkbox
                  color="blue"
                  :key="i"
                  v-model="tiposSeleccionados"
                  :label="item.nombre"
                  :value="item.id"
                ></v-checkbox>
              </template>
            </v-layout>
          </v-flex>
          <v-flex xs12 text-xs-right>
            <v-btn small color="blue-grey" dark @click="exportToCSV()">
              <v-icon>get_app</v-icon>Descargar csv
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="alarmas"
        style="width: 100%"
        class="elevation-0"
        no-data-text="No hay datos registrados en el sistema"
        rows-per-page-text="Por pagina"
        :rows-per-page-items="[100]"
        disable-initial-sort
      >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <tr class="text-xs-left">
            <td>{{ props.item.equipo }}</td>
            <td>
              <strong class="blue-grey--text">{{ props.item.nombre }}</strong>
            </td>
            <td>
              <strong>{{ props.item.duracion / 60 | redondear }}</strong> min
            </td>
            <td>{{ props.item.cantidad }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import axios from '@/plugins/axios'
import mixins from '@/mixins'
import exportFromJSON from 'export-from-json'
import _ from 'lodash'
export default {
  data: () => ({
    headers: [
      { text: 'Equipo', value: 'Equipo' },
      { text: 'Descripcion', value: 'Nombre' },
      { text: 'Duracion', value: 'Duracion' },
      { text: 'Recurrencia', value: 'Recurrencia' }
    ],
    loading: false,
    alarmas: [],
    equipos: [],
    tipos: null,
    itemsTipos: [],
    tiposSeleccionados: [],
    tiposFiltroQuery: [],
    reconocida: false
  }),

  mixins: [mixins],

  computed: {
    ...mapGetters(['aplicarFiltro', 'desde', 'hasta'])
  },

  watch: {
    aplicarFiltro() {
      this.getAlarmas()
    },
    reconocida() {
      this.getAlarmas()
    }
  },
  created() {
    this.getEquipos()
  },

  methods: {
    ...mapMutations(['SET_APLICAR_FILTRO']),
    async getAlarmas() {
      this.loading = true

      const tags = this.tiposSeleccionados.join(',')
      await axios
        .get('alarmas/reportes', {
          params: {
            desde: this.desde,
            hasta: this.hasta,
            tags: `(${tags})`,
            reconocidas: this.reconocida
          }
        })
        .then(response => {
          this.alarmas = response.data
          this.loading = false
        })
    },
    async getEquipos() {
      await axios.get('tipo_equipos?perPage=200').then(response => {
        this.itemsTipos = response.data.data
      })
    },
    exportToCSV() {
      const fileName = 'reportes_fallas'
      const exportType = 'csv'
      const data = this.alarmas.map(alarma => {
        return {
          Equipo: alarma.equipo,
          Nombre: alarma.nombre,
          Duracion: alarma.duracion,
          Recurrencia: alarma.cantidad
        }
      })
      exportFromJSON({ data, fileName, exportType })
    }
  }
}
</script>
