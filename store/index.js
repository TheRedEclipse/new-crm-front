export const actions = {
  nuxtServerInit(store, context) {
    if (this.$cookies.get('token')) {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/auth/me`)
        .then((response) => {
          store.commit('user/refreshed', { user: response.data.user })
        })
        .catch((err) => {
       /*   console.log(err) */
        })
    }
  },
}
