export default {
  title: 'Estimates',
  list: {
    button: 'Create estimate',
    own: {
      title: 'Own estimates',
      search: {
        placeholder: 'Search own estimates...',
      },
      fields: {
        dateCreated: 'Date created',
        lead: 'Lead',
        type: 'Type',
        totalPrice: 'Total price',
        status: 'Status',
        dateSent: 'Date sent',
      },
    },
    all: {
      title: 'All estimates',
      search: {
        placeholder: 'Search all estimates...',
      },
      fields: {
        dateCreated: 'Date created',
        lead: 'Lead',
        type: 'Type',
        totalPrice: 'Total price',
        status: 'Status',
        dateSent: 'Date sent',
      },
    },
  },
  item: {
    title: 'Estimate #{id}',
    search: {
      placeholder: 'Search item',
    },
    details: {
      title: 'Estimate details',
      progress: {
        stepOne: 'Draft',
        stepTwo: 'Sent',
        stepThree: 'Project',
      },
      fields: {
        item: 'Item',
        type: 'Type',
        jobName: 'Job Name',
        lead: 'Lead',
        email: 'EMail',
        phone: 'Phone',
        totalPrice: 'Total price',
        createdBy: 'Created by',
        dateCreated: 'Date created',
      },
      actions: {
        sendEstimate: {
          title: 'Send estimate',
        },
        edit: {
          title: 'Edit',
        },
      },
    },
  },
}
