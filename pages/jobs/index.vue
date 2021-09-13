<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>{{ $t('pages.jobsPage.title') }}</template> -->
    <template #content>
      <JobElement v-for="i in 20" :key="`job-${i}`" :data="{}" />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    JobElement: () => import('~/components/Pages/Jobs/JobElement'),
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
        {
          text: this.$t('pages.estimatesPage.title'),
          active: true,
        },
      ],
    }
  },
  // async asyncData({ $axios }) {
  //   const jobs = await $axios.get(`${process.env.API_DOMAIN}/api/v_1/jobs`)

  //   return {
  //     jobs: jobs.data.data.jobs,
  //   }
  // },
  head() {
    return {
      title: this.$t('pages.jobsPage.title'),
    }
  },
}
</script>
