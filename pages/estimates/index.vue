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
                v-for="(item, i) in estimates"
                :key="`contact-${type}-${i}`"
                class="col-12 col-md-4 col-lg-3"
              >
                <Card
                  :color="item.status ? item.color : '#0097FB'"
                  :status="{
                    color: item.color,
                    title: item.status,
                  }"
                  :title="`${item.lead}`"
                  icon="estimate"
                >
                  <template #fields>
                    <div class="item-card__field">
                      <SvgIcon name="email" class="little-icon text-primary" />
                      <span class="ml-2">{{ item.email || '-' }}</span>
                    </div>
                    <div class="item-card__field">
                      <span class="text-primary">Date start:</span>
                      <span class="ml-2">{{ item.created || '-' }}</span>
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
                      :to="`/estimates/1`"
                      class="button-card text-primary"
                    >
                      <SvgIcon name="bold_arrow" class="icon-15" />
                    </NuxtLink>
                  </template>
                </Card>
              </div>
            </div>

            <div
              v-if="Object.keys(estimates).length > 0"
              class="col-12 d-flex mt-4 justify-content-center fixed-navigation"
            >
              <b-pagination
                v-model="pages.estimates"
                :total-rows="Object.keys(estimates).length"
                :per-page="10"
                first-number
                last-number
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

      <!-- <CreateLeadModal />
      <EditLeadModal
        :id="`leads_edit_lead_modal`"
        :element="form"
        @updated="getAll"
      /> -->
      <!-- <DeleteConfirmModal :id="`delete_lead_confirm_modal`" /> -->
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    Card: () => import('~/components/Card'),
  },
  data() {
    return {
      pages: {
        estimates: 1,
      },
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
        {
          text: this.$t('pages.estimatesPage.title'),
          active: true,
        },
      ],
      estimates: [
        {
          id: 1,
          created: '01 / 12 / 2020',
          lead: 'Matvei Buriev',
          type: 'Pre-estimate',
          total_price: '$ 1000',
          status: 'Intitial Proposal draft',
          color: '#0097FB',
          date_sent: '',
        },
        {
          id: 2,
          created: '01 / 12 / 2020',
          lead: 'Daniel Buriev',
          type: 'Pre-estimate',
          total_price: '$ 1000',
          status: 'Walk - Through (pending)',
          color: '#FFCC66',
          date_sent: '',
        },
        {
          id: 3,
          created: '01 / 12 / 2020',
          lead: 'Mity',
          type: 'Pre-estimate',
          total_price: '$ 1000',
          status: 'Intitial Proposal draft',
          color: '#0097FB',
          date_sent: '',
        },
        {
          id: 4,
          created: '01 / 12 / 2020',
          lead: 'Vova',
          type: 'Pre-estimate',
          total_price: '$ 1000',
          status: 'Intitial Proposal draft',
          color: '#0097FB',
          date_sent: '',
        },
        {
          id: 5,
          created: '01 / 12 / 2020',
          lead: 'Pavlik',
          type: 'Pre-estimate',
          total_price: '$ 1000',
          status: 'Walk - Through (pending)',
          color: '#FFCC66',
          date_sent: '',
        },
        {
          id: 6,
          created: '01 / 12 / 2020',
          lead: 'Mity',
          type: 'Pre-estimate',
          total_price: '$ 1000',
          status: 'Intitial Proposal draft',
          color: '#0097FB',
          date_sent: '',
        },
        {
          id: 7,
          created: '01 / 12 / 2020',
          lead: 'Vova',
          type: 'Pre-estimate',
          total_price: '$ 1000',
          status: 'Intitial Proposal draft',
          color: '#0097FB',
          date_sent: '',
        },
        {
          id: 8,
          created: '01 / 12 / 2020',
          lead: 'Vova',
          type: 'Pre-estimate',
          total_price: '$ 1000',
          status: 'Intitial Proposal draft',
          color: '#0097FB',
          date_sent: '',
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('pages.estimatesPage.title'),
    }
  },
}
</script>
