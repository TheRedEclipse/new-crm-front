<template>
  <div class="initial-content-area">
    <ProgressBar :step="5" />
    <div class="initial-content-area__workspace">
      <RoomSelector />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    RoomSelector: () => import('~/components/Pages/InitialForm/RoomSelector'),
    ProgressBar: () => import('~/components/Pages/InitialForm/ProgressBar'),
  },
  data() {
    return {}
  },
  layout: 'empty',
  methods: {},
}
</script>

<style lang="scss" scoped>
body {
  background: #fff;
}
</style>
