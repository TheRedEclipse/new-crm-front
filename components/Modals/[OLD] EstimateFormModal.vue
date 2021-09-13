<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    id="estimate_create_estimate_modal"
    title-class="text-left"
    title="New estimate"
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <div class="form-group">
          <label>Lead</label>
          <multiselect
            v-model="form.lead"
            :options="leads"
            placeholder="Enter value"
          />
        </div>

        <div class="form-group">
          <label>Type</label>
          <multiselect
            v-model="form.type"
            :options="types"
            placeholder="Enter value"
          />
        </div>

        <div class="form-group">
          <label>Job name</label>
          <multiselect
            v-model="form.job_name"
            :options="jobNames"
            placeholder="Enter value"
          />
        </div>
      </div>
    </div>

    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <button
          class="button button-outline-primary w-35 justify-content-center"
        >
          Create
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      leads: ['Lead 1', 'Lead 2', 'lead 3'],
      types: ['Pre-Estimate', 'Final estimate'],
      jobNames: [
        'Interior Project - Apartment',
        'Interior Project - House',
        'Interior Project - Commercial',
      ],
      form: {
        lead: null,
        type: null,
        job_name: null,
      },
    }
  },
}
</script>
