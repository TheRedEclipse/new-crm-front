<template>
  <Page :breadcrumbs="breadcrumbs">
    <template #button>
      <button
        type="button"
        class="button button-outline-primary"
        @click="$bvModal.show('contacts_from_contact_modal')"
      >
        <SvgIcon name="plus" class="little-icon" />
        <span class="ml-2">{{ $t(`pages.contactsPage.list.button`) }}</span>
      </button>
    </template>
    <template #content>
      <ContactsListBlock
        key="my-contact-list-block"
        :data="contacts"
        type="my"
        :title="$t(`pages.contactsPage.list.my.title`)"
        @delete="deleteContact"
        @update="updateForm"
        @change-page="getMyContacts"
      />
      <ContactsListBlock
        key="all-contact-list-block"
        :data="allContacts"
        type="all"
        :title="$t(`pages.contactsPage.list.all.title`)"
        @delete="deleteContact"
        @update="updateForm"
        @change-page="getAllContacts"
      />

      <ContactFormModal
        :id="`contacts_from_contact_modal`"
        :form="form"
        :errors="errors"
        @create="createContact"
        @update="updateContact"
      />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    ContactsListBlock: () =>
      import('~/components/Pages/Contacts/ContactsListBlock'),
    ContactFormModal: () => import('~/components/Modals/ContactFormModal'),
  },
  async asyncData({ $axios, app }) {
    const allContacts = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/contacts?type=all`
    )
    const contacts = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/contacts?type=my`
    )

    return {
      allContacts: allContacts.data.data.contacts,
      contacts: contacts.data.data.contacts,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.contactsPage.title'),
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
      errors: {},
    }
  },
  methods: {
    getMyContacts(page = this.pages.my) {
      this.pages.my = page
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/contacts?page=${page}&type=my`)
        .then((res) => {
          this.contacts = res.data.data.contacts
        })
    },
    getAllContacts(page = this.pages.all) {
      this.pages.all = page
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/contacts?page=${page}&type=all`)
        .then((res) => {
          this.allContacts = res.data.data.contacts
        })
    },
    createContact(form) {
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/contacts`, form)
        .then((res) => {
          this.$bvModal.hide(`contacts_from_contact_modal`)
          const id = res.data.data?.contactId || ''
          if (id) {
            this.$router.push({
              path: `/contacts/${id}`,
            })
          } else {
            this.form = {}
            this.getMyContacts()
            this.getAllContacts()
          }
        })
        .catch((err) => {
          this.errors = err.response.data.validation
        })
    },
    updateContact(form) {
      this.$axios
        .put(`${process.env.API_DOMAIN}/api/v1/contacts/${form.id}`, form)
        .then((res) => {
          this.$bvModal.hide(`contacts_from_contact_modal`)
          this.form = {}
          this.getMyContacts()
          this.getAllContacts()
        })
    },
    deleteContact(id, type) {
      this.$axios
        .delete(`${process.env.API_DOMAIN}/api/v1/contacts/${id}`)
        .then((res) => {
          this.$bvModal.hide(`delete_${type}_contact_confirm_modal`)
          this.getMyContacts()
          this.getAllContacts()
        })
    },
    updateForm(type, id) {
      this.form =
        type === 'my'
          ? this.contacts.data[this.contacts.data.findIndex((q) => q.id === id)]
          : this.allContacts.data[
              this.allContacts.data.findIndex((q) => q.id === id)
            ]
      this.$bvModal.show(`contacts_from_contact_modal`)
    },
  },
  head() {
    return {
      title: this.$t('pages.contactsPage.title'),
    }
  },
}
</script>
