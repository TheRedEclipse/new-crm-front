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
              :placeholder="$t('tabs.activitiesTab.search.placeholder')"
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
                  {{ $t('tabs.activitiesTab.content.table.fields.date') }}
                </th>
                <th class="position-sticky" style="width: 250px; top: 0">
                  {{ $t('tabs.activitiesTab.content.table.fields.user') }}
                </th>
                <th class="position-sticky" style="top: 0">
                  {{
                    $t('tabs.activitiesTab.content.table.fields.description')
                  }}
                </th>
                <th class="position-sticky" style="width: 32px; top: 0"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="Object.keys(content).length > 0">
                <tr v-for="(item, i) in content" :key="`lead-activity-${i}`">
                  <td class="vertical-center">
                    <!-- <NuxtLink
                      to="/"
                      class="d-flex align-items-center control-link"
                    >
                      <SvgIcon name="edit" class="little-icon" />
                    </NuxtLink> -->
                  </td>
                  <td class="vertical-center">
                    {{ $moment(item.created_at).format('MM/DD/YYYY hh:mm A') }}
                  </td>
                  <td class="vertical-center">{{ item.user }}</td>
                  <td class="vertical-center">{{ item.user_message }}</td>
                  <td class="vertical-center"></td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="7">
                    <span class="w-100 h-100 table-block__empty">
                      {{ $t('tabs.activitiesTab.empty') }}
                    </span>
                  </td>
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
  props: {
    content: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
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
