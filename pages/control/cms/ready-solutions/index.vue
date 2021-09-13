<template>
  <div>
    <AdminBar />

    <div class="mt-4">
      <h2 class="m-4">Ready Solution</h2>
      <div class="col-12">
        <a class="button button-outline-primary" href="/control/cms/pages">
          <SvgIcon name="prev" />
          <span class="ml-2">Back</span>
        </a>
        <a class="button button-primary" href="./ready-solutions/create">
          <CreateSolution :id="`create-modal`" @show-solution="showSolution" />
          <SvgIcon name="plus" />
          <span class="ml-2">Create Ready Solution</span>
        </a>
        <a class="button button-primary" href="./ready-solutions/materials">
          <SvgIcon name="eye" />
          <span class="ml-2">Materials Gallery</span>
        </a>

        <!-- <SolutionListBlock :data="solutions" :title="`Solutions`" /> -->
        <div class="table-block__content">
          <table class="table mt-3">
            <thead>
              <tr>
                <th class="text-primary" style="width: 20px"></th>
                <th class="text-primary" style="width: 35%">
                  {{ $t(`pages.adminSettingsPage.fields.title`) }}
                </th>
                <th class="text-primary" style="width: 35%">
                  {{ $t(`pages.adminSettingsPage.fields.rooms_type`) }}
                </th>
                <th class="text-primary" style="width: 35%">
                  {{ $t(`pages.adminSettingsPage.fields.price`) }}
                </th>

                <th class="text-primary" style="width: 100px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in solutions" :key="`permission-${i}`">
                <td class="vertical-center"></td>
                <td class="vertical-center">
                  {{ item.title }}
                </td>
                <td class="vertical-center">
                  {{ item.room_type_id.title }}
                </td>
                <td class="vertical-center">$ {{ item.price }}</td>
                <td
                  class="vertical-center d-flex justify-content-space-beetwen"
                >
                  <SvgIcon
                    name="edit"
                    style="color: rgb(0, 162, 255); cursor: pointer"
                  />
                  <SvgIcon
                    name="trash"
                    style="color: red; cursor: pointer"
                    class="ml-3"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    CreateSolution: () => import('~/components/Modals/Cms/CreateSolution'),
  },
  data() {
    return {
      rooms: [],
      keygen_modal: 0,
      solution: {},
      solutions: [
        {
          title: 'Dark Lux',
          room_type_id: {
            title: 'Kitchen',
          },
          price: 24000,
        },
        {
          title: 'Moderno',
          room_type_id: {
            title: 'Kitchen',
          },
          price: 19000,
        },
        {
          title: 'Prado',
          room_type_id: {
            title: 'Kitchen',
          },
          price: 15000,
        },
      ],
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
          text: this.$t('pages.adminSettingsPage.page.ready_solutions'),
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
    showModalCreateSolution() {
      this.keygen_modal += 1

      this.$bvModal.show(`create-modal`)
    },
    showSolution(data) {
      console.log(data)
      this.solutions.push(_.cloneDeep(data))
    },
  },
}
</script>
