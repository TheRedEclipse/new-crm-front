<template>
  <div>
    <b-modal
      :id="`add-files-${variety}`"
      hide-footer
      size="lg"
      title="Transfer Your Preferens"
      no-close-on-backdrop
    >
      <div
        class="initial-component attachment-container mb-4 align-items-center"
      >
        <div
          class="block-control attachment-file attachment-file--inactive w-100 d-flex p-3"
        >
          <div class="attachment-file__field">
            <input
              ref="file"
              type="file"
              class="attachment-file__field-input"
              accept=".png, .jpeg, .jpg"
              @change="loadFile($event)"
            />
            <div
              class="attachment-file__field-description d-flex flex-column align-items-center"
            >
              <span class="loader-title">{{ title }}</span>
              <span class="m-2">Or</span>
              <div class="initial-select-file">
                <span>SELECT FILE</span>
              </div>
              <span class="m-2" style="color: #90a8c5"
                >Maximum file size: 10 MB</span
              >
              <span class="m-2" style="color: red">{{ error }}</span>
              <span v-if="isLoading" class="attachment-file__field-text mt-3">
                <div class="attachment-file__field-progress-percents mt-2">
                  {{ uploadPercentage }}%
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="files-list">
        <div v-for="(item, i) in files" :key="i" class="files-list-item">
          <img v-if="item.img" :src="item.img" />
          <SvgIcon
            v-else
            name="file-jpg-outlined"
            class="big-icon"
            style="color: #0085ff"
          />
          <div class="d-flex flex-column ml-3 col-9">
            <span>{{ item.title }}</span>
            <b-progress
              v-if="!item.img"
              :value="uploadPercentage"
              class="mb-3"
              :variant="`${item.error ? 'danger' : ''}`"
            ></b-progress>
          </div>
          <SvgIcon
            v-if="item.img"
            class="attachment-file__file-remove-button col-2"
            name="close"
            @click="files.splice(i, 1)"
          />
          <span
            v-else
            class="attachment-file__file-remove-button col-2"
            @click="files.splice(i, 1)"
            >CANSEL</span
          >
        </div>
      </div>
      <a class="initial-button w-100 mt-3" @click="saveFiles"
        >SAVE FILES AND CONTINUE</a
      >
    </b-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import { BProgress, ProgressPlugin } from 'bootstrap-vue'
import cloneDeep from 'lodash/clonedeep'
Vue.use(ProgressPlugin)
Vue.component('b-progress', BProgress)
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Transfer files in png, jpeg or pdf format',
    },
    variety: {
      type: String,
      required: false,
      default: '',
    },
    room: {
      type: Object,
      required: false,
      default: () => {},
    },
    images: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      fileData: {},
      file: [],
      files: [],
      uploadPercentage: 0,
      isLoading: false,
      isLoaded: false,
      error: '',
    }
  },
  watch: {
    form(val) {
      this.removeFile()
      this.localForm = { ...val }
    },
    room() {
      this.files = cloneDeep(this.images)
    },
    images() {
      this.files = cloneDeep(this.images)
    },
  },
  mounted() {
    this.files = cloneDeep(this.images)
  },
  methods: {
    saveFiles() {
      const pushData = {
        variety: this.variety,
        images: this.files,
        id_room: this.variety !== 'floor-plan' ? this.room.index : null,
      }
      pushData.images = pushData.images.filter(
        (image) => image.error === undefined
      )
      this.$emit('save-files', cloneDeep(pushData))
      this.error = ''
      this.$bvModal.hide(`add-files-${this.variety}`)
    },
    removeFile() {
      this.file = []
      this.$refs.file.value = null
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
      this.files = this.files.filter((image) => image.error === undefined)
      this.error = ''
      const dataFile = {}
      this.uploadPercentage = 0
      this.file = this.$refs.file.files[0]
      dataFile.title = this.file.name
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
          dataFile.img = response.data.data.url
        })
        .catch((err) => {
          this.isLoading = false
          this.isLoaded = false
          this.error = err
          dataFile.error = err
          this.removeFile()
        })
      if (dataFile.img !== undefined) this.files.push(dataFile)
      this.files.push(dataFile)
    },
  },
}
</script>
<style lang="scss" scoped>
.files-list {
  max-height: 300px;
  overflow: auto;
  &-item {
    width: 100%;
    height: 89px;
    background: #f7f9fc;
    display: flex;
    align-items: center;
    padding: 25px;
    cursor: pointer;
    margin-bottom: 16px;
    img {
      border-radius: 13px;
      width: 41px;
      height: 41px;
      object-fit: cover;
      background: #fff;
    }
    span {
      color: #0085ff;
      font-size: 18px;
    }
  }
}
.attachment-container {
  margin-top: 10px;
  position: relative;
  min-width: 420px;
  min-height: 232px;
  max-height: 278px;
  margin: 5px;
}
.attachment-file:hover {
  border: 1px solid #0085ff;
  transition: 1s;
}
.attachment-file {
  border-radius: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f7f9fc;
  border: 1px dashed #aad5fc;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &__file-name {
    color: #979898;
    font-size: 16px;
    margin-top: 5px;
  }
  &__file-size {
    background: #0085ff;
    padding: 7px;
    border-radius: 3px;
    color: #fff;
    margin-top: 5px;
  }
  &__file-remove-button {
    color: red;
    font-size: 14px;
    cursor: pointer;
    text-align: right;
  }
  &__file-remove-button:hover {
    color: red;
  }
}
.preview-file {
  border-radius: 24px;
  object-fit: cover;
}
</style>
