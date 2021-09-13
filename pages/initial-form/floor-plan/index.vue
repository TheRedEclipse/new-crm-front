<template>
  <div class="content-area">
    <ProgressBar :step="4" />
    <div class="content-area__workspace">
      <FloorPlan />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    FloorPlan: () => import('~/components/Pages/InitialForm/FloorPlan'),
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
.content-area {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  &__workspace {
    margin-left: 25%;
    min-height: 100%;
  }
}
</style>
