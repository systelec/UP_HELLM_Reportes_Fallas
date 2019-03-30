import { SET_USERS } from './mutations'
import axios from '@/plugins/axios'

const actions = {
  async getAllUsers(context, payload) {
    payload = payload ? payload : {}
    await axios
      .get('users', { params: payload.params })
      .then(response => {
        context.commit(SET_USERS, response.data)
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async createUser(context, payload) {
    await axios
      .post('users', payload.content)
      .then(response => {
        context.dispatch('getAllUsers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async updateUser(context, payload) {
    await axios
      .put(`users/${payload.content.id}`, payload.content)
      .then(response => {
        context.dispatch('getAllUsers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  async deleteUser(context, payload) {
    await axios
      .delete(`users/${payload.content.id}`)
      .then(response => {
        context.dispatch('getAllUsers')
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export default actions
