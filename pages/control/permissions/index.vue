<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>{{ $t('pages.permissionsPage.title') }}</template> -->
    <template #button>
      <button
        type="button"
        class="button button-outline-primary"
        @click="createForm"
      >
        <SvgIcon name="plus" class="little-icon" />
        <span class="ml-2">{{ $t(`pages.permissionsPage.list.button`) }}</span>
      </button>
    </template>
    <template #content>
      <PermissionsListBlock
        :data="permissions"
        :title="$t(`pages.permissionsPage.list.title`)"
        @update="updateForm"
        @delete="deletePermission"
        @change-page="getPermissions"
      />

      <PermissionFormModal
        id="permissions_form_modal"
        :form="editForm"
        @create="createPermission"
        @update="updatePermission"
      />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    PermissionsListBlock: () =>
      import('~/components/Pages/Permissions/PermissionsListBlock'),
    PermissionFormModal: () =>
      import('~/components/Modals/PermissionFormModal'),
  },
  async asyncData({ $axios, app }) {
    const permissions = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/control/permissions?per_page=10`
    )

    return {
      permissions: permissions.data.data.permissions,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.permissionsPage.title'),
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
    getPermissions(page = this.page) {
      this.page = page
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/control/permissions?page=${this.page}&per_page=10`
        )
        .then((res) => {
          this.permissions = res.data.data.permissions
        })
    },
    createPermission(form) {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/control/permissions`, form)
        .then((res) => {
          this.$bvModal.hide(`permissions_form_modal`)
          this.getPermissions()
        })
    },
    updatePermission(form) {
      this.$axios
        .put(
          `${process.env.API_DOMAIN}/api/v1/control/permissions/${form.id}`,
          form
        )
        .then((res) => {
          this.$bvModal.hide(`permissions_form_modal`)
          this.getPermissions()
        })
    },
    deletePermission(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/control/permissions/${id}`)
        .then((res) => {
          this.getPermissions()
        })
    },
    createForm() {
      this.editForm = {}
      this.$bvModal.show(`permissions_form_modal`)
    },
    updateForm(id) {
      this.editForm = this.permissions.data[
        this.permissions.data.findIndex((q) => q.id === id)
      ]
      this.$bvModal.show(`permissions_form_modal`)
    },
  },
  head() {
    return {
      title: this.$t('pages.permissionsPage.title'),
    }
  },
}
</script>
