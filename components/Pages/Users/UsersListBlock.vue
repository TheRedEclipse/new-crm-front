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
                {{ $t(title) }}
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
                  :placeholder="$t(`pages.usersPage.list.search.placeholder`)"
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
                      <th class="text-primary" style="width: 20%">
                        {{ $t(`pages.usersPage.list.fields.name`) }}
                      </th>
                      <th class="text-primary" style="width: 10%">
                        {{ $t(`pages.usersPage.list.fields.registeredFrom`) }}
                      </th>
                      <th class="text-primary" style="width: 30%">
                        {{ $t(`pages.usersPage.list.fields.email`) }}
                      </th>
                      <th class="text-primary" style="width: 30%">
                        {{ $t(`pages.usersPage.list.fields.roles`) }}
                      </th>
                      <th class="text-primary" style="width: 100px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="Object.keys(localData.data).length > 0">
                      <tr
                        v-for="(item, i) in localData.data"
                        :key="`role-${i}`"
                      >
                        <td class="vertical-center"></td>
                        <td class="vertical-center">
                          {{ item.name }} {{ item.last_name }}
                        </td>
                        <td class="vertical-center">-</td>
                        <td class="vertical-center">
                          <a :href="`mailto:${item.email}`">{{ item.email }}</a>
                        </td>
                        <td class="vertical-center">
                          <template v-if="Object.keys(item.roles).length">
                            <div
                              v-for="(role, j) in item.roles"
                              :key="`user-role-${j}`"
                              class="badge badge-primary m-1"
                            >
                              {{ role.title }}
                            </div>
                          </template>
                          <template v-else> - </template>
                        </td>
                        <td class="vertical-center">
                          <div v-if="actions" class="d-flex align-items-center">
                            <a
                              class="d-flex align-items-center control-link ml-2"
                              @click="updateModal(item.id)"
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
                            @click="$bvModal.show('users_form_modal')"
                          >
                            {{ $t(empty) }}
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
      :id="`delete_user_confirm_modal`"
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
    title: {
      type: String,
      required: true,
    },
    empty: {
      type: String,
      required: false,
      default: 'pages.usersPage.list.empty',
    },
    actions: {
      type: Boolean,
      required: false,
      default: true,
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
      localData: { ...this.data },
    }
  },
  watch: {
    data(val) {
      this.localData = { ...val }
    },
  },
  methods: {
    updateModal(id) {
      this.$emit('update', id)
    },
    deleteConfirm(id) {
      this.del = id
      this.$bvModal.show(`delete_user_confirm_modal`)
    },
    deleteItem() {
      this.$bvModal.hide(`delete_user_confirm_modal`)
      this.$emit('delete', this.del)
    },
    changePage(page) {
      this.$emit('change-page', page)
    },
  },
}
</script>
