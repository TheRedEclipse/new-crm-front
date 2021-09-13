<template>
  <NuxtLink
    v-b-tooltip.hover.right.viewport="hideText ? slot : ``"
    :to="link"
    :event="disabled ? '' : 'click'"
    :class="`navigation-item d-flex align-items-center justify-content-center py-3 ${
      disabled ? `disabled` : ``
    }`"
  >
    <span class="d-flex align-items-center">
      <SvgIcon :name="icon" class="navigation-item__icon" />
    </span>
    <span v-if="!hideText" class="navigation-item__text ml-4">
      <slot />
    </span>
  </NuxtLink>
</template>

<script>
import Vue from 'vue'
import { BSidebar } from 'bootstrap-vue'

Vue.component('b-sidebar', BSidebar)
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideText: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    slot() {
      return this.$slots.default[0]?.text
    },
  },
}
</script>

<style lang="scss">
.navigation-item {
  transition: 0.2s ease;
  width: 106%;
  // border-top: 1px solid transparent;
  // border-bottom: 1px solid transparent;

  &.disabled {
    opacity: 0.3;
    filter: grayscale(0.6);
  }

  &__icon {
    width: 20px;
    height: 20px;
    color: #fff;
    transition: 0.2s ease;
    margin-left: -6%;
  }

  &__text {
    transition: 0.2s ease;
    color: #fff;
  }

  &:hover:not(.disabled),
  &.nuxt-link-exact-active {
    text-decoration: none;
    background: #fff;

    .navigation-item__icon {
      color: #0097fb;
    }
    // border-top-color: #c4c4c4;
    // border-bottom-color: #c4c4c4;
  }

  &.nuxt-link-exact-active {
    .navigation-item__icon,
    .navigation-item__text {
      color: #0097fb;
    }
  }
}
</style>
