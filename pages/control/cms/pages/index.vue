<template>
  <div>
    <AdminBar />
    <!-- <SolutionListBlock :data="works" :title="`works`" /> -->
    <div
      class="table-block__content d-flex align-items-center justify-content-start"
    >
      <table class="table mt-3 col-12">
        <NuxtLink class="button button-primary" to="/control/cms/page-builder"
          >Create New Page</NuxtLink
        >
        <tbody>
          <tr>
            <td class="vertical-center">Ready Solutions</td>
            <td class="vertical-center">
              <a href="/control/cms/ready-solutions"
                ><SvgIcon
                  name="levels"
                  style="color: #0069af; cursor: pointer"
                />
              </a>
              <a href="https://new.modernciti.group/solutions"
                ><SvgIcon name="eye" class="ml-3 icon-big"
              /></a>
              <SvgIcon
                name="trash"
                class="ml-3"
                style="color: red; cursor: pointer"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Recent Works</td>
            <td class="vertical-center">
              <a href="/control/cms/recent-works"
                ><SvgIcon
                  name="levels"
                  class="icon-big"
                  style="color: #0069af; cursor: pointer"
                />
              </a>

              <a href="https://new.modernciti.group/"
                ><SvgIcon name="eye" class="ml-3 icon-big"
              /></a>
              <SvgIcon
                name="trash"
                class="ml-3"
                style="color: red; cursor: pointer"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">How We Works</td>
            <td class="vertical-center">
              <a href="/control/cms/how-we-work"
                ><SvgIcon
                  name="levels"
                  class="icon-big"
                  style="color: #0069af; cursor: pointer"
                />
              </a>

              <a href="https://new.modernciti.group/how-we-work"
                ><SvgIcon name="eye" class="ml-3 icon-big"
              /></a>
              <SvgIcon
                name="trash"
                class="ml-3"
                style="color: red; cursor: pointer"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Why We're Different</td>
            <td class="vertical-center">
              <a href="/control/cms/why"
                ><SvgIcon
                  name="levels"
                  class="icon-big"
                  style="color: #0069af; cursor: pointer"
                />
              </a>

              <a href="https://new.modernciti.group/why"
                ><SvgIcon name="eye" class="ml-3 icon-big"
              /></a>
              <SvgIcon
                name="trash"
                class="ml-3"
                style="color: red; cursor: pointer"
              />
            </td>
          </tr>
          <tr>
            <td class="vertical-center">Contact Us</td>
            <td class="vertical-center">
              <a href="/control/cms/contacts"
                ><SvgIcon
                  name="levels"
                  class="icon-big"
                  style="color: #0069af; cursor: pointer"
                />
              </a>

              <a href="https://new.modernciti.group/contacts"
                ><SvgIcon name="eye" class="ml-3 icon-big"
              /></a>
              <SvgIcon
                name="trash"
                class="ml-3"
                style="color: red; cursor: pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { BTooltip } from 'bootstrap-vue'
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
  },
  data() {
    return {
      componentKey: 0,
      config: {},
      rooms: [],
      room: {},
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
