<template>
  <div class="initial-component w-100">
    <HeaderComponent :number="5" :title="`Additional information`" />
    <b-form-textarea
      id="textarea"
      v-model="data.info"
      class="mt-3"
      placeholder="Input something here if you have any information..."
      rows="8"
      @change="setInfo"
    ></b-form-textarea>
  </div>
</template>
<script>
export default {
  components: {
    HeaderComponent: () =>
      import('~/components/Pages/InitialForm/components/HeaderComponent'),
  },
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
        info: '',
      },
    }
  },
  watch: {
    room() {
      this.data.info = this.room.additional_info
    },
  },
  mounted() {
    this.data.info = this.room.additional_info
  },
  methods: {
    setInfo() {
      this.data.id_room = this.room.index
      this.$store.dispatch('initialForm/addAdditionalInfo', this.data)
    },
  },
}
</script>
<style scoped>
textarea {
  background: #fdfdfd;
  border: 1px solid #dedede;
  border-radius: 0px !important;
  margin-bottom: 20px;
  resize: none;
  box-shadow: none;
}
</style>
