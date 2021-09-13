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
              :placeholder="$t('tabs.estimatesTab.search.placeholder')"
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
                  {{ $t('tabs.estimatesTab.content.table.fields.dateCreated') }}
                </th>
                <th class="position-sticky" style="width: 250px; top: 0">
                  {{ $t('tabs.estimatesTab.content.table.fields.createdBy') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.estimatesTab.content.table.fields.type') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.estimatesTab.content.table.fields.status') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.estimatesTab.content.table.fields.dateSent') }}
                </th>
                <th class="position-sticky" style="width: 32px; top: 0"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="Object.keys(content).length > 0">
                <tr v-for="(item, i) in content" :key="`lead-estimates-${i}`">
                  <td class="vertical-center">
                    <NuxtLink
                      :to="`/estimates/${item.id}`"
                      class="d-flex align-items-center control-link"
                    >
                      <SvgIcon name="eye" class="little-icon" />
                    </NuxtLink>
                  </td>
                  <td class="vertical-center">
                    {{ $moment(item.created_at).format('MM/DD/YYYY hh:mm A') }}
                  </td>
                  <td class="vertical-center">{{ item.created_by }}</td>
                  <td class="vertical-center">{{ item.type }}</td>
                  <td class="vertical-center">{{ item.status_name }}</td>
                  <td class="vertical-center">{{ dateSent(item) }}</td>
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
                      @click="$bvModal.show(createId)"
                    >
                      {{ $t('tabs.estimatesTab.empty') }} +
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
      current: {
        id: null,
      },
    }
  },
  methods: {
    dateSent(item) {
      return item.date_sent ? this.$moment().format('MM/DD/YYYY hh:mm A') : '-'
    },
    deleteConfirm(id) {
      this.current.id = id
      this.$bvModal.show(this.deleteId)
    },
    deleteItem() {
      this.$emit('delete', this.current.id)
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
