<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal id="add-service" size="xl" title-class="text-left" :title="header">
    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3 form-recent">
        <b-tabs content-class="mt-3" class="col-12">
          <b-tab title="Settings" active>
            <div class="col-12 d-flex">
              <b-card
                :key="componentKey"
                title="Header Slide"
                :img-src="service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 30rem"
                class="m-auto"
              >
                <div class="mt-2">
                  <label>Title</label>
                  <input
                    v-model="service.title"
                    type="text"
                    class="form-control"
                  />
                </div>

                <div class="mt-2 mb-2">
                  <label>Subtitle</label>
                  <b-form-textarea
                    v-model="service.subtitle"
                    placeholder="Description"
                    rows="3"
                    max-rows="6"
                  />
                </div>

                <SvgIcon
                  v-if="service.image"
                  name="close"
                  class="icon-big"
                  @click="deleteImage(service.image)"
                />
                <a
                  class="button button-primary ml-3"
                  @click="modalImage('image_modal')"
                  >Upload image</a
                >
              </b-card>

              <b-card
                :key="componentKey"
                title="Block slide"
                :img-src="service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 30rem"
                class="m-auto"
              >
                <div class="mt-2">
                  <label>Title</label>
                  <input
                    v-model="service.subtitle"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="mt-2">
                  <label>Price</label>
                  <input
                    v-model="service.subtitle"
                    type="text"
                    class="form-control mb-2"
                  />
                </div>
                <div class="mt-2 mb-2">
                  <label>Description</label>
                  <b-form-textarea
                    v-model="service.seo.description"
                    placeholder="Description"
                    rows="3"
                    max-rows="6"
                  />
                </div>
                <SvgIcon
                  v-if="service.image"
                  name="close"
                  class="icon-big"
                  @click="deleteImage(service.image)"
                />
                <a
                  class="button button-primary ml-3"
                  @click="modalImage('image_modal')"
                  >Upload image</a
                >
              </b-card>
            </div>
          </b-tab>
          <b-tab title="SEO">
            <div class="mt-2">
              <label>SEO Title</label>
              <input
                v-model="service.seo.title"
                type="text"
                class="form-control"
              />
            </div>
            <div class="mt-2">
              <label>SEO Description</label>
              <b-form-textarea
                v-model="service.seo.description"
                placeholder="Description"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </div>
          </b-tab>
          <b-tab title="All services"> </b-tab>
          <b-tab title="Before / After">
            <div class="d-flex justify-content-space-between m-3">
              <b-card
                :key="componentKey"
                title="Before service"
                :img-src="service.before"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 30rem"
                class="m-2"
              >
                <SvgIcon
                  v-if="service.before"
                  name="close"
                  class="icon-big"
                  @click="deleteImage(service.before)"
                />
                <a
                  class="button button-primary ml-3"
                  @click="modalImage('before_modal')"
                  >Upload image</a
                >
              </b-card>
              <b-card
                :key="componentKey"
                title="After service"
                :img-src="service.after"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 30rem"
                class="m-2"
              >
                <SvgIcon
                  v-if="service.after"
                  name="close"
                  class="icon-big"
                  @click="deleteImage(service.after)"
                />
                <a
                  class="button button-primary ml-3"
                  @click="modalImage('after_modal')"
                  >Upload image</a
                >
              </b-card>
            </div>
          </b-tab>
        </b-tabs>
        <LoadFileSingle
          :id="`image_modal`"
          :title="`Image Detail`"
          @add-image="addImage"
        />
        <LoadFileSingle
          :id="`icon_modal`"
          :title="`Add Icon`"
          @add-image="addImageIcon"
        />
        <LoadFileSingle
          :id="`after_modal`"
          :title="`Photo after`"
          @add-image="addImageAfter"
        />
        <LoadFileSingle
          :id="`before_modal`"
          :title="`Photo before`"
          @add-image="addImageBefore"
        />
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
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
    // LoadFile: () => import('~/components/LoadFile'),
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
      service: {
        seo: {},
        icon: '',
        image:
          'https://1.downloader.disk.yandex.ru/preview/42362f58aebb6bf3b468f12bf67fd2019b7c30da0522bf546f274ed5fa707347/inf/yN3yCc2AuN8lS2vI7g35a0_g6GeXoFozgUSMUan8A-Lg5NJR3uYbKGekimbRx_Hj9_E4RHeTFpCsgxnoIWy_rQ%3D%3D?uid=486028259&filename=Screenshot_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=486028259&tknv=v2&size=2537x1292',
        before:
          'https://1.downloader.disk.yandex.ru/preview/42362f58aebb6bf3b468f12bf67fd2019b7c30da0522bf546f274ed5fa707347/inf/yN3yCc2AuN8lS2vI7g35a0_g6GeXoFozgUSMUan8A-Lg5NJR3uYbKGekimbRx_Hj9_E4RHeTFpCsgxnoIWy_rQ%3D%3D?uid=486028259&filename=Screenshot_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=486028259&tknv=v2&size=2537x1292',
        after:
          'https://1.downloader.disk.yandex.ru/preview/42362f58aebb6bf3b468f12bf67fd2019b7c30da0522bf546f274ed5fa707347/inf/yN3yCc2AuN8lS2vI7g35a0_g6GeXoFozgUSMUan8A-Lg5NJR3uYbKGekimbRx_Hj9_E4RHeTFpCsgxnoIWy_rQ%3D%3D?uid=486028259&filename=Screenshot_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=486028259&tknv=v2&size=2537x1292',
      },
    }
  },
  methods: {
    addFile(data) {
      this.service.files = data
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
    deleteImage(image) {
      for (const key in this.service) {
        if (this.service[key] === image) {
          this.service[key] = null
        }
      }
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    addImage(data) {
      this.service.image = data
      this.render()
    },
    addImageIcon(data) {
      this.service.icon = data
      this.render()
    },
    addImageAfter(data) {
      this.service.after = data
      this.render()
    },
    addImageBefore(data) {
      this.service.before = data
      this.render()
    },
  },
}
</script>
<style scoped>
.form-recent {
  justify-content: center;
  align-items: flex-end;
}
</style>
