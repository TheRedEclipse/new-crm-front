<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    id="property_modal"
    size="xl"
    title-class="text-left"
    :title="header"
  >
    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3 form-recent">
        <b-tabs content-class="mt-3" class="col-12">
          <b-tab title="Settings" active>
            <div class="col-12 d-flex form-recent justify-content-center">
              <div class="mt-2">
                <label>Name</label>
                <input
                  v-model="property_type.name"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="mt-2">
                <label>Cost of <b>m2</b></label>
                <input
                  v-model="property_type.cost_of_m2"
                  type="number"
                  class="form-control"
                />
              </div>
              <LoadFile :title="`Image`" class="mb-3" @add-file="addFile" />
            </div>
          </b-tab>
          <b-tab title="SEO">
            <div class="mt-2">
              <label>SEO Title</label>
              <input
                v-model="property_type.seo.title"
                type="text"
                class="form-control"
              />
            </div>
            <div class="mt-2">
              <label>SEO Description</label>
              <b-form-textarea
                v-model="property_type.seo.description"
                placeholder="Description"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </div>
          </b-tab>
          <b-tab title="All services"> </b-tab>
          <a
            class="button button-primary mt-5 col-3 d-flex justify-content-center"
          >
            Create
          </a>
        </b-tabs>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  components: {
    LoadFile: () => import('~/components/LoadFile'),
  },
  props: {
    header: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      property_type: {
        seo: {},
        files: [],
      },
    }
  },
  methods: {
    addFile(data) {
      this.property_type.files = data
    },
  },
}
</script>
<style scoped>
.form-recent {
  justify-content: center;
  flex-direction: column;
}
</style>
