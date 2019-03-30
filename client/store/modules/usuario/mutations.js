export const SET_ACCOUNT = 'SET_ACCOUNT'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export const SET_ACCOUNTS = 'SET_ACCOUNTS'
export const PUSH_ACCOUNTS = 'PUSH_ACCOUNTS'
export const SPLICE_ACCOUNTS = 'SPLICE_ACCOUNTS'
export const MODAL_ADD_ACCOUNT = 'MODAL_ADD_ACCOUNT'
export const MODAL_EDIT_ACCOUNT = 'MODAL_EDIT_ACCOUNT'
export const MODAL_REMOVE_ACCOUNT = 'MODAL_REMOVE_ACCOUNT'
export const MODAL_CHANGE_PASSWORD_ACCOUNT = 'MODAL_CHANGE_PASSWORD_ACCOUNT'

const mutations = {
  [SET_ACCOUNT](state, account) {
    state.account = account
  },
  [SET_ACCESS_TOKEN](state, accessToken) {
    state.accessToken = accessToken
  },
  [SET_ACCOUNTS](state, accounts) {
    state.accounts = accounts
  },
  [PUSH_ACCOUNTS](state, item) {
    state.accounts.push(item)
  },
  [SPLICE_ACCOUNTS](state, item) {
    state.accounts.splice(state.accounts.indexOf(item), 1)
  },
  [MODAL_ADD_ACCOUNT](state, modal) {
    state.modalAddAccount = modal
  },
  [MODAL_EDIT_ACCOUNT](state, modal) {
    state.modalEditAccount = modal
  },
  [MODAL_REMOVE_ACCOUNT](state, modal) {
    state.modalRemoveAccount = modal
  },
  [MODAL_CHANGE_PASSWORD_ACCOUNT](state, modal) {
    state.modalChangePasswordAccount = modal
  }
}

export default mutations
