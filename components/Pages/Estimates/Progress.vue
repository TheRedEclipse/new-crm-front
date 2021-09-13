<template>
  <div class="progress-status mx-4 position-relative">
    <div class="progress-status__progress position-absolute">
      <div class="progress-status__progress-fill" style="width: 50%"></div>
    </div>
    <div class="progress-status__points d-flex justify-content-around">
      <div
        class="progress-status__item progress-status__item--done d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-number">1</span>
        <span class="progress-status__item-description">{{
          $t('pages.estimatesPage.item.details.progress.stepOne')
        }}</span>
      </div>

      <div
        class="progress-status__item progress-status__item--progress d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-number">2</span>
        <span class="progress-status__item-description">{{
          $t('pages.estimatesPage.item.details.progress.stepTwo')
        }}</span>
      </div>

      <div
        class="progress-status__item progress-status__item--progress-status d-flex flex-column align-items-center"
      >
        <span class="progress-status__item-number">3</span>
        <span class="progress-status__item-description">{{
          $t('pages.estimatesPage.item.details.progress.stepThree')
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.progress-status {
  margin-top: 38px;

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
      margin-top: 10px;
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
      }
    }

    &--progress {
      .progress-status__item-description {
        color: #0097fb;
      }
    }
  }
}
</style>
