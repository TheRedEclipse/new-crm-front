<template>
  <div class="initial-component w-100">
    <HeaderComponent :number="4" :title="`Existing condition photos`" />
    <AddFile class="mt-3" :room="room" :variety="`condition`" />
  </div>
</template>
<script>
export default {
  components: {
    AddFile: () => import('~/components/Pages/InitialForm/components/AddFile'),
    HeaderComponent: () =>
      import('~/components/Pages/InitialForm/components/HeaderComponent'),
  },
  props: {
    room: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
}
</script>
