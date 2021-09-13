<template>
  <div>
    <Header
      :title="`Select parts of ` + room + ` of renovation`"
      @prev-btn="prevBtn"
    />
    <div class="col-12 col-lg-12 work-list mt-5">
      <div v-for="work in selectedRoom" :key="work.id" class="work-item">
        <label
          ><SvgIcon :name="work.icon" class="medium-icon" />
          {{ work.title }}
        </label>
        <b-form-checkbox
          v-model="works"
          :name="work.title"
          :value="work"
          unchecked-value="not_accepted"
        >
        </b-form-checkbox>
      </div>
    </div>
  </div>
</template>
<style scoped>
.work-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.work-item {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  width: 45%;
  max-width: 100%;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  padding-left: 10px;
  margin: 1%;
}
svg {
  color: #007bff;
  width: 50px;
}
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
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
  margin-right: 10%;
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
</style>
<script>
import Kitchen from '~/data/works/kitchen'
import Bathroom from '~/data/works/bathroom'
export default {
  components: {
    Header: () => import('~/components/Pages/InitialForm/Header'),
  },
  props: {
    room: {
      type: String,
      required: false,
      default: '',
    },
    component: {
      type: Number,
      required: false,
      default: 0,
    },
    index: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  data() {
    return {
      Kitchen,
      Bathroom,
      works: [],
      selectedRoom: [],
    }
  },
  watch: {
    component() {
      this.works = []
    },
    works() {
      this.$emit('selectedWorks', this.works)
      this.$emit('set-id', this.index)
    },
    room() {
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/references/requests/workTypes/${this.index}`
        )
        .then((response) => (this.selectedRoom = response.data.data.work_types))
      // if (this.room === 'Kitchen') {
      //   this.selectedRoom = this.Kitchen
      //   this.works = []
      // }
      // if (this.room === 'Bathroom') {
      //   this.selectedRoom = this.Bathroom
      //   this.works = []
      // }
    },
  },
  methods: {
    SelectRoom() {
      this.roomActions = true
      this.$emit('showBtnRoom', false)
      this.works = []
    },
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
