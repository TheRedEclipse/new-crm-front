<template>
  <Page :breadcrumbs="breadcrumbs">
    <template #content>
      <div class="position-relative">
        <div class="tabs__actions">
          <a
            class="button button-primary"
            @click="$bvModal.show('leads_create_lead_modal')"
          >
            <SvgIcon name="plus" class="little-icon" />
            <span class="ml-2">{{ $t(`pages.leadsPage.list.button`) }}</span>
          </a>
        </div>
        <b-tabs>
          <b-tab title="List">
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
                </div>
              </div>

              <div
                v-for="(item, i) in leads.data"
                :key="`contact-${type}-${i}`"
                class="col-12 col-md-4 col-lg-3"
              >
                <Card
                  :color="item.status ? item.status.color : '#0097FB'"
                  :status="
                    item.status || {
                      color: '#0097FB',
                      title: 'New',
                    }
                  "
                  :title="`${item.user.name} ${item.user.last_name}`"
                  image="https://iruimbatam.com/img/no-user-image.jpg"
                >
                  <template #fields>
                    <div class="item-card__field">
                      <SvgIcon name="email" class="little-icon text-primary" />
                      <span class="ml-2">{{ item.user.email || '-' }}</span>
                    </div>
                    <div class="item-card__field">
                      <SvgIcon name="call" class="little-icon text-primary" />
                      <span class="ml-2">{{ item.phone || '-' }}</span>
                    </div>
                    <div class="item-card__field">
                      <SvgIcon
                        name="estimate"
                        class="little-icon text-primary"
                      />
                      <span class="ml-2">-</span>
                    </div>
                  </template>
                  <template #buttons>
                    <button
                      class="button-card text-danger"
                      @click="$bvModal.show('delete_lead_confirm_modal')"
                    >
                      <SvgIcon name="trash" class="icon-15" />
                    </button>
                    <button
                      class="button-card text-dark-blue"
                      @click="updateForm('all', item.id)"
                    >
                      <SvgIcon name="edit" class="icon-15" />
                    </button>
                    <NuxtLink
                      :to="`/leads/${item.id}`"
                      class="button-card text-primary"
                    >
                      <SvgIcon name="bold_arrow" class="icon-15" />
                    </NuxtLink>
                  </template>
                </Card>
              </div>
            </div>

            <div
              v-if="Object.keys(leads.data).length > 0"
              class="col-12 d-flex mt-4 justify-content-center fixed-navigation"
            >
              <b-pagination
                v-model="page.leads"
                :total-rows="leads.total"
                :per-page="leads.per_page"
                first-number
                last-number
                @input="getPage(page.leads)"
              />
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <!-- <LeadsListBlock
        :data="leads"
        type="my"
        :title="$t(`pages.leadsPage.list.my.title`)"
        @edit="updateForm"
      /> -->

      <CreateLeadModal />
      <EditLeadModal
        :id="`leads_edit_lead_modal`"
        :element="form"
        @updated="getAll"
      />
      <DeleteConfirmModal :id="`delete_lead_confirm_modal`" />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    // LeadsListBlock: () => import('~/components/Pages/Leads/LeadsListBlock'),
    Card: () => import('~/components/Card'),
    CreateLeadModal: () => import('~/components/Modals/Leads/CreateLeadModal'),
    EditLeadModal: () => import('~/components/Modals/Leads/EditLeadModal'),
    DeleteConfirmModal: () => import('~/components/Modals/DeleteConfirmModal'),
  },
  async asyncData({ $axios, app }) {
    const allLeads = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/leads?type=all`
    )
    const myLeads = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/leads?type=my`
    )

    return {
      allLeads: allLeads.data.data.leads,
      leads: myLeads.data.data.leads,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.leadsPage.title'),
          active: true,
        },
      ],
    }
  },
  data() {
    return {
      form: {},
      page: {
        leads: 1,
      },
    }
  },
  methods: {
    updateForm(type, id) {
      this.form =
        type === 'my'
          ? this.leads.data[this.leads.data.findIndex((q) => q.id === id)]
          : this.allLeads.data[this.allLeads.data.findIndex((q) => q.id === id)]
      this.$bvModal.show(`leads_edit_lead_modal`)
    },
    getPage(page = this.page.leads) {
      this.page.leads = page
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/leads?type=all&page=${page}`)
        .then((res) => {
          this.leads = res.data.data.leads
        })
    },
  },
  head() {
    return {
      title: this.$t('pages.leadsPage.title'),
    }
  },
}
</script>
