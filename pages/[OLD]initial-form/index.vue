<template>
  <div class="container">
    <Main :lead="lead" />
  </div>
</template>

<script>
export default {
  components: {
    Main: () => import('~/components/Pages/InitialForm/Main'),
  },
  async asyncData({ $axios, store, route }) {
    let lead
    const id = route.query.id
    const curentUser = store.getters['user/currentUser']

    if (curentUser?.access_token) {
      if (
        Number(id) !== undefined &&
        curentUser?.user?.permissions['request.store'] &&
        !curentUser?.user?.permissions['-request.store']
      ) {
        lead = await $axios.get(
          `${process.env.API_DOMAIN}/api/v1/leads/user/${Number(id)}`
        )
      } else
        lead = await $axios.get(`${process.env.API_DOMAIN}/api/v1/leads/user`)
    }
    return { lead: lead?.data?.data?.lead }
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
.container {
  width: 75%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
