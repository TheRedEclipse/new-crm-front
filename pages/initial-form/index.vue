<template>
  <div class="container">
    <Main />
  </div>
</template>

<script>
export default {
  components: {
    Main: () => import('~/components/Pages/InitialForm/Main'),
  },

  data() {
    return {}
  },
  mounted() {},
  layout: 'empty',
  methods: {},
}
</script>

<style lang="scss">
body {
  background: #fff;
}
.container {
  width: 75%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
