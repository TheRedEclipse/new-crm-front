<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12 d-flex flex-wrap justify-content-center">
      <div v-for="style in styles" :key="style.id" class="col-4 mt-4 d-flex">
        <b-img :src="style.image" fluid> </b-img>
        <b-form-checkbox
          v-model="style.is_checked"
          name="work"
          class="check-img"
          unchecked-value="false"
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
    index: {
      type: Number,
      required: false,
      default: null,
    },
    component: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      styles: [],
      styles_2: [
        {
          img: 'https://regodesign.ru/assets/images/blog/paris/09.jpg',
          check: 1,
          status: false,
        },
        {
          img:
            'https://img2.goodfon.ru/wallpaper/big/2/98/komnata-divan-kinozal.jpg',
          check: 2,
          status: false,
        },
        {
          img:
            'https://images.by.prom.st/183793351_w640_h640_ukladka-parketnoj-doski.jpg',
          check: 3,
          status: false,
        },
        {
          img:
            'https://tvojdizajn.ru/sites/default/files/styles/870w/public/inline/images/ceilings_from_plasterboard_for_the_living_room_2.jpg',
          check: 4,
          status: false,
        },
        {
          img:
            'https://novolitika.ru/wp-content/uploads/2017/01/12-11-06_112_rd-600x400.jpg',
          check: 5,
          status: false,
        },
        {
          img:
            'https://i.pinimg.com/736x/a1/60/04/a160044d0d01388455e1106fa9928a82.jpg',
          check: 6,
          status: false,
        },
        {
          img:
            'http://img1.liveinternet.ru/images/attach/c/2/67/694/67694119_ef5cc58ff1f7.jpg',
          check: 7,
          status: false,
        },
        {
          img:
            'https://i.pinimg.com/736x/0b/dd/e2/0bdde28eade584918d944037e7b3b112.jpg',
          check: 8,
          status: false,
        },
      ],
      selectedStyles: [],
      room_id: null,
    }
  },
  watch: {
    component() {
      this.room_id = this.index
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/references/requests/roomStyles/${this.room_id}`
        )
        .then((response) => (this.styles = response.data.data.room_styles))
    },
  },

  methods: {
    sendData() {
      const data = _.cloneDeep(this.styles)
      this.styles.forEach(function (item, i, arr) {
        item.status = false
      })
      this.$emit('styles', data)
    },
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
