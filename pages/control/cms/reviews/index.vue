<template>
  <div>
    <AdminBar />
    <h2 class="mt-3 ml-4">Reviews</h2>
    <div
      class="table-block__content d-flex align-items-center justify-content-start"
      style="flex-derection-column"
    >
      <table class="table mt-3 col-12">
        <a class="button button-primary" @click="$bvModal.show(`reviews_modal`)"
          >Create New Review</a
        >
        <tbody style="font-size: 18px">
          <tr>
            <td class="vertical-center w-5">
              <img
                src="https://new.modernciti.group/static/images/fake.webp"
                style="border-radius: 30px"
                width="60px"
                height="60px"
                alt=""
              />
            </td>
            <td class="vertical-center w-10">
              <b-form-rating v-model="value"></b-form-rating>
            </td>
            <td class="vertical-center w-10">Justin. S</td>
            <td class="vertical-center">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos, dolor expedita. Nulla officia, quo molestiae totam
              minus aut necessitatibus eaque nisi dolores obcaecati repellat
              doloremque, sunt, quidem veritatis delectus corrupti!
            </td>
            <td class="vertical-center">
              <img
                src="https://www.cyclonis.com/images/2020/04/Yelp_Logo.jpg"
                width="60px"
                alt=""
              />
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
    <AddReviews :header="`Add Review`" />
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
    AddReviews: () => import('~/components/Modals/Cms/AddReviews'),
  },
  data() {
    return {
      componentKey: 0,
      perPage: 3,
      currentPage: 1,
      value: 4,
    }
  },
  computed: {
    rows() {
      return 4
    },
  },
  methods: {
    addImage(data) {
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
