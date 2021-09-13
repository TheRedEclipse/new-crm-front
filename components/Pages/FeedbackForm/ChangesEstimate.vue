<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12">
      <div class="item-label">
        <label><SvgIcon name="plus" class="medium-icon" />Add</label>
      </div>
      <b-form-textarea
        v-model="add"
        :placeholder="`Enter description`"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
      <small>Example: "Bathroom - add 2 recessed lights"</small>
    </div>

    <div class="col-12 col-lg-12 mt-4">
      <div class="item-label">
        <label><SvgIcon name="trash" class="medium-icon" />Remove</label>
      </div>
      <b-form-textarea
        v-model="remove"
        :placeholder="`Enter description`"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
      <small>Example: "Kitchen - remove dishwasher installation"</small>
    </div>

    <div class="col-12 col-lg-12 mt-4">
      <div class="item-label">
        <label><SvgIcon name="replace" class="medium-icon" />Change</label>
      </div>
      <b-form-textarea
        v-model="change"
        :placeholder="`Enter description`"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
      <small
        >Example: "Bathroom - change ceramic floor tile installation to marble
        floor tile installation"</small
      >
    </div>
    <div class="col-12 col-lg-12 mt-4">
      <div class="item-label">
        <label
          ><SvgIcon name="question" class="medium-icon" />Additional
          Questions</label
        >
      </div>
      <b-form-textarea
        v-model="additionalQuestion"
        :placeholder="`Enter description`"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
    </div>
  </div>
</template>
<style scoped>
svg {
  color: #0097fb;
  width: 20px;
  margin-right: 10px;
}
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
      add: '',
      remove: '',
      change: '',
      additionalQuestion: '',
      changesInfo: {
        add: '',
        remove: '',
        change: '',
        additionalQuestion: '',
      },
    }
  },
  watch: {
    add() {
      this.sendData()
    },
    remove() {
      this.sendData()
    },
    change() {
      this.sendData()
    },
    additionalQuestion() {
      this.sendData()
    },
  },
  methods: {
    sendData() {
      this.changesInfo.add = this.add
      this.changesInfo.remove = this.remove
      this.changesInfo.change = this.change
      this.changesInfo.additionalQuestion = this.additionalQuestion

      this.$emit('changes-info', this.changesInfo)
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
