<template>
  <Page :breadcrumbs="breadcrumbs">
    <template #content>
      <a class="button button-outline-primary" href="../ready-solutions">
        <SvgIcon name="prev" style="color: #fff" />
        <span class="ml-2">Back</span>
      </a>
      <div class="container">
        <div class="row">
          <h1>Materials Gallery</h1>
          <a
            class="button button-outline-primary ml-4"
            @click="addHardwareModal(`create_hardware`)"
          >
            <AddHardware
              :id="`create_hardware`"
              @add-options="createHardware"
            />
            <SvgIcon name="plus" />
          </a>

          <div class="filter">
            <multiselect
              v-model="filter_room"
              class="filter"
              :options="rooms"
              placeholder="All room"
              label="title"
              @change="filter"
            />
          </div>
          <b-form-checkbox
            v-model="tags"
            class="ml-3"
            name="check-button"
            switch
          >
            Tags
          </b-form-checkbox>
          <b-form-checkbox
            v-model="info"
            class="ml-3"
            name="check-button"
            switch
          >
            Info
          </b-form-checkbox>
        </div>
        <div class="d-flex">
          <div v-if="filtred.length !== 0">
            <draggable class="selected-item" :list="filtred.list" group="card">
              <div v-for="(item, i) in filtred" :key="i" class="m-1 material">
                <AddHardware
                  :id="`create_hardware_edit_${i}`"
                  :item="item"
                  :index="i"
                  @edit-options="editHardware"
                />
                <div>
                  <div class="nav-card">
                    <div>
                      <SvgIcon
                        name="trash"
                        style="color: red; cursor: pointer"
                        @click="deleteHardwareItem(i)"
                      />
                      <SvgIcon
                        name="edit"
                        style="color: rgb(0, 162, 255); cursor: pointer"
                        @click="addHardwareModal(`create_hardware_edit_${i}`)"
                      />
                    </div>
                    <SvgIcon
                      name="dragble"
                      style="cursor: pointer; opacity: 0.2"
                      class="ml-3"
                    />
                  </div>
                  <b-img :src="item.files[0]" alt="Responsive image"></b-img>
                  <div class="info-card" style="background: #bdf3ff">
                    <span style="font-size: 14px"
                      ><b>Title:</b> {{ item.title }}</span
                    >
                  </div>
                  <div v-if="info" class="info-card">
                    <span><b>Room:</b> {{ item.room_type.title }} </span>
                  </div>
                  <div v-if="info" class="info-card">
                    <span><b>Price:</b> {{ item.purchase_price }} </span>
                  </div>
                  <div v-if="info" class="info-card">
                    <span
                      ><b>Dimensions (LхWxWxH):</b> {{ item.length }} х
                      {{ item.width }} х {{ item.weight }} x {{ item.height }}
                    </span>
                  </div>
                  <div v-if="tags" class="info-card">
                    <i>
                      <span><b>Tags:</b> </span>
                      <span v-for="(tag, i) in item.tags" :key="i"
                        >{{ tag }}
                        <span
                          v-if="item.tags.length - 1 !== item.tags.indexOf(tag)"
                          >,</span
                        ></span
                      >
                    </i>
                  </div>
                  <div v-if="info" class="info-card">
                    <b-form-rating
                      id="rating-sm"
                      v-model="item.rating"
                      variant="primary"
                    ></b-form-rating>
                  </div>
                </div>
              </div>
            </draggable>
          </div>
          <div v-else class="mt-4">
            <h2 style="opacity: 0.3">Ooops... No material found</h2>
          </div>
        </div>
      </div>
    </template>
  </Page>
</template>

<script>
import * as _ from 'lodash'

