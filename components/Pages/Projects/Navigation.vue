<template>
  <div
    class="page-navigation col-12 col-lg-8 mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end"
  >
    <div class="d-flex w-100 overflow-x-scroll overflow-x-lg-scroll">
      <NavigationPropertyItem icon="new_note" modal="test">
        <span v-html="$t('actions.add_bidders.title')"></span>
      </NavigationPropertyItem>

      <NavigationPropertyItem
        icon="new_note"
        modal="contacts_create_note_modal"
      >
        <span v-html="$t('actions.assignWorkers.title')"></span>
      </NavigationPropertyItem>

      <NavigationPropertyItem
        icon="estimate"
        modal="projects_create_payments_modal"
      >
        <span v-html="$t('actions.addPayment.title')"></span>
      </NavigationPropertyItem>

      <NavigationPropertyItem
        icon="estimate"
        modal="projects_create_payout_modal"
      >
        <span v-html="$t('actions.addPayout.title')"></span>
      </NavigationPropertyItem>

      <NavigationPropertyItem
        icon="attachment_download"
        modal="projects_generate_document_modal"
      >
        <span v-html="$t('actions.generateDocument.title')"></span>
      </NavigationPropertyItem>

      <NavigationPropertyItem icon="awards" modal="leads_create_task_modal">
        <span v-html="$t('actions.newTask.title')"></span>
      </NavigationPropertyItem>

      <NavigationPropertyItem
        icon="attachment"
        modal="leads_create_attachment_modal"
      >
        <span v-html="$t('actions.newAttachment.title')"></span>
      </NavigationPropertyItem>

      <NavigationPropertyItem
        icon="new_note"
        modal="contacts_create_note_modal"
      >
        <span v-html="$t('actions.newNote.title')"></span>
      </NavigationPropertyItem>

      <NavigationPropertyItem
        icon="download_cloud"
        modal="contacts_create_note_modal"
      >
        <span v-html="$t('actions.newChangeOrder.title')"></span>
      </NavigationPropertyItem>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    NavigationPropertyItem: () =>
      import('~/components/layouts/NavigationPropertyItem'),
  },
}
</script>
