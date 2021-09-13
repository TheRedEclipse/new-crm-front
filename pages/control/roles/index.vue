<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>{{ $t('pages.rolesPage.title') }}</template> -->
    <template #button>
      <button
        type="button"
        class="button button-outline-primary"
        @click="createForm"
      >
        <SvgIcon name="plus" class="little-icon" />
        <span class="ml-2">{{ $t(`pages.rolesPage.list.button`) }}</span>
      </button>
    </template>
    <template #content>
      <RolesListBlock
        :data="roles"
        :title="$t(`pages.rolesPage.list.title`)"
        @update="updateForm"
        @delete="deleteRole"
        @change-page="getRoles"
      />

      <RoleFormModal
        id="roles_form_modal"
        :form="editForm"
        @create="createRole"
        @update="updateRole"
      />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    RolesListBlock: () => import('~/components/Pages/Roles/RolesListBlock'),
    RoleFormModal: () => import('~/components/Modals/RoleFormModal'),
  },
  async asyncData({ $axios, app }) {
    const roles = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/control/roles?per_page=10`
    )

    return {
      roles: roles.data.data.roles,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.rolesPage.title'),
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
    getRoles(page = this.page) {
      this.page = page
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/control/roles?page=${this.page}&per_page=10`
        )
        .then((res) => {
          this.roles = res.data.data.roles
        })
    },
    createRole(form) {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/control/roles`, form)
        .then((res) => {
          this.$bvModal.hide(`roles_form_modal`)
          this.editForm = {}
          this.getRoles()
        })
    },
    updateRole(form) {
      this.$axios
        .put(`${process.env.API_DOMAIN}/api/v1/control/roles/${form.id}`, form)
        .then((res) => {
          this.$bvModal.hide(`roles_form_modal`)
          this.editForm = {}
          this.getRoles()
        })
    },
    deleteRole(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/control/roles/${id}`)
        .then((res) => {
          this.getRoles()
        })
    },
    createForm() {
      this.editForm = {}
      this.$bvModal.show(`roles_form_modal`)
    },
    updateForm(id) {
      this.editForm = this.roles.data[
        this.roles.data.findIndex((q) => q.id === id)
      ]
      this.$bvModal.show(`roles_form_modal`)
    },
  },
  head() {
    return {
      title: this.$t('pages.rolesPage.title'),
    }
  },
}
</script>
