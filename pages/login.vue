<template>
  <div class="container">
    <div class="row justify-content-center align-items-center login-page">
      <div class="col-12 col-md-4">
        <div class="px-3 d-flex align-items-center mb-4">
          <Logo class="mr-4" />
          <div>
            <h1 class="h2">Sign-In</h1>
            <div class="text-gray mt-1">Log in to your account</div>
          </div>
        </div>
        <form class="form p-3 mt-2" @submit.prevent="login">
          <div class="form-group">
            <label>EMail</label>
            <input
              v-model="form.email"
              type="text"
              name="email"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              v-model="form.password"
              type="password"
              name="password"
              class="form-control"
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Log in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Logo: () => import('~/components/layouts/logo'),
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push('/')
    }
  },
  layout: 'empty',
  methods: {
    login() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/auth/login`, this.form)
        .then((response) => {
          this.$store.dispatch('user/logined', { user: response.data.data })
          this.$cookies.set('token', response.data.data.access_token, {
            path: '/',
            maxAge: response.data.data.expires_in,
          })
          if (Object.keys(response.data.data.user.roles).length > 0)
            this.$laravel.setRoles(Object.keys(response.data.data.user.roles))
          if (Object.keys(response.data.data.user.permissions).length > 0)
            this.$laravel.setPermissions(
              Object.keys(response.data.data.user.permissions)
            )
          this.$router.push('/')
        })
    },
  },
}
</script>

<style lang="scss">
.login-page {
  height: 100vh;
}
</style>
