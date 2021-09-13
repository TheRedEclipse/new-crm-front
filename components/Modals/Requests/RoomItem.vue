<template>
  <div
    class="request-room-item d-flex align-items-center justify-content-between"
  >
    <div class="d-flex align-items-center">
      <SvgIcon
        :name="element.room_type.icon || 'question'"
        class="big-icon text-primary ml-2"
      />
      <div class="ml-4 d-flex flex-column">
        <div class="request-room-item__title">
          {{ element.room_type.title }}
        </div>
        <div class="text-gray request-room-item__type">
          {{ element.renovation_type.title }}
        </div>
      </div>
    </div>
    <a
      class="h-100 d-block text-primary request-room-item__button p-4 m-n3"
      @click="showRoom"
    >
      <span>View</span>
      <SvgIcon name="bold_arrow" class="small-icon ml-2" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  methods: {
    showRoom() {
      this.$emit('show-room', this.element)
    },
  },
}
</script>

<style lang="scss">
.request-room-item {
  margin: 15px 0;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  padding: 15px;

  &__title {
    font-size: 1.0625rem;
    color: #1a051d;
    font-weight: 600;
  }

  &__type {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  &__button {
    text-decoration: none !important;
    transition: 0.3s ease;

    &:hover {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(160, 217, 255, 0.12)
      );
    }
  }
}
</style>
