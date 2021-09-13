<template>
  <div class="container__date initial-component" @click="choose(item)">
    <div class="container__date-item" :class="borderStyle">
      <span>{{ item.title }}</span>
      <b-form-radio
        v-model="selected"
        name="some-radios"
        :value="item.title"
        size="lg"
      ></b-form-radio>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      require: false,
      default: () => {
        return {}
      },
    },
    border: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    borderStyle() {
      return this.border ? 'active-border' : ''
    },
  },
  mounted() {
    this.selected = this.$store.getters[
      'initialForm/getData'
    ].project_stage_date
  },
  methods: {
    choose(item) {
      this.selected = item.title
      if (this.selected.length !== 0)
        this.$emit('add-stage-date', item.title, item.id)
    },
  },
}
</script>
<style lang="scss">
.active-border {
  border: 2px solid #0085ff !important;
  box-sizing: border-box;
  background: #f7f9fc;
}
.container {
  &__date-item {
    width: 484px;
    height: 88px;
    border: 1px solid #d4d4d4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    margin-bottom: 24px;
    font-size: 18px;
    color: #1f252c;
  }

  &__date-item:hover {
    transition: 1s;
    border: 1px solid #0097fb;
  }
}
</style>
