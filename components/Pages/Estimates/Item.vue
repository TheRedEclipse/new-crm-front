<template>
  <div class="estimate-level">
    <div v-if="item.title" class="estimate-item mt-3 px-3">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <div
            v-if="item.items"
            :class="`estimate-item__dropdown mr-2 ${
              dropdown ? 'estimate-item__dropdown--opened' : ''
            }`"
            @click="toggleDropdown()"
          >
            <SvgIcon name="arrow" />
          </div>
          <div v-if="!item.folder" class="estimate-item__icon mr-2">
            <SvgIcon
              v-if="item.type === 'group'"
              name="folder"
              class="text-dark-blue"
            />
            <SvgIcon
              v-else-if="item.items"
              name="folder"
              class="text-primary"
            />
            <SvgIcon v-else name="code" class="text-primary" />
          </div>
          <div>
            <div
              :class="`estimate-item__title ${
                item.type === 'group' ? 'text-dark-blue' : ''
              }`"
            >
              <span v-if="item.folder" style="font-size: 18px">{{
                item.title
              }}</span>
              <span v-else>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div v-if="!item.items" class="estimate-item__price">
            {{ `$ ${item.price}` }}
          </div>
          <!-- <div class="estimate-item__action ml-3">
            <div v-if="item.items">
              <SvgIcon name="rounded_plus" />
            </div>
          </div> -->
          <b-dropdown
            size="lg"
            variant="link"
            menu-class="animate__animated animate__fadeIn animate__faster"
            toggle-class="outline-none p-0 text-decoration-none text-secondary"
            no-caret
          >
            <template #button-content>
              <div class="estimate-item__action ml-2">
                <SvgIcon name="dots_vertical" />
              </div>
            </template>
            <b-dropdown-item :to="localePath('/')">Copy</b-dropdown-item>
            <b-dropdown-item
              link-class="estimate-item__action-link estimate-item__action-link--danger"
              @click="removeItem(item)"
            >
              Delete
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>

    <div
      v-if="item.items"
      :style="dropdown ? 'display: block' : 'display: none'"
    >
      <Item
        v-for="(subitem, i) in item.items"
        :key="`item-element-top-${i}`"
        :item="subitem"
        :level="nextLevel"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Item: () => import('~/components/Pages/Estimates/Item'),
  },
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
  },
}
</script>

<style lang="scss">
.estimate-level {
  .estimate-level {
    margin-left: 2rem;
  }
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
