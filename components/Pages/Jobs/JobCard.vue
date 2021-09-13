<template>
  <div class="job-card">
    <div class="job-card__header">
      <div class="job-card__info">
        <span class="job-card__info-title">Estimate ID:</span>
        <span>3422</span>
      </div>
      <div class="job-card__badge badge badge-primary">Draft</div>
    </div>
    <div class="job-card__content">
      <div class="job-card__info mx-2">
        <span class="job-card__info-title text-gray">Date created:</span>
        <span>{{ $moment().format('MMMM d, Y') }}</span>
      </div>
      <div class="job-card__info mx-2 mt-2">
        <span class="job-card__info-title text-gray">Lead:</span>
        <span>Calvin</span>
      </div>
      <div class="job-card__info mx-2 mt-2">
        <span class="job-card__info-title text-gray">Total:</span>
        <span>$ 12345</span>
      </div>
    </div>

    <div class="job-card__footer">
      <div class="job-card__footer-info">
        <span class="text-primary">
          <SvgIcon name="user" />
        </span>
        <span>Ivan Ivanov</span>
        <span class="text-primary">(Creator)</span>
      </div>
      <NuxtLink to="/" class="job-card__footer-arrow">
        <SvgIcon name="arrow" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.job-card {
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
  padding: 10px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dfdfdf;
  }

  &__badge {
    min-width: 110px;
    letter-spacing: 0.02em;
    font-size: 14px;
    font-weight: 600;
  }

  &__info {
    margin-right: 1.5rem;
    color: #109ce1;

    &-title {
      color: #4c5862;
    }
  }

  &__footer {
    margin: 1.5rem 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-arrow {
      color: #000 !important;
      padding: 0.7rem;
      width: 45px;
      margin: -1rem -0.5rem -1rem 0;
      border-radius: 5px;
      transition: 0.2s ease;

      &:hover {
        background: #fbfbfb;
      }
    }
  }
}
</style>
