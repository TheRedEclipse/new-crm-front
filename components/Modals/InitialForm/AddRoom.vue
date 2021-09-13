<template>
  <div>
    <b-modal
      id="add-room"
      hide-footer
      size="lg"
      title="Add new room"
      no-close-on-backdrop
    >
      <HeaderComponent :number="1" :title="`Type of room`" />
      <div>
        <div class="component d-flex">
          <a href="#scroll-prev">
            <div
              class="navigation"
              style="box-shadow: 12px 0px 14px -13px rgba(34, 60, 80, 0.6)"
            >
              <div>
                <SvgIcon name="arrow" style="transform: rotate(180deg)" />
              </div>
            </div>
          </a>
          <div ref="rooms_container" v-dragscroll class="component__settings">
            <div id="scroll-prev"></div>
            <div
              v-for="(room, i) in rooms"
              :key="i"
              class="component__settings__part"
            >
              <div
                class="component__settings__part-title"
                @click="selectRoom(room)"
              >
                <div class="bgr-icon">
                  <img
                    :src="`/static/images/icon-rooms/${room.icon}.svg`"
                    alt=""
                    width="36"
                    height="36"
                  />
                  <!-- <SvgIcon :name="room.icon" class="huge-icon" /> -->
                </div>
                <span>{{ room.title }}</span>
              </div>
              <b-form-checkbox
                :id="room.name"
                v-model="selected"
                name="checkbox-3"
                :value="room"
                class="mt-1 ml-1"
                size="lg"
                unchecked-value="not_accepted"
              >
              </b-form-checkbox>
            </div>
            <div id="scroll-next"></div>
          </div>
          <a href="#scroll-next">
            <div
              class="navigation"
              style="box-shadow: -12px 0px 14px -13px rgba(34, 60, 80, 0.6)"
            >
              <div><SvgIcon name="arrow" /></div>
            </div>
          </a>
        </div>
        <hr />
      </div>
      <div>
        <HeaderComponent :number="2" :title="`Renovation type`" />
        <div class="component d-flex">
          <client-only>
            <div
              v-dragscroll
              class="component__settings d-flex flex-row justify-content-center"
            >
              <div class="component__settings__renovation-block col-5">
                <div class="component__settings__renovation-block__header">
                  <span><b> Own settings </b> </span>
                  <div>
                    <img
                      :src="`/static/images/icon-other/calculator.svg`"
                      alt=""
                      width="31"
                      height="37"
                    />
                  </div>
                </div>
                <div class="component__settings__renovation-block__description">
                  You will be able to specify all types of work for each part of
                  the room
                </div>
                <div class="w-100 d-flex justify-content-center">
                  <b-form-radio
                    id="room-renovation-1"
                    v-model="renovation_type"
                    name="radiobox-1"
                    size="lg"
                    value="Own settings"
                  />
                </div>
              </div>
              <div
                class="component__settings__renovation-block col-5"
                style="opacity: 0.4"
              >
                <div class="component__settings__renovation-block__header">
                  <span
                    ><b
                      >Ready solution &<br />
                      constructor</b
                    ></span
                  >
                  <img
                    :src="`/static/images/icon-other/puzzle.svg`"
                    alt=""
                    width="39"
                    height="39"
                  />
                </div>
                <div class="component__settings__renovation-block__description">
                  You can choose a ready-made solution with a ready-made and
                  editable estimate
                </div>
                <div class="w-100 d-flex justify-content-center">
                  <b-form-radio
                    id="room-renovation-2"
                    v-model="renovation_type"
                    name="radiobox-1"
                    disabled
                    size="lg"
                    value="Ready solution & constructor"
                  />
                </div>
              </div>
            </div>
          </client-only>
        </div>
      </div>
      <span v-if="length + selected.length > 15" style="color: red"
        >You cannot add more than 15 rooms</span
      >
      <a
        class="initial-button w-100 mt-3"
        :class="`${length + selected.length <= 15 ? '' : 'disabled-btn'}`"
        @click="addroom"
        >CREATE ROOM AND CONTINUE</a
      >
    </b-modal>
  </div>
</template>
<script>
export default {
  components: {
    HeaderComponent: () =>
      import('~/components/Pages/InitialForm/components/HeaderComponent'),
  },
  props: {
    modal: {
      type: Boolean,
      required: false,
      default: false,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
    length: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      form: {},
      actions: [],
      rooms: [],
      index: 1,
      selected: [],
      renovation_type: 'Own settings',
      count: 0,
    }
  },
  mounted() {
    this.count = this.$store.getters['initialForm/getData'].counter
    this.requestData()
  },
  methods: {
    addroom() {
      this.selected.forEach((room) => {
        room.renovation_type = this.renovation_type
        this.count += 1
        this.$store.dispatch('initialForm/changeCounter', this.count)
        room.index = this.count
        room.measurements = { length: 0, width: 0, height: 0 }
        this.$axios
          .get(`${process.env.API_DOMAIN}/api/v1/references/requests/workTypes`)
          .then((response) => {
            room.works = response.data.data.work_types.filter(
              (work) => work.id === 1 || work.id === 2 || work.id === 3
            )
          })
      })
      this.$store.dispatch('initialForm/addRooms', this.selected)
      this.selected = []
      this.requestData()
      this.$emit('update_rooms')
      this.$bvModal.hide('add-room')
    },
    selectRoom(room) {
      if (this.selected.find((item) => item.id === room.id) === undefined)
        this.selected.push(room)
      // this.selected.push(room)
    },
    requestData() {
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
        .then((response) => (this.rooms = response.data.data.room_types))
    },
  },
}
</script>
<style lang="scss" scoped>
.navigation {
  max-height: 230px;
  width: 42px;
  margin: 5px;
  display: flex;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.83px;
    height: 33.83px;
    padding: 10px;
    background: rgba(140, 140, 140, 0.22);
    border-radius: 12px;
    transform: matrix(1, 0, 0, -1, 0, 0);

    svg {
      width: 16px !important;
      color: #252525f5 !important;
    }
  }
}
.huge-icon {
  width: 32px;
}
.bgr-icon {
  width: 61px;
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f9fc;
  border-radius: 20px;
  margin-right: 8px;
}
.component {
  width: 100%;

  .component__settings {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow: hidden;
    max-height: 230px;

    .component__settings__part {
      display: flex !important;
      margin: 5px;
      width: 229px;
      height: 98px;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #d4d4d4;
      font-size: 16px;
      font-weight: 300;
      padding: 15px;
      cursor: pointer;
      .component__settings__part-title {
        display: flex;
        align-items: center;
      }
    }
    .component__settings__renovation-block {
      border: 1px solid #d4d4d4;
      box-sizing: border-box;
      margin: 11.5px;
      padding: 10px;
      color: black;
      .component__settings__renovation-block__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        height: 57px;
        font-family: 'Lato';

        span {
          font-size: 18px;
          font-weight: 500;
          line-height: 140%;
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 61px;
          height: 61px;
          padding: 10px;
          color: #0085ff;
          background: #f7f9fc;
          border-radius: 20px;
        }
      }

      .component__settings__renovation-block__description {
        opacity: 0.5;
        padding: 10px;
      }
    }
  }
}
</style>
