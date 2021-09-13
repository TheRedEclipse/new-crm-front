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
              :placeholder="
                $t(
                  'pages.projectsPage.list.item.tabs.lineItems.search.placeholder'
                )
              "
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
                  {{
                    $t(
                      'pages.projectsPage.list.item.tabs.lineItems.content.table.fields.itemName'
                    )
                  }}
                </th>
                <th class="position-sticky" style="width: 32px; top: 0"></th>
                <th class="position-sticky" style="width: 32px; top: 0"></th>
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
                  <td class="vertical-center">
                    <a
                      class="d-flex align-items-center control-link control-link--remove"
                      @click="deleteConfirm(2)"
                    >
                      <SvgIcon name="trash" class="little-icon" />
                    </a>
                  </td>
                  <td class="vertical-center"></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <DeleteConfirmModal
      :id="`delete_lineitems_confirm_modal`"
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
        return {}
      },
    },
  },
  data() {
    return {
      del: null,
      page: 1,
      localData: this.data,
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
    deleteConfirm(id) {
      this.current.id = id
      this.$bvModal.show(`delete_lineitems_confirm_modal`)
    },
    deleteItem() {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v_1/note/${this.current.id}`)
        .then((res) => {
          this.$bvModal.hide(`delete_lineitems_confirm_modal`)
          this.getNotes(this.page)
        })
    },
    getNotes(page) {
      this.page = page
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v_1/notes?page=${page}`)
        .then((res) => {
          this.localData = res.data.data[`${this.type}Contacts`]
        })
    },
  },
}
</script>

<style lang="scss">
.page-content {
  height: calc(100vh - 1.5rem - 48px - 3rem + 32px - 56px - 3rem - 45px);
  overflow: auto;
  margin-bottom: -1.5rem;
  scrollbar-color: #e4e4e4 transparent;
  scrollbar-width: thin;
}
</style>
