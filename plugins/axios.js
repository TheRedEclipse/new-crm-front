import qs from 'qs'

/* eslint-disable no-prototype-builtins */
export default function ({ $axios, store, app }) {
  $axios.interceptors.request.use(
    (config) => {
      config.headers.common.Language = app.i18n.locale
      config.headers.common.Authorization = `Bearer ${
        app.$cookies.get('token') || store.state.user.currentUser.access_token
      }`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  $axios.onRequest((config) => {
    config.paramsSerializer = (params) =>
      qs.stringify(params, { arrayFormat: 'indices' })
    return config
  })

  $axios.interceptors.response.use(
    (success) => {
      if (success.data.hasOwnProperty('messages')) {
        const obj = success.data.messages
        if (typeof obj === 'string') {
          if (success.data.success) {
            if (process.client) app.$toast.success(obj)
          } else if (process.client) app.$toast.error(obj)
        } else {
          for (const key in obj) {
            if (success.data.success) {
              if (process.client) app.$toast.success(obj[key])
            } else if (process.client) app.$toast.error(obj[key])
          }
        }
      }

      if (success.data.success && success.data.hasOwnProperty('redirect')) {
        if (success.data.redirect.type === 'back') {
          app.router.go(-1)
        } else if (success.data.redirect.type === 'external') {
          if (process.client) document.location = success.data.redirect.link
        } else if (process.client) app.router.push(success.data.redirect.link)
        return
      }

      return Promise.resolve(success)
    },
    (error) => {
      // const originalRequest = error.config
      if (
        error.response &&
        error.response.status === 401
        // && originalRequest.url === `${process.env.API_DOMAIN}/api/v_1/auth/refresh`
      ) {
        app.$toast.error(app.i18n.t('error.401'))
        store.commit('logout')
        app.router.push('/login')
        return Promise.reject(error)
      }

      /* if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        return $axios
          .post(`${process.env.API_DOMAIN}/api/v_1/auth/refresh`)
          .then((response) => {
            // if (response.status === 201) {
            store.dispatch('user/logined', { user: response.data })
            app.$cookies.set('token', response.data.access_token, {
              path: '/',
              maxAge: response.data.expires_in,
            })

            $axios.defaults.headers.common.Authorization =
              'Bearer ' + app.$cookies.get('token')
            return $axios(originalRequest)
            // }
          })
      } else */ if (
        error.response &&
        !error.response.data.success &&
        error.response.data.hasOwnProperty('messages') &&
        process.client
      ) {
        const obj = error.response.data.messages
        if (typeof obj === 'string') {
          app.$toast.error(obj)
        } else {
          for (const key in obj) {
            app.$toast.error(obj[key])
          }
        }
      } else if (error.response && error.response.status >= 500) {
        if (process.client) app.$toast.error(app.i18n.t('error.500'))
      }

      return Promise.reject(error)
    }
  )
}
