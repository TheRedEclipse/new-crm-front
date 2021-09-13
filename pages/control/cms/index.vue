<template>
  <div>
    <AdminBar />
    <!-- <SolutionListBlock :data="works" :title="`works`" /> -->
    <div
      class="table-block__content d-flex align-items-center justify-content-start"
    >
      <div class="d-flex justify-content-center w-100 mt-3 col-6">
        <div class="col-12">
          <h2>Global Config</h2>
          <div :key="componentKey" class="mt-3 form-group">
            <SvgIcon
              v-if="config.image"
              name="close"
              class="icon-big"
              @click="deleteImage(config.image)"
            />
            <a
              class="button button-primary ml-2"
              @click="modalImage('icon_modal')"
              >Upload Logo
            </a>
            <img :src="config.image" class="ml-3" width="300" alt="" />

            <LoadFileSingle
              :id="`icon_modal`"
              :title="`Add Icon`"
              @add-image="addImageIcon"
            />
          </div>
          <div class="form-group">
            <label>Title</label>
            <input
              v-model="config.title"
              type="text"
              class="form-control"
              placeholder="Title"
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="config.email"
              type="email"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <label>Link for page Terms & Conditions:</label>
            <input
              v-model="config.terms_conditions"
              type="email"
              class="form-control"
              placeholder="https://"
            />
          </div>
          <div class="form-group">
            <label>Wihich states to show in the main slider?</label>
            <multiselect
              v-model="state"
              :options="states"
              placeholder="Select state"
              :searchable="true"
              multiple
            />
          </div>
          <div class="form-group">
            <label>Link for PrivacyPolicy:</label>
            <input
              v-model="config.privacy_policy"
              type="email"
              class="form-control"
              placeholder="https://"
            />
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button class="button button-primary w-30 justify-content-center">
              Save Config
            </button>
          </div>
        </div>
      </div>
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e016405d-82da-430a-a6b4-186d9cab0868/de4go36-d9ae885d-e51a-41ed-986e-11fa2d7da78b.png/v1/fill/w_999,h_800,strp/mobile_website_design___how_does_google_advertisin_by_amplio360_de4go36-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04MjAiLCJwYXRoIjoiXC9mXC9lMDE2NDA1ZC04MmRhLTQzMGEtYTZiNC0xODZkOWNhYjA4NjhcL2RlNGdvMzYtZDlhZTg4NWQtZTUxYS00MWVkLTk4NmUtMTFmYTJkN2RhNzhiLnBuZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.uFpvVICs_6-VAq2RBZS5cp3LFoJFzxfRQ9tDfVIJi9U"
        alt=""
        class="col-4"
      />
    </div>
    <!-- <table class="table mt-3 col-12">
        <tbody>
          <tr>
            <td class="vertical-center">Global Config</td>
            <td class="vertical-center">
              <SvgIcon
                name="settings"
                class="icon-big"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`config`)"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Pages</td>
            <td class="vertical-center">
              <a href="cms/page-builder"
                ><SvgIcon
                  name="sitemap"
                  class="icon-big"
                  style="color: #0069af; cursor: pointer"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Ready Solutions</td>
            <td class="vertical-center">
              <a href="cms/ready-solutions"
                ><SvgIcon
                  name="levels"
                  class="icon-big"
                  style="color: #0069af; cursor: pointer"
                />
              </a>
              <a href="https://new.modernciti.group/solutions"
                ><SvgIcon name="eye" class="ml-5 icon-big"
              /></a>
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Recent Works</td>
            <td class="vertical-center">
              <a href="cms/recent-works"
                ><SvgIcon
                  name="levels"
                  class="icon-big"
                  style="color: #0069af; cursor: pointer"
                />
              </a>

              <a href="https://new.modernciti.group/"
                ><SvgIcon name="eye" class="ml-5 icon-big"
              /></a>
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Services</td>
            <td class="vertical-center">
              <SvgIcon
                name="levels"
                class="icon-big"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`add-service`)"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Rooms</td>
            <td class="vertical-center">
              <SvgIcon
                name="levels"
                class="icon-big"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`add-rooms`)"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Styles</td>
            <td class="vertical-center">
              <SvgIcon
                name="levels"
                class="icon-big"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`style_modal`)"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Property Type</td>
            <td class="vertical-center">
              <SvgIcon
                name="levels"
                class="icon-big"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`property_modal`)"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">How we works</td>
            <td class="vertical-center">
              <SvgIcon
                name="levels"
                class="icon-big"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`how_we_modal`)"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Sliders and Carousels</td>
            <td class="vertical-center">
              <SvgIcon
                name="levels"
                class="icon-big"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`sliders_modal`)"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Reviews</td>
            <td class="vertical-center">
              <SvgIcon
                name="levels"
                class="icon-big"
                style="color: #0069af; cursor: pointer"
                @click="$bvModal.show(`reviews_modal`)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <AddService :header="`Add Service`" />
      <AddRooms :header="`Add Rooms`" />
      <AddStyle :header="`Add Style`" />
      <AddProperty :header="`Add Property Type`" />
      <AddHowWork :header="`Add Work`" />
      <AddSlideCarousel :header="`Settings Sliders and Carousels`" />
      <GlobalConfig :header="`Global Config`" />
      <AddReviews :header="`Add Reviews`" /> -->
  </div>
</template>
<script>
import Vue from 'vue'
import { BTooltip } from 'bootstrap-vue'
import states from '~/data/states'
Vue.component('b-tooltip', BTooltip)
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    // AddService: () => import('~/components/Modals/Cms/AddService'),
    // AddRooms: () => import('~/components/Modals/Cms/AddRooms'),
    // AddStyle: () => import('~/components/Modals/Cms/AddStyle'),
    // AddProperty: () => import('~/components/Modals/Cms/AddProperty'),
    // AddHowWork: () => import('~/components/Modals/Cms/AddHowWork'),
    // AddSlideCarousel: () => import('~/components/Modals/Cms/AddSlideCarousel'),
    // GlobalConfig: () => import('~/components/Modals/Cms/GlobalConfig'),
    // AddReviews: () => import('~/components/Modals/Cms/AddReviews'),
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
  },
  data() {
    return {
      componentKey: 0,
      config: {},
      rooms: [],
      room: {},
      states,
      state: [],
    }
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
