<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-start flex-wrap login-page"
    >
      <div class="col-12 col-md-12">
        <div class="">
          <Logo class="mt-4" />
        </div>
      </div>
      <FormPanel class="col-5" @increaseProgress="increaseProgress" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Logo: () => import('~/components/layouts/logo'),
    FormPanel: () => import('~/components/Pages/FeedbackForm/Form-panel'),
  },
  data() {
    return {
      form: {},
      status: 'width: 15%',
    }
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push('/')
    }
  },
  layout: 'empty',
  methods: {
    increaseProgress(status) {
      this.status = 'width: ' + status
    },
  },
}
</script>

<style lang="scss">
.login-page {
  height: 100vh;
}
.container {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
