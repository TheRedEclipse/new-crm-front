<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>{{ $t('pages.projectsPage.title') }}</template> -->
    <template #content>
      <ProjectList
        :data="contacts"
        type="my"
        :title="$t(`pages.projectsPage.list.my.title`)"
      />
      <ProjectList
        :data="allContacts"
        type="all"
        :title="$t(`pages.projectsPage.list.all.title`)"
      />

      <ProjectFormModal />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    ProjectList: () => import('~/components/Pages/Projects/ProjectList'),
    ProjectFormModal: () => import('~/components/Modals/ProjectFormModal'),
  },

  async asyncData({ $axios }) {
    const allContacts = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/contacts/all`
    )
    const contacts = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/contacts/my`
    )

    return {
      allContacts: allContacts.data.data.allContacts,
      contacts: contacts.data.data.myContacts,
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
        {
          text: this.$t('pages.projectsPage.title'),
          active: true,
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('pages.projectsPage.title'),
    }
  },
}
</script>
