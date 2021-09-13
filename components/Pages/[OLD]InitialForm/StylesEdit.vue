<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12 d-flex flex-wrap">
      <div v-for="style in edit" :key="style.check" class="col-4 mt-4 d-flex">
        <b-img :src="style.image" fluid> </b-img>
        <b-form-checkbox
          v-model="style.is_checked"
          name="work"
          unchecked-value="false"
          class="check-img"
        >
        </b-form-checkbox>
      </div>
    </div>
    <div class="d-flex justify-content-center w-100 mb-n3 mt-4">
      <button
        type="button"
        class="button button-outline-primary w-35 justify-content-center"
        @click="sendData"
      >
        Okey
      </button>
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
.check-img {
  margin-left: -30px;
}
</style>
<script>
import * as _ from 'lodash'
export default {
  components: {
    Header: () => import('~/components/Pages/InitialForm/Header'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    edit: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    sendData() {
      const data = _.cloneDeep(this.edit)
      this.$emit('styles', data)
    },
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
