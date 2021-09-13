<template>
  <Page :breadcrumbs="breadcrumbs">
    <template #content>
      <div class="row aside-padding">
        <div class="col-12">
          <Navigation />
          <b-tabs>
            <b-tab :title="$t('tabs.notesTab.title')">
              <NotesTab
                create-id="contacts_create_note_modal"
                :content="notes"
                @delete="deleteNote"
              />
            </b-tab>
            <b-tab :title="$t('tabs.emailsTab.title')">
              <EmailsTab
                create-id="contacts_create_email_modal"
                :content="emails"
                @delete="deleteEmail"
              />
            </b-tab>
          </b-tabs>
        </div>
        <Aside>
          <template>
            <div
              class="aside__title title px-3 pt-3 pb-2 d-flex align-items-center justify-content-between"
            >
              <h3>{{ $t('pages.contactsPage.item.details.title') }}</h3>
              <button
                class="button button-link button-link-primary"
                @click="editForm()"
              >
                {{ $t('pages.contactsPage.item.details.actions.edit.title') }}
                <SvgIcon name="edit" class="ml-2" />
              </button>
            </div>
            <div class="aside__content d-flex flex-column">
              <div class="aside__content-about d-flex flex-column">
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.contactsPage.item.details.fields.name') }}
                  </div>
                  <div class="information__value">
                    <template v-if="contact.name || contact.last_name">
                      {{ contact.name }} {{ contact.last_name }}
                    </template>
                    <template v-else>-</template>
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.contactsPage.item.details.fields.address') }}
                  </div>
                  <div class="information__value">
                    {{ address || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.contactsPage.item.details.fields.phone') }}
                  </div>
                  <div class="information__value">
                    {{ contact.phone || '-' }}
                  </div>
                </div>
                <div class="information">
                  <div class="information__title">
                    {{ $t('pages.contactsPage.item.details.fields.email') }}
                  </div>
                  <div class="information__value">
                    {{ contact.email || '-' }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Aside>
      </div>

      <ContactFormModal
        :id="`contacts_edit_contact_modal`"
        :form="form.contact"
        @update="updateContact"
      />
      <NoteFormModal
        :id="`contacts_create_note_modal`"
        :form="form.note"
        @create="createNote"
      />
      <EmailFormModal
        :id="`contacts_create_email_modal`"
        @create="createEmail"
      />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    Aside: () => import('~/components/layouts/aside'),
    NotesTab: () => import('~/components/Tabs/NotesTab'),
    EmailsTab: () => import('~/components/Tabs/EmailsTab'),
    ContactFormModal: () => import('~/components/Modals/ContactFormModal'),
    EmailFormModal: () => import('~/components/Modals/EmailFormModal'),
    NoteFormModal: () => import('~/components/Modals/NoteFormModal'),
    Navigation: () => import('~/components/Pages/Contacts/Navigation'),
  },
  async asyncData({ $axios, params, app }) {
    const contact = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/contacts/${params.id}`
    )
    const notes = await $axios.post(
      `${process.env.API_DOMAIN}/api/v1/notes/model`,
      {
        model_type: 'App\\Models\\Contact',
        id: params.id,
      }
    )
    return {
      contact: contact.data.data.contact,
      notes: notes.data.data.notes,
      emails: [],
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.contactsPage.title'),
          to: '/contacts',
        },
        {
          text: app.i18n.t('pages.contactsPage.item.title', null, {
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
        contact: {},
        note: {},
      },
      pages: {
        note: 1,
      },
    }
  },
  computed: {
    address() {
      return [
        this.contact.address?.address || this.contact.address,
        this.contact.address?.street || this.contact.street,
        this.contact.address?.state || this.contact.state,
        this.contact.address?.city || this.contact.city,
        this.contact.address?.zip || this.contact.zip,
      ]
        .filter(Boolean)
        .join(', ')
    },
  },
  methods: {
    changePage(response) {
      this.pages[response.type] = response.data
    },
    editForm() {
      this.form.contact = { ...this.contact }
      this.$bvModal.show(`contacts_edit_contact_modal`)
    },
    updateContact(form) {
      this.$axios
        .put(`${process.env.API_DOMAIN}/api/v1/contacts/${form.id}`, form)
        .then((res) => {
          this.$bvModal.hide(`contacts_edit_contact_modal`)
          this.contact = { ...form }
          this.form.contact = {}
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
    deleteEmail(id) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/emails/${id}`)
        .then(() => {
          this.$bvModal.hide(`delete_note_confirm_modal`)
          this.getNotes()
        })
    },
    createNote(form) {
      form.model_type = 'App\\Models\\Contact'
      form.model_id = this.contact.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/notes`, form)
        .then((res) => {
          this.$bvModal.hide(`contacts_create_note_modal`)
          this.form.note = {}
          this.getNotes()
        })
    },
    createEmail(form) {
      form.model_type = 'App\\Models\\Contact'
      form.model_id = this.contact.id
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/emails`, form)
        .then((res) => {
          this.$bvModal.hide(`contacts_create_email_modal`)
          this.getEmails()
        })
    },
    getNotes() {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/notes/model`, {
          model_type: 'App\\Models\\Contact',
          id: this.$route.params.i,
        })
        .then((res) => {
          this.notes = res.data.data.notes
        })
    },
    getEmails() {
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/contacts/${this.$route.params.id}/emails?page=${this.pages.note}`
        )
        .then((res) => {
          this.emails = res.data.data.emailList
        })
    },
    getItem() {
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/contacts/${this.$route.params.id}`
        )
        .then((res) => {
          this.contact = res.data.data.contact
        })
    },
  },
}
</script>
