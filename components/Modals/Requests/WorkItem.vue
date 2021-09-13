<template>
  <div class="work-item">
    <div class="d-flex align-items-center">
      <SvgIcon
        :name="element.work_type.icon"
        class="medium-icon text-primary ml-2"
      />
      <div class="ml-3">
        <div>{{ element.work_type.title }}</div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <SvgIcon :name="element.work_action.icon" class="text-primary" />
      <span class="ml-2">{{ element.work_action.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.work-item {
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 64.38px;

  &__type {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
}
</style>
