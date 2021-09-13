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
              :placeholder="$t('tabs.payoutsTab.search.placeholder')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card page-content">
          <table class="table position-relative">
            <thead>
              <tr>
                <th class="position-sticky" style="width: 32px; top: 0"></th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.payoutsTab.content.table.fields.dataTime') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.payoutsTab.content.table.fields.subcontractor') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.payoutsTab.content.table.fields.amount') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.payoutsTab.content.table.fields.status') }}
                </th>
                <th class="position-sticky" style="top: 0"></th>
              </tr>
            </thead>
            <tbody>
              <template>
                <tr>
                  <td></td>
                  <!-- <td class="vertical-center">
                    <a
                      class="d-flex align-items-center control-link"
                      @click="editItem(item)"
                    >
                      <SvgIcon name="edit" class="little-icon" />
                    </a>
                  </td> -->
                  <td class="vertical-center">ваыаыв</td>
                  <td class="vertical-center">ваыаыв</td>
                  <td class="vertical-center">ваыаыв</td>
                  <td class="vertical-center">ваыаыв</td>
                  <td class="vertical-center d-flex">
                    <!-- <a
                      class="align-items-center control-link control-link--remove"
                    >
                      <SvgIcon name="eye" class="little-icon" />
                    </a> -->
                    <a
                      class="align-items-center control-link control-link--remove"
                    >
                      <SvgIcon
                        name="edit"
                        class="little-icon"
                        @click="updateModal(null, 1)"
                      />
                    </a>
                    <a
                      class="align-items-center control-link control-link--remove"
                      @click="deleteConfirm(1)"
                    >
                      <SvgIcon name="trash" class="little-icon" />
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
      :id="`delete_payout_confirm_modal`"
      @confirm="deleteItem"
    />
  </div>
</template>

<script>
export default {
  components: {
    DeleteConfirmModal: () => import('~/components/Modals/DeleteConfirmModal'),
  },
  data() {
    return {
      del: null,
      page: 1,
      currentId: null,
      element: {},
      current: {
        id: null,
        form: {
          notes: '',
          contact: this.$route.params.id,
        },
      },
    }
  },
  methods: {
    updateModal(type, id) {
      this.currentId = id
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v_1/contacts/${this.currentId}`)
        .then((res) => {
          this.element = {
            id: 2,
            name: 'sfsdfs',
            last_name: 'sfsdfs',
            email: 'sfsdfs',
            phone: 'sfsdfs',
            address: 'sfsdfs',
            street: 'sfsdfs',
            state: 'sfsdfs',
            city: 'sfsdfs',
            zip: 'sfsdfs',
          }
        })
      this.$bvModal.show(`projects_edit_payout_modal`)
    },
    deleteConfirm(id) {
      this.current.id = id
      this.$bvModal.show(`delete_payout_confirm_modal`)
    },
    deleteItem() {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v_1/note/${this.current.id}`)
        .then((res) => {
          this.$bvModal.hide(`delete_payout_confirm_modal`)
          this.getNotes(this.page)
        })
    },
  },
}
</script>
