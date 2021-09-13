<template>
  <div>
    <AdminBar />
    <div class="row aside-padding">
      <div class="col-12">
        <div class="container m-4">
          <div class="ml-4">
            <h1>Contact Us</h1>
            <div class="settings-block">
              <div class="d-flex w-100 m-2">
                <a
                  class="button button-outline-primary d-flex justify-content-center mr-3"
                  href="/control/cms/pages"
                >
                  <SvgIcon name="prev" />
                  <span class="ml-2">Back</span>
                </a>
              </div>
              <h2 class="mt-4">Social</h2>
              <b-form-checkbox
                id="checkbox-2"
                v-model="editSocial"
                class="mt-3"
                name="checkbox-2"
                switch
              >
                <span>Edit Mode</span>
              </b-form-checkbox>
              <div class="create-panel">
                <input
                  type="text"
                  class="form-control col-4"
                  placeholder="Name"
                />
                <input
                  type="text"
                  class="form-control col-4"
                  placeholder="Link"
                />
                <div :key="componentKey" class="form-group">
                  <SvgIcon
                    v-if="icon"
                    name="close"
                    class="icon-big"
                    @click="deleteImage(icon)"
                  />
                  <a
                    class="button button-outline-primary ml-2"
                    @click="modalImage(`icon_modal`)"
                    >Upload Icon</a
                  >
                  <img :src="icon" class="ml-3" width="60" alt="" />
                  <LoadFileSingle
                    :id="`icon_modal`"
                    :title="`Add Icon`"
                    @add-image="addImage"
                  />
                </div>
              </div>
              <a href="" class="button button-primary">Create</a>
              <table
                :key="componentKey"
                class="table mt-3 col-12"
                style="max-height: 100px"
              >
                <tbody class="fields">
                  <tr v-for="(row, i) in social" :key="i">
                    <td v-if="editSocial" class="vertical-center">
                      <SvgIcon
                        name="trash"
                        class="ml-3"
                        style="color: red; cursor: pointer"
                      />
                    </td>
                    <td class="vertical-center">
                      <input
                        v-if="editSocial"
                        class="col-12 form-control"
                        type="text"
                        :value="row.title"
                      />
                      <span v-else>{{ row.title }}</span>
                    </td>
                    <td class="vertical-center">
                      <input
                        v-if="editSocial"
                        class="col-12 form-control"
                        type="text"
                        :value="row.link"
                      />
                      <span v-else>{{ row.link }}</span>
                    </td>
                    <td
                      class="vertical-center"
                      @click="$bvModal.show(`icon_modal_${row.title}`)"
                    >
                      <img :src="row.logo" width="50" alt="" />
                      <SvgIcon
                        v-if="editSocial"
                        name="edit"
                        class="ml-3"
                        style="color: #007bff; cursor: pointer"
                      />
                    </td>
                    <LoadFileSingle
                      :id="`icon_modal_${row.title}`"
                      :title="`Social icon`"
                      @add-image="addImage"
                    />
                  </tr>
                  <a
                    v-if="editSocial"
                    href=""
                    class="button button-primary mt-2"
                    >Save</a
                  >
                </tbody>
              </table>
            </div>
            <div class="settings-block mb-5">
              <h2 class="mt-4">Address</h2>
              <b-form-checkbox
                id="checkbox-1"
                v-model="edit"
                class="mt-3"
                name="checkbox-1"
                switch
              >
                <span>Edit Mode</span>
              </b-form-checkbox>
              <div class="create-panel">
                <input
                  type="text"
                  class="form-control col-3"
                  placeholder="Zip"
                />
                <input
                  type="text"
                  class="form-control col-3"
                  placeholder="Street"
                />
                <input
                  type="text"
                  class="form-control col-3"
                  placeholder="Address"
                />
              </div>
              <input
                type="text"
                class="form-control col-12 mt-3 ml-3"
                placeholder="Google Maps "
              />
              <a href="" class="button button-primary mt-3">Create</a>
              <table
                :key="componentKey"
                class="table mt-3 col-9"
                style="max-height: 100px"
              >
                <tbody class="fields">
                  <tr v-for="(row, i) in contacts" :key="i">
                    <td v-if="edit" class="vertical-center">
                      <SvgIcon
                        name="trash"
                        class="ml-3"
                        style="color: red; cursor: pointer"
                      />
                    </td>
                    <td class="vertical-center">
                      <input
                        v-if="edit"
                        class="col-12 form-control"
                        type="text"
                        :value="row.address"
                      />
                      <span v-else>{{ row.address }}</span>
                    </td>
                    <td class="vertical-center">
                      <input
                        v-if="edit"
                        class="col-12 form-control"
                        type="text"
                        :value="row.email"
                      />
                      <span v-else>{{ row.email }}</span>
                    </td>
                    <td class="vertical-center">
                      <input
                        v-if="edit"
                        class="col-12 form-control"
                        type="text"
                        :value="row.phone"
                      />
                      <span v-else>{{ row.phone }}</span>
                    </td>
                  </tr>
                  <a v-if="edit" href="" class="button button-primary mt-2"
                    >Save</a
                  >
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    // LoadFile: () => import('~/components/LoadFile'),

    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
  },

  data() {
    return {
      componentKey: 0,
      contacts: [
        {
          address: '1572 Dahill Rd, Brooklyn, New York 11204',
          email: 'contact@moderncitigroup.com',
          phone: '+1 844 624 0044',
        },
        {
          address: '1572 Dahill Rd, Brooklyn, New York 11204',
          email: 'contact@moderncitigroup.com',
          phone: '+1 844 624 0044',
        },
      ],
      social: [
        {
          title: 'Yelp',
          link: 'https://www.yelp.com/biz/modern-citi-group-new-york-3',
          logo:
            'https://img.pngio.com/yelp-icon-logo-png-transparent-svg-vector-freebie-supply-yelp-png-2400_2400.png',
        },
        {
          title: 'BBB',
          link:
            'https://www.bbb.org/us/ny/brooklyn/profile/general-contractor/modern-citi-group-0121-186577',
          logo:
            'https://www.ajmseptic.com/wp-content/uploads/2020/03/BBB-logo.png',
        },
        {
          title: 'Google',
          link:
            'https://www.google.com/maps/place/Modern+Citi+Group+Inc/@40.7056494,-73.9780035,10z/data=!4m5!3m4!1s0x0:0x8f424d9e62e2339e!8m2!3d40.7056494!4d-73.9780035',
          logo: 'https://zveno-web.ru/wp-content/uploads/2019/09/google-1.jpg',
        },
        {
          title: 'Houzz',
          link:
            'https://www.houzz.com/professionals/general-contractors/modern-citi-group-renovations-and-remodeling-pfvwus-pf~1639434407?',
          logo:
            'https://mr-craftsman.com/wp-content/uploads/2020/08/houzz_logo.png',
        },
      ],
      icon: '',
      editSocial: false,
      edit: false,
    }
  },
  watch: {
    edit() {
      this.forceRerender()
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/roomTypes`)
      .then((response) => (this.rooms = response.data.data.room_types))
  },
  methods: {
    forceRerender() {
      this.componentKey += 1
    },
    addImage(data) {
      this.icon = data
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    deleteImage(image) {
      this.icon = null
      this.render()
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
  },
}
</script>
<style scoped>
.fields tr td {
  font-size: 18px;
}
.create-panel {
  width: 100%;
  display: flex;
  margin-top: 10px;
}
.create-panel input {
  margin-left: 10px;
}
.settings-block {
  width: 75%;
}
</style>
