<template>
  <header class="header">
    <div>
      <b-breadcrumb
        class="header__breadcrumbs"
        :items="breadcrumbs"
      ></b-breadcrumb>
      <h1 class="header__title">{{ title }}</h1>
    </div>
    <UserPanel />
  </header>
</template>

<script>
export default {
  components: {
    UserPanel: () => import('~/components/layouts/userPanel'),
  },
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    title() {
      return this.breadcrumbs[this.breadcrumbs.length - 1].text
    },
  },
}
</script>

<style lang="scss">
.header {
  min-height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.7rem;
  background: #ffffff;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.06);
  z-index: 200;
  position: fixed;
  width: calc(100vw - 90px);
  top: 0;
}
</style>
