<template>
  <div class="initial-component">
    <div class="initial-title-page">
      <span>Step 6</span>
      <h1>Final</h1>
    </div>
    <div class="initial-content-page_final">
      <HeaderComponent :number="1" :title="`Personal data`" />
      <div class="row mt-3">
        <div class="col-6 col-lg-6">
          <label>Name</label>
          <div class="initial-input-container">
            <SvgIcon name="name" />
            <input
              v-model="form.name"
              type="text"
              class="initial-input-form"
              placeholder="Enter First Name"
            />
          </div>
        </div>
        <div class="col-6 col-lg-6">
          <label>Last Name</label>
          <div class="initial-input-container">
            <SvgIcon name="name" />
            <input
              v-model="form.last_name"
              type="text"
              class="initial-input-form"
              placeholder="Enter Last Name"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6 col-lg-6">
          <label>E-mail</label>
          <div class="initial-input-container">
            <SvgIcon name="mail" />
            <input
              v-model="form.email"
              type="email"
              :class="`initial-input-form ${
                validation.email ? `is-invalid` : ``
              }`"
              placeholder="email@example.com"
            />
          </div>
          <div class="invalid-feedback">
            <div
              v-for="(error, i) in validation.email"
              :key="`errors-email-${i}`"
            >
              {{ error }}
            </div>
          </div>
        </div>
        <div class="col-6 col-lg-6">
          <label>Phone</label>
          <div class="initial-input-container">
            <SvgIcon name="phone" />
            <masked-input
              v-model="form.phone"
              :guide="false"
              placeholder-char="#"
              :mask="[
                '+',
                '1',
                ' ',
                '(',
                /[1-9]/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]"
              type="text"
              class="initial-input-form"
              placeholder="+1 (___) ___-__-__"
            />
          </div>
        </div>
      </div>
      <hr />
      <HeaderComponent :number="2" :title="`Address`" />

      <div class="row mt-3">
        <div class="col-6 col-lg-6">
          <label>Address</label>
          <div class="initial-input-container">
            <input
              v-model="form.address"
              type="text"
              class="initial-input-form"
              placeholder="Enter Address"
              style="border: none"
            />
          </div>
        </div>
        <div class="col-6 col-lg-6">
          <label>Street</label>
          <div class="initial-input-container">
            <input
              v-model="form.street"
              type="text"
              class="initial-input-form"
              placeholder="Enter Street"
              style="border: none"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6 col-lg-6">
          <div class="form-group">
            <label>State</label>
            <div class="initial-input-container">
              <input
                v-model="form.state"
                type="text"
                class="initial-input-form"
                disabled
                style="border: none"
              />
            </div>
          </div>
        </div>
        <div class="col-6 col-lg-6">
          <div class="form-group">
            <label>City</label>
            <div class="initial-input-container">
              <input
                v-model="form.city"
                type="text"
                class="initial-input-form"
                style="border: none"
                placeholder="Enter a City"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 col-lg-6">
          <div class="form-group">
            <label>Zip</label>
            <div class="initial-input-container">
              <input
                v-model="form.zip"
                type="text"
                minlength="1"
                maxlength="9"
                class="initial-input-form"
                style="border: none"
                placeholder="Enter a zip"
              />
            </div>
          </div>
        </div>
        <div class="col-6 col-lg-6" style="margin-top: 35px">
          <div class="form-group">
            <b-form-checkbox
              v-model="form.consent_processing"
              name="checkbox-3"
              class="ml-3"
            >
              I consent to process personal data
            </b-form-checkbox>
          </div>
        </div>
      </div>
    </div>

    <div class="initial-button-group">
      <NuxtLink class="initial-link-button" to="/initial-form/rooms"
        ><SvgIcon name="arrow2" class="mr-2" />BACK</NuxtLink
      >
      <div
        class="initial-button"
        :class="`${!validation ? '' : 'disabled-btn'}`"
        @click="setData"
      >
        Final
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    HeaderComponent: () =>
      import('~/components/Pages/InitialForm/components/HeaderComponent'),
  },
  data() {
    return {
      form: {
        consent_processing: false,
      },
      validation: false,
    }
  },
  mounted() {
    const data = this.$store.getters['initialForm/getData']
    this.form.state = data.state
  },
  methods: {
    validationForm() {
      this.validation =
        this.form.name.length === 0 && this.form.last_name.length === 0
    },
    setData() {
      const store = this.$store.getters['initialForm/getData']
      // console.log(store)
      let data = {}
      data = { ...this.form }
      data.building_type_id = store.building_type_id
      data.building_stage = store.building_stage_id
      data.project_stage_date_id = store.project_stage_date_id
      data.floor_plan_photos = store.floor_plan_photo
      data.additional_info_floor_plan = store.additional_info_floor_plan
      data.rooms = []

      store.rooms.forEach((item) => {
        data.rooms.push(this.handlerRoom(item))
      })

      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/requests`, data)
        .then((response) => {
          console.log(response)
        })
        .catch((e) => {
          console.log(e)
        })

      // console.log('request', data)
      // this.$emit('final-slide', null)
    },

    handlerRoom(item) {
      const room = {}
      room.title = item.title
      room.width = Number(item.measurements.width)
      room.length = Number(item.measurements.length)
      room.height = Number(item.measurements.height)
      room.styles = item.styles
      room.style_attachments = item.styles_photo
      room.room_type_id = item.id
      room.renovation_type_id = null
      room.new_lead = true
      room.pinterest_link = item.pinterest
      room.works = []

      item.works.forEach((elem) => {
        room.works.push(this.handlerWork(elem))
      })

      return room
    },

    handlerWork(elem) {
      const work = {}

      if (elem.type === 'action') {
        work.work_type_id = elem.id
        work.work_action_id = elem.action.id
      } else if (elem.type === 'count') {
        work.work_type_id = elem.id
        work.work_action_id = elem.action.id
        work.quantity = elem.quantity
      } else if (elem.type === 'double') {
        work.work_type_id = elem.id
        work.double_current_id = elem.double_current.id
        work.double_install_id = elem.double_install.id
      }
      return work
    },
  },
}
</script>
