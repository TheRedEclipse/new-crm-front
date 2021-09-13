<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    :id="id"
    title-class="text-left"
    title="Edit lead"
    hide-footer
    size="xl"
    centered
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <form @submit.prevent="update">
          <div class="row">
            <div class="col-12 col-lg-4">
              <label>Name</label>
              <input
                :value="form.user ? form.user.name : `-`"
                disabled
                type="text"
                class="form-control"
                placeholder="First name"
              />
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
              <label>Last name</label>
              <input
                :value="form.user ? form.user.last_name : `-`"
                disabled
                type="text"
                class="form-control"
                placeholder="Last name"
              />
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
              <div class="form-group">
                <label>EMail</label>
                <input
                  :value="form.user ? form.user.email : `-`"
                  disabled
                  type="email"
                  class="form-control"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
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
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
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
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
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
            <div class="col-12 col-lg-4">
              <div class="form-group">
                <label>State</label>
                <multiselect
                  v-model="form.state"
                  :options="states"
                  placeholder="Select state"
                />
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
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
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
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

          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label>Company</label>
                <input
                  v-model="form.company"
                  type="text"
                  class="form-control"
                  placeholder="Enter a company"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label>Project Description</label>
                <textarea
                  v-model="form.project_description"
                  class="form-control"
                  placeholder="Enter a few words..."
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-4">
              <div class="form-group">
                <label>Title</label>
                <input
                  v-model="form.title"
                  type="text"
                  class="form-control"
                  placeholder="Enter a title"
                />
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Lead Referral Source</label>
                <input
                  v-model="form.lead_referral_source"
                  type="text"
                  class="form-control"
                  placeholder="Lead Referral Source"
                />
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Date of Initial Contact</label>
                <b-form-datepicker
                  id="task-datepicker"
                  v-model="form.contact_initialized_at"
                  locale="en-US"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-4">
              <div class="form-group">
                <label>Industry</label>
                <input
                  v-model="form.industry"
                  type="text"
                  class="form-control"
                  placeholder="Enter a industry"
                />
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Status</label>
                <multiselect
                  v-model="selected.status"
                  :options="statuses"
                  track-by="id"
                  label="title"
                  placeholder="Select status"
                />
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Rating</label>
                <input
                  v-model="form.rating"
                  type="number"
                  class="form-control"
                  placeholder="Enter a rating"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-4">
              <div class="form-group">
                <label>Budget</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                  </div>
                  <input
                    v-model="form.budget"
                    type="number"
                    step="0.01"
                    min="0.00"
                    class="form-control"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Project type</label>
                <input
                  v-model="form.project_type"
                  type="text"
                  class="form-control"
                  placeholder="Enter a type"
                />
              </div>
            </div>
            <div class="col-12 col-lg-4 mt-3 mt-lg-0">
              <div class="form-group">
                <label>Current estimate</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                  </div>
                  <input
                    v-model="form.current_estimate_budget"
                    type="number"
                    step="0.01"
                    min="0.00"
                    class="form-control"
                    placeholder="0.00"
                  />
                </div>
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
import statuses from '~/data/leads/statuses'

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
      form: {
        ...this.element,
        ...this.element?.address,
      },
      statuses,
      selected: {
        // state: this.element.address?.state,
        status:
          statuses[statuses.findIndex((q) => q.title === this.element.status)],
      },
    }
  },
  watch: {
    element(val) {
      this.form = { ...val, ...val?.address }
    },
  },
  methods: {
    update() {
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '')
      // this.form.state = this.selected.state
      this.form.status_id = this.selected.status?.id
      this.$axios
        .put(
          `${process.env.API_DOMAIN}/api/v1/leads/${this.element.id}`,
          this.form
        )
        .then((res) => {
          this.$bvModal.hide(this.id)
          this.$emit('updated', true)
        })
    },
  },
}
</script>
