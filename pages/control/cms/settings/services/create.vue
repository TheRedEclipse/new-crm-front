<template>
  <div>
    <AdminBar />
    <h2 class="mt-3 ml-4">Services</h2>

    <div class="table-block__content" style="flex-derection-column">
      <a
        href=""
        class="button button-primary mt-3 w-5 justify-content-center ml-3"
        >Save</a
      >
      <div class="d-flex">
        <b-tabs content-class="mt-3" class="col-12">
          <b-tab title="Settings" active>
            <div class="col-12 mb-5 d-flex justify-content-center">
              <b-card
                :key="componentKey"
                title="Header Slide"
                :img-src="service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 30rem"
              >
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
              </b-card>

              <b-card
                :key="componentKey"
                title="Presentation block"
                :img-src="service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 30rem"
                class="ml-3"
              >
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
                <div class="mt-2">
                  <label>Title</label>
                  <input
                    v-model="service.title"
                    type="text"
                    class="form-control"
                  />
                </div>

                <div class="mt-2 mb-2">
                  <label>Description</label>
                  <b-form-textarea
                    v-model="service.description"
                    placeholder="Description"
                    rows="3"
                    max-rows="6"
                  />
                </div>
                <div class="mt-2">
                  <label>Price</label>
                  <input
                    v-model="service.price"
                    type="text"
                    class="form-control mb-2"
                  />
                </div>
              </b-card>

              <div class="">
                <b-card
                  :key="componentKey"
                  title="Before service"
                  :img-src="service.before"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 30rem"
                  class="ml-3"
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
                  class="ml-3 mt-3"
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
    </div>
    <AddService :header="`Add Service`" />
  </div>
</template>
<script>
import Vue from 'vue'
import { BTooltip, BCard } from 'bootstrap-vue'

Vue.component('b-tooltip', BTooltip)
Vue.component('b-card', BCard)
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    AddService: () => import('~/components/Modals/Cms/AddService'),
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
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
    addImage(data) {
      this.service.image = data
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    deleteImage(image) {
      this.service.image = null
      this.render()
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
  },
}
</script>
