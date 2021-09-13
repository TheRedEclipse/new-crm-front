<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12 mt-5">
      <label>Rooms</label>
      <multiselect
        v-model="room"
        class="mt-3"
        :options="rooms"
        placeholder="Select rooms"
        label="title"
      />
    </div>
    <div class="col-12 col-lg-12 mt-5">
      <h3>Type of Renovation</h3>
      <multiselect
        v-model="SelectedTypeRenov"
        class="mt-3"
        :options="typeRenov"
        label="title"
        placeholder="Select renovation"
        :disabled="roomActions"
      />
    </div>
    <div
      v-if="list.length !== 0 && reset === true"
      class="col-12 col-lg-12 mt-5"
    >
      <div class="scope-work">
        <h3 style="width: 100%">Scope Of Work</h3>

        <client-only>
          <carousel
            :items="3"
            :nav="false"
            :dots="true"
            :autoplay="false"
            class="page-navigation__slider"
          >
            <div v-for="item in list" :key="item.id" class="room-item">
              <div>
                <label>{{ item.id.replace('_', ' ') }}</label>
                <small>{{ item.renovation_type_title }}</small>
              </div>
              <SvgIcon :name="item.room" />
              <div class="action-room">
                <SvgIcon
                  name="edit"
                  style="color: #0097fb"
                  @click="editRoom(item.id)"
                />
                <SvgIcon name="trash" @click="deleteRoom(item.id)" />
              </div>
            </div>
          </carousel>
        </client-only>
      </div>
      <div class="d-flex justify-content-center" style="width: 100%">
        <button
          id="show-btn"
          type="button"
          class="button button-finish button-link-primary justify-content-center col-3 ml-5"
          @click="showModal"
        >
          Finish
        </button>
      </div>
    </div>
    <b-modal ref="my-modal" hide-footer title="Select Date and Time">
      <div class="d-block text-center">
        <label>Your request will be sent for consideration.</label>
        <label>if you cheked then send</label>
      </div>
      <button
        type="button"
        class="button button-primary justify-content-center col-3 mt-5"
        block
        @click="sendData"
      >
        Send
      </button>
    </b-modal>
  </div>
</template>
<script>
export default {
  components: {
    Header: () => import('~/components/Pages/InitialForm/Header'),
    Carousel: () => (process.client ? import('vue-owl-carousel') : null),
  },
  props: {
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    reset: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: false,
      default: '',
    },
    lead: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    list: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      rooms: [],
      room: [],
      roomActions: true,
      typeRenov: [],
      SelectedTypeRenov: '',
      // form: {
      //   room: this.room.title,
      //   room_type_id: this.room.id,
      // },
    }
  },
  watch: {
    room() {
      if (this.room !== null) {
        this.SelectRoom(false)
      } else {
        this.SelectRoom(true)
      }

      this.$emit('showWorksRoomRenov', this.SelectedTypeRenov)
    },
    SelectedTypeRenov() {
      if (this.SelectedTypeRenov !== '' && this.room !== null) {
        this.SelectRoom(false)
      } else {
        this.SelectRoom(true)
      }
      this.$emit('showWorksRoomRenov', this.SelectedTypeRenov)
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
      .then((response) => (this.rooms = response.data.data.room_types))
    this.$axios
      .get(
        `${process.env.API_DOMAIN}/api/v1/references/requests/renovationTypes`
      )
      .then(
        (response) => (this.typeRenov = response.data.data.renovation_types)
      )
  },
  methods: {
    SelectRoom(check) {
      this.roomActions = check
      this.$emit('showBtnRoom', check)
      // if (this.SelectedTypeRenov !== '' && this.room.title !== '') {
      //   this.$emit('showBtnRoom', false)

      // } else this.$emit('showBtnRoom', true)
      this.$emit('showWorksRoom', this.room)
    },
    // завершающий этап, будут выполненные инструкции по формированию и отправки данных
    sendData() {
      this.$emit('send-data')
    },
    deleteRoom(id = null) {
      const list = this.list.filter((room) => room.id !== id)
      this.$emit('scope-works', list)
    },
    editRoom(id = null) {
      const list = this.list.filter((room) => room.id === id)
      this.$emit('works-edit', list)
    },
    prevBtn() {
      this.$emit('prev-btn')
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  },
}
</script>
<style scoped>
.button-finish {
  font-size: 24px;
  border: none;
  font-weight: 300px;
}
.button-finish:hover {
  color: #000;
  box-shadow: none;
}
svg {
  color: #0097fb;
}
.scope-work {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dashed rgba(85, 86, 87, 0.45);
  border-top: 1px dashed rgba(85, 86, 87, 0.45);
}
.room-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 10px;
  height: 68px;

  background: #ffffff;
  border: 1px solid #0097fb;
  box-sizing: border-box;
  box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  margin: 10px;
}
.room-item div {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}
.room-item svg {
  width: 40px;
  height: 40px;
}
.room-item div label {
  color: #0097fb;
  font-weight: bold;
  font-size: 16px;
}
.room-item div small {
  margin-right: 20px;
  font-size: 12px;
  opacity: 0.5;
}
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
}
.action-room {
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row !important;
  width: 200px;
  height: 60px;
  z-index: 99999;
  margin-top: -57px;
  background: rgb(255, 255, 255);
  opacity: 0;
}
.action-room:hover {
  transition: 0.5s;
  opacity: 0.7;
}
.action-room svg {
  width: 23px;
  height: 23px;
  color: crimson;
  cursor: pointer;
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
</style>
