<template>
  <b-modal :id="id" hide-header title-class="text-left" title="">
    <div class="row d-flex justify-content-center mt-4 mb-2">
      <div class="col-10">
        <div class="d-flex justify-content-center">
          <div class="delete-modal__icon">
            <SvgIcon name="trash" />
          </div>
        </div>
        <div class="text-center">
          <div>{{ $t('modals.delete.message') }}</div>
          <div><slot name="notification" /></div>
        </div>
      </div>
    </div>

    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <button
          class="button button-danger w-35 justify-content-center mr-1"
          @click="confirm"
        >
          {{ $t('modals.delete.actions.yes') }}
        </button>
        <button
          class="button button-outline-primary w-35 justify-content-center ml-1"
          @click="$bvModal.hide(id)"
        >
          {{ $t('modals.delete.actions.no') }}
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss">
.delete-modal {
  &__icon {
    background: #f7685b;
    color: #fff;
    padding: 1.5rem;
    border-radius: 60px;
    margin-bottom: 25px;

    .icon {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
