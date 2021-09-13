<template>
  <div>
    <AdminBar />
    <div class="m-4">
      <h1>Add recent work</h1>
      <div class="d-flex justify-content-start">
        <div class="d-flex form-recent justify-content-start col-6">
          <div class="d-flex w-100">
            <a
              class="button button-outline-primary d-flex justify-content-center mr-3"
              href="/control/cms/recent-works"
            >
              <SvgIcon name="prev" />
              <span class="ml-2">Back</span>
            </a>
          </div>
          <div class="mt-2">
            <label>Title</label>
            <input
              v-model="work.title"
              type="text"
              class="form-control"
              placeholder="Title work"
            />
          </div>
          <div class="mt-2">
            <span style="font-size: 24px">Description</span>
            <TextEditor :id="`editor`" />
          </div>
          <div class="mt-2">
            <label>Price</label>
            <input
              v-model="work.price"
              type="number"
              class="form-control"
              placeholder="0"
            />
          </div>
          <div class="mt-2">
            <label>Size</label>
            <input
              v-model="work.size"
              type="number"
              class="form-control"
              placeholder="Ft"
            />
          </div>
          <!-- <div class="mt-2">
            <label>Term (days)</label>
            <input v-model="work.term" type="text" class="form-control" />
          </div> -->
          <div class="mt-2">
            <label>Scene link in 360</label>
            <input
              v-model="work.preview"
              type="text"
              class="form-control"
              placeholder="http://..."
            />
          </div>
          <div class="mt-2">
            <label>Types of rooms</label>
            <multiselect
              v-model="work.room_type"
              :options="rooms"
              placeholder="Select rooms"
              label="title"
            />
          </div>
          <div class="mt-2">
            <label>SEO Title</label>
            <input v-model="work.seo.title" type="text" class="form-control" />
          </div>
          <div class="mt-2">
            <label>SEO Description</label>
            <b-form-textarea
              v-model="work.seo.description"
              placeholder="Description"
              rows="3"
              max-rows="6"
            >
            </b-form-textarea>
            <a
              class="button button-primary mt-3 mb-5 col-4 d-flex justify-content-center"
              >Create work</a
            >
          </div>
        </div>
        <div class="photo-column" style="height: 100px; flex-derection: column">
          <LoadFile
            :title="`Additional photos`"
            class="mb-5 col-12"
            @add-file="addFile"
          />
          <div class="d-flex justify-content-space-between flex-wrap-wrap">
            <b-card
              :key="componentKey"
              title="Before work"
              :img-src="work.before"
              img-alt="Image"
              img-top
              tag="article"
              style="widht: 300px"
              class="m-2"
            >
              <SvgIcon
                v-if="work.before"
                name="close"
                class="icon-big"
                @click="deleteImage(work.before)"
              />
              <a
                class="button button-primary ml-3"
                @click="modalImage('before_modal')"
                >Upload image</a
              >
            </b-card>
            <b-card
              :key="componentKey"
              title="After work"
              :img-src="work.after"
              img-alt="Image"
              img-top
              tag="article"
              style="widht: 300px"
              class="m-2"
            >
              <SvgIcon
                v-if="work.after"
                name="close"
                class="icon-big"
                @click="deleteImage(work.after)"
              />
              <a
                class="button button-primary ml-3"
                @click="modalImage('after_modal')"
                >Upload image</a
              >
            </b-card>
          </div>
        </div>
      </div>
    </div>

    <LoadFileSingle
      :id="`preview_modal`"
      :title="`Preview`"
      @add-image="addImagePreview"
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
    <AddService :header="`Add Service`" />
    <AddRooms :header="`Add Rooms`" />
  </div>
</template>

<script>
import Vue from 'vue'
import { BCard } from 'bootstrap-vue'
Vue.component('b-card', BCard)
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
    TextEditor: () => import('~/components/TextEditor'),
    LoadFile: () => import('~/components/LoadFile'),
    AddService: () => import('~/components/Modals/Cms/AddService'),
    AddRooms: () => import('~/components/Modals/Cms/AddRooms'),
  },

  data() {
    return {
      componentKey: 0,
      work: {
        seo: {},
        preview: '',
        before: 'https://new.modernciti.group/static/images/before.png',
        after: 'https://new.modernciti.group/static/images/after.png',
      },
      select: ['Вариант 1', 'Вариант 2', 'Вариант 3'],
      selected: null,
      data: {},
      rooms: [],
      keygen_modal: 0,
      solutions: [],
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
        {
          text: this.$t('pages.adminSettingsPage.page.cms'),
          to: '/cms',
        },
        {
          text: this.$t('pages.adminSettingsPage.page.recent_works'),
          to: '/cms',
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
    form(val) {
      this.removeFile()
      this.localForm = { ...val }
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
      .then((response) => (this.rooms = response.data.data.room_types))
  },
  methods: {
    addService(id) {
      this.$bvModal.show(id)
    },
    addRooms(id) {
      this.$bvModal.show(id)
    },
    addFile(data) {
      this.work.files = data
    },
    deleteImage(image) {
      for (const key in this.work) {
        if (this.work[key] === image) {
          this.work[key] = null
        }
      }
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
    addImagePreview(data) {
      this.work.preview = data
      this.render()
    },
    addImageAfter(data) {
      this.work.after = data
      this.render()
    },
    addImageBefore(data) {
      this.work.before = data
      this.render()
    },
  },
}
</script>
<style scoped>
.form-recent {
  flex-direction: column;
}
.photo-column {
  display: flex;
  flex-direction: column;
}
</style>
