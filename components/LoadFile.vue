<template>
  <div>
    <div class="attachment-container mt-4">
      <h2 class="mb-3 mt-3">
        {{ title }}
      </h2>
      <div class="attachment-container mb-4 align-items-center">
        <div
          class="block-control attachment-file"
          :style="`opacity: ${isLoaded ? 1 : 0}`"
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
              @change="loadFile($event)"
            />
            <div
              class="attachment-file__field-description d-flex flex-column align-items-center"
            >
              <SvgIcon name="picture" class="attachment-file__field-icon" />
              <h2>Upload images</h2>
              <span v-if="isLoading" class="attachment-file__field-text mt-3">
                <!-- <div class="attachment-file__field-progress">
                  <div
                    class="attachment-file__field-progress-load"
                    :style="`width: ${uploadPercentage}%`"
                  ></div>
                </div> -->
                <div class="attachment-file__field-progress-percents mt-2">
                  {{ uploadPercentage }}%
                </div>
              </span>
            </div>
          </div>
        </div>
        <div
          :style="`opacity: ${isLoaded ? 0 : 1}`"
          class="block-control attachment-file attachment-file--inactive w-100 d-flex p-3"
        >
          <div class="attachment-file__field">
            <input
              ref="file"
              type="file"
              class="attachment-file__field-input"
              accept="image/*"
              @change="loadFile($event)"
            />
            <div
              class="attachment-file__field-description d-flex flex-column align-items-center"
            >
              <SvgIcon name="picture" class="attachment-file__field-icon" />
              <h2>Upload images</h2>
              <span v-if="isLoading" class="attachment-file__field-text mt-3">
                <!-- <div class="attachment-file__field-progress">
                  <div
                    class="attachment-file__field-progress-load"
                    :style="`width: ${uploadPercentage}%`"
                  ></div>
                </div> -->
                <div class="attachment-file__field-progress-percents mt-2">
                  {{ uploadPercentage }}%
                </div>
              </span>
            </div>
          </div>
        </div>

        <div
          :style="`opacity: ${!isLoaded ? 1 : 0}`"
          class="d-flex img-list mt-2 mb-4 p-1"
          style="overflow: auto"
        >
          <div v-for="(fileLocal, i) in files" :key="i">
            <img :src="fileLocal" class="mb-1" />
            <SvgIcon
              name="trash"
              style="color: red; cursor: pointer; z-index: 100"
              class="mb-1"
              @click="files.splice(i, 1)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as _ from 'lodash'
export default {
  component: {},
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
      fileData: {},
      file: [],
      files: [],
      filePreview: null,
      uploadPercentage: 0,
      isLoading: false,
      isLoaded: false,
      localForm: { ...this.form },
      componentKey: 0,
    }
  },
  watch: {
    form(val) {
      this.removeFile()
      this.localForm = { ...val }
    },
    files() {
      this.forceRerender()
      console.log(this.files)
    },
  },
  mounted() {},
  methods: {
    updateView({ coordinates, canvas }) {
      this.fileData = canvas.toDataURL()
    },
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
          this.data = _.cloneDeep(`http:${this.localForm.url}`)
          this.files.unshift(`http:${this.localForm.url}`)
          this.$emit('add-file', this.files)
          this.removeFile()
          this.forceRerender()
        })
        .catch(() => {
          this.isLoading = false
          this.isLoaded = false
          this.removeFile()
        })
    },
    forceRerender() {
      this.componentKey += 1
    },
    store() {
      this.$emit(
        Object.keys(this.form).length ? 'update' : 'create',
        this.localForm
      )
    },
  },
}
</script>
<style scoped>
.img-list {
  width: 430px;
  height: 100%;
  position: relative;
  left: 190px;
  display: flex;
  align-items: center;
}
.img-list div {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 10px;
}
.img-list img {
  border-radius: 10px;
  width: 80px;
  height: 80px;
}
</style>
