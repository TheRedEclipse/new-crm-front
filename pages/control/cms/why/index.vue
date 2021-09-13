<template>
  <!-- dialog-class="modal-rounded" -->
  <div>
    <AdminBar />
    <div class="d-flex justify-content-center w-100 mb-3 form-recent">
      <h2 class="ml-4 mt-4">We Where Different</h2>

      <b-tabs content-class="mt-3" class="col-12">
        <div class="d-flex w-100 m-2">
          <a
            class="button button-outline-primary d-flex justify-content-center mr-3"
            href="/control/cms/pages"
          >
            <SvgIcon name="prev" />
            <span class="ml-2">Back</span>
          </a>
          <a class="button button-primary col-3 d-flex justify-content-center">
            Save
          </a>
        </div>
        <b-tab title="Settings" active>
          <div class="col-12 d-flex form-recent justify-content-center">
            <h2>Carousel Items</h2>
            <div class="mt-2 section-block">
              <b-card
                v-for="(item, i) in itemsSlider"
                :key="i"
                :title="slicer(item.title, true)"
                :img-src="item.img"
                :img-alt="item.title"
                img-top
                tag="article"
                style="max-width: 20rem; font-size: 14px"
                class="m-1"
              >
                <b-card-text>
                  {{ slicer(item.description) }}
                  <hr />
                  <b-form-checkbox
                    :name="`checkbox-${i}`"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                    Add to Slider
                  </b-form-checkbox>
                </b-card-text>
              </b-card>
            </div>
            <h2>Text Items</h2>
            <div class="mt-2 section-block">
              <b-card
                v-for="(item, i) in itemsText"
                :key="i"
                :title="slicer(item.title, true)"
                :img-src="item.img"
                :img-alt="item.title"
                img-top
                tag="article"
                style="max-width: 20rem; font-size: 14px"
                class="m-1"
              >
                <b-card-text>
                  {{ slicer(item.description) }}
                  <hr />
                  <b-form-checkbox
                    :name="`checkbox-${i}`"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                    Add to Text Block
                  </b-form-checkbox>
                </b-card-text>
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
</template>

<script>
import Vue from 'vue'
import { BFormCheckboxGroup, BCard } from 'bootstrap-vue'

Vue.component('b-form-checkbox-group', BFormCheckboxGroup)
Vue.component('b-card', BCard)
export default {
  components: {
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
    AdminBar: () => import('~/components/AdminBar'),
    // TextEditor: () => import('~/components/TextEditor'),
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
      itemsSlider: [
        {
          title: 'Premium quality at industry rates',
          description:
            'We handpick our finish materials and fixtures from top international brands, like Kohler and Toto, and industry favorites like Rich Brilliant Willing. Our relationships with vendors and brands help us pass trade discounts directly onto you.',
          img:
            'https://1.downloader.disk.yandex.ru/preview/42362f58aebb6bf3b468f12bf67fd2019b7c30da0522bf546f274ed5fa707347/inf/yN3yCc2AuN8lS2vI7g35a0_g6GeXoFozgUSMUan8A-Lg5NJR3uYbKGekimbRx_Hj9_E4RHeTFpCsgxnoIWy_rQ%3D%3D?uid=486028259&filename=Screenshot_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=486028259&tknv=v2&size=2537x1292',
        },
        {
          title: 'Luxurious (and smart) upgrades',
          description:
            'From WiFi-connected heated floors to self-cleaning, eco-friendly Toto washlets, we offer those special touches that make your bathroom your happy place.',
          img:
            'https://1.downloader.disk.yandex.ru/preview/42362f58aebb6bf3b468f12bf67fd2019b7c30da0522bf546f274ed5fa707347/inf/yN3yCc2AuN8lS2vI7g35a0_g6GeXoFozgUSMUan8A-Lg5NJR3uYbKGekimbRx_Hj9_E4RHeTFpCsgxnoIWy_rQ%3D%3D?uid=486028259&filename=Screenshot_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=486028259&tknv=v2&size=2537x1292',
        },
        {
          title: 'Contractors handpicked for quality and reliability',
          description:
            'The foundation of every successful renovation? The right people. When you work with Block, we connect you to the industry’s best. Each of our partner contractors is rigorously background-checked, vetted, and prepared.',
          img:
            'https://1.downloader.disk.yandex.ru/preview/42362f58aebb6bf3b468f12bf67fd2019b7c30da0522bf546f274ed5fa707347/inf/yN3yCc2AuN8lS2vI7g35a0_g6GeXoFozgUSMUan8A-Lg5NJR3uYbKGekimbRx_Hj9_E4RHeTFpCsgxnoIWy_rQ%3D%3D?uid=486028259&filename=Screenshot_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=486028259&tknv=v2&size=2537x1292',
        },
      ],
      itemsText: [
        {
          title: 'Premium quality at industry rates',
          description:
            'We handpick our finish materials and fixtures from top international brands, like Kohler and Toto, and industry favorites like Rich Brilliant Willing. Our relationships with vendors and brands help us pass trade discounts directly onto you.',
        },
        {
          title: 'Luxurious (and smart) upgrades',
          description:
            'From WiFi-connected heated floors to self-cleaning, eco-friendly Toto washlets, we offer those special touches that make your bathroom your happy place.',
        },
        {
          title: 'Contractors handpicked for quality and reliability',
          description:
            'The foundation of every successful renovation? The right people. When you work with Block, we connect you to the industry’s best. Each of our partner contractors is rigorously background-checked, vetted, and prepared.',
        },
        {
          title: 'Premium quality at industry rates',
          description:
            'We handpick our finish materials and fixtures from top international brands, like Kohler and Toto, and industry favorites like Rich Brilliant Willing. Our relationships with vendors and brands help us pass trade discounts directly onto you.',
        },
        {
          title: 'Luxurious (and smart) upgrades',
          description:
            'From WiFi-connected heated floors to self-cleaning, eco-friendly Toto washlets, we offer those special touches that make your bathroom your happy place.',
        },
      ],
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
    slicer(text, title) {
      let sliced = !title ? text.slice(0, 100) : text.slice(0, 30)
      if (sliced.length < text.length) {
        sliced += '...'
      }
      return sliced
    },
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
  flex-direction: column;
}
.section-block {
  border: 1px solid rgb(230, 225, 225);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
.section-block div {
  width: 80%;
  margin: auto;
}
</style>
