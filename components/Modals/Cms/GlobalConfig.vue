<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal id="config" title-class="text-left" size="lg" :title="header">
    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <b-tabs content-class="mt-3" class="col-12">
          <b-tab title="Settings" active>
            <div class="col-12">
              <div class="form-group">
                <label>Title</label>
                <input
                  v-model="config.title"
                  type="text"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="config.email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <label>Email Admin</label>
                <input
                  v-model="config.email_admin"
                  type="email"
                  class="form-control"
                  placeholder="Email Admin"
                />
              </div>
              <div class="form-group">
                <label>Link for page Terms & Conditions:</label>
                <input
                  v-model="config.terms_conditions"
                  type="email"
                  class="form-control"
                  placeholder="https://"
                />
              </div>
              <div class="form-group">
                <label>Link for PrivacyPolicy:</label>
                <input
                  v-model="config.privacy_policy"
                  type="email"
                  class="form-control"
                  placeholder="https://"
                />
              </div>
              <div class="form-group">
                <label>Key for map config:</label>
                <input
                  v-model="config.key_map"
                  type="email"
                  class="form-control"
                  placeholder=""
                />
              </div>
              <div :key="componentKey" class="form-group">
                <SvgIcon
                  v-if="config.image"
                  name="close"
                  class="icon-big"
                  @click="deleteImage(config.image)"
                />
                <a
                  class="button button-primary ml-2"
                  @click="modalImage('icon_modal')"
                  >Upload Logo</a
                >
                <img :src="config.image" class="ml-3" width="300" alt="" />
                <LoadFileSingle
                  :id="`icon_modal`"
                  :title="`Add Icon`"
                  @add-image="addImageIcon"
                />
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <button class="button button-outline-primary w-35 justify-content-center">
        Save Config
      </button>
    </template>
  </b-modal>
</template>

<script>
export default {
  components: {
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
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
      componentKey: 0,
      config: {},
      rooms: [],
      room: {},
    }
  },
  methods: {
    addImageIcon(data) {
      this.config.image = data
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    deleteImage(image) {
      this.config.image = null
      this.render()
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
  },
}
</script>
<style scoped></style>
