<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>{{ $t('pages.usersPage.title') }}</template> -->
    <template #button>
      <button
        type="button"
        class="button button-outline-primary"
        @click="createForm"
      >
        <SvgIcon name="plus" class="little-icon" />
        <span class="ml-2">{{ $t(`pages.usersPage.list.button`) }}</span>
      </button>
    </template>
    <template #content>
      <UsersListBlock
        :data="users"
        title="pages.usersPage.list.title"
        @update="updateForm"
        @delete="deleteUser"
        @change-page="getUsers"
      />

      <UserFormModal
        id="users_form_modal"
        :form="editForm"
        @create="createUser"
        @update="updateUser"
      />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    UsersListBlock: () => import('~/components/Pages/Users/UsersListBlock'),
    UserFormModal: () => import('~/components/Modals/UserFormModal'),
  },
  async asyncData({ $axios, app }) {
    const users = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/control/users?per_page=10`
    )

    return {
      users: users.data.data.users,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.usersPage.title'),
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
          `${process.env.API_DOMAIN}/api/v1/control/users?page=${this.page}&per_page=10`
        )
        .then((res) => {
          this.users = res.data.data.users
        })
    },
    createUser(form) {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/control/users`, form)
        .then((res) => {
          this.$bvModal.hide(`users_form_modal`)
          this.editForm = {}
          this.getUsers()
        })
    },
    updateUser(form) {
      this.$axios
        .put(`${process.env.API_DOMAIN}/api/v1/control/users/${form.id}`, form)
        .then((res) => {
          this.$bvModal.hide(`users_form_modal`)
          this.editForm = {}
          this.getUsers()
        })
    },
    deleteUser(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/control/users/${id}`)
        .then((res) => {
          this.getUsers()
        })
    },
    createForm() {
      this.editForm = {}
      this.$bvModal.show(`users_form_modal`)
    },
    updateForm(id) {
      this.editForm = this.users.data[
        this.users.data.findIndex((q) => q.id === id)
      ]
      this.$bvModal.show(`users_form_modal`)
    },
  },
  head() {
    return {
      title: this.$t('pages.usersPage.title'),
    }
  },
}
</script>
