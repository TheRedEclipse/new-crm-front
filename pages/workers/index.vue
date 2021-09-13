<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>{{ $t('pages.workersPage.title') }}</template> -->
    <!-- <template #button>
      <button
        type="button"
        class="button button-outline-primary"
        @click="createForm"
      >
        <SvgIcon name="plus" class="little-icon" />
        <span class="ml-2">{{ $t(`pages.usersPage.list.button`) }}</span>
      </button>
    </template> -->
    <template #content>
      <UsersListBlock
        :data="users"
        title="pages.workersPage.list.title"
        empty="pages.workersPage.list.empty"
        :actions="false"
        @change-page="getUsers"
      />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    UsersListBlock: () => import('~/components/Pages/Users/UsersListBlock'),
  },
  async asyncData({ $axios, app }) {
    const users = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/workers?per_page=10`
    )

    return {
      users: users.data.data.users,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.workersPage.title'),
          active: true,
        },
      ],
    }
  },
  data() {
    return {
      editForm: {},
      page: 1,
    }
  },
  methods: {
    getUsers(page = this.page) {
      this.page = page
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/workers?page=${this.page}&per_page=10`
        )
        .then((res) => {
          this.users = res.data.data.users
        })
    },
  },
  head() {
    return {
      title: this.$t('pages.workersPage.title'),
    }
  },
}
</script>
