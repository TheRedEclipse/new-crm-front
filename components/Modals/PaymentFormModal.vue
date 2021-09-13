<template>
  <!-- dialog-class="modal-rounded" -->
  <!-- projects_create_payments_modal -->
  <b-modal :id="id" title-class="text-left" title="Add Payment" hide-footer>
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <form @submit.prevent="store">
          <div class="form-group">
            <label>Amount</label>
            <div class="row">
              <div class="col-12 col-lg-12">
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
              <div class="col-12 col-lg-12 mt-3 mt-lg-3">
                <label>Status</label>
                <multiselect
                  v-model="form.state"
                  :options="states"
                  placeholder="Select status"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12">
              <div class="form-group">
                <label>Date</label>
                <input
                  v-model="form.email"
                  type="date"
                  class="form-control"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center w-100 mb-n3 mt-4">
            <button
              type="submit"
              class="button button-outline-primary w-35 justify-content-center"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
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
      this.$emit(this.form ? 'update' : 'create', this.localForm)
    },
  },
}
</script>
