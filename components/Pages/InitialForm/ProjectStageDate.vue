<template>
  <div class="initial-component">
    <div class="initial-title-page">
      <span>Step 3</span>
      <h1>Project Stage Date</h1>
    </div>
    <div class="initial-content-page">
      <div class="initial-content-page-stage-item">
        <StageDate
          v-for="(item, i) in term"
          :key="i"
          :item="item"
          :border="checkSelected(item.title)"
          @add-stage-date="setData"
        />
      </div>
      <img
        :src="`/static/images/icon/101441.png`"
        width="753"
        height="471"
        alt=""
      />
    </div>
    <div class="initial-button-group">
      <NuxtLink class="initial-link-button" to="/initial-form/building-stage"
        ><SvgIcon name="arrow2" class="mr-2" />BACK</NuxtLink
      >
      <NuxtLink
        :class="`${selected ? '' : 'disabled-btn'}`"
        class="initial-button"
        to="/initial-form/floor-plan"
        >NEXT STEP</NuxtLink
      >
    </div>
  </div>
</template>
<script>
export default {
  components: {
    StageDate: () =>
      import('~/components/Pages/InitialForm/components/StageDate'),
  },
  data() {
    return {
      term: [],
      selected: null,
    }
  },
  mounted() {
    this.selected = this.$store.getters[
      'initialForm/getData'
    ].project_stage_date
    this.$axios
      .get(
        `${process.env.API_DOMAIN}/api/v1/references/requests/projectStateDates`
      )
      .then((response) => (this.term = response.data.data.project_stage_dates))
  },
  methods: {
    checkSelected(title) {
      if (title === this.selected) return true
    },

    setData(date, id) {
      const data = { date, id }
      this.selected = date
      this.$store.dispatch('initialForm/addProjectStageDate', data)
    },
  },
}
</script>
<style lang="scss" scoped>
@media (max-width: 1440px) {
  img {
    width: 30%;
    height: 30%;
  }
}
</style>
