<template>
  <div class="initial-component d-flex">
    <div class="room-bar">
      <div class="room-bar__header">
        <span class="room-bar__header-subtitle">Step 5</span>
        <span class="room-bar__header-title"
          ><b>Rooms</b><small>{{ rooms.length }}/15</small></span
        >
      </div>

      <div v-dragscroll class="mt-1" style="overflow-y: auto; max-height: 60vh">
        <div class="room-bar__rooms">
          <div
            v-for="(item, i) in rooms"
            :key="i"
            class="room-bar__rooms__room"
            :class="checkSelected(item.index)"
          >
            <img :src="`/static/images/icon-rooms/${item.icon}.svg`" />

            <div
              class="room-bar__rooms__room__header"
              @click="setRoom(item.index)"
            >
              <div class="room-bar__rooms__room__header-title">
                {{ item.title }}
              </div>
              <div class="room-bar__rooms__room__header-renovation">
                {{ item.renovation_type }}
              </div>
            </div>
            <SvgIcon
              name="close"
              class="little-icon room-bar__rooms__room-close-btn"
              @click="removeRoom(item.index, i)"
            />
            <div class="tongue" :class="checkSelected(item.index)"></div>
          </div>
        </div>
      </div>
      <div
        v-if="rooms.length < 15"
        class="room-bar__add-room"
        @click="$bvModal.show('add-room')"
      >
        <div class="room-bar__add-room-icon">+</div>
        Add New Room
      </div>
      <div v-else class="room-bar__add-room" style="cursor: default">
        Maximum number of added rooms
      </div>
      <div class="d-flex room-bar__buttom-group">
        <NuxtLink class="initial-link-button" to="/initial-form/floor-plan"
          ><SvgIcon name="arrow2" class="mr-2" />BACK</NuxtLink
        >
        <NuxtLink
          :class="`${rooms.length > 0 ? '' : 'disabled-btn'}`"
          class="initial-button-rooms"
          to="/initial-form/final"
          >Next</NuxtLink
        >
      </div>
    </div>

    <div class="workspace">
      <div v-if="selected_room" class="w-100">
        <Measurements :room="selected_room" />
        <hr />
        <PartsToRenovation :room="selected_room" />
        <hr />
        <PreferredStyles :room="selected_room" @update-files="setRoom" />
        <hr />
        <ExistingConditionPhotos
          :room="selected_room"
          @update-files="setRoom"
        />
        <hr />
        <AdditionalInfo :room="selected_room" />
      </div>
      <div v-else class="workspace__create-room">
        <img :src="`/static/images/icon/create-room.png`" />
        <span class="workspace__create-room-msg"
          >Create or select room <br />
          to continue</span
        >
      </div>
    </div>
    <AddRoom :length="rooms.length" @update_rooms="updateRooms" />
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  components: {
    Measurements: () =>
      import('~/components/Pages/InitialForm/components/Measurements'),
    PartsToRenovation: () =>
      import('~/components/Pages/InitialForm/components/PartsToRenovation'),
    PreferredStyles: () =>
      import('~/components/Pages/InitialForm/components/PreferredStyles'),
    ExistingConditionPhotos: () =>
      import(
        '~/components/Pages/InitialForm/components/ExistingConditionPhotos'
      ),
    AdditionalInfo: () =>
      import('~/components/Pages/InitialForm/components/AdditionalInfo'),
    AddRoom: () => import('~/components/Modals/InitialForm/AddRoom'),
  },
  props: {
    room: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      rooms: [],
      selected_room: false,
    }
  },
  mounted() {
    this.updateRooms()
    this.selected_room = this.rooms.length !== 0 ? this.rooms[0] : false
  },
  methods: {
    removeRoom(index, i) {
      this.$store.dispatch('initialForm/deleteRooms', _.cloneDeep(index))
      if (i === 0) {
        this.selected_room = false
      } else {
        this.setRoom(this.rooms[i - 1].index)
      }
      this.updateRooms()
    },
    checkSelected(index) {
      if (index === this.selected_room.index) {
        return 'active-room'
      }
    },
    setRoom(index) {
      this.selected_room = {
        ...this.$store.getters['initialForm/getData'].rooms.find(
          (room) => room.index === index
        ),
      }
      // загрузка дефолтных ворков для нового рума
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/references/requests/workTypes`)
        .then((response) => {
          this.selected = response.data.data.work_types.filter(
            (work) => work.id === 1 || work.id === 2 || work.id === 3
          )
        })
    },
    updateRooms() {
      this.rooms = _.cloneDeep(this.$store.getters['initialForm/getData'].rooms)
    },
  },
}
</script>
<style lang="scss" scoped>
.active-room {
  border: 1px solid #0085ff !important;
  .tongue {
    background: #0085ff !important;
  }
}
.tongue {
  width: 4px;
  position: relative;
  height: 62px;
  background: #e6edf7;
  border-radius: 0px 5px 5px 0px;
  right: -23px;
}
.room-bar {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100vh;
  background: #f7f9fc;
  position: relative;
  small {
    font-size: 12px;
    margin-left: 10px;
  }

  &__buttom-group {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    justify-content: center;
    width: 100%;
    bottom: 22px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    margin-top: 33px;
    margin-left: 15px;
    text-transform: uppercase;

    &-title {
      font-size: 32px;
      margin-top: 5px;
    }

    &-subtitle {
      font-size: 16px;
      color: #979898;
    }
  }

  &__rooms {
    margin-left: 15px;
    padding: 10px;
    min-height: 0px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;

    &__room {
      background: #ffffff;
      border: 1px solid #e6edf6;
      box-sizing: border-box;
      width: 95%;
      height: 107px;
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px;
      cursor: pointer;
      position: relative;
      img {
        width: 15%;
        margin-right: 10px;
      }

      &__header {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 70%;
        height: 107px;
        &-title {
          font-size: 18px;
        }

        &-renovation {
          color: #979898;
          font-weight: 300;
          font-size: 14px;
        }
      }

      &-close-btn {
        opacity: 0;
        color: red;
        cursor: pointer;
        position: relative;
        right: 0px;
      }
    }
    &__room:hover > &__room-close-btn {
      opacity: 1;
    }
    &__room:hover {
      border: 1px solid #0085ff !important;
      .tongue {
        background: #0085ff !important;
      }
    }
  }
  .initial-button-rooms {
    min-width: 50%;
    max-width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0085ff;
    text-transform: uppercase;
    color: #ffffff;
    cursor: pointer;
  }
  &__add-room {
    color: #0085ff;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 66px;
    background: #f7f9fc;
    border: 1px dashed #aad5fc;
    box-sizing: border-box;
    cursor: pointer;

    &-icon {
      width: 26px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 19px;
      background: #eef4fd;
      border-radius: 8px;
      margin-right: 10px;
    }
  }
}
.workspace {
  overflow: scroll;
  overflow-x: hidden;
  margin-top: 38px;
  width: 1000px;
  padding: 30px;
  height: 95vh;

  &__create-room {
    display: flex;
    margin-top: 168px;
    width: 900px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-msg {
      margin-top: 10px;
      font-size: 28px;
      color: #979898;
      text-align: center;
      line-height: 140%;
    }
  }
}
</style>
