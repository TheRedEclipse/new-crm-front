<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal :id="id" title-class="text-left" title="New contact" hide-footer>
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <form @submit.prevent="store">
          <div class="form-group">
            <label>Name</label>
            <div class="row">
              <div class="col-12 col-lg-6">
                <input
                  v-model="localForm.name"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
              </div>
              <div class="col-12 col-lg-6 mt-3 mt-lg-0">
                <input
                  v-model="localForm.last_name"
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
                  v-model="localForm.email"
                  type="email"
                  :class="`form-control ${
                    localErrors.email ? `is-invalid` : ``
                  }`"
                  placeholder="email@example.com"
                />
                <div class="invalid-feedback">
                  <div
                    v-for="(error, i) in localErrors.email"
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
                  v-model="localForm.phone"
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
                  v-model="localForm.address"
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
                  v-model="localForm.street"
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
                  v-model="localForm.state"
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
                  v-model="localForm.city"
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
                  v-model="localForm.zip"
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
  props: {
    id: {
      type: String,
      required: true,
    },
    form: {
      type: Object,
      required: false,
      default: () => {
        return {
          phone: '',
        }
      },
    },
    errors: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      states,
      localForm: { ...this.form, ...this.form?.address },
      localErrors: { ...this.errors },
    }
  },
  watch: {
    form(val) {
      this.localForm = { ...val, ...val?.address }
    },
    errors(val) {
      this.localErrors = { ...val }
    },
  },
  methods: {
    store() {
      this.localForm.phone = this.localForm.phone.replace(/[^0-9]/g, '')
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
    },
  },
}
</script>
