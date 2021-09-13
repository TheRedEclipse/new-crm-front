<template>
  <div
    class="page-navigation col-12 col-lg-6 mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end"
  >
    <!-- <div class="d-flex justify-content-xl-end w-100 overflow-x-scroll"> -->
    <client-only>
      <carousel
        :items="9"
        :nav="false"
        :dots="false"
        :autoplay="false"
        class="page-navigation__slider"
      >
        <NavigationPropertyItem
          icon="new_note"
          modal="contacts_create_note_modal"
          :title="$t('actions.newNote.title')"
        />
        <NavigationPropertyItem
          icon="email"
          modal="contacts_create_email_modal"
          :title="$t('actions.newEmail.title')"
        />
      </carousel>
    </client-only>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  components: {
    NavigationPropertyItem: () =>
      import('~/components/layouts/NavigationPropertyItem'),
    Carousel: () => (process.client ? import('vue-owl-carousel') : null),
  },
}
</script>
