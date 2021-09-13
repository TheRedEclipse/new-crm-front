<template>
  <div>
    <div class="row my-4">
      <div class="offset-lg-8 col-12 col-lg-4 d-flex align-items-center">
        <div class="w-100">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <SvgIcon name="search" />
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              :placeholder="$t('tabs.contactsTab.search.placeholder')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card page-content">
          <table
            :class="`table position-relative ${
              Object.keys(content).length > 0 ? `` : `h-100`
            }`"
          >
            <thead>
              <tr>
                <th class="position-sticky" style="width: 32px; top: 0"></th>
                <th class="position-sticky" style="width: 250px; top: 0">
                  {{ $t('tabs.contactsTab.content.table.fields.name') }}
                </th>
                <th class="position-sticky" style="width: 250px; top: 0">
                  {{ $t('tabs.contactsTab.content.table.fields.phone') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.contactsTab.content.table.fields.email') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.contactsTab.content.table.fields.address') }}
                </th>
                <th class="position-sticky" style="width: 32px; top: 0"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="Object.keys(localData).length > 0">
                <tr v-for="(item, i) in localData" :key="`lead-contact-${i}`">
                  <td class="vertical-center">
                    <!-- <NuxtLink
                      to="/"
                      class="d-flex align-items-center control-link"
                    >
                      <SvgIcon name="edit" class="little-icon" />
                    </NuxtLink> -->
                  </td>
                  <td class="vertical-center">
                    {{ item.name }} {{ item.last_name }}
                  </td>
                  <td class="vertical-center">{{ item.phone }}</td>
                  <td class="vertical-center">{{ item.email }}</td>
                  <td class="vertical-center">
                    {{ concatAddress(item.address) }}
                  </td>
                  <td class="vertical-center">
                    <a
                      class="d-flex align-items-center control-link control-link--remove"
                      @click="deleteConfirm(item.id)"
                    >
                      <SvgIcon name="trash" class="little-icon" />
                    </a>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="7">
                    <a
                      class="w-100 h-100 table-block__empty"
                      @click="$bvModal.show('leads_create_contact_modal')"
                    >
                      {{ $t('tabs.contactsTab.empty') }} +
                    </a>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <DeleteConfirmModal :id="deleteId" @confirm="deleteItem" />
  </div>
</template>

<script>
export default {
  components: {
    DeleteConfirmModal: () => import('~/components/Modals/DeleteConfirmModal'),
  },
  props: {
    createId: {
      type: String,
      required: false,
      default: '',
    },
    deleteId: {
      type: String,
      required: false,
      default: '',
    },
    content: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      localData: this.content,
      current: {
        id: null,
      },
    }
  },
  methods: {
    deleteConfirm(id) {
      this.current.id = id
      this.$bvModal.show(this.deleteId)
    },
    deleteItem() {
      this.$emit('delete', this.current.id)
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

<style lang="scss">
.page-content {
  height: calc(100vh - 1.5rem - 100px - 3rem + 32px - 56px - 3rem - 45px);
  overflow: auto;
  margin-bottom: -1.5rem;
  scrollbar-color: #e4e4e4 transparent;
  scrollbar-width: thin;
}
</style>
