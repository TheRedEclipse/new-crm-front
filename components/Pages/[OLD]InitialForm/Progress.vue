<template>
  <div class="progress-status mx-4 position-relative">
    <div class="progress-status__progress position-absolute">
      <div class="progress-status__progress-fill" :style="percent"></div>
    </div>
    <div class="progress-status__points d-flex justify-content-around">
      <div
        class="progress-status__item progress-status__item--done d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-number">1</span>
        <span class="progress-status__item-description"></span>
      </div>

      <div class="progress-status__item d-flex flex-column align-items-center">
        <span class="progress-status__item-description page-active">
          Personal Data
        </span>
      </div>

      <div
        class="progress-status__item progress-status__item--progress-status d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-description" :class="addressData"
          >Address</span
        >
      </div>
      <div
        class="progress-status__item progress-status__item--progress-status d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-description" :class="propertyData"
          >Property</span
        >
      </div>
      <div
        class="progress-status__item d-flex flex-column align-items-center"
        :class="statusRequestOne"
      >
        <span class="progress-status__item-number">2</span>
        <span class="progress-status__item-description"></span>
      </div>
      <div
        class="progress-status__item progress-status__item--progress-status d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-description" :class="roomData"
          >Room</span
        >
      </div>
      <div
        class="progress-status__item progress-status__item--progress-status d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-description" :class="scopeData"
          >Scope of work</span
        >
      </div>
      <div
        class="progress-status__item progress-status__item--progress-status d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-description" :class="additionalData"
          >Additional</span
        >
      </div>
      <div
        class="progress-status__item d-flex flex-column align-items-center"
        :class="statusRequestTwo"
      >
        <span class="progress-status__item-number">3</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.progress-status {
  margin-top: 38px;
  width: 80%;
  &__progress {
    width: 100%;
    height: 6px;
    background: #ecebed;
    top: 13px;
    border-radius: 6px;
    overflow: hidden;

    &-fill {
      position: absolute;
      height: 100%;
      background: #099bfc;
      transition: 0.3s ease;
    }
  }

  &__item {
    position: relative;

    &-number {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      justify-content: center;
      text-align: center;
      border-radius: 50%;
      border: 1px solid #ecebed;
      box-shadow: 0 0 0 4px #fff;
      color: #d0c9d6;
      background-color: #fff;
    }

    &-description {
      margin-top: 40px;
      color: #d0c9d6;
      font-size: 1rem;
    }

    &--done {
      .progress-status__item-number {
        color: #ffffff;
        background-color: #0097fb;
        border-color: #0097fb;
      }

      .progress-status__item-description {
        color: #0097fb;
        margin-top: 10px;
      }
    }

    &--progress {
      .progress-status__item-description {
        color: #0097fb;
        margin-top: 40px;
      }
    }
  }
  .page-active {
    color: #0097fb;
  }
}
</style>
<script>
export default {
  props: {
    percent: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      statusRequestOne: 'progress-status__item--progress-status',
      statusRequestTwo: 'progress-status__item--progress-status',
      addressData: '',
      propertyData: '',
      roomData: '',
      scopeData: '',
      additionalData: '',
    }
  },
  watch: {
    percent() {
      if (
        this.percent === 'width: 60%' ||
        this.percent === 'width: 61%' ||
        this.percent === 'width: 70%' ||
        this.percent === 'width: 85%' ||
        this.percent === 'width: 100%'
      )
        this.statusRequestOne = 'progress-status__item--done'
      else this.statusRequestOne = 'progress-status__item--progress-status'

      if (this.percent === 'width: 100%')
        this.statusRequestTwo = 'progress-status__item--done'
      else this.statusRequestTwo = 'progress-status__item--progress-status'

      if (this.percent === 'width: 30%') this.addressData = 'page-active'
      if (this.percent === 'width: 40%') this.propertyData = 'page-active'
      if (this.percent === 'width: 60%') this.roomData = 'page-active'
      if (this.percent === 'width: 61%') this.scopeData = 'page-active'
      if (this.percent === 'width: 85%') this.additionalData = 'page-active'
    },
  },
}
</script>