import 'vue-advanced-cropper/dist/style.css'
import draggable from 'vuedraggable'
import { BFormRating, FormRatingPlugin } from 'bootstrap-vue'
import Vue from 'vue'
Vue.component('b-form-rating', BFormRating)
Vue.use(FormRatingPlugin)
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    AddHardware: () => import('~/components/Modals/Cms/AddHardware'),

    draggable,
  },

  data() {
    return {
      componentKey: 0,
      filter_room: '',
      tags: false,
      info: false,
      all: [
        {
          title: 'Смеситель Onyx',
          purchase_price: 200,
          files: [
            'https://avatars.mds.yandex.net/get-mpic/4380539/img_id7709841281924611221.jpeg/x248_trim',
          ],
          room_type: {
            title: 'Kitchen',
          },
        },
        {
          title: 'Смеситель Baracuda',
          purchase_price: 330,
          files: [
            'https://avatars.mds.yandex.net/get-mpic/4365206/img_id502981625690999292.jpeg/x248_trim',
          ],
          room_type: {
            title: 'Kitchen',
          },
        },
        {
          title: 'Смеситель MCG',
          purchase_price: 777,
          files: [
            'https://avatars.mds.yandex.net/get-mpic/1364191/img_id7109939638605003642.jpeg/x248_trim',
          ],
          room_type: {
            title: 'Kitchen',
          },
        },
        {
          title: 'Офисное кресло Stavropol',
          purchase_price: 550,
          files: [
            'https://main-cdn.goods.ru/big2/hlr-system/1657928927/100000023760b0.jpg',
          ],
          room_type: {
            title: 'Office',
          },
        },
        {
          title: 'Раковина Tornado',
          purchase_price: 823,
          files: [
            'https://avatars.mds.yandex.net/get-mpic/195452/img_id2002258468114269713/x248_trim',
          ],
          room_type: {
            title: 'Kitchen',
          },
        },
        {
          title: 'Смеситель Лежебока',
          purchase_price: 1400,
          files: ['https://kilimi.com.ua/uploads/product/yglovoi_divan.jpg'],
          room_type: {
            title: 'Living room',
          },
        },
      ],
      filtred: [],
      rooms: [],
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
    filter_room() {
      this.filter()
    },
    all() {
      this.filtred = this.all
      this.forceRerender()
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
      .then((response) => (this.rooms = response.data.data.room_types))
    this.filtred = this.all
  },
  methods: {
    filter() {
      if (this.filter_room !== null) {
        this.filtred = this.all.filter(
          (item) => item.room_type.title === this.filter_room.title
        )
      } else {
        this.filtred = this.all
      }
      this.forceRerender()
      console.log(this.filter_room, this.filtred)
    },
    showModalCreateSolution() {
      this.keygen_modal += 1

      this.$bvModal.show(`create-modal`)
    },
    showSolution(data) {
      this.solutions.push(_.cloneDeep(data))
    },
    updateView({ coordinates, canvas }) {
      this.fileData = canvas.toDataURL()
    },
    // TODO нужно добавить подтверждающую модалку
    deleteHardwareItem(id) {
      this.all.splice(id, 1)
      this.forceRerender()
    },
    addHardware(hardware) {
      this.all.push(_.cloneDeep(hardware.img))
      this.forceRerender()
    },

    addHardwareModal(id) {
      this.forceRerender()
      this.$bvModal.show(id)
    },

    createHardware(data) {
      this.forceRerender()
      this.all.push(_.cloneDeep(data))
      console.log(this.all)
    },
    editHardware(data, id) {
      // this.all[id] = data
      // this.forceRerender()
    },
    forceRerender() {
      this.componentKey += 1
    },
    close() {
      this.$bvModal.hide(this.id)
    },
  },
}
</script>
<style scoped>
.filter {
  width: 50%;
  margin-left: 10px;
}
.info-card {
  display: flex;
  flex-wrap: wrap;
  max-height: 50px;
  padding-top: 5px;
  overflow: auto;
}

.info-card span {
  opacity: 0.9;
  font-size: 11px;
  padding: 3px;
  margin-left: 1px;
}
.selected-item {
  flex-wrap: wrap;
  margin-top: 10px;
  display: flex;
  width: 100%;
}
.material {
  width: 300px;
  padding: 10px;
  background: #fff;
  border-top: 5px solid rgba(0, 162, 255, 0);
}
@media (max-width: 1440px) {
  .material {
    width: 350px;
  }
}
.material img {
  padding: 10px;
  margin: auto !important;
  border-radius: 5px;
  height: 150px;
}
.material:hover {
  border-top: 5px solid rgb(0, 162, 255);
}
.nav-card {
  display: flex;
  justify-content: space-between;
  padding: 3px;
  width: 100%;
}
</style>
