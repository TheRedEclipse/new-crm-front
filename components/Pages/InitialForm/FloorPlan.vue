<template>
  <div class="component initial-component">
    <div class="initial-title-page">
      <span>Step 4</span>
      <h1>Floor Plan</h1>
      <span style="font-size: 30px">Load a plan of your current building</span>
    </div>
    <div class="initial-content-page_floor-plan">
      <AddFile class="mt-3" :variety="`floor-plan`" />
      <b-form-textarea
        id="textarea"
        v-model="data"
        class="mt-3"
        placeholder="Input something here if you have any information..."
        rows="8"
        @change="setInfo"
        maxlength="100"
        no-resize
      ></b-form-textarea>
    </div>

    <div class="initial-button-group">
      <NuxtLink
        class="initial-link-button"
        to="/initial-form/project-stage-date"
        ><SvgIcon name="arrow2" class="mr-2" />BACK</NuxtLink
      >
      <NuxtLink class="initial-button" to="/initial-form/rooms"
        >NEXT STEP</NuxtLink
      >
    </div>
  </div>
</template>
<script>
export default {
  components: {
    AddFile: () => import('~/components/Pages/InitialForm/components/AddFile'),
  },

  data() {
    return {
      data: '',
    }
  },

  watch: {
    room() {
      this.reqestStore()
    },
  },

  mounted() {
    this.reqestStore()
  },
  methods: {
    reqestStore() {
      this.data = this.$store.getters[
        'initialForm/getData'
      ].additional_info_floor_plan
    },
    setInfo() {
      this.$store.dispatch('initialForm/addAdditionalInfoFloorPlan', this.data)
    },
  },
}
</script>
