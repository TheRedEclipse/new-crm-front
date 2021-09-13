<template>
  <div class="row mt-4">
    <!-- <div class="col-12">
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
                    $t(`pages.leadsPage.list.${type}.search.placeholder`)
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
                            `pages.leadsPage.list.${type}.fields.primaryContacts`
                          )
                        }}
                      </th>
                      <th class="text-primary">
                        {{ $t(`pages.leadsPage.list.${type}.fields.email`) }}
                      </th>
                      <th class="text-primary">
                        {{ $t(`pages.leadsPage.list.${type}.fields.phone`) }}
                      </th>
                      <th class="text-primary">
                        {{
                          $t(
                            `pages.leadsPage.list.${type}.fields.currentEstimate`
                          )
                        }}
                      </th>
                      <th class="text-primary">
                        {{ $t(`pages.leadsPage.list.${type}.fields.status`) }}
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
                          {{ item.user.name }} {{ item.user.last_name }}
                        </td>
                        <td class="vertical-center">{{ item.user.email }}</td>
                        <td class="vertical-center">{{ item.phone }}</td>
                        <td class="vertical-center">
                          {{ item.current_estimate || '-' }}
                        </td>
                        <td class="vertical-center">
                          {{ status(item) }}
                        </td>
                        <td class="vertical-center">
                          <div class="d-flex align-items-center">
                            <NuxtLink
                              :to="`/leads/${item.id}`"
                              class="d-flex align-items-center control-link"
                            >
                              <SvgIcon name="eye" class="little-icon" />
                            </NuxtLink>
                            <a
                              class="d-flex align-items-center control-link ml-2"
                              @click="edit(item.id)"
                            >
                              <SvgIcon name="edit" class="little-icon" />
                            </a>
                            <a
                              class="d-flex align-items-center control-link control-link--remove ml-2"
                              @click="
                                $bvModal.show(
                                  `delete_${type}_contact_confirm_modal`
                                )
                              "
                            >
                              <SvgIcon name="trash" class="little-icon" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="7">
                          <a
                            class="w-100 h-100 d-block table-block__empty"
                            @click="$bvModal.show('leads_create_lead_modal')"
                          >
                            {{ $t('pages.leadsPage.list.empty') }} +
                          </a>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="localData.total > 0" class="table-block__footer p-3">
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
    </div> -->

    <DeleteConfirmModal :id="`delete_${type}_contact_confirm_modal`" />
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
  methods: {
    status(item) {
      return item?.status?.title || 'New'
    },
    getList(page) {
      this.page = page
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v_1/leads/${this.type}?page=${page}`
        )
        .then((res) => {
          this.localData = res.data.data.leads
        })
    },
    edit(id) {
      this.$emit('edit', this.type, id)
    },
  },
}
</script>
