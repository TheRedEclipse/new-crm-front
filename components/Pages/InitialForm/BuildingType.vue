<template>
  <div class="initial-component">
    <div class="initial-title-page">
      <span>Step 1</span>
      <h1>Building type</h1>
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
      <NuxtLink class="initial-link-button" to="/initial-form"
        ><SvgIcon name="arrow2" class="mr-2" />BACK</NuxtLink
      >
      <NuxtLink
        class="initial-button"
        :class="`${selected ? '' : 'disabled-btn'}`"
        to="/initial-form/building-stage"
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
      selected_element: 'type',
      selected: null,
    }
  },
  mounted() {
    this.selected = this.$store.getters['initialForm/getData'].building_type
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/building-types`)
      .then((response) => (this.types = response.data.data.building_types))
  },
  methods: {
    checkSelected(title) {
      if (title === this.selected) return true
    },

    setData(type, id) {
      const data = { type, id }
      this.selected = type
      this.$store.dispatch('initialForm/addBuildingType', data)
    },
  },
}
</script>
