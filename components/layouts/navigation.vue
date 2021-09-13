/* eslint-disable no-undef */
<template>
  <nav v-if="loaded" class="navigation">
    <template v-for="(navitem, i) in navigation">
      <NavigationItem
        v-if="navitem.type === 'link'"
        :key="`navitem-${i}`"
        v-permission:any="navitem.permission"
        :link="navitem.link"
        :disabled="navitem.disabled"
        :icon="navitem.icon"
      >
        {{ navitem.title }}
      </NavigationItem>
      <div
        v-if="navitem.type === 'delimiter'"
        :key="`navdiv-${i}`"
        class="navigation__delimiter"
      >
        {{ navitem.title }}
      </div>
    </template>
  </nav>
</template>

<script>
export default {
  components: {
    NavigationItem: () => import('~/components/layouts/NavigationItem'),
  },
  data() {
    return {
      navigation: [
        {
          type: 'link',
          link: '/',
          icon: 'home',
          title: this.$t('pages.homePage.title'),
          permission: '',
        },
        {
          type: 'link',
          link: '/requests',
          icon: 'request',
          title: this.$t('pages.requestsPage.title'),
          permission: 'request.index',
        },
        {
          type: 'link',
          link: '/estimates',
          icon: 'estimate',
          title: this.$t('pages.estimatesPage.title'),
          permission: 'estimate.index',
        },
        {
          type: 'link',
          link: '/estimate-templates',
          disabled: true,
          icon: 'copy',
          title: this.$t('pages.estimateTemplatesPage.title'),
          permission: 'estimate_template.index',
        },
        {
          type: 'link',
          link: '/subcontractors',
          disabled: true,
          icon: 'car',
          title: this.$t('pages.subcontractorsPage.title'),
          permission: 'subcontractor.index',
        },
        {
          type: 'link',
          link: '/projects',
          disabled: true,
          icon: 'plan',
          title: this.$t('pages.projectsPage.title'),
          permission: 'project.index',
        },
        {
          type: 'link',
          link: '/general-contractors',
          disabled: true,
          icon: 'building',
          title: this.$t('pages.generalContractorsPage.title'),
          permission: 'general_contractor.index',
        },
        {
          type: 'link',
          link: '/call-center',
          disabled: true,
          icon: 'call',
          title: this.$t('pages.callCenterPage.title'),
          permission: 'call_center.index',
        },
        {
          type: 'link',
          link: '/questions',
          disabled: true,
          icon: 'question',
          title: this.$t('pages.questionsPage.title'),
          permission: 'question.index',
        },
        {
          type: 'link',
          link: '/events',
          disabled: true,
          icon: 'calendar',
          title: this.$t('pages.eventsPage.title'),
          permission: 'event.index',
        },
        {
          type: 'link',
          link: '/email',
          disabled: true,
          icon: 'email',
          title: this.$t('pages.emailPage.title'),
          permission: 'email.index',
        },
        {
          type: 'link',
          link: '/workers',
          icon: 'user',
          title: this.$t('pages.workersPage.title'),
          permission: 'worker.index',
        },
        {
          type: 'link',
          link: '/tasks',
          disabled: true,
          icon: 'check',
          title: this.$t('pages.tasksPage.title'),
          permission: 'task.index',
        },
        {
          type: 'link',
          link: '/contacts',
          icon: 'contacts',
          title: this.$t('pages.contactsPage.title'),
          permission: 'contact.index',
        },
        {
          type: 'link',
          link: '/leads',
          icon: 'awards',
          title: this.$t('pages.leadsPage.title'),
          permission: 'lead.index',
        },
        // {
        //   type: 'delimiter',
        //   title: this.$t('navigation.delimiters.admin'),
        // },
        {
          type: 'link',
          link: '/control/roles',
          icon: 'user',
          title: this.$t('pages.rolesPage.title'),
          permission: 'admin.role.index',
        },
        {
          type: 'link',
          link: '/control/permissions',
          icon: 'user',
          title: this.$t('pages.permissionsPage.title'),
          permission: 'admin.permission.index',
        },
        {
          type: 'link',
          link: '/control/users',
          icon: 'user',
          title: this.$t('pages.usersPage.title'),
          permission: 'admin.user.index',
        },
        {
          type: 'link',
          link: '/control/settings',
          disabled: true,
          icon: 'admin',
          title: this.$t('pages.adminSettingsPage.title'),
          permission: 'admin.settings.index',
        },
        {
          type: 'link',
          link: '/control/cms',
          icon: 'settings',
          title: this.$t('pages.adminSettingsPage.cms'),
          permission: 'admin.permission.index',
        },
      ],
      loaded: false,
    }
  },
  mounted() {
    this.loaded = true
  },
}
</script>

<style lang="scss">
.navigation {
  overflow: hidden;
  // height: calc(100vh - 80px - 50px - 1rem - 1rem - 0.5rem);
  height: calc(100vh - 57px - 1rem - 1rem - 0.5rem);
  scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
  scrollbar-width: thin;
  padding-right: 5px;

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &__delimiter {
    color: #c4c4c4;
    font-size: 0.9375rem;
  }

  &:hover {
    overflow-y: scroll;
    padding-right: 0px;
  }
}
</style>
