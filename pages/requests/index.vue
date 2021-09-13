<template>
  <Page :breadcrumbs="breadcrumbs">
    <template #content>
      <div class="position-relative">
        <div class="tabs__actions">
          <a class="button button-primary" @click="copy">
            <SvgIcon name="link" />
            <span class="ml-2">Initial form</span>
          </a>
        </div>
        <b-tabs>
          <b-tab
            v-for="(status, i) in statuses"
            :key="`status-tab-${i}`"
            :title="status.title"
          >
            <RequestsListBlock
              :key="`requests-list-block-${status.name}`"
              :data="requests[status.name]"
              :status="status.name"
              @view="openViewRequestModal"
            />
          </b-tab>
        </b-tabs>
      </div>

      <ViewRequestModal
        id="requests_show_request_modal"
        :form="form"
        :question="question"
        :validation="validation"
        @create-question="createQuestion"
        @create-estimate="createEstimate"
        @hidden="clearViewRequestModal"
      />
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
    RequestsListBlock: () =>
      import('~/components/Pages/Requests/RequestsListBlock'),
    ViewRequestModal: () =>
      import('~/components/Modals/Requests/ViewRequestModal'),
  },
  async asyncData({ $axios, app }) {
    const params = {
      order: {
        id: 'desc',
      },
    }

    const statuses = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/references/requests/statuses`
    )

    const requests = await $axios.get(
      `${process.env.API_DOMAIN}/api/v1/requests`,
      { params }
    )

    return {
      statuses: statuses.data.data.statuses,
      requests: requests.data.data.requests,
      params,
      breadcrumbs: [
        {
          text: app.i18n.t('pages.homePage.title'),
          to: '/',
        },
        {
          text: app.i18n.t('pages.requestsPage.title'),
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
      question: {},
      validation: {
        questions: {},
      },
    }
  },
  methods: {
    createEstimate(id) {
      this.$axios
        .patch(`${process.env.API_DOMAIN}/api/v1/requests/${id}/status`, {
          status: 'estimated',
        })
        .then(() => {
          this.getRequest(id)
          this.getRequests()
          this.$toast.success(`Request #${id} was converted to estimate`)
        })
    },
    createQuestion(form) {
      this.validation.questions = {}
      this.$axios
        .post(`${process.env.API_DOMAIN}/api/v1/questions`, form)
        .then((res) => {
          this.question = {}
          // TODO: Проверять статус, чтобы не переписывать один и тот же
          this.$axios
            .patch(
              `${process.env.API_DOMAIN}/api/v1/requests/${form.model_id}/status`,
              {
                status: 'pending_information',
              }
            )
            .then(() => {
              this.getRequests()
            })
          this.getRequest(form.model_id)
        })
        .catch((err) => {
          this.validation.questions = err.response.data.validation
        })
    },
    openViewRequestModal(id, status) {
      this.form = {}
      if (status === 'not_viewed') {
        this.$axios
          .patch(`${process.env.API_DOMAIN}/api/v1/requests/${id}/view`)
          .then(() => {
            this.getRequests()
          })
      }

      this.getRequest(id)
      this.$bvModal.show(`requests_show_request_modal`)
    },
    clearViewRequestModal() {
      this.validation = {
        questions: {},
      }
    },
    getRequest(id) {
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/requests/${id}`)
        .then((res) => {
          this.form = res.data.data.request
        })
    },
    getRequests() {
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/requests`, {
          params: this.params,
        })
        .then((res) => {
          this.requests = res.data.data.requests
        })
    },
    copy() {
      this.$copyText('http://modernciti.group/initial-form')
      this.$toast.success('Link on initial form was copied')
    },
  },
  head() {
    return {
      title: this.$t('pages.requestsPage.title'),
    }
  },
}
</script>
