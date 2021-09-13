<template>
  <div class="row mt-4">
    <div class="col-12">
      <div class="card">
        <div class="table-block">
          <div
            class="position-sticky table-block__head px-3 d-flex align-items-center justify-content-between"
            style="top: 0"
          >
            <div class="table-block__title d-flex align-items-center">
              <div style="width: 20px"></div>
              <div>
                {{ title }}
              </div>
            </div>
            <div>
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <SvgIcon name="search" />
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control"
                  :placeholder="
                    $t(`pages.projectsPage.list.${type}.search.placeholder`)
                  "
                />
              </div>
            </div>
          </div>
          <div class="table-block__content">
            <div class="row mt-n3">
              <div class="col-12 h-100">
                <table class="table mt-3">
                  <thead>
                    <tr>
                      <th class="text-primary" style="width: 20px"></th>
                      <th class="text-primary">
                        {{
                          $t(
                            `pages.projectsPage.list.${type}.fields.leadProjects`
                          )
                        }}
                      </th>
                      <th class="text-primary">
                        {{
                          $t(`pages.projectsPage.list.${type}.fields.created`)
                        }}
                      </th>
                      <th class="text-primary">
                        {{
                          $t(`pages.projectsPage.list.${type}.fields.createdBy`)
                        }}
                      </th>
                      <th class="text-primary">
                        {{
                          $t(`pages.projectsPage.list.${type}.fields.address`)
                        }}
                      </th>
                      <th class="text-primary" style="width: 100px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="Object.keys(localData.data).length > 0">
                      <tr
                        v-for="(item, i) in localData.data"
                        :key="`contact-${type}-${i}`"
                      >
                        <td class="vertical-center"></td>
                        <td class="vertical-center">Arnold Huels</td>
                        <td class="vertical-center">01/20/21 1:57 PM</td>
                        <td class="vertical-center">Admin</td>
                        <td class="vertical-center">Arnold Huels</td>
                        <td class="vertical-center">
                          <div class="d-flex align-items-center">
                            <NuxtLink
                              :to="`/projects/${item.id}`"
                              class="d-flex align-items-center control-link"
                            >
                              <SvgIcon name="eye" class="little-icon" />
                            </NuxtLink>
                            <a
                              :to="`/project/${item.id}/edit`"
                              class="d-flex align-items-center control-link ml-2"
                              @click="updateModal(type, item.id)"
                            >
                              <SvgIcon name="edit" class="little-icon" />
                            </a>
                            <a
                              class="d-flex align-items-center control-link control-link--remove ml-2"
                              @click="deleteConfirm(item.id)"
                            >
                              <SvgIcon name="trash" class="little-icon" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="table-block__footer p-3">
            <div class="row">
              <div class="col-12 d-flex justify-content-end">
                <b-pagination
                  v-model="page"
                  :total-rows="localData.total"
                  :per-page="localData.per_page"
                  aria-controls="my-table"
                  first-number
                  last-number
                  @input="getList(page)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteConfirmModal
      :id="`delete_${type}_contact_confirm_modal`"
      @confirm="deleteItem"
    />
    <EditProjectModal
      :id="`contacts_edit_${type}_contact_modal`"
      :element="element"
      @update="getList(page)"
    />
  </div>
</template>

<script>
export default {
  components: {
    DeleteConfirmModal: () => import('~/components/Modals/DeleteConfirmModal'),
    EditProjectModal: () =>
      import('~/components/Modals/Projects/EditProjectModal'),
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      del: null,
      page: 1,
      localData: this.data,
      currentId: null,
      element: {},
    }
  },
  mounted() {
    // console.log(this.localData)
  },
  methods: {
    updateModal(type, id) {
      this.currentId = id
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v_1/contacts/${this.currentId}`)
        .then((res) => {
          this.element = {
            id: res.data.data.contact.id,
            name: res.data.data.contact.name,
            last_name: res.data.data.contact.last_name,
            email: res.data.data.contact.email,
            phone: res.data.data.contact.phone,
            address: res.data.data.contact.address?.address,
            street: res.data.data.contact.address?.street,
            state: res.data.data.contact.address?.state,
            city: res.data.data.contact.address?.city,
            zip: res.data.data.contact.address?.zip,
          }
        })
      this.$bvModal.show(`contacts_edit_${type}_contact_modal`)
    },
    concatAddress(data) {
      const address = data?.address
        ? [data?.address, data?.street, data?.state, data?.city, data?.zip]
        : []
      return address.filter(Boolean).join(', ')
    },
    deleteConfirm(id) {
      this.del = id
      this.$bvModal.show(`delete_${this.type}_contact_confirm_modal`)
    },
    deleteItem() {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v_1/contacts/${this.del}`)
        .then((res) => {
          this.$bvModal.hide(`delete_${this.type}_contact_confirm_modal`)
          this.getList(this.page)
        })
    },
    getList(page) {
      this.page = page
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v_1/contacts/${this.type}?page=${page}`
        )
        .then((res) => {
          this.localData = res.data.data[`${this.type}Contacts`]
        })
    },
  },
}
</script>
