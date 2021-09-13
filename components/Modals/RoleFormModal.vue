<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    :id="id"
    title-class="text-left"
    size="xl"
    :title="Object.keys(form).length ? `Edit role` : `New role`"
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
                <label>Title</label>
                <input
                  v-model="localForm.title"
                  type="text"
                  class="form-control"
                  placeholder="Enter title..."
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Class style</label>
            <input
              v-model="localForm.style"
              type="text"
              class="form-control"
              placeholder="Enter CSS class..."
            />
          </div>
          <div class="form-group">
            <label>Sort/Order</label>
            <input
              v-model="localForm.sort"
              type="number"
              class="form-control"
              placeholder="Enter a number of sort..."
            />
          </div>
          <div class="form-group">
            <label>Permissions</label>
            <multiselect
              v-model="selected.permissions"
              :options="permissions"
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
        permissions: this.form?.permissions || [],
      },
      permissions: [],
    }
  },
  watch: {
    form(val) {
      this.localForm = { ...val }
      this.selected.permissions = this.localForm.permissions
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/control/permissions/all`)
      .then((res) => {
        this.permissions = res.data.data.permissions
      })
  },
  methods: {
    store() {
      this.localForm.permissions = this.selected.permissions
        ? this.selected.permissions.map((obj) => obj.name)
        : []
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
    },
  },
}
</script>
