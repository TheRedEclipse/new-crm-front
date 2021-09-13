<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal :id="id" title-class="text-left" title="Link contact" hide-footer>
    <form @submit.prevent="store">
      <div class="row d-flex justify-content-center my-4">
        <div class="col-10">
          <div class="form-group mb-0">
            <label>Contact</label>
            <multiselect
              v-model="selected.contact_id"
              :options="contacts"
              track-by="id"
              placeholder="Select contact"
            >
              <template slot="singleLabel" slot-scope="props">
                <div class="option__desc">
                  <span class="option__title">
                    #{{ props.option.id }} {{ props.option.name }}
                    {{ props.option.last_name }}
                  </span>
                </div>
              </template>
              <template slot="option" slot-scope="props">
                <div class="option__desc">
                  <span class="option__title">
                    #{{ props.option.id }} {{ props.option.name }}
                    {{ props.option.last_name }}
                  </span>
                </div>
              </template>
            </multiselect>
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
        contact_id: null,
      },
      contacts: [],
    }
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/contacts/all`)
      .then((res) => {
        this.contacts = res.data.data.contacts
      })
  },
  methods: {
    store() {
      this.localForm.contact_id = this.selected.contact_id.id
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
      this.localForm = {}
    },
  },
}
</script>
