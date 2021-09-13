<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div style="display: none">
      {{ edit }}
    </div>
    <div class="col-12 col-lg-12">
      <div class="item-label">
        <label>Length x Width x Height</label><small>Example 10' x 9'</small>
      </div>
      <input
        v-model="edit.size"
        type="text"
        class="form-control"
        placeholder="12' x 14'"
      />
    </div>

    <div class="col-12 col-lg-12">
      <div class="item-label">
        <label>Description </label
        ><small>Please enter as much information as possible</small>
      </div>
      <b-form-textarea
        v-model="edit.description"
        :placeholder="`${room} description`"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
    </div>
    <!-- <div class="col-12 col-lg-12 mt-5 mb-5">
      <div class="attachment-container">
        <label>Existing Condition Phots</label>
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
              <span v-if="isLoading" class="attachment-file__field-text mt-3">
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
          <div class="attachment-file__loaded-description d-flex flex-column">
            <div>{{ file.name }}</div>
            <a class="link" @click="removeFile">Remove</a>
          </div>
        </div>
      </div>
    </div> -->
    <div class="d-flex justify-content-center w-100 mb-n3 mt-4">
      <button
        type="button"
        class="button button-outline-primary w-35 justify-content-center"
        @click="sendData"
      >
        Okey
      </button>
    </div>
  </div>
</template>
<style scoped>
small {
  color: #0097fb;
}
.item-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
  width: 100% !important;
}
.form-group input {
  margin-bottom: 35px;
}
</style>
<script>
import * as _ from 'lodash'
export default {
  components: {
    Header: () => import('~/components/Pages/InitialForm/Header'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: false,
      default: 'Room',
    },
    edit: {
      type: Object,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      description: '',
      additionslInfo: {
        size: null,
        description: null,
      },
      file: {},
      filePreview: null,
      uploadPercentage: 0,
      isLoading: false,
      isLoaded: false,
    }
  },
  methods: {
    // removeFile() {
    //   this.file = {}
    //   this.$refs.file.value = null
    //   this.filePreview = null
    //   this.isLoaded = false
    // },
    // dragover(event) {
    //   if (
    //     !event.currentTarget.classList.contains('attachment-file__dragover')
    //   ) {
    //     event.currentTarget.classList.add('attachment-file__dragover')
    //   }
    // },
    // dragleave(event) {
    //   event.currentTarget.classList.remove('attachment-file__dragover')
    // },
    // drop(event) {
    //   event.currentTarget.classList.remove('attachment-file__dragover')
    // },
    // loadFile() {
    //   this.uploadPercentage = 0
    //   this.isLoaded = false
    //   this.file = this.$refs.file.files[0]
    //   this.filePreview = URL.createObjectURL(this.$refs.file.files[0])
    //   if (!this.file) return
    //   const formData = new FormData()
    //   formData.append(`image`, this.file)
    //   this.isLoading = true
    //   this.$axios
    //     .post(`https://apilinlk.io`, formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //       onUploadProgress: (progressEvent) => {
    //         this.uploadPercentage = parseInt(
    //           Math.round((progressEvent.loaded / progressEvent.total) * 100)
    //         )
    //       },
    //     })
    //     .then((response) => {
    //       this.isLoading = false
    //       this.isLoaded = true
    //     })
    //     .catch(() => {
    //       this.isLoading = false
    //       this.isLoaded = false
    //     })
    // },
    sendData() {
      this.$emit('additional-edit', _.cloneDeep(this.edit))
    },
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
