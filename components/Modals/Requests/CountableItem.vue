<template>
  <div class="countable-item">
    <div class="d-flex align-items-center">
      <SvgIcon
        :name="element.countable_type.icon"
        class="medium-icon text-primary ml-2"
      />
      <div class="ml-3">
        <div>{{ element.countable_type.title }}</div>
        <div class="text-gray countable-item__type">
          {{ element.countable_type.work_type.title }}
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <span>×{{ element.count }}</span>
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
.countable-item {
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__type {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
}
</style>
