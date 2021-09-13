<template>
  <b-modal
    :id="id"
    dialog-class="modal-rounded"
    title-class="text-left"
    title="Edit project"
    hide-footer
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <form @submit.prevent="update">
          <div class="form-group">
            <label>Project name</label>
            <div class="row">
              <div class="col-12 col-lg-12">
                <input
                  v-model="form.lead"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label>Address</label>
                <input
                  v-model="form.address"
                  type="text"
                  class="form-control"
                  placeholder="Enter a location"
                />
              </div>
            </div>
            <div class="col-12 col-lg-6 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Street address</label>
                <input
                  v-model="form.street"
                  type="text"
                  class="form-control"
                  placeholder="Enter a street address"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label>State</label>
                <multiselect
                  v-model="form.state"
                  :options="states"
                  placeholder="Select state"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label>City</label>
                <input
                  v-model="form.city"
                  type="text"
                  class="form-control"
                  placeholder="Enter a city"
                />
              </div>
            </div>
            <div class="col-12 col-lg-6 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Zip</label>
                <input
                  v-model="form.zip"
                  type="text"
                  minlength="1"
                  maxlength="9"
                  class="form-control"
                  placeholder="Enter a zip"
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
