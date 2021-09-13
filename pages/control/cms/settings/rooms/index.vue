<template>
  <div>
    <AdminBar />
    <h2 class="mt-3 ml-4">Rooms</h2>
    <div class="d-flex w-100 m-2">
      <a
        class="button button-outline-primary d-flex justify-content-center mr-3"
        href="/control/cms"
      >
        <SvgIcon name="prev" />
        <span class="ml-2">Back</span>
      </a>
      <a class="button button-primary" @click="$bvModal.show(`add-rooms`)"
        >Create New Room</a
      >
    </div>
    <div
      class="table-block__content d-flex align-items-center justify-content-start"
      style="flex-derection-column"
    >
      <table class="table mt-3 col-12">
        <tbody style="font-size: 18px">
          <tr v-for="(room, i) in rooms" :key="i">
            <td class="vertical-center w-10">
              <SvgIcon
                :name="room.icon"
                class="big-icon mr-5"
                style="color: #0069af; cursor: pointer"
              />{{ room.title }}
            </td>
            <td class="vertical-center w-10">
              <SvgIcon
                name="levels"
                class="big-icon"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`add-rooms`)"
              />

              <SvgIcon
                name="trash"
                class="ml-3 big-icon"
                style="color: red; cursor: pointer"
              />
            </td>
          </tr>
        </tbody>

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          class="mt-3"
        ></b-pagination>
      </table>
    </div>
    <AddRooms :header="`Add Room`" />
  </div>
</template>
<script>
import Vue from 'vue'
import { BTooltip, BFormRating } from 'bootstrap-vue'

Vue.component('b-tooltip', BTooltip)
Vue.component('b-form-rating', BFormRating)
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    AddRooms: () => import('~/components/Modals/Cms/AddRooms'),
  },
  data() {
    return {
      componentKey: 0,
      perPage: 3,
      currentPage: 1,
      room: [],
    }
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
      .then((response) => (this.rooms = response.data.data.room_types))
  },
  methods: {
    render() {
      this.componentKey += 1
    },
    // доделать, жду APi
    // edit(id) {
    //   this.$axios
    //     .get(
    //       `${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes/${id}`
    //     )
    //     .then((response) => (this.room = response.data.data.room_types))
    // },
  },
}
</script>
