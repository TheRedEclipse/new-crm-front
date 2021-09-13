<template>
  <div class="estimate-level">
    <div v-if="item.title" class="estimate-item px-3">
      <div
        class="d-flex align-items-center justify-content-between"
        style="height: 50px"
      >
        <div class="d-flex align-items-center">
          <div
            v-if="item.images"
            :class="`estimate-item__dropdown mr-2 ${
              dropdown ? 'estimate-item__dropdown--opened' : ''
            }`"
            @click="toggleDropdown()"
          >
            <SvgIcon name="arrow" />
          </div>
          <div>
            <div
              :class="`estimate-item__title ${
                item.type === 'group' ? 'text-dark-blue' : ''
              }`"
              style="font-size: 24px"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="item.items"
      :style="dropdown ? 'display: block' : 'display: none'"
    >
      <div class="d-flex">
        <div v-for="(elem, i) in item.images" :key="`item-img-select-${i}`">
          <div v-if="elem.img">
            <b-img :src="elem.img" class="img-room" />
            <SvgIcon
              name="trash"
              class="icon-trash"
              style="color: red"
              @click="remove(elem)"
            />
          </div>
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
      required: false,
      default: () => {
        return {}
      },
    },
    level: {
      type: Number,
      required: false,
      default: 0,
    },
    rooms: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      dropdown: true,
    }
  },
  computed: {
    nextLevel() {
      return this.level + 1
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown
    },
    remove(elem) {
      elem.img = null
    },
  },
}
</script>

<style lang="scss">
.icon-trash {
  position: relative;
  right: 40px;
  top: -60px;
  z-index: 99999;
  cursor: pointer;
}
.estimate-level {
  .estimate-level {
    margin-left: 2rem;
  }
}
.img-room {
  width: 200px;
  height: 150px;
  margin: 5px;
}
.estimate-item {
  width: 100%;
  padding: 0.3rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  user-select: none;

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
</style>
