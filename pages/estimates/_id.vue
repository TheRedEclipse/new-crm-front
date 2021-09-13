<template>
  <Page :breadcrumbs="breadcrumbs">
    <template #content>
      <div class="row aside-padding">
        <div class="col-12">
          <button
            class="button button-primary mr-1"
            style="height: 30px"
            :disabled="final"
            @click="finalDesign"
          >
            Convert to final stage
          </button>
          <b-tabs>
            <b-tab :title="`Initial Proposal & Design`">
              <b-tabs class="pill-small-tabs">
                <b-tab :title="`Line Items`">
                  <ItemsBlock @convert-folders="convertFolders" />
                </b-tab>
                <b-tab :title="`Design`"> <Design :rooms="folders" /> </b-tab>
                <b-tab :title="`Feedback`"></b-tab>
              </b-tabs>
            </b-tab>
            <b-tab :title="`Walk-through`"
              ><WalkThrough
                v-for="(item, i) in walkList"
                :key="`item-walk-design-walk-select-${i}`"
                :item="item"
              />
              <WalkDesign :rooms="folders" />
            </b-tab>
            <b-tab :title="`Final Proposal & Design`">
              <b-tabs v-if="final" class="pill-small-tabs">
                <b-tab :title="`Line Items`">
                  <ItemsBlock :final="final" :type="`final`" />
                </b-tab>
                <b-tab :title="`Design`"> <Design /> </b-tab>
                <b-tab :title="`Feedback`"></b-tab>
              </b-tabs>
            </b-tab>
          </b-tabs>
        </div>
        <Aside>
          <template>
            <div
              class="aside__title title px-3 pt-3 pb-2 d-flex align-items-center justify-content-between"
            >
              <h3>Estimate details</h3>
              <button
                class="button button-link button-link-primary"
                @click="$bvModal.show(`estimate_edit_estimate_info_modal`)"
              >
                {{ $t('pages.contactsPage.item.details.actions.edit.title') }}
                <SvgIcon name="edit" class="ml-2" />
              </button>
            </div>
            <div class="aside__content d-flex flex-column">
              <div class="aside__content-about d-flex flex-column">
                <div class="information">
                  <div class="information__title">
                    <span>Type</span>
                  </div>
                  <div class="information__value">
                    <span>Pre - Estimate</span>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    <span>Job name</span>
                  </div>
                  <div class="information__value">
                    <span>Appartaments modern construction</span>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    <span>Lead</span>
                  </div>
                  <div class="information__value">
                    <span>Matvei Buriev</span>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    <span>Email</span>
                  </div>
                  <div class="information__value">
                    <span>burievmarvei@gmail.com</span>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    <span>Phone</span>
                  </div>
                  <div class="information__value">
                    <span>+ 1 911 583 77 57</span>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    <span>Total price</span>
                  </div>
                  <div class="information__value"><span>1000 $</span></div>
                </div>
                <div class="information">
                  <div class="information__title">
                    <span>Created By</span>
                  </div>
                  <div class="information__value"><span>Mity Front</span></div>
                </div>
                <div class="information">
                  <div class="information__title">
                    <span>Date created</span>
                  </div>
                  <div class="information__value"><span>12/03/2021</span></div>
                </div>
              </div>
            </div>
          </template>
        </Aside>
      </div>

      <CreateItemModal />
      <EditInfo />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    ItemsBlock: () => import('~/components/Pages/Estimates/ItemsBlock'),
    Design: () => import('~/components/Pages/Estimates/Design'),
    WalkThrough: () => import('~/components/Pages/Estimates/WalkThrough'),
    WalkDesign: () => import('~/components/Pages/Estimates/WalkDesign'),
    Aside: () => import('~/components/layouts/aside'),
    CreateItemModal: () =>
      import('~/components/Modals/Estimates/CreateItemModal'),
    EditInfo: () => import('~/components/Modals/Estimates/EditInfo'),
  },
  data() {
    return {
      final: false,
      folders: [],
      walkList: [
        {
          name: 'Roditelev Dmitry',
          email: 'dmitry_ystal@gmail.com',
          phone: '+79624591163',
          date: 'Februart 11, 2021, 14:00-14:45',
          role: 'Lead',
          img:
            'https://www.ejin.ru/wp-content/uploads/2018/11/avatarki_dlya_devushek_4_19105932-800x800.jpg',
        },
        {
          name: 'Artem Legach',
          email: 'artem_ystal@gmail.com',
          phone: '+79627771361',
          date: 'Februart 11, 2021, 14:00-14:45',
          role: 'Project Manager',
          img:
            'https://cdn4.iconfinder.com/data/icons/taxi-service-flat/90/support__services__employee__avatar_-512.png',
        },
      ],
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
        {
          text: this.$t('pages.estimatesPage.title'),
          to: '/estimates',
        },
        {
          text: this.$t('pages.estimatesPage.item.title', null, {
            id: this.id,
          }),
          active: true,
        },
      ],
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  methods: {
    finalDesign() {
      this.final = true
    },
    convertFolders(data) {
      this.folders = data
    },
  },
}
</script>
