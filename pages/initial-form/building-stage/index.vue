<template>
  <div class="initial-content-area">
    <ProgressBar :step="2" />
    <div class="initial-content-area__workspace">
      <BuildingStage />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    BuildingStage: () => import('~/components/Pages/InitialForm/BuildingStage'),
    ProgressBar: () => import('~/components/Pages/InitialForm/ProgressBar'),
  },
  layout: 'empty',
}
</script>
