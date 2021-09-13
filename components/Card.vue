<template>
  <div class="item-card">
    <div class="item-card__body">
      <div
        class="item-card__status-corner"
        :style="`background-color: ${color}`"
      ></div>
      <div
        v-if="image"
        class="item-card__image"
        :style="`background-image: url(${image})`"
      ></div>
      <div v-if="icon" class="item-card__image p-3">
        <SvgIcon :name="icon" class="big-icon text-primary" />
      </div>
      <div class="item-card__title">{{ title }}</div>
      <div v-if="subtitle" class="item-card__subtitle">{{ subtitle }}</div>
      <div class="item-card__status">
        <span
          class="item-card__status-icon"
          :style="`background-color: ${status.color}`"
        ></span>
        <span class="ml-2">{{ status.title }}</span>
      </div>
      <div class="w-100 mt-3">
        <slot name="fields" />
      </div>
    </div>

    <div class="item-card__footer">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: '#0097FB',
    },
    status: {
      type: Object,
      required: false,
      default: () => {
        return {
          color: '#0097FB',
          title: 'New',
        }
      },
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
      default: '',
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.item-card {
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin: 0.8rem 0;
  position: relative;
  overflow: hidden;

  &__image {
    background-color: #f9f9f9;
    width: 60px;
    height: 60px;
    background-size: cover;
    border-radius: 15px;
  }

  &__body {
    padding: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__footer {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top: 1px solid #ededed;
  }

  &__title {
    color: #416bdb;
    font-size: 1.0625rem;
    margin-top: 0.7rem;
    font-weight: 500;
  }

  &__status {
    color: #3f3356;
    display: flex;
    align-items: center;
    font-size: 0.9375rem;
    margin-top: 0.4rem;

    &-corner {
      width: 60px;
      height: 31px;
      position: absolute;
      left: -20px;
      top: -20px;
      transform: rotate(-45deg);
    }

    &-icon {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #cccccc;
      display: block;
    }
  }

  &__field {
    color: #3f3356;
    display: flex;
    align-items: center;
    font-size: 0.9375rem;
    margin-top: 0.5rem;
  }
}
</style>
