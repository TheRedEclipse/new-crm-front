<template>
  <div
    class="page-navigation col-12 col-lg-6 mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end"
  >
    <!-- <div class="d-flex w-100 overflow-x-scroll overflow-x-lg-scroll"> -->
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
          modal="leads_create_note_modal"
          :title="$t('actions.newNote.title')"
        />
        <NavigationPropertyItem
          icon="estimate"
          modal="leads_create_estimate_modal"
          :title="$t('actions.newEstimate.title')"
        />
        <NavigationPropertyItem
          icon="contacts"
          modal="leads_create_contact_modal"
          :title="$t('actions.newContact.title')"
        />
        <NavigationPropertyItem
          icon="attachment"
          modal="leads_create_attachment_modal"
          :title="$t('actions.newAttachment.title')"
        />
        <!-- <NavigationPropertyItem
            icon="activity"
            modal="leads_create_activity_modal"
          >
            <span v-html="$t('actions.new_activity.title')"></span>
          </NavigationPropertyItem> -->
        <NavigationPropertyItem
          icon="check"
          modal="leads_create_task_modal"
          :title="$t('actions.newTask.title')"
        />
        <NavigationPropertyItem
          icon="question"
          modal="leads_create_question_modal"
          :title="$t('actions.newQuestion.title')"
        />
        <NavigationPropertyItem
          icon="email"
          modal="leads_create_email_modal"
          :title="$t('actions.newEmail.title')"
        />
        <NavigationPropertyItem
          icon="request"
          modal="leads_create_request_modal"
          :title="$t('actions.newRequest.title')"
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
