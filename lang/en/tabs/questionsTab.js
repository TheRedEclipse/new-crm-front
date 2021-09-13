export default {
  title: 'Questions',
  search: {
    placeholder: 'Search questions...',
  },
  content: {
    table: {
      fields: {
        id: 'ID',
        subject: 'Subject',
        description: 'Description',
        created: 'Created',
        createdBy: 'Created by',
      },
      actions: {
        edit: 'Edit question',
        remove: 'Remove question',
      },
    },
  },
  empty: 'Create new question',
}
