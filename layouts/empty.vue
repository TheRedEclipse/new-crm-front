<template>
  <div class="layout-empty d-flex">
    <div class="layout-empty__content h-100">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">
.layout-empty {
  min-height: 100vh;

  &__content {
    width: 100%;
  }
}
</style>
