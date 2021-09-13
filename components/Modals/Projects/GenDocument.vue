<template>
  <b-modal
    id="projects_generate_document_modal"
    dialog-class="modal-rounded"
    title-class="text-left"
    title="Generate document"
    hide-footer
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <form @submit.prevent="create">
          <div class="form-group">
            <div class="col-12 col-lg-12 mt-3 mt-lg-3">
              <label>Select document type</label>
              <multiselect
                v-model="form.state"
                :options="states"
                placeholder="Select document type"
              />
            </div>
            <div class="d-flex justify-content-center w-100 mb-n3 mt-4">
              <button
                type="submit"
                class="button button-outline-primary w-35 justify-content-center"
              >
                Create
              </button>
            </div>
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
    }
  },
  methods: {
    create() {
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '')
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v_1/contacts`, this.form)
        .then((res) => {
          this.$bvModal.hide(`contacts_create_contact_modal`)
          this.$router.push({ path: `/contacts/1` })
        })
    },
  },
}
</script>
