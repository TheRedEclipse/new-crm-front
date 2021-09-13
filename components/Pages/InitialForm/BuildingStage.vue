<template>
  <div class="initial-component">
    <div class="initial-title-page">
      <span>Step 2</span>
      <h1>Building Stage</h1>
    </div>
    <div class="initial-content-page">
      <Card
        v-for="(type, i) in types"
        :key="i"
        :item="type"
        :selected-element="selected_element"
        :border="checkSelected(type.title)"
        @add-type="setData"
      />
    </div>
    <div class="initial-button-group">
      <NuxtLink class="initial-link-button" to="/initial-form/building-type"
        ><SvgIcon name="arrow2" class="mr-2" />BACK</NuxtLink
      >
      <NuxtLink
        class="initial-button"
        to="/initial-form/project-stage-date"
        :class="`${selected ? '' : 'disabled-btn'}`"
        >NEXT STEP</NuxtLink
      >
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Card: () => import('~/components/Pages/InitialForm/components/Card'),
  },
  data() {
    return {
      types: [],
      selected_element: 'stage',
      selected: null,
    }
  },
  mounted() {
    this.selected = this.$store.getters['initialForm/getData'].building_stage
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/building-stages`)
      .then((response) => (this.types = response.data.data.building_stages))
  },
  methods: {
    checkSelected(title) {
      if (title === this.selected) return true
    },

    setData(stage, id) {
      const data = { stage, id }
      this.selected = stage
      this.$store.dispatch('initialForm/addBuildingStage', data)
    },
  },
}
</script>
