<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal :id="id" title-class="text-left" title="New estimate" hide-footer>
    <form @submit.prevent="store">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-10">
          <div class="form-group mb-0">
            <label>Type</label>
            <multiselect
              v-model="selected.type"
              :options="types"
              label="title"
              track-by="id"
              placeholder="Select type"
            />
          </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center my-4">
        <div class="col-10">
          <div class="form-group mb-0">
            <label>Job name</label>
            <multiselect
              v-model="selected.job_name"
              :options="jobs"
              label="title"
              track-by="id"
              placeholder="Select job"
            />
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center w-100 mt-4">
        <button
          type="submit"
          class="button button-outline-primary w-35 justify-content-center"
        >
          Create
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      jobs: [
        {
          id: 1,
          title: 'Interior project - Apartment',
        },
        {
          id: 2,
          title: 'Interior project - House',
        },
        {
          id: 3,
          title: 'Interior project - Commercial',
        },
      ],
      types: [
        {
          id: 1,
          title: 'Pre-Estimate',
        },
        {
          id: 2,
          title: 'Final estimate',
        },
      ],
      selected: {
        type: null,
        job_name: null,
      },
      localForm: {},
    }
  },
  methods: {
    store() {
      this.localForm.type = this.selected.type.id
      this.localForm.job_name = this.selected.job_name.id
      this.$emit('create', this.localForm)
      this.localForm = {}
    },
  },
}
</script>
