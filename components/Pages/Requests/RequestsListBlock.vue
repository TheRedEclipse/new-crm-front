<template>
  <div class="row mt-3">
    <div class="col-12">
      <div class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <SvgIcon name="search" />
          </div>
        </div>
        <input
          type="text"
          class="form-control form-control--external"
          placeholder="Enter an item, group, room..."
        />
      </div>
    </div>

    <div class="col-12 mt-4">
      <template v-if="Object.keys(localData.data).length > 0">
        <RequestElement
          v-for="(item, i) in localData.data"
          :key="`request-element-${i}`"
          :data="item"
          @view="openModal"
        />
      </template>
      <template v-else>
        <div class="row table-block">
          <div class="w-100 h-100 table-block__empty">
            There is no requests to display
          </div>
        </div>
      </template>
    </div>

    <div
      v-if="Object.keys(localData.data).length > 0"
      class="col-12 d-flex mt-4 justify-content-center fixed-navigation"
    >
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
</template>

<script>
export default {
  components: {
    RequestElement: () => import('~/components/Pages/Requests/RequestElement'),
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
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
    openModal(id) {
      this.$emit('view', id, this.status)
    },
  },
}
</script>
