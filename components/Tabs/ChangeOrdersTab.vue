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
              :placeholder="$t('tabs.changeOrdersTab.search.placeholder')"
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
                  {{ $t('tabs.changeOrdersTab.content.table.fields.lead') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{
                    $t('tabs.changeOrdersTab.content.table.fields.createdBy')
                  }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{ $t('tabs.changeOrdersTab.content.table.fields.created') }}
                </th>
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
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      del: null,
      page: 1,
      currentId: null,
      element: {},
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
      this.$bvModal.show(`contacts_edit_${type}_contact_modal`)
    },
  },
}
</script>
