<template>
  <div>
    <b-modal
      ref="my-modalEdit"
      variant="primary"
      hide-footer
      title="Bathroom Plumbing"
      header-bg-variant="blue"
    >
      <div class="col-12 col-lg-12">
        <label>Currently Have edit</label>
        <div class="line-title"></div>
        <div v-for="work in currently" :key="work" class="d-flex mt-3">
          <b-form-radio
            v-model="selectedCurrently"
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
          <b-form-radio v-model="selectedReplace" :value="work" name="replace"
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
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
    data: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      selectedReplace: '',
      selectedCurrently: '',
      currently: ['Bathub', 'Walk-in Shower', 'Bathub & Walk-in Shower'],
      replace: [
        'New Bathub',
        'New Walk-in Shower',
        'New Bathub & Walk-in Shower',
      ],
    }
  },
  watch: {
    edit() {
      if (this.edit) this.showModal()
    },
    data() {
      this.selectedReplace = this.data.new_condition
      this.selectedCurrently = this.data.old_condition
    },
  },
  methods: {
    showModal() {
      this.$refs['my-modalEdit'].show()
    },
    hideModal() {
      this.$refs['my-modalEdit'].hide()
    },
    sendData() {
      const data = [
        {
          new_condition: this.selectedReplace,
          old_condition: this.selectedCurrently,
        },
      ]

      this.$emit('plumbing-data-edit', data)
      this.$refs['my-modalEdit'].hide()
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
