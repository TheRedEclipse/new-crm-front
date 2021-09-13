<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>
      {{
        $t('pages.projectsPage.list.item.title', null, { id: $route.params.id })
      }}
    </template> -->

    <template #content>
      <div class="row">
        <div class="col-12 col-lg-7 col-xl-8 col-xxl-9">
          <Navigation />
          <b-tabs>
            <b-tab :title="$t('tabs.lineItemsTab.title')">
              <LineItemsBlock />
            </b-tab>
            <b-tab :title="$t('tabs.biddersTab.title')">
              <BiddersTab />
            </b-tab>
            <b-tab :title="$t('tabs.bidsTab.title')">
              <BidsTab />
            </b-tab>
            <b-tab :title="$t('tabs.documentsTab.title')">
              <DocumentsTab />
            </b-tab>
            <b-tab :title="$t('tabs.attachmentsTab.title')">
              <AttachmentsTab />
            </b-tab>
            <b-tab :title="$t('tabs.nodesTab.title')">
              <NotesTab />
            </b-tab>
            <b-tab :title="$t('tabs.completionReportsTab.title')">
              <CompletionReportsTab />
            </b-tab>
            <b-tab :title="$t('tabs.tasksTab.title')">
              <TasksTab />
            </b-tab>
            <b-tab :title="$t('tabs.changeOrdersTab.title')">
              <ChangeOrdersTab />
            </b-tab>

            <b-tab :title="$t('tabs.paymentsTab.title')">
              <PaymentsTab />
            </b-tab>
            <b-tab :title="$t('tabs.payoutsTab.title')">
              <PayoutTab />
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
              <h3>{{ $t('pages.projectsPage.list.item.details.title') }}</h3>
              <button
                class="button button-link button-link-primary"
                @click="$bvModal.show(`projects_edit_contact_modal`)"
              >
                {{ $t('pages.projectsPage.item.details.actions.edit.title') }}
                <SvgIcon name="edit" class="ml-2" />
              </button>
            </div>
            <div class="card__content d-flex flex-column">
              <div class="card__content-about d-flex flex-column">
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.projectsPage.list.item.details.fields.lead') }}
                  </div>
                  <div class="information__value">
                    <div class="information__value">
                      {{ 'название лида' }}
                    </div>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{
                      $t(
                        'pages.projectsPage.list.item.details.fields.projectName'
                      )
                    }}
                  </div>
                  <div class="information__value">
                    <div class="information__value">
                      {{ 'название проекта' }}
                    </div>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{
                      $t('pages.projectsPage.list.item.details.fields.created')
                    }}
                  </div>
                  <div class="information__value">
                    <div class="information__value">
                      {{ 'Дата/время создания' }}
                    </div>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{
                      $t('pages.projectsPage.list.item.details.fields.createBy')
                    }}
                  </div>
                  <div class="information__value">
                    <div class="information__value">
                      {{ 'Кем создан' }}
                    </div>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{
                      $t('pages.projectsPage.list.item.details.fields.adress')
                    }}
                  </div>
                  <div class="information__value">
                    <div class="information__value">
                      {{ 'Адрес' }}
                    </div>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.projectsPage.list.item.details.fields.lead') }}
                  </div>
                  <div class="information__value">
                    <div class="information__value">
                      {{ 'New' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProjectModal
        :id="`contacts_edit_contact_modal`"
        :element="element"
        @update="getItem"
      />
      <PaymentFormModal
        :id="`projects_create_payments_modal`"
        @create="createPayment"
      />
      <PayoutFormModal
        :id="`projects_create_payments_modal`"
        @create="createPayout"
      />
      <GenDocumentModal
        :id="`projects_generate_document_moda`"
        :element-id="current.contact"
        @saved="getNotes"
      />
      <NoteFormModal
        :id="`contacts_create_note_modal`"
        @create="createNote"
        @update="updateNote"
      />
      <TaskFormModal :id="`leads_create_task_modal`" @create="createTask" />
      <CreateAttachmentModal />
    </template>
  </Page>
</template>

<script>
// TODO: Raise up all actions from tabs to this level
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    LineItemsBlock: () => import('~/components/Pages/Projects/LineItemsBlock'),
    BiddersTab: () => import('~/components/Tabs/BiddersTab'),
    BidsTab: () => import('~/components/Tabs/BidsTab'),
    DocumentsTab: () => import('~/components/Tabs/DocumentsTab'),
    AttachmentsTab: () => import('~/components/Tabs/AttachmentsTab'),
    NotesTab: () => import('~/components/Tabs/NotesTab'),
    PaymentsTab: () => import('~/components/Tabs/PaymentsTab'),
    PayoutTab: () => import('~/components/Tabs/PayoutTab'),
    QuestionsTab: () => import('~/components/Tabs/QuestionsTab'),
    CompletionReportsTab: () =>
      import('~/components/Tabs/CompletionReportsTab'),
    TasksTab: () => import('~/components/Tabs/TasksTab'),
    ChangeOrdersTab: () => import('~/components/Tabs/ChangeOrdersTab'),
    Navigation: () => import('~/components/Pages/Projects/Navigation'),
    EditProjectModal: () =>
      import('~/components/Modals/Projects/EditProjectModal'),
    PaymentFormModal: () => import('~/components/Modals/PaymentFormModal'),
    PayoutFormModal: () => import('~/components/Modals/PayoutFormModal'),
    GenDocumentModal: () => import('~/components/Modals/Projects/GenDocument'),
    NoteFormModal: () => import('~/components/Modals/NoteFormModal'),
    TaskFormModal: () => import('~/components/Modals/TaskFormModal'),
    CreateAttachmentModal: () =>
      import('~/components/Modals/Projects/CreateAttachmentModal'),
  },
  async asyncData({ $axios, params }) {
    const contact = await $axios.get(
      `${process.env.API_DOMAIN}/api/v_1/contacts/${params.id}`
    )
    const notes = await $axios.get(
      `${process.env.API_DOMAIN}/api/v_1/contacts/${params.id}/notes`
    )
    return {
      contact: contact.data.data.contact,
      notes: notes.data.data.noteList,
      emails: [],
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
        {
          text: this.$t('pages.projectsPage.title'),
          to: '/projects',
        },
        {
          text: this.$t('pages.projectsPage.item.title', null, {
            id: this.id,
          }),
          active: true,
        },
      ],
      element: {},
      current: {
        id: null,
        contact: Number(this.$route.params.id),
      },
      pages: {
        note: 1,
      },
    }
  },
  computed: {
    address() {
      return [
        this.contact.address?.address,
        this.contact.address?.street,
        this.contact.address?.state,
        this.contact.address?.city,
        this.contact.address?.zip,
      ]
        .filter(Boolean)
        .join(', ')
    },
    id() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.element = {
      id: this.contact.id,
      name: this.contact.name,
      last_name: this.contact.last_name,
      email: this.contact.email,
      phone: this.contact.phone,
      address: this.contact.address?.address,
      street: this.contact.address?.street,
      state: this.contact.address?.state,
      city: this.contact.address?.city,
      zip: this.contact.address?.zip,
    }
  },
  methods: {
    changePage(response) {
      this.pages[response.type] = response.data
    },
    getNotes() {
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v_1/contacts/${this.$route.params.id}/notes?page=${this.pages.note}`
        )
        .then((res) => {
          this.notes = res.data.data.noteList
        })
    },
    getEmails() {
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v_1/contacts/${this.$route.params.id}/emails?page=${this.pages.note}`
        )
        .then((res) => {
          this.emails = res.data.data.emailList
        })
    },
    getItem() {
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v_1/contacts/${this.$route.params.id}`
        )
        .then((res) => {
          this.contact = res.data.data.contact
        })
    },
  },
}
</script>
