<template>
  <div>
    <AdminBar />
    <h2 class="mt-3 ml-4">Services</h2>
    <div class="d-flex w-100 m-2">
      <a
        class="button button-outline-primary d-flex justify-content-center mr-3"
        href="/control/cms"
      >
        <SvgIcon name="prev" />
        <span class="ml-2">Back</span>
      </a>
      <a
        class="button button-primary"
        href="/control/cms/settings/services/create"
        >Create New Services</a
      >
    </div>
    <div
      class="table-block__content d-flex align-items-center justify-content-start"
      style="flex-derection-column"
    >
      <table class="table mt-3 col-12">
        <tbody style="font-size: 18px">
          <tr>
            <td class="vertical-center">
              Nulla officia, quo molestiae totam minus aut necessitatibus eaque
              nisi
            </td>
            <td class="vertical-center" style="font-size: 18px">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, dolor expedita. Nulla officia, quo molestiae totam
              minus aut necessitatibus eaque nisi dolores obcaecati repellat
              doloremque, sunt, quidem veritatis delectus corrupti!
            </td>
            <td class="vertical-center w-10">
              <SvgIcon
                name="levels"
                class="big-icon"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`sliders_modal`)"
              />

              <SvgIcon
                name="trash"
                class="ml-3 big-icon"
                style="color: red; cursor: pointer"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">
              Nulla officia, quo molestiae totam minus aut necessitatibus eaque
              nisi
            </td>
            <td class="vertical-center" style="font-size: 18px">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, dolor expedita. Nulla officia, quo molestiae totam
              minus aut necessitatibus eaque nisi dolores obcaecati repellat
              doloremque, sunt, quidem veritatis delectus corrupti!
            </td>
            <td class="vertical-center w-10">
              <SvgIcon
                name="levels"
                class="big-icon"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`sliders_modal`)"
              />

              <SvgIcon
                name="trash"
                class="ml-3 big-icon"
                style="color: red; cursor: pointer"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">
              Nulla officia, quo molestiae totam minus aut necessitatibus eaque
              nisi
            </td>
            <td class="vertical-center" style="font-size: 18px">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, dolor expedita. Nulla officia, quo molestiae totam
              minus aut necessitatibus eaque nisi dolores obcaecati repellat
              doloremque, sunt, quidem veritatis delectus corrupti!
            </td>
            <td class="vertical-center w-10">
              <SvgIcon
                name="levels"
                class="big-icon"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`sliders_modal`)"
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
    <AddService :header="`Add Service`" />
  </div>
</template>
<script>
import Vue from 'vue'
import { BTooltip } from 'bootstrap-vue'
Vue.component('b-tooltip', BTooltip)
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    AddService: () => import('~/components/Modals/Cms/AddService'),
  },
  data() {
    return {
      componentKey: 0,
      config: {},
      rooms: [],
      room: {},
      perPage: 3,
      currentPage: 1,
    }
  },
  computed: {
    rows() {
      return 4
    },
  },
  methods: {
    addImageIcon(data) {
      this.config.image = data
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    deleteImage(image) {
      this.config.image = null
      this.render()
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
  },
}
</script>
