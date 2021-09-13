<template>
  <div
    class="page-navigation col-12 col-lg-8 mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end"
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
          icon="question_bubble"
          modal="estimate_create_question_modal"
          :title="$t('actions.newQuestion.title')"
        />
        <NavigationPropertyItem
          icon="new_note"
          modal="estimate_create_note_modal"
          :title="$t('actions.newNote.title')"
        />
        <NavigationPropertyItem
          icon="attachment"
          modal="estimate_create_attachment_modal"
          :title="$t('actions.newAttachment.title')"
        />
        <NavigationPropertyItem
          icon="attachment_download"
          modal="estimate_insert_estimate_template_modal"
          :title="$t('actions.insertTemplate.title')"
        />
        <NavigationPropertyItem
          to="/"
          icon="attachment_download"
          :title="$t('actions.uploadCsv.title')"
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
