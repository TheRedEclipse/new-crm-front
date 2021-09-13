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
              :placeholder="$t('tabs.requestsTab.search.placeholder')"
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
                  {{ $t('tabs.requestsTab.content.table.fields.created') }}
                </th>
                <th class="position-sticky" style="width: 250px; top: 0">
                  {{ $t('tabs.requestsTab.content.table.fields.createdBy') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{
                    $t(
                      'tabs.requestsTab.content.table.fields.requestInformation'
                    )
                  }}
                </th>
                <th class="position-sticky" style="width: 32px; top: 0"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="Object.keys(content).length > 0">
                <tr v-for="(item, i) in content" :key="`lead-request-${i}`">
                  <td class="vertical-center">
                    <NuxtLink
                      :to="`/requests/${item.id}`"
                      class="d-flex align-items-center control-link"
                    >
                      <SvgIcon name="edit" class="little-icon" />
                    </NuxtLink>
                  </td>
                  <td class="vertical-center">
                    {{ $moment(item.created).format('MM/DD/YYYY hh:mm A') }}
                  </td>
                  <td class="vertical-center">{{ item.user.name }}</td>
                  <td class="vertical-center">
                    {{ item.request_information }}
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
                      @click="$bvModal.show('leads_create_request_modal')"
                    >
                      {{ $t('tabs.requestsTab.empty') }} +
                    </a>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <DeleteConfirmModal
      :id="`delete_request_confirm_modal`"
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
      current: {
        id: null,
      },
    }
  },
  methods: {
    deleteConfirm(id) {
      this.current.id = id
      this.$bvModal.show(`delete_request_confirm_modal`)
    },
    deleteItem() {
      this.$emit('delete', this.current.id)
      // this.$axios
      //   .delete(`${process.env.API_DOMAIN}/api/v_1/requests/${this.current.id}`)
      //   .then((res) => {
      //     this.$bvModal.hide(`delete_request_confirm_modal`)
      //     this.$emit('delete', true)
      //   })
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
