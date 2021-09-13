<template>
  <div class="content-area">
    <ProgressBar :step="1" />
    <div class="content-area__workspace">
      <BuildingType />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    BuildingType: () => import('~/components/Pages/InitialForm/BuildingType'),
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
