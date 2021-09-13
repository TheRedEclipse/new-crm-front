<template>
  <Page :breadcrumbs="breadcrumbs">
    <template #content>
      <div class="position-relative">
        <div class="tabs__actions">
          <a class="button button-primary">
            <span class="mr-2">Add New</span>
            <SvgIcon name="rounded_plus" />
          </a>
        </div>
        <b-tabs>
          <b-tab title="All">
            <div class="row mt-3">
              <div class="col-12">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <SvgIcon name="search" />
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control form-control--external"
                    placeholder="Enter an item, group, room..."
                  />
                  <a class="nav-link">
                    <span class="ml-2">All</span>
                    <SvgIcon name="arrow_filled" />
                  </a>
                </div>
              </div>
            </div>
            <div v-for="i in 5" :key="`item-card-${i}`" class="row px-3 mb-3">
              <div class="col-12">
                <div class="item-card row">
                  <div class="col-12 col-md-4">
                    <div class="item-card__field">
                      <div class="item-card__image-block">
                        <div
                          class="item-card__image"
                          style="
                            background-image: url(/static/images/google.png);
                          "
                        ></div>
                      </div>
                      <div class="item-card__title ml-2 text-dark-blue">
                        Google Renovations
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-3">
                    <div class="item-card__field">
                      <SvgIcon name="email" class="little-icon text-primary" />
                      <span class="ml-2">sobaka@mail.ru</span>
                    </div>
                  </div>
                  <div class="col-12 col-md-2">
                    <div class="item-card__field">
                      <SvgIcon name="call" class="little-icon text-primary" />
                      <span class="ml-2">8800553535</span>
                    </div>
                  </div>
                  <div class="col-12 col-md-1">
                    <div class="item-card__field">
                      <span class="item-card__status-icon"></span>
                      <span class="ml-2">Approved</span>
                    </div>
                  </div>
                  <div class="col-12 col-md-2">
                    <div class="item-card__buttons justify-content-end d-flex">
                      <button class="button-link-danger button">
                        <SvgIcon name="trash" />
                      </button>
                      <button class="button-link-primary button">
                        <span class="mr-2">View</span>
                        <SvgIcon name="arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-12 d-flex mt-4 justify-content-center fixed-navigation"
            >
              <b-pagination
                :total-rows="100"
                :per-page="5"
                first-number
                last-number
              />
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
  },
  async asyncData({ $axios, app }) {
    const statuses = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/references/requests/statuses`
    )

    const requests = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/requests`
    )

    return {
      statuses: statuses.data.data.statuses,
      requests: requests.data.data.requests,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.subcontractorsPage.title'),
          active: true,
        },
      ],
    }
  },
  data() {
    return {
      pages: {
        all: 1,
        my: 1,
      },
      form: {},
    }
  },
  methods: {
    openModal(id, status) {
      this.$bvModal.show(`requests_show_request_modal`)
    },
    copy() {
      navigator.clipboard.writeText('http://modernciti.group/initial-form')
      this.$toast.success('Link on initial form was copied')
    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
  head() {
    return {
      title: this.$t('pages.requestsPage.title'),
    }
  },
}
</script>

<style lang="scss">
.item-card {
  background: #ffffff;
  border: 0.8px solid #ededed;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  align-items: center;

  &__image-block {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 0.5714rem;
    flex-shrink: 0;
  }

  &__image {
    width: 40px;
    height: 40px;
    background-position: center;
    background-size: cover;
  }

  &__field {
    display: flex;
    align-items: center;
  }

  &__status-icon {
    width: 16px;
    height: 16px;
    background: #2ed47a;
    border-radius: 50%;
    display: block;
    flex-shrink: 0;
  }
}
</style>
