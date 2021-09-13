<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal :id="id" title-class="text-left" title="New note" hide-footer>
    <form @submit.prevent="store">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-10">
          <div class="form-group mb-0">
            <label>Description</label>
            <textarea
              v-model="localForm.notes"
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
    elementId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      localForm: {
        lead: this.elementId,
        notes: '',
      },
    }
  },
  methods: {
    store() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v_1/notes`, this.localForm)
        .then((res) => {
          this.localForm.notes = ''
          this.$bvModal.hide(this.id)
          this.$emit('saved', true)
        })
    },
  },
}
</script>
