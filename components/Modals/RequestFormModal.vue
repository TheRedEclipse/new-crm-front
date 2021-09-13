<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal :id="id" title-class="text-left" title="New request" hide-footer>
    <form @submit.prevent="store">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-10">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Due date</label>
                <b-form-datepicker
                  id="task-datepicker"
                  v-model="localForm.date"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                  locale="en-US"
                />
              </div>
            </div>
            <div class="col-12 col-md-6 mt-3 mt-md-0">
              <div class="form-group">
                <label>Due time</label>
                <b-form-timepicker
                  id="task-timepicker"
                  v-model="localForm.time"
                  locale="en-US"
                />
              </div>
            </div>
          </div>
          <div class="form-group mb-0">
            <label>Description</label>
            <textarea
              v-model="localForm.request_information"
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
      this.$emit('create', this.localForm)
      this.localForm = {}
    },
  },
}
</script>
