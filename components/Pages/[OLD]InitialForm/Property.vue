<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12 mt-5">
      <label>Building Type</label>
      <multiselect
        v-model="building_type_id"
        :options="typeBuildSelect"
        placeholder="Select Building Type"
        label="title"
      />
    </div>

    <div class="col-12 col-lg-12 mt-5">
      <label>Building Stage</label>
      <multiselect
        v-model="building_stage_id"
        :options="buildingStageSelect"
        label="title"
        placeholder="Select Building Stage"
      />
    </div>

    <div class="col-12 col-lg-12 mt-5">
      <label>Project Stage Date</label>
      <multiselect
        v-model="project_stage_date_id"
        :options="projectStageDateSelect"
        placeholder="Select Project Stage Date"
        label="title"
      />
    </div>
    <!-- <label class="text-center w-100 mt-5">Do you have a floor plan?</label>
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
        <SvgIcon name="download_cloud" class="attachment-file__preview-icon" />
        <div class="attachment-file__loaded-file flex-shrink-0">
          <img :src="filePreview" alt="" />
        </div>
        <div class="attachment-file__loaded-description d-flex flex-column">
          <div>{{ file.name }}</div>
          <a class="link" @click="removeFile">Remove</a>
        </div>
      </div>
    </div> -->
  </div>
</template>
<style scoped>
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
.title-form {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.title-form img {
  margin-right: 190px;
}
.line-title {
  height: 1px;
  width: 95%;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #0099ff 27.92%,
    #0097fb 77.88%,
    #ffffff 101.4%
  );
}
</style>
<script>
export default {
  components: {
    Header: () => import('~/components/Pages/InitialForm/Header'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      typeBuildSelect: [],
      buildingStageSelect: [],
      projectStageDateSelect: [],
      form: {},
      building_type_id: null,
      building_stage_id: null,
      project_stage_date_id: null,
      file: {},
      filePreview: null,
      uploadPercentage: 0,
      isLoading: false,
      isLoaded: false,
    }
  },
  watch: {
    building_type_id() {
      this.form.building_type_id = this.building_type_id.id
      this.$emit('property-data', this.form)
    },
    building_stage_id() {
      this.form.building_stage_id = this.building_stage_id.id
      this.$emit('property-data', this.form)
    },
    project_stage_date_id() {
      this.form.project_stage_date_id = this.project_stage_date_id.id
      this.$emit('property-data', this.form)
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/buildingTypes`)
      .then(
        (response) => (this.typeBuildSelect = response.data.data.building_types)
      )
    this.$axios
      .get(
        `${process.env.API_DOMAIN}/api/v1/references/requests/buildingStages`
      )
      .then(
        (response) =>
          (this.buildingStageSelect = response.data.data.building_stages)
      )
    this.$axios
      .get(
        `${process.env.API_DOMAIN}/api/v1/references/requests/projectStateDates`
      )
      .then(
        (response) =>
          (this.projectStageDateSelect = response.data.data.project_stage_dates)
      )
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
        .post(`https://apilinlk.io`, formData, {
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
        })
        .catch(() => {
          this.isLoading = false
          this.isLoaded = false
        })
    },
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
