<template>
  <div
    class="initial-component attachment-container mb-4 w-100 align-items-center"
  >
    <div
      class="block-control attachment-file attachment-file--inactive w-100 d-flex p-3"
    >
      <div v-if="empty" class="attachment-file__field">
        <div
          class="attachment-file__field-description d-flex flex-column align-items-center"
        >
          <span>{{ title }}</span>
          <span class="m-2">Or</span>
          <div
            class="initial-select-file"
            @click="$bvModal.show(`add-files-${variety}`)"
          >
            <span>SELECT FILE</span>
          </div>
          <span class="m-2" style="color: #90a8c5"
            >Maximum file size: 10 MB</span
          >
        </div>
      </div>
      <div v-else class="attachment-file__field">
        <div class="attachment-file__field_images mb-3">
          <img
            v-if="files[0]"
            class="attachment-file__field_images-img1"
            :src="files[0].img"
            alt=""
          />
          <img
            v-if="files[1]"
            class="attachment-file__field_images-img2"
            :src="files[1].img"
            alt=""
          />
          <img
            v-if="files[2]"
            class="attachment-file__field_images-img3"
            :src="files[2].img"
            alt=""
          />
        </div>
        <span class="m-auto" style="font-size: 16px; color: #979898"
          >{{ files.length }} files loaded</span
        >
        <div
          class="initial-button m-auto"
          @click="$bvModal.show(`add-files-${variety}`)"
        >
          Show
        </div>
      </div>
      <AddFile
        :variety="variety"
        :title="title"
        :room="room"
        :images="files"
        @save-files="saveFiles"
      />
    </div>
  </div>
</template>
<script>
import cloneDeep from 'lodash/clonedeep'
export default {
  components: {
    AddFile: () => import('~/components/Modals/AddFile'),
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Transfer files in png, jpeg or jpg format',
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
  },
  data() {
    return { files: [], empty: true }
  },
  watch: {
    room() {
      this.loaderTypeРandler()
    },
    files() {
      this.empty = !(this.files.length > 0)
    },
  },
  mounted() {
    this.loaderTypeРandler()
  },
  methods: {
    saveFiles(pullData) {
      this.$store.dispatch('initialForm/addPhoto', pullData)
      this.loaderTypeРandler()
    },
    loaderTypeРandler() {
      this.files = []

      const room = this.room ? this.getRoom(this.room.index) : []

      if (this.variety === 'styles' && room?.styles_photo) {
        this.files = cloneDeep(room?.styles_photo)
      } else if (this.variety === 'condition' && room?.condition_photo) {
        this.files = cloneDeep(room?.condition_photo)
      } else if (this.variety === 'floor-plan') {
        this.files = cloneDeep(
          this.$store.getters['initialForm/getData'].floor_plan_photo
        )
      }
    },
    getRoom(index) {
      return this.$store.getters['initialForm/getData'].rooms.find(
        (room) => room.index === index
      )
    },
  },
}
</script>
<style lang="scss" scoped>
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
  &__field {
    display: flex;
    justify-content: center !important;
    align-content: center !important;
    width: 300px;
    height: 100%;
    &_images {
      position: relative;
      display: flex;
      justify-content: center;
      width: 93px;
      margin: auto;
      height: 300px;
      img {
        border-radius: 24px;
        width: 93px;
        height: 93px;
        object-fit: cover;
        position: absolute;
        top: 0px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      &-img1 {
        left: 0px;
      }
      &-img2 {
        left: -8px;
      }
      &-img3 {
        left: -12px;
      }
    }
  }
}
.preview-file {
  border-radius: 24px;
  object-fit: cover;
}
</style>
