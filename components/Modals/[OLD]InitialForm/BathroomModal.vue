<template>
  <div>
    <b-modal
      ref="my-modal"
      variant="primary"
      hide-footer
      title="Bathroom Plumbing"
      hide-header-close
      no-close-on-backdrop
    >
      <div class="col-12 col-lg-12">
        <label>Currently Have</label>
        <div class="line-title"></div>
        <div v-for="work in currently" :key="work" class="d-flex mt-3">
          <b-form-radio
            v-model="selected.old_condition"
            :value="work"
            name="currently"
            >{{ work }}
          </b-form-radio>
        </div>
      </div>
      <div class="col-12 col-lg-12 mt-3">
        <label>Replace With</label>
        <div class="line-title"></div>
        <div v-for="work in replace" :key="work" class="d-flex mt-3">
          <b-form-radio
            v-model="selected.new_condition"
            :value="work"
            name="replace"
            >{{ work }}
          </b-form-radio>
        </div>
      </div>
      <div class="d-flex mt-3 justify-content-center">
        <button
          type="button"
          class="button button-outline-primary w-35 justify-content-center"
          @click="sendData"
        >
          Okey
        </button>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    modal: {
      type: Boolean,
      required: false,
      default: false,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      currently: ['Bathub', 'Walk-in Shower', 'Bathub & Walk-in Shower'],
      replace: [
        'New Bathub',
        'New Walk-in Shower',
        'New Bathub & Walk-in Shower',
      ],
      selected: [],
    }
  },
  watch: {
    modal() {
      if (this.modal) this.showModal()
    },
  },
  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    sendData() {
      const data = this.selected
      this.selected = []
      this.$refs['my-modal'].hide()
      this.$emit('plumbing-data', data)
    },
  },
}
</script>
<style scoped>
.line-title {
  height: 1px;
  width: 95%;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #0099ff 27.92%,
    #0097fb 77.88%,
    #ffffff 101.4%
  );
}
</style>
