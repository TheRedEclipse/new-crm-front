<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal id="style_modal" size="xl" title-class="text-left" :title="header">
    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3 form-recent">
        <b-tabs content-class="mt-3" class="col-12">
          <b-tab title="Settings" active>
            <div class="col-12 d-flex form-recent justify-content-center">
              <div class="mt-2">
                <label>Name</label>
                <input v-model="style.name" type="text" class="form-control" />
              </div>
              <div class="mt-2">
                <label>Percent</label>
                <input
                  v-model="style.precent"
                  type="number"
                  class="form-control"
                />
              </div>
              <LoadFile
                :title="`Image For Detail Page`"
                class="mb-3"
                @add-file="addFile"
              />
            </div>
          </b-tab>
          <b-tab title="SEO">
            <div class="mt-2">
              <label>SEO Title</label>
              <input
                v-model="style.seo.title"
                type="text"
                class="form-control"
              />
            </div>
            <div class="mt-2">
              <label>SEO Description</label>
              <b-form-textarea
                v-model="style.seo.description"
                placeholder="Description"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </div>
          </b-tab>
          <a
            class="button button-primary mt-5 col-3 d-flex justify-content-center"
          >
            Create
          </a>
        </b-tabs>
      </div>
    </template>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { BCard } from 'bootstrap-vue'
Vue.component('b-card', BCard)
export default {
  components: {
    LoadFile: () => import('~/components/LoadFile'),
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
      style: {
        seo: {},
        icon: '',
        image: '',
      },
    }
  },
  methods: {
    addFile(data) {
      this.style.files = data
    },
  },
}
</script>
<style scoped>
.form-recent {
  justify-content: center;
  flex-direction: column;
}
</style>
