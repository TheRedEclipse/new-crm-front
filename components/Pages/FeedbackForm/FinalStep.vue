<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12">
      <p>
        In order for us to finalize the completion list and the design concept
        for your project, we need to schedule a free in-person walkthrough. Our
        project manager will travel to you to go over the details, confirm exact
        measurements, and finalize the scope of work.
      </p>
      <hr />
      <p>
        Choose the date and time that works best for you by clicking Submit.
      </p>
      <hr />
      <p><b>Then, follow the link on the next page.</b></p>
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
