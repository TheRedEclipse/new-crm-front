<template>
  <div>
    <Header :breadcrumbs="breadcrumbs" />
    <div class="px-4 pt-4 pb-2 page-outline-content page-min-height">
      <div class="d-flex align-items-center justify-content-between">
        <h1>
          <slot name="title" />
        </h1>
        <slot name="button" />
      </div>
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import('~/components/layouts/header'),
  },
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.page-min-height {
  min-height: calc(100vh - 192px);
  margin-bottom: 95px;
}
.page-outline-content {
  margin-top: 96px;
}
</style>
