<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    :id="id"
    hide-header-close
    no-close-on-backdrop
    title-class="text-left"
    title="Create Recent Work"
    size="xl"
  >
    <div class="row d-flex mb-5">
      <div class="col-12 d-flex justify-content-space-beetwen">
        <div class="col-6">
          <div class="form-group">
            <label>Title<label style="color: red">*</label></label>
            <input
              v-model="work.title"
              type="text"
              class="form-control"
              placeholder="Title work"
            />
            <div class="mt-4">
              <label>Rooms</label>
              <multiselect
                v-model="work.room_type_id"
                class="mt-3"
                :options="rooms"
                placeholder="Select rooms"
                label="title"
              />
            </div>

            <div class="form-group mb-0 mt-4">
              <label>Description</label>
              <b-form-textarea
                v-model="work.description"
                placeholder="`Description of the ready-made work"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </div>
            <div class="form-group mb-0 mt-4">
              <label
                >Price Starts From<label style="color: red">*</label></label
              >
              <input
                v-model="work.price"
                type="number"
                class="form-control"
                placeholder="Minimum price for a ready-made work"
                @input="validation"
              />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-12 mt-4">
              <h2>Photo<label style="color: red">*</label></h2>
              <div class="attachment-container">
                <div
                  class="block-control attachment-file position-relative"
                  :style="`opacity: ${!isLoaded ? 1 : 0}`"
                  @dragover="dragover"
                  @dragleave="dragleave"
                  @drop="drop"
                >
                  <div class="attachment-file__field">
                    <input
                      ref="file"
                      type="file"
                      class="attachment-file__field-input"
                      accept="image/*"
                      :disabled="isLoading"
                      @change="loadFile($event)"
                    />
                    <div
                      class="attachment-file__field-description d-flex flex-column align-items-center"
                    >
                      <SvgIcon
                        name="download_cloud"
                        class="attachment-file__field-icon"
                      />
                      <span
                        v-if="isLoading"
                        class="attachment-file__field-text mt-3"
                      >
                        <div class="attachment-file__field-progress">
                          <div
                            class="attachment-file__field-progress-load"
                            :style="`width: ${uploadPercentage}%`"
                          ></div>
                        </div>
                        <div
                          class="attachment-file__field-progress-percents mt-2"
                        >
                          {{ uploadPercentage }}%
                        </div>
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  :style="`opacity: ${!isLoaded ? 0 : 1}`"
                  class="block-control attachment-file attachment-file--inactive w-100 d-flex p-3"
                >
                  <SvgIcon
                    name="download_cloud"
                    class="attachment-file__preview-icon"
                  />
                  <div class="attachment-file__loaded-file flex-shrink-0">
                    <img :src="filePreview" alt="" />
                  </div>
                  <div
                    class="attachment-file__loaded-description d-flex flex-column"
                  >
                    <div>{{ file.name }}</div>
                    <a class="link" @click="removeFile">Remove</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 500px">
          <div>
            <h2 class="mb-3">HARDWARE & APPLIANCES</h2>

            <a class="button button-primary" @click="selectHardwareModal">
              <SvgIcon name="awards" />
              <span class="ml-2">Select options</span>
            </a>
            <a
              class="button button-outline-primary ml-4"
              @click="addHardwareModal"
            >
              <AddHardware
                :id="`create_hardware`"
                @add-options="createHardware"
              />
              <SvgIcon name="plus" />
              <span class="ml-2">Add more</span>
            </a>
            <div>
              <client-only>
                <carousel
                  :key="componentKey"
                  :items="4"
                  :nav="false"
                  :dots="true"
                  :autoplay="false"
                  class="page-navigation__slider"
                >
                  <div v-for="img in work.hardware" :key="img.id" class="m-3">
                    <SvgIcon
                      name="trash"
                      style="
                        color: red;
                        position: relative;
                        top: 30px;
                        left: 10px;
                        z-index: 9999;
                        cursor: pointer;
                      "
                      @click="deleteHardwareItem(img.id)"
                    />
                    <b-img
                      :src="img.img"
                      style="border-radius: 5px; width: 100px"
                      alt="Responsive image"
                    ></b-img>
                  </div>
                </carousel>
              </client-only>
            </div>
          </div>
          <div class="mt-2">
            <h2 class="mb-3">ADDITIONAL OPTIONS</h2>
            <a class="button button-primary" @click="selectOptionModal">
              <SelectAdditionalOptions
                :id="`select-options`"
                @add-options="addOptions"
              />
              <SelectAdditionalOptions
                :id="`select-hardware`"
                @add-options="addHardware"
              />
              <AddHardware
                :id="`create_options`"
                @add-options="createOptions"
              />
              <SvgIcon name="awards" />
              <span class="ml-2">Select options</span>
            </a>
            <a
              class="button button-outline-primary ml-4"
              @click="addOptionsModal"
            >
              <SvgIcon name="plus" />
              <span class="ml-2">Add more</span>
            </a>
            <div>
              <client-only>
                <carousel
                  :key="componentKey"
                  :items="4"
                  :nav="false"
                  :dots="true"
                  :autoplay="false"
                  class="page-navigation__slider"
                >
                  <div v-for="img in work.additional" :key="img.id" class="m-3">
                    <SvgIcon
                      name="trash"
                      style="
                        color: red;
                        position: relative;
                        top: 30px;
                        left: 10px;
                        z-index: 9999;
                        cursor: pointer;
                      "
                      @click="deleteOptionsItem(img.id)"
                    />
                    <b-img
                      v-if="img.img !== null"
                      :src="img.img"
                      style="border-radius: 5px; width: 100px"
                      alt="Responsive image"
                    ></b-img>
                  </div>
                </carousel>
              </client-only>
            </div>
          </div>
          <div v-if="fileData.length !== 0" style="width: 300px" class="mt-4">
            <Cropper
              classname="upload-example-cropper"
              :src="filePreview"
              :style="`display: ${isLoaded ? 'block' : 'none'}`"
              @change="updateView"
            ></Cropper>
          </div>
        </div>
      </div>
    </div>
    <p style="color: red" class="col-12">{{ error }}</p>
    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <button
          class="button button-outline-primary w-35 justify-content-center"
          @click="sendServer"
        >
          Okey
        </button>
        <button
          class="button button-outline-danger ml-3 w-35 justify-content-center"
          @click="close"
        >
          Close
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import cloneDeep from 'lodash/clonedeep'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  components: {
    AddHardware: () => import('~/components/Modals/Cms/AddHardware'),
    SelectAdditionalOptions: () =>
      import('~/components/Modals/Cms/SelectAdditionalOptions'),
    Carousel: () => (process.client ? import('vue-owl-carousel') : null),
    Cropper,
  },
  props: {
    id: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      componentKey: 0,
      work: {
        hardware: [],
        additional: [],
      },
      selected: null,
      rooms: null,
      data: {},
      resizedAvatar: null,
      file: {},
      fileData: {},
      filePreview: null,
      uploadPercentage: 0,
      isLoading: false,
      isLoaded: false,
      localForm: { ...this.form },
      error: '',
    }
  },
  watch: {
    form(val) {
      this.removeFile()
      this.localForm = { ...val }
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
      .then((response) => (this.rooms = response.data.data.room_types))
  },
  methods: {
    validation() {
      if (this.data.title === undefined || this.data.title === '') {
        this.error = 'Required fields are not filled in *'
      } else {
        this.$emit('show-work', this.work)
        this.$bvModal.hide(this.id)
      }
    },
    updateView({ coordinates, canvas }) {
      this.fileData = canvas.toDataURL()
    },
    deleteHardwareItem(id) {
      this.all.forEach((elem, i) => {
        if (elem.id === id) {
          this.all = this.all.filter((item) => item.id !== id)

          this.forceRerender()
        }
      })
    },
    deleteOptionsItem(id) {
      this.work.additionals.forEach((elem, i) => {
        if (elem.id === id) {
          this.work.hardware = this.work.hardware.filter(
            (item) => item.id !== id
          )

          this.forceRerender()
        }
      })
    },
    removeFile() {
      this.file = {}
      this.fileData = {}
      this.$refs.file.value = null
      this.filePreview = null
      this.isLoaded = false
    },
    dragover(event) {
      if (
        !event.currentTarget.classList.contains('attachment-file__dragover')
      ) {
        event.currentTarget.classList.add('attachment-file__dragover')
      }
    },
    dragleave(event) {
      event.currentTarget.classList.remove('attachment-file__dragover')
    },
    drop(event) {
      event.currentTarget.classList.remove('attachment-file__dragover')
    },
    loadFile() {
      this.uploadPercentage = 0
      this.isLoaded = false
      this.file = this.$refs.file.files[0]
      this.filePreview = URL.createObjectURL(this.$refs.file.files[0])
      if (!this.file) return

      this.isLoading = false
      this.isLoaded = true
    },
    async sendServer() {
      if (!this.file && this.fileData) return
      this.file = this.fileData
      const formData = new FormData()
      formData.append(`image`, this.file)

      await this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/handler/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          },
        })
        .then((response) => {
          this.isLoading = false
          this.isLoaded = true
          this.localForm.url = response.data.data.url
          this.localForm.path = response.data.data.path
          this.removeFile()
          this.data.img = `https://${cloneDeep(this.localForm.url)}`
          // this.validation()
        })
        .catch(() => {
          this.isLoading = false
          this.isLoaded = false
          this.removeFile()
        })
      this.$emit('show-work', this.work)
      this.$bvModal.hide(this.id)
    },
    store() {
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
    },
    addHardware(hardware) {
      this.forceRerender()
      hardware.forEach((elem) => {
        this.work.hardware.push(elem)
      })
    },
    addOptions(options) {
      this.forceRerender()
      options.forEach((elem) => {
        this.work.additional.push(elem)
      })
    },
    selectOptionModal() {
      this.forceRerender()
      this.$bvModal.show(`select-options`)
    },
    selectHardwareModal() {
      this.forceRerender()
      this.$bvModal.show(`select-hardware`)
    },
    addHardwareModal() {
      this.forceRerender()
      this.$bvModal.show(`create_hardware`)
    },
    addOptionsModal() {
      this.forceRerender()
      this.$bvModal.show(`create_options`)
    },
    createHardware(data) {
      this.forceRerender()
      this.work.hardware.push(cloneDeep(data))
    },
    createOptions(data) {
      this.forceRerender()
      this.work.additional.push(cloneDeep(data))
    },
    forceRerender() {
      this.componentKey += 1
    },
    close() {
      this.work = {}
      this.work = { hardware: [], additional: [] }
      this.removeFile()
      this.disabled = true
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
</style>
