<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    :id="id"
    title-class="text-left"
    :title="Object.keys(form).length ? `Edit user` : `New user`"
    hide-footer
  >
    <form @submit.prevent="store">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-10">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Name</label>
                <input
                  v-model="localForm.name"
                  type="text"
                  class="form-control"
                  placeholder="Enter name..."
                />
              </div>
            </div>
            <div class="col-12 col-md-6 mt-3 mt-md-0">
              <div class="form-group">
                <label>Last name</label>
                <input
                  v-model="localForm.last_name"
                  type="text"
                  class="form-control"
                  placeholder="Enter last name..."
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="localForm.email"
              type="email"
              class="form-control"
              placeholder="Enter email..."
            />
          </div>
          <div class="form-group">
            <label>Roles</label>
            <multiselect
              v-model="selected.roles"
              :options="roles"
              placeholder="Select several values"
              :multiple="true"
              :searchable="true"
              :close-on-select="false"
              track-by="name"
              label="title"
            />
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center w-100 mt-4">
        <button
          type="submit"
          class="button button-outline-primary w-35 justify-content-center"
        >
          {{ Object.keys(form).length ? `Update` : `Create` }}
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
      selected: {
        roles: this.form?.roles || [],
      },
      roles: [],
    }
  },
  watch: {
    form(val) {
      this.localForm = { ...val }
      this.selected.roles = this.localForm.roles
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/control/roles/all`)
      .then((res) => {
        this.roles = res.data.data.roles
      })
  },
  methods: {
    store() {
      this.localForm.roles = this.selected.roles
        ? this.selected.roles.map((obj) => obj.name)
        : []
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
    },
  },
}
</script>
