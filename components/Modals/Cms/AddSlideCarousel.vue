<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal id="sliders_modal" title-class="text-left" :title="header">
    <b-card
      :key="componentKey"
      title="Image"
      :img-src="slide.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 30rem"
      class="m-auto"
    >
      <SvgIcon
        v-if="slide.image"
        name="close"
        class="icon-big"
        @click="deleteImage(slide.image)"
      />
      <a class="button button-primary ml-3" @click="modalImage('image_modal')"
        >Upload image</a
      >
      <div class="mt-2">
        <label class="mt-3">Title</label>
        <input v-model="slide.title" type="text" class="form-control mb-2" />
      </div>
      <div class="mt-2">
        <label>Description Slide</label>
        <TextEditor :id="`editor_slider_main`" />
      </div>
      <div class="mb-2">
        <multiselect v-model="slide.type" :options="options"></multiselect>
      </div>
    </b-card>
    <LoadFileSingle
      :id="`image_modal`"
      :title="`Image Detail`"
      @add-image="addImage"
    />
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { BCard } from 'bootstrap-vue'
Vue.component('b-card', BCard)
export default {
  components: {
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
    TextEditor: () => import('~/components/TextEditor'),
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
      slide: {
        image:
          'https://1.downloader.disk.yandex.ru/preview/42362f58aebb6bf3b468f12bf67fd2019b7c30da0522bf546f274ed5fa707347/inf/yN3yCc2AuN8lS2vI7g35a0_g6GeXoFozgUSMUan8A-Lg5NJR3uYbKGekimbRx_Hj9_E4RHeTFpCsgxnoIWy_rQ%3D%3D?uid=486028259&filename=Screenshot_2.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=486028259&tknv=v2&size=2537x1292',
        price: null,
        title: '',
      },
      options: [
        'Main Slider',
        'How we works Slider',
        'Why where different Slider',
      ],
    }
  },
  methods: {
    addFile(data) {
      this.slide.image = data
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
    deleteImage(image) {
      for (const key in this.slide) {
        if (this.slide[key] === image) {
          this.slide[key] = null
        }
      }
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    addImage(data) {
      this.slide.image = data
      this.render()
    },
  },
}
</script>
