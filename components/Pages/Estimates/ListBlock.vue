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

    <div
      class="col-12 mt-2"
      style="display: flex; flex-wrap: wrap; justify-content: space-between"
    >
      <template v-if="Object.keys(estimates).length > 0">
        <Card
          v-for="(item, i) in estimates"
          :key="`request-element-${i}`"
          :data="item"
          :title="item.title"
          :color="item.color"
          class="col-3"
        />
      </template>
      <template v-else>
        <div class="row table-block">
          <div class="w-100 h-100 table-block__empty">
            There is no estimate to display
          </div>
        </div>
      </template>
    </div>
    <div class="table-block__footer p-3">
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <b-pagination :total-rows="100" :per-page="5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // DeleteConfirmModal: () => import('~/components/Modals/DeleteConfirmModal'),
    Card: () => import('~/components/Card'),
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
