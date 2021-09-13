<template>
  <div class="layout d-flex">
    <div class="layout__sidebar position-fixed h-100">
      <Sidebar />
    </div>
    <div class="layout__content h-100">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Sidebar: () => import('~/components/layouts/sidebar'),
  },
}
</script>

<style lang="scss">
.layout {
  min-height: 100vh;

  &__sidebar {
    // width: 260px;
    width: 90px;
    z-index: 999;
  }
  &__content {
    // width: calc(100% - 260px);
    width: calc(100% - 90px);
    margin-left: 90px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
