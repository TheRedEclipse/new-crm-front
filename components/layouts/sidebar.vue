<template>
  <div class="sidebar h-100">
    <div class="d-flex flex-column align-items-center">
      <Logo class="p-3" />
      <!-- <div class="w-100 mt-2 px-3">
        <UserPanel />
      </div> -->
      <div class="w-100">
        <Navigation />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Logo: () => import('~/components/layouts/logo'),
    Navigation: () => import('~/components/layouts/navigation'),
  },
}
</script>

<style>
.sidebar {
  width: 100%;
  background: linear-gradient(180deg, #27a9ff 0%, #0570cf 88.92%, #0068c9 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
