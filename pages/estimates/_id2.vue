<template>
  <Page :breadcrumbs="breadcrumbs">
    <template #content>
      <div class="row">
        <div class="col-12 col-lg-7 col-xl-8 col-xxl-9">
          <Navigation />
          <b-tabs>
            <b-tab :title="$t('tabs.itemsTab.title')">
              <ItemsBlock />
            </b-tab>
            <b-tab :title="$t('tabs.attachmentsTab.title')">
              <AttachmentsTab />
            </b-tab>
            <b-tab :title="$t('tabs.activitiesTab.title')">
              <ActivitiesTab />
            </b-tab>
            <b-tab :title="$t('tabs.notesTab.title')">
              <NotesTab />
            </b-tab>
            <b-tab :title="$t('tabs.questionsTab.title')">
              <QuestionsTab />
            </b-tab>
          </b-tabs>
        </div>
        <div class="col-12 col-lg-5 col-xl-4 col-xxl-3 mt-5 mt-lg-0">
          <div class="card max-height">
            <div
              class="card__title title px-3 py-2 d-flex align-items-center justify-content-between"
            >
              <h3>{{ $t('pages.estimatesPage.item.details.title') }}</h3>
              <button class="button button-link button-link-primary">
                {{ $t('pages.estimatesPage.item.details.actions.edit.title') }}
                <SvgIcon name="edit" class="ml-2" />
              </button>
            </div>
            <div class="card__content d-flex flex-column">
              <Progress />
              <div class="card__content-about d-flex flex-column">
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.estimatesPage.item.details.fields.type') }}
                  </div>
                  <div class="information__value">Pre - Estimate</div>
                </div>

                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.estimatesPage.item.details.fields.jobName') }}
                  </div>
                  <div class="information__value">
                    Appartaments modern construction
                  </div>
                </div>

                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.estimatesPage.item.details.fields.lead') }}
                  </div>
                  <div class="information__value">Eddy Moskalenko</div>
                </div>

                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.estimatesPage.item.details.fields.email') }}
                  </div>
                  <div class="information__value">
                    moderncitigroup@gmail.com
                  </div>
                </div>

                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.estimatesPage.item.details.fields.phone') }}
                  </div>
                  <div class="information__value">+ 1 911 583 77 57</div>
                </div>

                <div class="information">
                  <div class="information__title">
                    {{
                      $t('pages.estimatesPage.item.details.fields.totalPrice')
                    }}
                  </div>
                  <div class="information__value">$ 10 000</div>
                </div>

                <div class="information">
                  <div class="information__title">
                    {{
                      $t('pages.estimatesPage.item.details.fields.createdBy')
                    }}
                  </div>
                  <div class="information__value">Maxim Legach</div>
                </div>

                <div class="information">
                  <div class="information__title">
                    {{
                      $t('pages.estimatesPage.item.details.fields.dateCreated')
                    }}
                  </div>
                  <div class="information__value">01 / 12 / 2020</div>
                </div>
              </div>
              <div class="d-flex justify-content-center my-3">
                <button
                  class="button button-primary w-50 justify-content-center"
                >
                  {{
                    $t('pages.estimatesPage.item.details.actions.sendEstimate')
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateItemModal />
      <QuestionFormModal />
      <NoteFormModal />
      <CreateAttachmentModal />
      <InsertEstimateTemplateModal />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    ItemsBlock: () => import('~/components/Pages/Estimates/ItemsBlock'),
    NotesTab: () => import('~/components/Tabs/NotesTab'),
    QuestionsTab: () => import('~/components/Tabs/QuestionsTab'),
    ActivitiesTab: () => import('~/components/Tabs/ActivitiesTab'),
    AttachmentsTab: () => import('~/components/Tabs/AttachmentsTab'),
    Progress: () => import('~/components/Pages/Estimates/Progress'),

    CreateItemModal: () =>
      import('~/components/Modals/Estimates/CreateItemModal'),
    QuestionFormModal: () => import('~/components/Modals/QuestionFormModal'),
    NoteFormModal: () => import('~/components/Modals/NoteFormModal'),
    CreateAttachmentModal: () =>
      import('~/components/Modals/CreateAttachmentModal'),
    InsertEstimateTemplateModal: () =>
      import('~/components/Modals/Estimates/InsertEstimateTemplateModal'),
    Navigation: () => import('~/components/Pages/Estimates/Navigation'),
  },
  data() {
    return {
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
}
</script>
