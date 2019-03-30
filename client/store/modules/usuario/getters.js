const getters = {
  account(state) {
    return state.account
  },
  accessToken(state) {
    return state.accessToken
  },
  accounts(state) {
    return state.accounts
  },
  modalAddAccount(state) {
    return state.modalAddAccount
  },
  modalEditAccount(state) {
    return state.modalEditAccount
  },
  modalRemoveAccount(state) {
    return state.modalRemoveAccount
  },
  modalChangePasswordAccount(state) {
    return state.modalChangePasswordAccount
  }
}

export default getters
