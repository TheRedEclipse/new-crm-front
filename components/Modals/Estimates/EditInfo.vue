<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    id="estimate_edit_estimate_info_modal"
    title-class="text-left"
    title="Edit Estimate Details"
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <div class="form-group mb-0 mt-4">
          <label>Type</label>
          <multiselect v-model="selected" :options="options" placeholder="Type">
          </multiselect>
        </div>
        <div class="form-group mb-0 mt-4">
          <label>Job Name</label>
          <input
            type="text"
            class="form-control"
            value="Appartaments modern construction"
          />
        </div>
        <div class="form-group mb-0 mt-4">
          <label>Lead</label>
          <input type="text" class="form-control" value="Matvei Buriev" />
        </div>
        <div class="form-group mb-0 mt-4">
          <label>E-mail</label>
          <input
            type="text"
            class="form-control"
            value="burievmarvei@gmail.com"
          />
        </div>
        <div class="form-group mb-0 mt-4">
          <label>Phone</label>
          <input type="text" class="form-control" value="+ 1 911 583 77 57" />
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
      options: ['Pre-Estimate'],
    }
  },
}
</script>
