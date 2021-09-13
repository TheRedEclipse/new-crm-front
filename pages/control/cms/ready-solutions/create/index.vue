<template>
  <div>
    <AdminBar />
    <div class="row aside-padding">
      <div class="col-12">
        <div class="container m-4">
          <div class="ml-4">
            <h1>Create a ready-made solution</h1>
            <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
              switch
            >
              <span>Portfolio is popular in catalog filter</span>
            </b-form-checkbox>
          </div>

          <div class="d-flex justify-content-center">
            <div class="col-6 mt-2">
              <label>Title</label>
              <input
                v-model="solution.title"
                type="text"
                class="form-control"
                placeholder="Title Solution"
              />

              <div class="">
                <label>Room Type</label>
                <multiselect
                  v-model="solution.room_type_id"
                  class=""
                  :options="rooms"
                  placeholder="Select rooms"
                  label="title"
                />
              </div>
              <label>Size</label>
              <input
                v-model="solution.size"
                type="number"
                class="form-control"
                placeholder="Ft"
                min="0"
              />
              <div class="form-group mb-0 mt-1">
                <label>Description</label>
                <b-form-textarea
                  v-model="solution.description"
                  placeholder="`Description of the ready-made solution"
                  rows="3"
                  max-rows="6"
                >
                </b-form-textarea>
              </div>
              <div class="form-group mb-0 mt-1">
                <label
                  >Price Starts From<label style="color: red">*</label></label
                >
                <input
                  v-model="solution.price"
                  type="number"
                  class="form-control"
                  placeholder="Minimum price for a ready-made solution"
                />
              </div>
              <div class="form-group mb-0 mt-4">
                <LoadFile :id="`main-create`" :title="``" @add-file="addFile" />
              </div>
            </div>
            <div class="col-6">
              <div>
                <h2 class="mb-3">HARDWARE & APPLIANCES</h2>
                <a class="button button-primary" @click="selectHardwareModal">
                  <SvgIcon name="awards" />
                  <span class="ml-2">Select options</span>
                </a>

                <a
                  class="button button-outline-primary ml-4"
                  @click="addHardwareModal"
                >
                  <AddHardware
                    :id="`create_hardware`"
                    @add-options="createHardware"
                  />
                  <SvgIcon name="plus" />
                  <span class="ml-2">Add more</span>
                </a>
                <div>
                  <draggable
                    class="d-flex selected-item"
                    :list="solution.hardware"
                    group="card"
                  >
                    <div
                      v-for="(img, i) in solution.hardware"
                      :key="i"
                      class="m-1 col-3 material"
                    >
                      <div>
                        <SvgIcon
                          name="trash"
                          style="color: red; z-index: 100; cursor: pointer"
                          @click="deleteHardwareItem(img.id)"
                        />
                        <b-img
                          :src="img.img"
                          style="border-radius: 5px; width: 50%"
                          alt="Responsive image"
                        ></b-img>
                        <SvgIcon
                          name="dragble"
                          style="z-index: 100; cursor: pointer; opacity: 0.2"
                          class="ml-3"
                        />
                      </div>
                    </div>
                  </draggable>
                </div>
              </div>
              <div class="mt-5">
                <h2 class="mb-3">ADDITIONAL OPTIONS</h2>
                <a class="button button-primary" @click="selectOptionModal">
                  <SelectAdditionalOptions
                    :id="`select-options`"
                    @add-options="addOptions"
                  />
                  <SelectAdditionalOptions
                    :id="`select-hardware`"
                    @add-options="addHardware"
                  />
                  <AddHardware
                    :id="`create_options`"
                    @add-options="createOptions"
                  />
                  <SvgIcon name="awards" />
                  <span class="ml-2">Select options</span>
                </a>
                <a
                  class="button button-outline-primary ml-4"
                  @click="addOptionsModal"
                >
                  <SvgIcon name="plus" />
                  <span class="ml-2">Add more</span>
                </a>
                <div>
                  <draggable
                    class="d-flex selected-item"
                    :list="solution.additional"
                    group="card"
                  >
                    <div
                      v-for="(img, i) in solution.additional"
                      :key="i"
                      class="m-1 col-3 material"
                    >
                      <SvgIcon
                        name="trash"
                        style="
                          color: red;

                          z-index: 100;
                          cursor: pointer;
                        "
                        @click="deleteOptionsItem(img.id)"
                      />
                      <b-img
                        v-if="img.img !== null"
                        :src="img.img"
                        style="border-radius: 5px; width: 100px"
                        alt="Responsive image"
                      ></b-img>
                      <SvgIcon
                        name="dragble"
                        style="z-index: 100; cursor: pointer; opacity: 0.2"
                        class="ml-3"
                      />
                    </div>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
          <div class="m-4">
            <a
              class="button button-outline-primary"
              href="/control/cms/ready-solutions"
            >
              <SvgIcon name="prev" style="color: #fff" />
              <span class="ml-2">Back</span>
            </a>
            <a class="button button-primary" href="../ready-solutions">
              <span class="">Create</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'

