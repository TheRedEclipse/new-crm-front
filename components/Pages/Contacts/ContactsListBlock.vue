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
                    $t(`pages.contactsPage.list.${type}.search.placeholder`)
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
                            `pages.contactsPage.list.${type}.fields.primaryContacts`
                          )
                        }}
                      </th>
                      <th class="text-primary">
                        {{ $t(`pages.contactsPage.list.${type}.fields.email`) }}
                      </th>
                      <th class="text-primary">
                        {{ $t(`pages.contactsPage.list.${type}.fields.phone`) }}
                      </th>
                      <th class="text-primary">
                        {{
                          $t(`pages.contactsPage.list.${type}.fields.address`)
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
                        <td class="vertical-center">
                          {{ item.name }} {{ item.last_name }}
                        </td>
                        <td class="vertical-center">{{ item.email }}</td>
                        <td class="vertical-center">{{ item.phone }}</td>
                        <td class="vertical-center">
                          {{ concatAddress(item.address) }}
                        </td>
                        <td class="vertical-center">
                          <div class="d-flex align-items-center">
                            <NuxtLink
                              :to="`/contacts/${item.id}`"
                              class="d-flex align-items-center control-link"
                            >
                              <SvgIcon name="eye" class="little-icon" />
                            </NuxtLink>
                            <a
                              :to="`/contacts/${item.id}/edit`"
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
                    <template v-else>
                      <tr>
                        <td colspan="6">
                          <a
                            class="w-100 h-100 d-block table-block__empty"
                            @click="$bvModal.show(createId)"
                          >
                            {{ $t('pages.contactsPage.list.empty') }} +
                          </a>
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
                  first-number
                  last-number
                  @input="changePage(page)"
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
  </div>
</template>

<script>
export default {
  components: {
    DeleteConfirmModal: () => import('~/components/Modals/DeleteConfirmModal'),
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
    createId: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      del: null,
      page: 1,
      localData: { ...this.data },
    }
  },
  watch: {
    data(val) {
      this.localData = { ...val }
    },
  },
  methods: {
    updateModal(type, id) {
      this.$emit('update', type, id)
    },
    deleteConfirm(id) {
      this.del = id
      this.$bvModal.show(`delete_${this.type}_contact_confirm_modal`)
    },
    deleteItem() {
      this.$emit('delete', this.del, this.type)
    },
    changePage(page) {
      this.$emit('change-page', page)
    },
    concatAddress(data) {
      const address = data?.address
        ? [data?.address, data?.street, data?.state, data?.city, data?.zip]
        : []
      return address.filter(Boolean).join(', ')
    },
  },
}
</script>
