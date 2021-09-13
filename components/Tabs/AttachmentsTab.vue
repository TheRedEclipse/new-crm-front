<template>
  <div class="attachments-block">
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
              :placeholder="$t('tabs.attachmentsTab.search.placeholder')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card page-content">
          <div class="table-block">
            <div
              class="position-sticky table-block__head px-3 d-flex align-items-center justify-content-between"
              style="top: 0"
            >
              <div class="table-block__title d-flex align-items-center">
                <div style="width: 16px"></div>
                <div>
                  {{ $t('tabs.attachmentsTab.content.title') }}
                </div>
              </div>
              <div>
                <SvgIcon name="list" class="less-medium-icon text-gray" />
              </div>
            </div>
            <div class="table-block__content attachments-block__content">
              <template v-if="Object.keys(content).length > 0">
                <div class="row mt-n3">
                  <div
                    v-for="(item, i) in content"
                    :key="`attachment-${i}`"
                    class="col-12 col-md-6 col-xl-4 col-xxl-2 mt-3"
                  >
                    <AttachmentItem
                      :image="item.url"
                      :title="item.description || `No description`"
                    />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="row mt-n3">
                  <div class="col-12">
                    <a
                      class="w-100 h-100 table-block__empty"
                      @click="$bvModal.show(createId)"
                    >
                      {{ $t('tabs.attachmentsTab.empty') }} +
                    </a>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AttachmentItem: () => import('~/components/AttachmentItem'),
  },
  props: {
    createId: {
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

.attachments-block {
  &__content {
    padding: 1.25rem 1.875rem;
  }
}
</style>
