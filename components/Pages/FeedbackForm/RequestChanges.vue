<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12">
      <div class="item-label">
        <label>What i like the most about the desing is</label>
      </div>
      <b-form-textarea
        v-model="descriptionLike"
        :placeholder="`Enter description`"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
    </div>

    <div class="col-12 col-lg-12 mt-2">
      <div class="item-label">
        <label>Need to change in design*</label
        ><small>Example: "wall tiles to be brighter"</small>
      </div>
      <b-form-textarea
        v-model="descriptionChange"
        :placeholder="`Enter description`"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
    </div>

    <div class="col-12 col-lg-12 mt-2">
      <div class="item-label">
        <label>The question(s) I have is/are </label>
      </div>
      <b-form-textarea
        v-model="descriptionQuestion"
        :placeholder="`Enter description`"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
    </div>
    <div
      class="col-11 col-lg-11 mt-3"
      style="border-bottom: 1px solid silver; margin: auto"
    >
      <div
        class="item-label d-flex"
        style="cursor: pointer"
        @click="changesEstimate"
      >
        <label style="cursor: pointer">Changes to the estimate</label>
        <SvgIcon
          name="prev"
          class="medium-icon"
          style="transform: scale(-1, 1)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
  width: 100% !important;
}
.form-group input {
  margin-bottom: 35px;
}
.title-form {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.title-form img {
  margin-right: 190px;
}
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
small {
  color: #0097fb;
}
.item-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<script>
export default {
  components: {
    Header: () => import('~/components/Pages/FeedbackForm/Header'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: false,
      default: 'Room',
    },
  },
  data() {
    return {
      descriptionLike: '',
      descriptionChange: '',
      descriptionQuestion: '',
      descriptionlInfo: {
        descriptionLike: '',
        descriptionChange: '',
        descriptionQuestion: '',
      },
    }
  },
  watch: {
    descriptionLike() {
      this.sendData()
    },
    descriptionChange() {
      this.sendData()
    },
    descriptionQuestion() {
      this.sendData()
    },
  },
  methods: {
    sendData() {
      this.descriptionlInfo.descriptionLike = this.descriptionLike
      this.descriptionlInfo.descriptionChange = this.descriptionChange
      this.descriptionlInfo.descriptionQuestion = this.descriptionQuestion

      this.$emit('description-info', this.descriptionlInfo)
    },
    changesEstimate() {
      this.$emit('next-btn')
    },
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
