<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal :id="id" title-class="text-left" title="New task" hide-footer>
    <form @submit.prevent="store">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-10">
          <div class="form-group">
            <label>Name</label>
            <input
              v-model="localForm.name"
              type="text"
              class="form-control"
              placeholder="Enter name..."
            />
          </div>
          <div class="form-group">
            <label>Parent task</label>
            <multiselect
              v-model="selected.parent_id"
              :options="tasks"
              track-by="id"
              :custom-label="taskSelectLabel"
              placeholder="Select parent task"
            >
              <template slot="option" slot-scope="props">
                <div class="option__desc">
                  <span class="option__title">
                    #{{ props.option.id }} {{ props.option.name }}
                  </span>
                </div>
              </template>
            </multiselect>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label>Due date</label>
                <b-form-datepicker
                  id="task-datepicker"
                  v-model="localForm.date"
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
              v-model="localForm.description"
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
      selected: {
        parent_task: null,
      },
      tasks: [],
    }
  },
  watch: {
    form(val) {
      this.localForm = { ...val }
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/tasks/all`)
      .then((res) => {
        this.tasks = res.data.data?.tasks || []
      })
  },
  methods: {
    taskSelectLabel({ id, name }) {
      return `#${id} ${name}`
    },
    store() {
      this.localForm.parent_task = this.selected.parent_task?.id || null
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
    },
  },
}
</script>
