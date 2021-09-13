<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal id="reviews_modal" title-class="text-left" size="lg" :title="header">
    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <div class="col-12">
          <div class="form-group">
            <label>Name of User</label>
            <input
              v-model="review.name"
              type="text"
              class="form-control"
              placeholder="Title"
            />
          </div>
          <div class="form-group">
            <label>City</label>
            <input
              v-model="review.city"
              type="text"
              class="form-control"
              placeholder="City"
            />
          </div>
          <div class="form-group">
            <label>Rating: {{ review.rating }}</label>
            <b-form-rating v-model="review.rating"></b-form-rating>

            <label class="mt-3">Description</label>
            <b-form-textarea
              v-model="review.description"
              placeholder="Description"
              rows="3"
              max-rows="6"
            />
            <label class="mt-3">Source</label>
            <input
              v-model="review.source"
              type="text"
              class="form-control"
              placeholder="https://"
            />
            <label class="mt-3">Platform</label>
            <multiselect
              v-model="review.platform"
              :options="options"
            ></multiselect>
            <div :key="componentKey" class="form-group mt-3 mb-3">
              <SvgIcon
                v-if="review.avatar"
                name="close"
                class="icon-big"
                @click="deleteImage(review.avatar)"
              />
              <a
                class="button button-primary ml-2"
                @click="modalImage('icon_modal')"
                >Upload Avatar</a
              >
              <img :src="review.avatar" class="ml-3" width="300" alt="" />
              <LoadFileSingle
                :id="`icon_modal`"
                :title="`Add Avatar`"
                @add-image="addImage"
              />
            </div>
          </div>
        </div>
      </div>
      <button class="button button-outline-primary w-35 justify-content-center">
        Save review
      </button>
    </template>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { BFormRating } from 'bootstrap-vue'
Vue.component('b-form-rating', BFormRating)
export default {
  components: {
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
  },
  props: {
    header: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      componentKey: 0,
      review: {},
      options: ['Yelp', 'Google', 'Houzz', 'BBB'],
    }
  },
  methods: {
    addImage(data) {
      this.review.avatar = data
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    deleteImage(image) {
      this.review.avatar = null
      this.render()
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
  },
}
</script>
<style scoped></style>
