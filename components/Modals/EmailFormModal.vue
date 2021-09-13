<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal :id="id" title-class="text-left" title="New email" hide-footer>
    <form @submit.prevent="store">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-10">
          <div class="form-group">
            <label>Subject</label>
            <input
              v-model="localForm.subject"
              type="text"
              class="form-control"
              placeholder="Enter subject..."
            />
          </div>
          <div class="form-group mb-0">
            <label>Description</label>
            <textarea
              v-model="localForm.text"
              class="form-control"
              style="min-height: 150px"
              placeholder="Enter description..."
            ></textarea>
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
    form: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      localForm: { ...this.form },
    }
  },
  methods: {
    store() {
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
      this.localForm = {}
    },
  },
}
</script>
