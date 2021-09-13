<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    :id="id"
    title-class="text-left"
    title="Add Additional Items"
    size="lg"
    no-close-on-backdrop
  >
    <div class="row d-flex justify-content-center">
      <div class="col-10 flex-wrap-wrap">
        <div class="col-12">
          <div class="form-group">
            <label>Title</label>
            <input
              v-model="data.title"
              type="text"
              class="form-control"
              placeholder="Title Solution"
            />
            <div class="form-group mb-0 mt-4">
              <label>Rating</label>

              <input
                v-model="data.rating"
                type="text"
                class="form-control"
                placeholder="Rating"
              />
            </div>
            <div class="form-group mb-0 mt-4">
              <label>Room Type</label>
              <multiselect
                v-model="data.room_type"
                :options="rooms"
                placeholder="Select rooms"
                label="title"
              />
            </div>
            <div class="form-group mb-0 mt-4">
              <label>Description</label>
              <b-form-textarea
                v-model="data.description"
                placeholder="Description of the material"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </div>
            <div class="form-group mb-0 mt-4">
              <label>Csi Code</label>
              <multiselect
                v-model="data.code"
                :options="code"
                placeholder="Select code"
              />
            </div>
            <div class="form-group mb-0 mt-4">
              <label>Purchase price</label>

              <input
                v-model="data.purchase_price"
                type="text"
                class="form-control"
                placeholder="Purchase price of material"
              />
            </div>

            <div class="form-group mb-0 mt-4">
              <label>Material dimensions</label>

              <b-tabs pills card end>
                <b-tab title="Specify dimensions" active
                  ><div class="d-flex dimensions">
                    <input
                      v-model="data.length"
                      type="text"
                      class="form-control"
                      placeholder="Length"
                    />
                    <span>Х</span>
                    <input
                      v-model="data.width"
                      type="text"
                      class="form-control"
                      placeholder="Width"
                    />
                    <span>Х</span>
                    <input
                      v-model="data.weight"
                      type="text"
                      class="form-control"
                      placeholder="Weight"
                    />
                    <span>Х</span>
                    <input
                      v-model="data.height"
                      type="text"
                      class="form-control"
                      placeholder="Height"
                    /></div
                ></b-tab>
                <b-tab title="Additionally"
                  ><b-form-textarea
                    v-model="data.dimensions_text"
                    placeholder="Additional description of material dimensions"
                    rows="3"
                    max-rows="6"
                  >
                  </b-form-textarea>
                </b-tab>
              </b-tabs>
            </div>
            <div class="form-group mb-0 mt-4">
              <label>Material Specification</label>

              <b-tabs pills card end>
                <b-tab title="Download File" active>
                  <LoadFile :id="`main-create-pdf`" />
                </b-tab>
                <b-tab title="Link">
                  <input
                    v-model="data.pdf_url"
                    type="text"
                    class="form-control"
                    placeholder="Link to PDF"
                  />
                </b-tab>
              </b-tabs>
            </div>
            <div class="form-group mb-0 mt-4">
              <label for="tags-basic">Tags</label>
              <b-form-tags
                v-model="data.tags"
                input-id="tags-basic"
                tag-variant="primary"
                tag-pills
                class="tag"
              ></b-form-tags>
            </div>
          </div>
        </div>
        <div class="form-group mb-0 mt-4">
          <h2>Photo</h2>
          <LoadFile :id="`main-create-hardware`" @add-file="addFile" />
        </div>
      </div>
    </div>

    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <button
          class="button button-outline-primary w-35 justify-content-center"
          @click="sendServer"
        >
          Okey
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { BFormTags } from 'bootstrap-vue'
import * as _ from 'lodash'

export default {
  components: {
    LoadFile: () => import('~/components/LoadFile'),
    BFormTags,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
    form: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    item: {
      type: Object,
      require: false,
      default: () => {
        return {}
      },
    },
    index: {
      type: Number,
      require: false,
      default: null,
    },
  },
  data() {
    return {
      rooms: [],
      data: { ...this.item },
      files: [],
      code: ['01.00.00 General', '01.00.00 Demolition'],
    }
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
      .then((response) => (this.rooms = response.data.data.room_types))
  },
  methods: {
    addFile(data) {
      this.files = data
    },
    updateView({ canvas }) {
      this.fileData = canvas.toDataURL()
    },

    sendServer() {
      this.data.files = this.files
      this.data.img = _.cloneDeep(this.files[this.files.length - 1])
      this.$emit('add-options', _.cloneDeep(this.data))
      this.$bvModal.hide(this.id)
    },
  },
}
</script>
<style scoped>
.hardware-item {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  width: 100%;
  max-width: 100%;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  padding-left: 10px;
  margin: 1%;
}
.dimensions {
  align-items: center;
}
.dimensions span {
  margin: 5px;
}
</style>
