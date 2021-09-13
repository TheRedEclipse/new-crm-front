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
                    $t(`pages.estimatesPage.list.${type}.search.placeholder`)
                  "
                />
              </div>
            </div>
          </div>
          <div class="table-block__content">
            <div class="row mt-n3">
              <div class="col-12">
                <table class="table mt-3">
                  <thead>
                    <tr>
                      <th class="text-primary" style="width: 20px"></th>
                      <th class="text-primary">
                        {{
                          $t(
                            `pages.estimatesPage.list.${type}.fields.dateCreated`
                          )
                        }}
                      </th>
                      <th class="text-primary">
                        {{ $t(`pages.estimatesPage.list.${type}.fields.lead`) }}
                      </th>
                      <th class="text-primary">
                        {{ $t(`pages.estimatesPage.list.${type}.fields.type`) }}
                      </th>
                      <th class="text-primary">
                        {{
                          $t(
                            `pages.estimatesPage.list.${type}.fields.totalPrice`
                          )
                        }}
                      </th>
                      <th class="text-primary">
                        {{
                          $t(`pages.estimatesPage.list.${type}.fields.status`)
                        }}
                      </th>
                      <th class="text-primary">
                        {{
                          $t(`pages.estimatesPage.list.${type}.fields.dateSent`)
                        }}
                      </th>
                      <th class="text-primary" style="width: 100px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(estimate, i) in estimates"
                      :key="`estimate-${type}-${i}`"
                    >
                      <td class="vertical-center"></td>
                      <td class="vertical-center">{{ estimate.created }}</td>
                      <td class="vertical-center">{{ estimate.lead }}</td>
                      <td class="vertical-center">{{ estimate.type }}</td>
                      <td class="vertical-center">
                        {{ estimate.total_price }}
                      </td>
                      <td class="vertical-center">{{ estimate.status }}</td>
                      <td class="vertical-center">{{ estimate.date_sent }}</td>
                      <td class="vertical-center">
                        <div class="d-flex align-items-center">
                          <NuxtLink
                            to="/estimates/1"
                            class="d-flex align-items-center control-link"
                          >
                            <SvgIcon name="eye" class="little-icon" />
                          </NuxtLink>
                          <NuxtLink
                            to="/"
                            class="d-flex align-items-center control-link ml-2"
                          >
                            <SvgIcon name="edit" class="little-icon" />
                          </NuxtLink>
                          <a
                            class="d-flex align-items-center control-link control-link--remove ml-2"
                            @click="
                              $bvModal.show(
                                `delete_${type}_estimate_confirm_modal`
                              )
                            "
                          >
                            <SvgIcon name="trash" class="little-icon" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="table-block__footer p-3">
            <div class="row">
              <div class="col-12 d-flex justify-content-end">
                <b-pagination :total-rows="100" :per-page="5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DeleteConfirmModal :id="`delete_${type}_estimate_confirm_modal`" />
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
    estimates: {
      type: Array,
      required: true,
    },
  },
}
</script>
