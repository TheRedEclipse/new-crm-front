export default {
  title: 'Leads',
  list: {
    button: 'Create lead',
    empty: 'Create new lead',
    my: {
      title: 'Own leads',
      search: {
        placeholder: 'Search own leads...',
      },
      fields: {
        primaryContacts: 'Primary contacts',
        email: 'EMail',
        phone: 'Phone',
        currentEstimate: 'Current estimate',
        status: 'Status',
      },
    },
    all: {
      title: 'All leads',
      search: {
        placeholder: 'Search all leads...',
      },
      fields: {
        primaryContacts: 'Primary contacts',
        email: 'EMail',
        phone: 'Phone',
        currentEstimate: 'Current estimate',
        status: 'Status',
      },
    },
  },
  item: {
    title: 'Lead #{id}',
    details: {
      title: 'Lead details',
      progress: {
        stepOne: 'Draft',
        stepTwo: 'Sent',
        stepThree: 'Project',
      },
      fields: {
        name: 'Name',
        address: 'Address',
        phone: 'Phone',
        email: 'EMail',
        primaryContact: 'Primary contact',
        initialDate: 'Initial date',
        title: 'Title',
        leadReferralSource: 'Lead Referral Source',
        industry: 'Industry',
        company: 'Company',
        status: 'Status',
        projectType: 'Project type',
        projectDescription: 'Project description',
        created: 'Created at',
        createdBy: 'Created by',
        rating: 'Rating',
        budget: 'Budget',
        requestInformation: 'Request information',
        currentEstimate: 'Current estimate',
      },
      actions: {
        edit: {
          title: 'Edit',
        },
      },
    },
  },
}
