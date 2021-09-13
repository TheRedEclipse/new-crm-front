<template>
  <div>
    <NuxtLink
      v-if="to"
      v-b-tooltip.hover
      :to="to"
      class="navigation-property d-flex text-center"
      :title="title"
    >
      <span
        class="navigation-property__content d-flex flex-column align-items-center"
      >
        <SvgIcon :name="icon" class="medium-icon" />
        <span class="d-block mt-2 navigation-property__title">
          <slot />
        </span>
      </span>
    </NuxtLink>
    <span
      v-else
      v-b-tooltip.hover
      class="navigation-property d-flex text-center cursor-pointer"
      :title="title"
      @click="$bvModal.show(modal)"
    >
      <span
        class="navigation-property__content d-flex flex-column align-items-center"
      >
        <SvgIcon :name="icon" class="medium-icon" />
        <span class="d-block mt-2 navigation-property__title">
          <slot />
        </span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: false,
      default: '',
    },
    modal: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.navigation-property {
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
  color: #2148ae;
  transition: 0.2s ease;
  margin-left: -1px;
  width: 100%;

  &__content {
    width: 100%;
    // width: 114px;
  }

  &:before,
  &:after {
    width: 1px;
    height: 44px;
    background-color: transparent;
    content: '';
    transition: 0.2s ease;
  }

  &:hover {
    text-decoration: none;
    color: #0097fb;

    &:before,
    &:after {
      background-color: #d0c9d6;
    }
  }

  &__title {
    font-size: 0.75rem;
    line-height: 0.75rem;
  }
}
</style>
