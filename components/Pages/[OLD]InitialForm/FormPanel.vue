<template>
  <div class="workspace">
    <form>
      <div
        v-if="canStoreRequest && $route.query.id && lead_name"
        class="informer"
      >
        <p>
          You fill out the request on behalf of the user
          <b> {{ lead_name }} </b>
        </p>
      </div>
      <div class="form-group">
        <PersonalData
          id="1"
          :title="'Personal data'"
          :class="oneSlide"
          :lead="lead"
          @personal-data="personalData"
        />
        <Address
          id="2"
          :title="'Enter your address'"
          :class="twoSlide"
          @prev-btn="prevBtn"
          @address-data="addressData"
        />
        <Property
          id="3"
          :title="'Property'"
          class="form-item"
          @prev-btn="prevBtn"
          @property-data="propertyData"
        />
        <Room
          id="4"
          :title="'Room'"
          :list="dataRooms"
          class="form-item"
          :reset="resetRoom"
          :email="email_lead"
          :lead="result.personal_data"
          :status="status_send"
          @prev-btn="prevBtn"
          @showBtnRoom="showBtn"
          @showWorksRoom="showWorksRoom"
          @send-data="sendData"
          @showWorksRoomRenov="typeRenov"
          @scope-works="deleteRoom"
          @works-edit="workEdit"
        />
        <ScopeWork
          id="5"
          :index="currentRoom.room_type_id"
          :room="selectedRoom"
          :component="idComponent"
          class="form-item"
          @prev-btn="prevBtn"
          @selectedWorks="selectedWorks"
          @set-id="setIdRoom"
        />
        <ScopeWorkAction
          id="6"
          :room="selectedRoom"
          class="form-item"
          :action-works="actionWorks"
          :lighting="lighting"
          :type="renovation_type"
          :plumbing="plumbing"
          :index="currentRoom.room_type_id"
          @prev-btn="prevBtn"
          @room-data="roomData"
        />
        <Additional
          id="7"
          :room="selectedRoom"
          :title="'Additional info'"
          class="form-item"
          @prev-btn="prevBtn"
          @room-data-additional="dataAdditional"
        />
        <Styles
          id="8"
          :title="'Choose your preferred styles'"
          class="form-item"
          :index="currentRoom.room_type_id"
          :component="idComponent"
          @prev-btn="prevBtn"
          @styles="selectStyle"
        />
        <Edit
          id="9"
          :room="selectedRoom"
          class="form-item"
          :edit="edit"
          :plumbing="plumbing"
          @prev-btn="prevBtn"
          @save-edit="saveEdit"
          @room-data="roomData"
        />
        <AditionalEdit
          id="10"
          :room="selectedRoom"
          :title="'Additional info Edit'"
          class="form-item"
          :edit="edit"
          :plumbing="plumbing"
          @prev-btn="prevBtn"
          @save-edit="saveEdit"
          @room-data="roomData"
          @additional-edit="additionalEdit"
        />
        <StylesEdit
          id="11"
          :title="'Choose your preferred styles'"
          class="form-item"
          :edit="stylesEdit"
          @prev-btn="prevBtn"
          @styles="styleEdit"
        />
        <!-- <BathroomModal
          :modal="modal"
          class="modalWindow"
          @plumbing-data="plumbingData"
        />
        <BathroomEditModal
          :edit="modalEditMod"
          :data="plumbingEdit"
          class="modalWindow"
          @plumbing-data-edit="plumbingDataEdit"
        /> -->
      </div>
    </form>

    <div class="d-flex justify-content-center w-100 mb-3">
      <button
        v-if="
          id != 4 &&
          id != 5 &&
          id != 6 &&
          id != 7 &&
          id != 8 &&
          id != 9 &&
          id != 10 &&
          id != 11
        "
        type="button"
        class="button button-outline-primary w-35 justify-content-center"
        @click="nextBtn"
      >
        Next
      </button>
      <button
        v-if="id == 5"
        type="button"
        class="button button-outline-primary w-35 justify-content-center"
        @click="nextBtn"
      >
        Okey
      </button>
    </div>
    <div v-if="id == 4" class="d-flex justify-content-center w-100 mb-3 mt-4">
      <button
        type="button"
        class="button button-outline-primary d-flex justify-content-center col-3"
        :disabled="calcBtn"
        @click="nextBtn"
      >
        Calculate Work
      </button>
      <!-- <button
        type="button"
        class="button button-primary justify-content-center col-3 ml-5"
        @click="nextBtn"
      >
        Ready Solutions
      </button> -->
    </div>
    <b-modal
      ref="my-modal-final"
      hide-footer
      title="Modern City Group"
      hide-header-close
      no-close-on-backdrop
    >
      <div v-if="status_send" class="d-block text-center">
        <div v-if="lead.new_lead">
          <p>
            Thank you for the data provided. We have registered an account for
            you in our system. Login data has been sent to the mail.
          </p>

          <p>
            Please check your mail (<b>{{ lead.email }}</b
            >). We have sent you a username and password from your personal
            account
          </p>
        </div>
        <h2 class="mt-4">
          <b>Your request has been successfully sent.</b>
          We will contact you shortly.
        </h2>
        <!-- <div v-else>
          <b-img
            src="http://pic.90sjimg.com/design/00/07/85/23/58ef952f9ea96.png"
            height="300"
          ></b-img>
          <h2>Oops ... Something went wrong. Try later...</h2>
        </div> -->
      </div>
    </b-modal>
  </div>
