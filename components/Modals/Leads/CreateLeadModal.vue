<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    id="leads_create_lead_modal"
    title-class="text-left"
    title="New lead"
    hide-footer
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <form @submit.prevent="create">
          <div class="form-group">
            <label>Name</label>
            <div class="row">
              <div class="col-12 col-lg-6">
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
              <div class="col-12 col-lg-6 mt-3 mt-lg-0">
                <input
                  v-model="form.last_name"
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="form-group">
                <label>EMail</label>
                <input
                  v-model="form.email"
                  type="email"
                  :class="`form-control ${
                    validation.email ? `is-invalid` : ``
                  }`"
                  placeholder="email@example.com"
                />
                <div class="invalid-feedback">
                  <div
                    v-for="(error, i) in validation.email"
                    :key="`errors-email-${i}`"
                  >
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Phone</label>
                <masked-input
                  v-model="form.phone"
                  :guide="false"
                  placeholder-char="#"
                  :mask="[
                    '+',
                    '1',
                    ' ',
                    '(',
                    /[1-9]/,
                    /\d/,
                    /\d/,
                    ')',
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]"
                  type="text"
                  class="form-control"
                  placeholder="+1 (234) 567-89-00"
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
                  v-model="selected.state"
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
              Create
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
  data() {
    return {
      states,
      form: {
        phone: '',
      },
      selected: {
        state: null,
      },
      validation: {},
    }
  },
  methods: {
    create() {
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '')
      this.form.state = this.selected.state?.id
      this.error = {}
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/leads`, this.form)
        .then((res) => {
          this.$bvModal.hide(`leads_create_lead_modal`)
          this.$router.push({ path: `/leads/${res.data.data.lead.id}` })
        })
        .catch((err) => {
          this.validation = err.response.data.validation
        })
    },
  },
}
</script>
