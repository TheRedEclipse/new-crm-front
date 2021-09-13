// English language
import actions from './en/actions'
import modals from './en/modals'
import layout from './en/layout'

import homePage from './en/pages/homePage'
import contactsPage from './en/pages/contactsPage'
import leadsPage from './en/pages/leadsPage'
import estimateTemplatesPage from './en/pages/estimateTemplatesPage'
import subcontractorsPage from './en/pages/subcontractorsPage'
import projectsPage from './en/pages/projectsPage'
import generalContractorsPage from './en/pages/generalContractorsPage'
import callCenterPage from './en/pages/callCenterPage'
import questionsPage from './en/pages/questionsPage'
import eventsPage from './en/pages/eventsPage'
import emailPage from './en/pages/emailPage'
import workersPage from './en/pages/workersPage'
import tasksPage from './en/pages/tasksPage'
import accountSettingsPage from './en/pages/accountSettingsPage'
import rolesPage from './en/pages/rolesPage'
import adminSettingsPage from './en/pages/adminSettingsPage'
import estimatesPage from './en/pages/estimatesPage'
import jobsPage from './en/pages/jobsPage'
import permissionsPage from './en/pages/permissionsPage'
import usersPage from './en/pages/usersPage'
import requestsPage from './en/pages/requestsPage'

import activitiesTab from './en/tabs/activitiesTab'
import attachmentsTab from './en/tabs/attachmentsTab'
import biddersTab from './en/tabs/biddersTab'
import bidsTab from './en/tabs/bidsTab'
import changeOrdersTab from './en/tabs/changeOrdersTab'
import completionReportsTab from './en/tabs/completionReportsTab'
import contactsTab from './en/tabs/contactsTab'
import documentsTab from './en/tabs/documentsTab'
import emailsTab from './en/tabs/emailsTab'
import estimatesTab from './en/tabs/estimatesTab'
import itemsTab from './en/tabs/itemsTab'
import lineItemsTab from './en/tabs/lineItemsTab'
import notesTab from './en/tabs/notesTab'
import paymentsTab from './en/tabs/paymentsTab'
import payoutsTab from './en/tabs/payoutsTab'
import questionsTab from './en/tabs/questionsTab'
import requestsTab from './en/tabs/requestsTab'
import tasksTab from './en/tabs/tasksTab'

export default {
  error: {
    401: 'You need to log in',
    403: 'You have not permissions',
    404: 'Page not found',
    422: 'Wrong request parameters',
    500: 'Server error',
  },
  actions,
  modals,
  layout,
  navigation: {
    delimiters: {
      settings: 'Settings',
      admin: 'Control',
    },
  },
  tabs: {
    activitiesTab,
    attachmentsTab,
    biddersTab,
    bidsTab,
    changeOrdersTab,
    completionReportsTab,
    contactsTab,
    documentsTab,
    emailsTab,
    estimatesTab,
    itemsTab,
    lineItemsTab,
    notesTab,
    paymentsTab,
    payoutsTab,
    questionsTab,
    requestsTab,
    tasksTab,
  },
  pages: {
    homePage,
    contactsPage,
    leadsPage,
    estimateTemplatesPage,
    subcontractorsPage,
    projectsPage,
    generalContractorsPage,
    callCenterPage,
    questionsPage,
    eventsPage,
    emailPage,
    workersPage,
    tasksPage,
    accountSettingsPage,
    rolesPage,
    adminSettingsPage,
    estimatesPage,
    jobsPage,
    permissionsPage,
    usersPage,
    requestsPage,
  },
}
