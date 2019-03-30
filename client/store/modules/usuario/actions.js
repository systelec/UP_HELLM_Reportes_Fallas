import {
  SET_ACCOUNT,
  SET_ACCOUNTS,
  PUSH_ACCOUNTS,
  SPLICE_ACCOUNTS
} from './mutations'
import { alertSuccess, alertError } from '../../default'
import Cookie from 'js-cookie'

const actions = {
  async getAllaccounts(context, payload) {
    let filter = Util.formatFilter(payload)
    await axios
      .get('accounts', { params: { filter } })
      .then(response => context.commit(SET_ACCOUNTS, response.data))
  },
  async loginAccount(context, payload) {
    await axios
      .post('accounts/login', payload.content)
      .then(response => {
        context.commit(SET_AUTH, true)
        Cookie.set('accessToken', response.data.id)
        Cookie.set('userId', response.data.userId)
      })
      .catch(error => {
        alertError(error.response.data.error.message)
      })
  },
  async logoutAccount(context) {
    Cookie.remove('accessToken')
    context.commit(SET_ACCOUNT, null)
  },
  async changePasswordAccount(context, payload) {
    await axios
      .put('accounts/change-password', payload.content)
      .then(response => {
        alertSuccess()
      })
      .catch(error => {
        alertError(error.response.data.error.message)
      })
  },
  async createAccount(context, payload) {
    await axios
      .post('accounts', payload.content)
      .then(response => {
        context.commit(PUSH_ACCOUNTS, response.data)
        alertSuccess()
      })
      .catch(error => {
        alertError(error.response.data.error.message.message)
      })
  },
  async updateAccount(context, payload) {
    await axios
      .put('accounts/' + payload.content.id, payload.content)
      .then(response => {
        alertSuccess()
      })
      .catch(error => {
        alertError(error.response.data.error.message)
      })
  },
  async deleteAccount(context, payload) {
    await axios
      .delete('accounts/' + payload.content.id)
      .then(response => {
        context.commit(SPLICE_ACCOUNTS, payload.content)
        alertSuccess()
      })
      .catch(error => {
        alertError(error.response.data.error.message)
      })
  }
}

export default actions
