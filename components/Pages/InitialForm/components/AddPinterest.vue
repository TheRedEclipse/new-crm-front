<template>
  <div class="initial-component w-100 attachment-container">
    <div class="pintrest">
      <span class="pintrest-title">Provide Pinterest collection link</span>
      <SvgIcon name="pinterest" class="medium-icon" />
      <input
        v-model="data.link"
        type="text"
        class="pinterest-link"
        placeholder="Link"
        @change="setLink"
      />
      <span class="pintrest-descr">Something text here...</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    room: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      data: {
        link: '',
      },
    }
  },
  watch: {
    room() {
      this.data.link = this.room.pinterest
    },
  },
  mounted() {
    this.data.link = this.room.pinterest
  },
  methods: {
    setLink() {
      this.data.id_room = this.room.index
      this.$store.dispatch('initialForm/addPinterestLink', this.data)
    },
  },
}
</script>
<style lang="scss" scoped>
.attachment-container {
  position: relative;
  margin: 5px;
  height: 232px;
}
.pintrest {
  width: 100%;
  height: 232px;
  background: #f7f9fc;
  border: 1px dashed #aad5fc;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: 0.3s ease;

  &-title {
    margin-top: 10px;
    color: #272727;
    font-size: 18px;
  }

  svg {
    color: #d5e1f4;
    width: 50px !important;
    margin: 10px;
  }

  input {
    width: 80%;
    background: linear-gradient(0deg, #fdfdfd, #fdfdfd), #f3f3f3;
    border: 1px solid #dedede;
    color: #979898;
    height: 52px;
    width: 321px;
    font-size: 16px;
    padding-left: 12px;
  }

  &-descr {
    font-size: 14px;
    color: #90a8c5;
    margin-top: 5px;
  }
}
</style>
