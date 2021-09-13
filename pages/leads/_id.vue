<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>
      {{ $t('pages.leadsPage.item.title', null, { id: $route.params.id }) }}
    </template> -->

    <template #content>
      <div class="row aside-padding">
        <div class="col-12">
          <Navigation />
          <b-tabs>
            <b-tab :title="$t('tabs.estimatesTab.title')">
              <EstimatesTab
                create-id="leads_create_estimate_modal"
                delete-id="delete_estimate_confirm_modal"
                :content="estimates"
                @delete="deleteEstimate"
              />
            </b-tab>
            <b-tab :title="$t('tabs.contactsTab.title')">
              <ContactsTab
                create-id="leads_create_contact_modal"
                delete-id="delete_contact_confirm_modal"
                :content="contacts"
                @delete="deleteContact"
              />
            </b-tab>
            <b-tab :title="$t('tabs.notesTab.title')">
              <NotesTab
                create-id="leads_create_note_modal"
                delete-id="delete_note_confirm_modal"
                :content="notes"
                @delete="deleteNote"
              />
            </b-tab>
            <b-tab :title="$t('tabs.attachmentsTab.title')">
              <AttachmentsTab
                create-id="leads_create_attachment_modal"
                :content="attachments"
              />
            </b-tab>
            <b-tab :title="$t('tabs.activitiesTab.title')">
              <ActivitiesTab :content="activities" />
            </b-tab>
            <b-tab :title="$t('tabs.tasksTab.title')">
              <TasksTab
                create-id="leads_create_task_modal"
                delete-id="delete_task_confirm_modal"
                :content="tasks"
                @delete="deleteTask"
              />
            </b-tab>
            <b-tab :title="$t('tabs.questionsTab.title')">
              <QuestionsTab
                create-id="leads_create_question_modal"
                delete-id="delete_question_confirm_modal"
                :content="questions"
                @delete="deleteQuestion"
              />
            </b-tab>
            <b-tab :title="$t('tabs.emailsTab.title')">
              <EmailsTab
                create-id="leads_create_email_modal"
                delete-id="delete_email_confirm_modal"
                :content="emails"
                @delete="deleteEmail"
              />
            </b-tab>
            <b-tab :title="$t('tabs.requestsTab.title')">
              <RequestsTab
                create-id="leads_create_email_modal"
                delete-id="delete_email_confirm_modal"
                :content="requests"
                @delete="deleteRequest"
              />
            </b-tab>
          </b-tabs>
        </div>

        <Aside>
          <template>
            <div
              class="aside__title title px-3 pt-3 pb-2 d-flex align-items-center justify-content-between"
            >
              <h3>{{ $t('pages.leadsPage.item.details.title') }}</h3>
              <button
                class="button button-link button-link-primary"
                @click="$bvModal.show(`leads_edit_lead_modal`)"
              >
                {{ $t('pages.leadsPage.item.details.actions.edit.title') }}
                <SvgIcon name="edit" class="ml-2" />
              </button>
            </div>
            <div class="aside__content d-flex flex-column">
              <div class="aside__content-about d-flex flex-column">
                <div class="information">
                  <div class="information__title">
                    {{
                      $t('pages.leadsPage.item.details.fields.primaryContact')
                    }}
                  </div>
                  <div class="information__value">
                    <template v-if="lead.user.name || lead.user.last_name">
                      {{ lead.user.name }} {{ lead.user.last_name }}
                    </template>
                    <template v-else>-</template>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.address') }}
                  </div>
                  <div class="information__value">
                    {{ address || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.phone') }}
                  </div>
                  <div class="information__value">
                    <a v-if="lead.phone" :href="`tel:${lead.phone}`">
                      {{ lead.phone }}
                    </a>
                    <template v-else> - </template>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.email') }}
                  </div>
                  <div class="information__value">
                    <a v-if="lead.user" :href="`mailto:${lead.email}`">
                      {{ lead.user.email }}
                    </a>
                    <template v-else> - </template>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.initialDate') }}
                  </div>
                  <div class="information__value">
                    <template v-if="lead.contact_initialized_at">
                      {{
                        $moment(lead.contact_initialized_at).format(
                          'MM/DD/YYYY hh:ss A'
                        )
                      }}
                    </template>
                    <template v-else> - </template>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.title') }}
                  </div>
                  <div class="information__value">
                    {{ lead.title || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{
                      $t(
                        'pages.leadsPage.item.details.fields.leadReferralSource'
                      )
                    }}
                  </div>
                  <div class="information__value">
                    {{ lead.lead_referral_source || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.industry') }}
                  </div>
                  <div class="information__value">
                    {{ lead.industry || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.company') }}
                  </div>
                  <div class="information__value">
                    {{ lead.company || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.status') }}
                  </div>
                  <div class="information__value">
                    {{ lead.status || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.projectType') }}
                  </div>
                  <div class="information__value">
                    {{ lead.project_type || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{
                      $t(
                        'pages.leadsPage.item.details.fields.projectDescription'
                      )
                    }}
                  </div>
                  <div class="information__value">
                    {{ lead.project_description || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.createdBy') }}
                  </div>
                  <div class="information__value">
                    <template v-if="lead.created_by">
                      {{ lead.created_by.name }} {{ lead.created_by.last_name }}
                    </template>
                    <template v-else>-</template>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.created') }}
                  </div>
                  <div class="information__value">
                    {{ $moment(lead.created_at).format('MM/DD/YYYY hh:mm A') }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.rating') }}
                  </div>
                  <div class="information__value">
                    {{ lead.rating || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.leadsPage.item.details.fields.budget') }}
                  </div>
                  <div class="information__value">
                    $ {{ lead.budget || '-' }}
                  </div>
                </div>
                <!-- <div class="information">
                  <div class="information__title">
                    {{
                      $t(
                        'pages.leadsPage.item.details.fields.requestInformation'
                      )
                    }}
                  </div>
                  <div class="information__value">
                    <template v-if="lead.getRequest">
                      {{ lead.getRequest.request_information || '-' }}
                    </template>
                    <template v-else>-</template>
                  </div>
                </div> -->
                <div class="information">
                  <div class="information__title">
                    {{
                      $t('pages.leadsPage.item.details.fields.currentEstimate')
                    }}
                  </div>
                  <div class="information__value">
                    $ {{ lead.current_estimate_budget || '-' }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Aside>
      </div>

      <EditLeadModal
        :id="`leads_edit_lead_modal`"
        :element="lead"
        @updated="getItem"
      />
      <NoteFormModal
        :id="`leads_create_note_modal`"
        :form="form.note"
        @create="createNote"
      />
      <CreateEstimateFormModal
        :id="`leads_create_estimate_modal`"
        @create="createEstimate"
      />
      <LinkContactFormModal
        :id="`leads_create_contact_modal`"
        @create="createLinkContact"
      />
      <CreateAttachmentModal
        :id="`leads_create_attachment_modal`"
        :form="form.attachment"
        @create="createAttachment"
      />
      <TaskFormModal
        :id="`leads_create_task_modal`"
        :form="form.task"
        @create="createTask"
      />
      <QuestionFormModal
        :id="`leads_create_question_modal`"
        :form="form.question"
        @create="createQuestion"
      />
      <EmailFormModal :id="`leads_create_email_modal`" @create="createEmail" />
      <RequestFormModal
        :id="`leads_create_request_modal`"
        @create="createRequest"
      />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    Aside: () => import('~/components/layouts/aside'),
    EstimatesTab: () => import('~/components/Tabs/EstimatesTab'),
    ContactsTab: () => import('~/components/Tabs/ContactsTab'),
    NotesTab: () => import('~/components/Tabs/NotesTab'),
    AttachmentsTab: () => import('~/components/Tabs/AttachmentsTab'),
    ActivitiesTab: () => import('~/components/Tabs/ActivitiesTab'),
    TasksTab: () => import('~/components/Tabs/TasksTab'),
    QuestionsTab: () => import('~/components/Tabs/QuestionsTab'),
    EmailsTab: () => import('~/components/Tabs/EmailsTab'),
    RequestsTab: () => import('~/components/Tabs/RequestsTab'),
    Navigation: () => import('~/components/Pages/Leads/Navigation'),

    EditLeadModal: () => import('~/components/Modals/Leads/EditLeadModal'),
    NoteFormModal: () => import('~/components/Modals/NoteFormModal'),
    LinkContactFormModal: () =>
      import('~/components/Modals/LinkContactFormModal'),
    CreateEstimateFormModal: () =>
      import('~/components/Modals/CreateEstimateFormModal'),
    CreateAttachmentModal: () =>
      import('~/components/Modals/CreateAttachmentModal'),
    TaskFormModal: () => import('~/components/Modals/TaskFormModal'),
    QuestionFormModal: () => import('~/components/Modals/QuestionFormModal'),
    EmailFormModal: () => import('~/components/Modals/EmailFormModal'),
    RequestFormModal: () => import('~/components/Modals/RequestFormModal'),
  },
  async asyncData({ $axios, params, app }) {
    const lead = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/leads/${params.id}`
    )
    const page = await $axios.post(
      `${process.env.API_DOMAIN}/api/v1/leads/page`,
      {
        model_type: 'App\\Models\\Lead',
        id: params.id,
      }
    )

    return {
      lead: lead.data.data.lead,
      ...page.data.data,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.leadsPage.title'),
          to: '/leads',
        },
        {
          text: app.i18n.t('pages.leadsPage.item.title', null, {
            id: params.id,
          }),
          active: true,
        },
      ],
    }
  },
  data() {
    return {
      form: {
        note: {},
        task: {},
        question: {},
        attachment: {},
      },
    }
  },
  computed: {
    address() {
      return [
        this.lead.address?.address,
        this.lead.address?.street,
        this.lead.address?.state,
        this.lead.address?.city,
        this.lead.address?.zip,
      ]
        .filter(Boolean)
        .join(', ')
    },
  },
  methods: {
    getItem() {
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/leads/${this.$route.params.id}`)
        .then((res) => {
          this.lead = res.data.data.lead
        })
    },
    getQuestions() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/questions/model`, {
          model_type: 'App\\Models\\Lead',
          id: this.lead.id,
        })
        .then((res) => {
          this.questions = res.data.data.questions
        })
    },
    createQuestion(form) {
      form.model_type = 'App\\Models\\Lead'
      form.model_id = this.lead.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/questions`, form)
        .then((res) => {
          this.$bvModal.hide(`leads_create_question_modal`)
          this.form.question = {}
          this.getQuestions()
        })
    },
    getNotes() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/notes/model`, {
          model_type: 'App\\Models\\Lead',
          id: this.lead.id,
        })
        .then((res) => {
          this.notes = res.data.data.notes
        })
    },
    createNote(form) {
      form.model_type = 'App\\Models\\Lead'
      form.model_id = this.lead.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/notes`, form)
        .then((res) => {
          this.$bvModal.hide(`leads_create_note_modal`)
          this.getNotes()
          this.form.note = {}
        })
    },
    getContacts() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/contacts/model`, {
          model_type: 'App\\Models\\Lead',
          id: this.lead.id,
        })
        .then((res) => {
          this.contacts = res.data.data.contacts
        })
    },
    createLinkContact(form) {
      form.model_type = 'App\\Models\\Lead'
      form.model_id = this.lead.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/contacts/link`, form)
        .then((res) => {
          this.$bvModal.hide(`leads_create_contact_modal`)
          this.getContacts()
        })
    },
    getAttachments() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/attachments/model`, {
          model_type: 'App\\Models\\Lead',
          id: this.lead.id,
        })
        .then((res) => {
          this.attachments = res.data.data.attachments
        })
    },
    getRequests() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/requests/model`, {
          model_type: 'App\\Models\\Lead',
          id: this.lead.id,
        })
        .then((res) => {
          this.requests = res.data.data.requests
        })
    },
    createRequest(form) {
      form.lead = this.lead.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/requests`, form)
        .then((res) => {
          this.$bvModal.hide(`leads_create_request_modal`)
          this.getRequests()
        })
    },
    getTasks() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/tasks/model`, {
          model_type: 'App\\Models\\Lead',
          id: this.lead.id,
        })
        .then((res) => {
          this.tasks = res.data.data.tasks
        })
    },
    createTask(form) {
      form.model_type = 'App\\Models\\Lead'
      form.model_id = this.lead.id
      form.expired_at = `${form.date} ${form.time}`
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/tasks`, form)
        .then((res) => {
          this.$bvModal.hide(`leads_create_task_modal`)
          this.form.task = {}
          this.getTasks()
        })
    },
    createAttachment(form) {
      form.model_type = 'App\\Models\\Lead'
      form.model_id = this.lead.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/attachments`, form)
        .then((response) => {
          this.$bvModal.hide(this.id)
          this.form.attachment = {}
          this.getAttachments()
        })
    },
    getEstimates() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/estimates/model`, {
          model_type: 'App\\Models\\Lead',
          id: this.lead.id,
        })
        .then((res) => {
          this.estimates = res.data.data.estimates
        })
    },
    createEstimate(form) {
      form.lead_id = this.lead.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/estimates`, form)
        .then((res) => {
          this.$bvModal.hide(`leads_create_estimate_modal`)
          this.$router.push(`/estimates/${res.data.data.estimateId}`)
        })
    },
    deleteContact(id) {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/contacts/unlink`, {
          model_type: 'App\\Models\\Lead',
          model_id: this.lead.id,
          contact_id: id,
        })
        .then(() => {
          this.$bvModal.hide(`delete_contact_confirm_modal`)
          this.getContacts()
        })
    },
    deleteQuestion(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/questions/${id}`)
        .then(() => {
          this.$bvModal.hide(`delete_question_confirm_modal`)
          this.getQuestions()
        })
    },
    deleteEstimate(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/estimates/${id}`)
        .then(() => {
          this.$bvModal.hide(`delete_estimate_confirm_modal`)
          this.getEstimates()
        })
    },
    deleteNote(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/notes/${id}`)
        .then(() => {
          this.$bvModal.hide(`delete_note_confirm_modal`)
          this.getNotes()
        })
    },
    deleteTask(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/tasks/${id}`)
        .then(() => {
          this.$bvModal.hide(`delete_task_confirm_modal`)
          this.getTasks()
        })
    },
    deleteRequest(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/requests/${id}`)
        .then(() => {
          this.$bvModal.hide(`delete_request_confirm_modal`)
          this.getRequests()
        })
    },
    deleteEmail(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/emails/${id}`)
        .then(() => {
          this.$bvModal.hide(`delete_email_confirm_modal`)
          // this.getEmails()
        })
    },
    createEmail(form) {
      form.lead = this.lead.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/emails`, form)
        .then((res) => {
          this.$bvModal.hide(`leads_create_email_modal`)
          // this.getEmails()
        })
    },
  },
}
</script>
