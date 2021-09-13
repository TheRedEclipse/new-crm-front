<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal :id="id" title-class="text-left" title="New attachment">
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <div class="form-group">
          <h1>{{ title }}</h1>
          <label class="text-center w-100">Drag and drop file</label>

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
                    <div class="attachment-file__field-progress-percents mt-2">
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

    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <button
          class="button button-outline-primary w-35 justify-content-center"
          @click="store"
        >
          Okey
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
    title: {
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
  },
  data() {
    return {
      file: {},
      filePreview: null,
      uploadPercentage: 0,
      isLoading: false,
      isLoaded: false,
      localForm: { ...this.form },
    }
  },
  watch: {
    form(val) {
      this.removeFile()
      this.localForm = { ...val }
    },
  },
  methods: {
    removeFile() {
      this.file = {}
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
      const formData = new FormData()
      formData.append(`image`, this.file)
      this.isLoading = true
      this.$axios
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
          this.$emit('add-image', this.localForm.url)
        })
        .catch(() => {
          this.isLoading = false
          this.isLoaded = false
        })
    },
    store() {
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
      this.removeFile()
      this.$bvModal.hide(this.id)
    },
  },
}
</script>
