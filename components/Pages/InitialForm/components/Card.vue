<template>
  <div class="bulding-card" :class="borderStyle" @click="choose(item)">
    <div class="background-icon">
      <!-- <SvgIcon :name="item.icon" class="huge-icon" /> -->
      <img :src="item.icon[0].url" alt="" width="60%" style="z-index: 1000" />
    </div>
    <span>{{ item.title }}</span>
    <b-form-radio
      :key="keygen"
      v-model="selected"
      name="some-radios"
      :value="item.title"
      size="lg"
    ></b-form-radio>
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
    selectedElement: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      selected: null,
      keygen: 0,
    }
  },
  computed: {
    borderStyle() {
      return this.border ? 'active-border' : ''
    },
  },
  mounted() {
    if (this.selectedElement === 'type') {
      this.selected = this.$store.getters['initialForm/getData'].building_type
    } else if (this.selectedElement === 'stage') {
      this.selected = this.$store.getters['initialForm/getData'].building_stage
    }
  },
  methods: {
    choose(item) {
      this.selected = item.title
      if (this.selected.length !== 0)
        this.$emit('add-type', item.title, item.id)
      this.keygen += 1
    },
  },
}
</script>
<style lang="scss">
.active-border {
  border: 2px solid #0085ff !important;
  box-sizing: border-box;
  background: #f7f9fc;
  .background-icon {
    background: #eef4fd !important;
  }
}
.bulding-card {
  width: 336px;
  height: 394px;
  border: 1px solid #d4d4d4;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  margin-left: 30.5px;
  margin-right: 30.5px;
  .background-icon {
    width: 150px;
    height: 150px;
    border-radius: 56px;
    margin-top: 44px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
  }
  span {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 140%;
    /* or 25px */
    height: 50px;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 90%;
  }
}
.bulding-card:hover {
  border: 2px solid #0085ff;
  box-sizing: border-box;
  background: #f7f9fc;
}
.bulding-card:hover .background-icon {
  background: #eef4fd;
}
</style>
