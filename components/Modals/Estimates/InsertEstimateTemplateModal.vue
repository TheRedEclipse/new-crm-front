<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    id="estimate_insert_estimate_template_modal"
    title-class="text-left"
    title="Insert template"
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <div class="text-neitral text-center form-group">
          This will insert all line items from the selected template.
        </div>
        <div class="form-group mb-0 mt-4">
          <label>Template</label>
          <multiselect
            v-model="selected"
            :options="options"
            placeholder="Enter template"
          >
          </multiselect>
        </div>
      </div>
    </div>

    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <button
          class="button button-outline-primary w-35 justify-content-center"
        >
          Okey
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: ['Template 1', 'Kitchen Template', 'My awesome template'],
    }
  },
}
</script>
