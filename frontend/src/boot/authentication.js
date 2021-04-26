export default ({ store }) => {
  // Set i18n instance on app
  store.dispatch('system/updateRefreshToken')
}
