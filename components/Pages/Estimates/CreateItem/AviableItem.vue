<template>
  <div class="estimate-level">
    <div
      :class="`estimate-aviable-item ${
        dropdown ? `estimate-aviable-item--active` : ``
      } px-3`"
      @click="toggleDropdown(item)"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <div class="estimate-aviable-item__action">
              <div
                :class="`indicator ${child ? `indicator--small` : ``}`"
              ></div>
            </div>
          </div>
          <div class="estimate-aviable-item__icon ml-3 mr-2">
            <SvgIcon
              name="folder"
              :class="dropdown ? `text-primary` : `text-light`"
            />
          </div>
          <div class="d-flex align-items-center">
            <div class="estimate-aviable-item__level text-primary">
              {{ item.code }}
            </div>
            <div class="estimate-aviable-item__title ml-2">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div
          v-if="item.items"
          :class="`estimate-aviable-item__dropdown mr-2 ${
            dropdown && item.items
              ? 'estimate-aviable-item__dropdown--opened'
              : ''
          }`"
        >
          <SvgIcon name="arrow" />
        </div>
      </div>
    </div>

    <div
      v-if="item.items"
      :style="dropdown ? 'display: block' : 'display: none'"
    >
      <AviableItem
        v-for="(item, i) in item.items"
        :key="`item-element-top-${i}`"
        :item="item"
        :child="true"
        @selected-csi="toggleDropdownChild"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AviableItem: () =>
      import('~/components/Pages/Estimates/CreateItem/AviableItem'),
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    child: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      dropdown: false,
    }
  },
  computed: {
    nextLevel() {
      return this.level + 1
    },
  },
  methods: {
    toggleDropdown(csi) {
      this.dropdown = !this.dropdown
      if (this.dropdown) this.$emit('selected-csi', csi)
      else this.$emit('close-csi', csi)
    },
    toggleDropdownChild(csi) {
      this.$emit('selected-csi', csi)
    },
  },
}
</script>

<style lang="scss">
.estimate-level {
  .estimate-level {
    margin-left: 2rem;
  }
}

.estimate-aviable-item {
  width: 100%;
  padding: 0.6rem 0.3rem;
  border-bottom: 1px solid transparent;
  user-select: none;

  &--active {
    border-bottom: 1px solid #0097fb;
    border-top: 1px solid #0097fb;
    margin-top: -1px;
  }

  & + .estimate-aviable-item {
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

  &__action {
    width: 20px;

    &-link {
      &--danger {
        color: #e24040;
      }
    }
  }
}

.indicator {
  width: 16px;
  height: 16px;
  border: 1px solid #1a051d;
  border-radius: 50%;

  &--small {
    width: 13px;
    height: 13px;
  }
}
</style>