</template>
<style scoped>
.informer {
  background: rgb(208, 230, 240);
  margin-top: 5px;
  padding: 1%;
  margin-bottom: 10px;
  border-radius: 15px;
}
.informer p {
  margin-left: 20px;
}
.form-group {
  display: flex;
  /* flex-direction: column; */
}
.active {
  width: 100%;
  display: block !important;
}
.form-item {
  display: none;
}
</style>
<script>
import * as _ from 'lodash'

import kitchen from '~/data/works/kitchen'
export default {
  components: {
    PersonalData: () => import('~/components/Pages/InitialForm/PersonalData'),
    Address: () => import('~/components/Pages/InitialForm/Address'),
    Property: () => import('~/components/Pages/InitialForm/Property'),
    Room: () => import('~/components/Pages/InitialForm/Room'),
    ScopeWork: () => import('~/components/Pages/InitialForm/ScopeWork'),
    ScopeWorkAction: () =>
      import('~/components/Pages/InitialForm/ScopeWorkAction'),
    Additional: () => import('~/components/Pages/InitialForm/Additional'),
    Styles: () => import('~/components/Pages/InitialForm/Styles'),
    Edit: () => import('~/components/Pages/InitialForm/Edit'),
    AditionalEdit: () =>
      import('~/components/Pages/InitialForm/AdditionalEdit'),
    StylesEdit: () => import('~/components/Pages/InitialForm/StylesEdit'),
    // BathroomModal: () =>
    //   import('~/components/Modals/InitialForm/BathroomModal'),
    // BathroomEditModal: () =>
    //   import('~/components/Modals/InitialForm/BathroomEditModal'),
  },
  props: {
    lead: {
      type: Object,
      require: false,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      id: 1,
      oneSlide: 'active',
      twoSlide: 'form-item',
      last_room_id: null,
      lead_name: false,
      email_lead: null,
      kitchen,
      currentRoom: {},
      result: {},
      calcBtn: true,
      selectedRoom: '',
      actionWorks: null,
      lighting: null,
      roomsList: [
        {
          type: 'Kitchens',
          values: [],
        },
        {
          type: 'Bathroom',
          values: [],
        },
      ],
      scopeWork: [],
      status_send: true,
      renovation_type: '',
      modal: false,
      modalEditMod: false,
      plumbing: null,
      idComponent: 1,
      idRoom: null,
      edit: {
        actionEdit: null,
        lightEdit: null,
        ligth: null,
      },
      dataRooms: [],
      editPlumbing: null,
      stylesEdit: null,
      plumbingEdit: null,
      roomCount: null,
      resetRoom: false,
      progressBar: [
        '15%',
        '30%',
        '40%',
        '60%',
        '61%',
        '70%',
        '85%',
        '85%',
        '100%',
        '60%',
        '60%',
        '60%',
      ],
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser'].user
    },
    canStoreRequest() {
      return (
        this.currentUser?.permissions['request.store'] &&
        !this.currentUser?.permissions['-request.store']
      )
    },
  },
  mounted() {
    if (this.lead?.user?.name || this.lead?.user?.last_name) {
      this.lead_name = `${this.lead?.user?.name} ${this.lead?.user?.last_name}`
    }
    if (this.lead.id !== undefined && this.canStoreRequest) {
      this.id = 2
      this.twoSlide = 'active'
      this.oneSlide = 'form-item'
      this.$emit('increaseProgress', this.progressBar[1])
    }
  },
  methods: {
    nextBtn(loop = null) {
      const id = this.id
      if (this.selectedRoom === 'Bathroom' && this.id < 9) {
        this.modal = true
      }
      if (this.selectedRoom === 'Bathroom' && this.id === 9 && this.id !== 10) {
        this.modalEditMod = true
      }
      if (loop === 4) {
        this.modal = false
        this.resetRoom = true
        this.modalEditMod = false
        this.idComponent = this.roomsList.length + 1
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'form-item'
        const loopForm = document.getElementById(loop)
        loopForm.className = 'active'
        this.id = loop
        this.$emit('increaseProgress', this.progressBar[loop])
      } else if (loop === 9) {
        this.modal = false
        this.resetRoom = false
        this.idComponent = this.roomsList.length + 1
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'form-item'
        const loopForm = document.getElementById(loop)
        loopForm.className = 'active'
        this.id = loop
        this.$emit('increaseProgress', this.progressBar[loop])
      } else {
        let prevForm = null
        prevForm = this.id
        this.id = this.id + 1
        prevForm = document.getElementById(prevForm)
        prevForm.className = 'form-item'
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'active'
        this.$emit('increaseProgress', this.progressBar[id])
      }
      if (this.id === 5) this.idComponent = this.idComponent + 1
    },
    prevBtn(loop) {
      if (loop === 4) {
        this.modal = false
        this.idComponent = this.roomsList.length + 1
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'form-item'
        const loopForm = document.getElementById(loop)
        loopForm.className = 'active'
        this.id = loop
        this.$emit('increaseProgress', this.progressBar[loop])
      } else {
        let prevForm = null
        prevForm = this.id
        this.id = this.id - 1
        prevForm = document.getElementById(prevForm)
        prevForm.className = 'form-item'
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'active'
        this.$emit('increaseProgress', this.progressBar[this.id - 1])
      }
    },
    showBtn(hiddenBtn) {
      this.calcBtn = hiddenBtn
    },
    showWorksRoom(room) {
      if (room) {
        this.selectedRoom = room.title
        this.currentRoom.room_type_id = room.id
        this.last_room_id = room.id
      }
    },
    setIdRoom(id) {
      this.currentRoom.room_type_id = id
    },
    selectedWorks(works) {
      this.lighting = false
      works.forEach((work) => {
        if (work.id === 7) {
          this.lighting = true
        }
      })
      works = works.filter((work) => work.id !== 7)
      this.actionWorks = works
      this.currentRoom.renovation_type_id = 1
      this.currentRoom.renovation_type_title = 'Full Renovation'
      this.currentRoom.room_type_id = this.last_room_id
      works = []
    },
    plumbingData(data) {
      this.plumbing = data
    },
    personalData(data) {
      this.result = data

      this.email_lead = data.email
    },
    addressData(data) {
      this.result.address = data.address
      this.result.street = data.street
      this.result.city = data.city
      this.result.state = data.state
      this.result.zip = data.zip
    },
    propertyData(data) {
      this.result.building_type_id = data.building_type_id
      this.result.building_stage_id = data.building_stage_id
      this.result.project_stage_date_id = data.project_stage_date_id
    },
    // сохраняет основные данные о комнате
    roomData(data) {
      this.resetRoom = false
      this.lighting = false
      this.currentRoom.countable = data.countable
      this.currentRoom.works = data.works
      this.currentRoom.room = data.room_title
      this.currentRoom.has_ligth = data.ligth
      this.currentRoom.plumbing = data.plumbing
      if (this.currentRoom.room_type_id)
        this.last_room_id = this.currentRoom.room_type_id
      data = {}
      this.nextBtn()
    },
    typeRenov(data) {
      if (data) this.currentRoom.renovation_type_id = data.id
      if (data) this.currentRoom.renovation_type_title = data.title
    },
    // добавляет данные с вкладки additional
    dataAdditional(data) {
      this.currentRoom.size = data.size
      this.currentRoom.description = data.description
      // data = null
      this.nextBtn()
    },
    workEdit(data) {
      this.selectedRoom = data[0].room
      this.plumbingEdit = data[0].plumbing
      this.edit.actionEdit = data[0].works
      this.edit.countable = data[0].countable
      this.edit.has_ligth = data[0].has_ligth
      this.edit.description = data[0].description
      this.edit.size = data[0].size
      this.edit.id = data[0].id
      this.stylesEdit = data[0].styles
      this.nextBtn(9)
    },
    plumbingDataEdit(data) {
      this.editPlumbing = data[0]
    },
    additionalEdit(data) {
      for (const key in this.edit.actionEdit) {
        if (this.edit.actionEdit[key].action) {
          this.edit.actionEdit[key].work_action_id = this.edit.actionEdit[
            key
          ].action.id
        }
      }
      data.plumbing = this.editPlumbing
      this.dataRooms.forEach(function (item, i, arr) {
        if (item.id === data.id) {
          item.size = data.size
          item.description = data.description
        }
      })
      this.editPlumbing = null
      this.modalEditMod = false
      this.resetRoom = true
      this.nextBtn()
    },
    styleEdit(data) {
      const id = this.edit.id
      const styles = data
      this.dataRooms.forEach(function (item, i, arr) {
        if (item.id === id) {
          item.styles = styles
        }
      })
      this.nextBtn(4)
    },
    deleteRoom(data) {
      this.dataRooms = data
    },
    saveEdit() {
      this.resetRoom = true
      this.nextBtn(10)
    },
    selectStyle(data) {
      this.currentRoom.styles = data

      this.scopeWork.push(this.currentRoom)
      this.installationId()
      this.dataRooms.push(this.currentRoom)
      this.lastRoom = _.cloneDeep(this.currentRoom)
      this.currentRoom = {}
      this.modal = false
      this.nextBtn(4)
    },
    installationId() {
      this.roomCount = this.roomCount + 1
      this.currentRoom.id = this.currentRoom.room + '_' + this.roomCount
    },
    scopeWorks(data) {
      this.scopeWork.push(data)
    },

    // удаляет лишнее из финального реквеста
    sendData() {
      const errors = []
      this.dataRooms.forEach(function (item, i, arr) {
        if (item.room === 'Kitchen') {
          item.styles = item.styles.filter((item) => item.is_checked === true)
          if (item.size === '') item.size = null
          if (item.description === '') item.description = null
          delete item.plumbing
        }
        if (item.room === 'Bathroom') {
          item.styles = item.styles.filter((item) => item.is_checked === true)
        }
      })
      this.result.rooms = this.dataRooms
      this.$emit('increaseProgress', this.progressBar[8])
      this.filterData(this.result)
      console.log(this.result)
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/requests`, {
          ...this.filterData(this.result),
        })
        .then((response) => {
          console.log(response)
        })
        .catch((e) => {
          this.status_send = false
          errors.push(e)
        })
    },
    filterData(result) {
      result.rooms.forEach(function (item, i) {
        result.rooms[i] = _.pick(item, [
          'room_type_id',
          'renovation_type_id',
          'size',
          'description',
          'styles',
          'works',
          'countable',
        ])

        item.works.forEach(function (work, i) {
          item.works[i] = _.pick(work, ['work_type_id', 'work_action_id'])
        })
        item.styles.forEach(function (style, i) {
          item.styles[i] = _.pick(style, ['id'])
        })
        item.countable.forEach(function (elem, i) {
          item.countable[i] = _.pick(elem, ['countable_type_id', 'count'])
        })
      })
      return result
    },
  },
}
</script>