import 'vue-advanced-cropper/dist/style.css'
import draggable from 'vuedraggable'
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    AddHardware: () => import('~/components/Modals/Cms/AddHardware'),
    SelectAdditionalOptions: () =>
      import('~/components/Modals/Cms/SelectAdditionalOptions'),
    LoadFile: () => import('~/components/LoadFile'),

    draggable,
  },

  data() {
    return {
      componentKey: 0,
      solution: {
        hardware: [],
        additional: [],
      },
      selected: null,
      data: {},
      rooms: [],
      keygen_modal: 0,
      solutions: [],
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
        {
          text: this.$t('pages.adminSettingsPage.cms', null, {
            id: this.id,
          }),
          active: true,
        },
      ],
    }
  },
  watch: {
    form(val) {
      this.removeFile()
      this.localForm = { ...val }
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
      .then((response) => (this.rooms = response.data.data.room_types))
  },
  methods: {
    showModalCreateSolution() {
      this.keygen_modal += 1

      this.$bvModal.show(`create-modal`)
    },
    showSolution(data) {
      this.solutions.push(_.cloneDeep(data))
    },
    addFile(data) {
      this.files = data
      this.forceRerender()
      console.log(this.files)
    },
    deleteHardwareItem(id) {
      this.solution.hardware.forEach((elem, i) => {
        if (elem.id === id) {
          this.solution.hardware = this.solution.hardware.filter(
            (item) => item.id !== id
          )

          this.forceRerender()
        }
      })
    },
    deleteOptionsItem(id) {
      this.solution.additional.forEach((elem, i) => {
        if (elem.id === id) {
          this.solution.additional = this.solution.additional.filter(
            (item) => item.id !== id
          )

          this.forceRerender()
        }
      })
    },
    addHardware(hardware) {
      this.forceRerender()
      hardware.forEach((elem) => {
        this.solution.hardware.push(elem)
      })
    },
    addOptions(options) {
      this.forceRerender()
      options.forEach((elem) => {
        this.solution.additional.push(elem)
      })
    },
    selectOptionModal() {
      this.forceRerender()
      this.$bvModal.show(`select-options`)
    },
    selectHardwareModal() {
      this.forceRerender()
      this.$bvModal.show(`select-hardware`)
    },
    addHardwareModal() {
      this.forceRerender()
      this.$bvModal.show(`create_hardware`)
    },
    addOptionsModal() {
      this.forceRerender()
      this.$bvModal.show(`create_options`)
    },
    createHardware(data) {
      this.forceRerender()
      this.solution.hardware.push(_.cloneDeep(data))
      console.log(this.solution)
    },
    createOptions(data) {
      this.forceRerender()
      this.solution.additional.push(_.cloneDeep(data))
      console.log(this.solution)
    },
    forceRerender() {
      this.componentKey += 1
    },
    close() {
      // this.solution = {}
      // this.solution = { hardware: [], additional: [] }
      // this.removeFile()
      // this.disabled = true
      console.log(this.solution)
      this.$bvModal.hide(this.id)
    },
  },
}
</script>
<style scoped>
.hardware-item {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  width: 100%;
  max-width: 100%;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  padding-left: 10px;
  margin: 1%;
}
.selected-item {
  flex-wrap: wrap;
  margin-top: 10px;
  max-height: 400px;
  overflow: auto;
}
.material {
  padding: 10px;
}
.material:hover {
  transition: 0.5;
  width: 95%;
  height: 95%;
  border-right: 5px solid rgb(0, 162, 255);
  box-shadow: 1px 4px 15px 0px rgba(0, 0, 0, 0.11);
  -webkit-box-shadow: 1px 4px 15px 0px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 1px 4px 15px 0px rgba(0, 0, 0, 0.11);
}
</style>
