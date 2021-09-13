<template>
  <div class="estimate-level" @click="addCsi(item)">
    <div
      :class="`estimate-selectable-item ${
        active ? `estimate-selectable-item--active` : ``
      } px-3`"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <div class="estimate-selectable-item__action">
              <div
                class="indicator mr-4 d-flex align-items-center justify-content-center"
              >
                <SvgIcon name="plus" />
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="estimate-selectable-item__level text-primary">
              {{ item.code }}
            </div>
            <div class="estimate-selectable-item__title ml-2">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="estimate-selectable-item__dropdown mr-2">
          <SvgIcon name="code" class="text-primary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    }
  },
  methods: {
    addCsi(item) {
      this.$emit('add-csi', item)
    },
  },
}
</script>

<style lang="scss">
.estimate-selectable-item {
  width: 100%;
  padding: 0.6rem 0.3rem;
  border-bottom: 1px solid transparent;
  user-select: none;
  transition: 0.05s ease;

  &:hover {
    background: #cceafe;
  }

  &--active {
    border-bottom: 1px solid #0097fb;
    border-top: 1px solid #0097fb;
    margin-top: -1px;
  }

  & + .estimate-aviselectableable-item {
    margin-top: 0.2rem;
  }

  &__title {
    color: #1a051d;
    font-size: 0.94rem;
  }

  &__level {
    color: #818e9b;
    font-size: 0.785rem;
  }

  &__dropdown {
    transition: 0.2s ease;
    &--opened {
      transform: rotate(90deg);
    }
  }
}

.indicator {
  width: 18px;
  height: 18px;
  border: 1px solid #1a051d;
  border-radius: 50%;
  color: #1a051d;

  .icon {
    width: 8px;
    height: 8px;
  }
}
</style>
