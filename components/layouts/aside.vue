<template>
  <div
    :class="`aside ${
      active ? `aside--active` : ``
    } col-12 col-lg-5 col-xl-4 col-xxl-3 mt-5 mt-lg-0`"
  >
    <div class="aside__toggle">
      <div
        :class="
          active
            ? `aside__toggle-arrow aside__toggle-arrow--active`
            : `aside__toggle-arrow`
        "
        @click="openAside"
      >
        <span class="aside__icon">‹</span>
      </div>
      <div class="aside__toggle-title">Details</div>
    </div>
    <div class="max-height aside__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
  methods: {
    openAside() {
      this.active = !this.active
    },
  },
}
</script>

<style lang="scss">
.aside {
  display: flex;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  right: -420px;
  top: 96px;
  z-index: 100;
  height: calc(100vh - 96px);
  transition: 0.2s ease;

  &--active {
    right: 0 !important;
  }

  &__title {
    border-bottom: 1px solid #dee2e6;
  }

  .progress-status + &__content-about {
    height: calc(100vh - 67px - 2rem - 55px - 1.5rem - 38px - 2rem - 124px);
  }

  &__content-about {
    // height: calc(100vh - 67px - 2rem - 55px - 1.5rem - 38px - 2rem - 115px);
    height: calc(100vh - 67px - 2rem - 55px - 1.5rem - 21px);
    overflow: auto;
    scrollbar-color: #e4e4e4 transparent;
    scrollbar-width: thin;
    margin-left: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    margin-right: 6px;
  }

  &__icon {
    margin-top: -1px;
  }

  &__content {
    width: 100%;
  }

  &__toggle {
    border-right: 1px solid #e7e7e7;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1px 0 -13px;
    padding: 15px 0px 10px 0;

    &-arrow {
      background: linear-gradient(
          180deg,
          #0068c9 0%,
          #0570cf 11.5%,
          #27a9ff 100%
        ),
        #ffffff;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      cursor: pointer;
      transition: 0.2s ease;
      user-select: none;

      &--active {
        transform: rotate(180deg);
        background: linear-gradient(
            0deg,
            #0068c9 0%,
            #0570cf 11.5%,
            #27a9ff 100%
          ),
          #ffffff;
      }

      &:hover {
        filter: brightness(1.1);
      }
    }

    &-title {
      transform: rotate(90deg);
      margin-top: 29px;
      color: #178ee8;
      text-transform: uppercase;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.05em;
    }
  }
}
</style>
