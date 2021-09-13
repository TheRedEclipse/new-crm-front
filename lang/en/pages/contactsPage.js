export default {
  title: 'Contacts',
  list: {
    button: 'Create contact',
    empty: 'Create new contact',
    my: {
      title: 'Own contacts',
      search: {
        placeholder: 'Search own contacts...',
      },
      fields: {
        primaryContacts: 'Name',
        email: 'EMail',
        phone: 'Phone',
        address: 'Address',
      },
    },
    all: {
      title: 'All contacts',
      search: {
        placeholder: 'Search all contacts...',
      },
      fields: {
        primaryContacts: 'Name',
        email: 'EMail',
        phone: 'Phone',
        address: 'Address',
      },
    },
  },
  item: {
    title: 'Contact #{id}',
    details: {
      title: 'Contact details',
      fields: {
        name: 'Name',
        address: 'Address',
        phone: 'Phone',
        email: 'EMail',
      },
      actions: {
        edit: {
          title: 'Edit',
        },
      },
    },
  },
}
