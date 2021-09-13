<template>
  <b-modal
    :id="id"
    dialog-class="modal-rounded"
    title-class="text-left"
    title="Edit bidders"
    hide-footer
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <form @submit.prevent="update">
          <div class="form-group">
            <label>Subcontractors</label>
            <div class="row">
              <div class="col-12 col-lg-6">
                <multiselect
                  v-model="subcontractors"
                  :options="states"
                  placeholder="Select state"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label>Status</label>
                <multiselect
                  v-model="status"
                  :options="states"
                  placeholder="Select state"
                />
              </div>
            </div>
            <div class="col-12 col-lg-6 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Number of bids</label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label>Reuqest Last Sent</label>
                <input
                  v-model="form.address"
                  type="text"
                  class="form-control"
                  placeholder="Reuqest Last Sent"
                />
              </div>
            </div>
            <div class="col-12 col-lg-6 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Send Request</label>
                <input
                  v-model="form.street"
                  type="text"
                  class="form-control"
                  placeholder="Send Request"
                />
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center w-100 mb-n3 mt-4">
            <button
              type="submit"
              class="button button-outline-primary w-35 justify-content-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>
import states from '~/data/states'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    element: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      states,
      form: {},
      status: 'demo status',
      subcontractors: 'demo subctr',
    }
  },
  watch: {
    element(val) {
      this.form = val
    },
  },
  mounted() {
    this.form = this.element
  },
  methods: {
    update() {
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '')
      this.$axios
        .put(
          `${process.env.API_DOMAIN}/api/v_1/contacts/${this.element.id}`,
          this.form
        )
        .then((res) => {
          this.$bvModal.hide(this.id)
          this.$emit('update', true)
        })
    },
  },
}
</script>
