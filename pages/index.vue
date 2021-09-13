<template>
  <Page :breadcrumbs="breadcrumbs">
    <!-- <template #title>Title</template> -->
    <template #content>
      <div>
        <h2>Buttons</h2>
        <div class="d-flex">
          <div>
            <div class="button button-primary">Primary</div>
            <div class="button button-outline-primary">Outline primary</div>
          </div>
          <div class="ml-2">
            <div class="button button-secondary">Secondary</div>
            <div class="button button-outline-secondary">Outline secondary</div>
          </div>
          <div class="ml-2">
            <div class="button button-dark-blue">Dark Blue</div>
            <div class="button button-outline-dark-blue">Outline dark Blue</div>
          </div>
          <div class="ml-2">
            <div class="button button-danger">Danger</div>
            <div class="button button-outline-danger">Outline danger</div>
          </div>

          <div class="ml-2">
            <div class="button button-link button-link-primary">Link</div>
            <div class="button button-link button-link-secondary">Link</div>
            <div class="button button-link button-link-dark-blue">Link</div>
            <div class="button button-link button-link-danger">
              Link
              <SvgIcon name="home" class="ml-2" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h2>Tabs</h2>
        <div>
          <b-tabs>
            <b-tab title="Items">
              <div class="p-3">Content</div>
            </b-tab>
            <b-tab title="Attachments">
              <div class="p-3">Content</div>
            </b-tab>
            <b-tab title="Activities">
              <div class="p-3">Content</div>
            </b-tab>
            <b-tab title="Notes">
              <div class="p-3">Content</div>
            </b-tab>
          </b-tabs>
        </div>
      </div>

      <div class="mt-4">
        <h2>Table</h2>
        <div class="mt-3">
          <table class="table">
            <thead>
              <tr>
                <th>Head 1</th>
                <th>Head 2</th>
                <th>Head 3</th>
                <th>Head 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Content 1</td>
                <td>Content 2</td>
                <td>Content 3</td>
                <td>Content 4</td>
              </tr>
              <tr>
                <td>Content 1</td>
                <td>Content 2</td>
                <td>Content 3</td>
                <td>Content 4</td>
              </tr>
              <tr>
                <td>Content 1</td>
                <td>Content 2</td>
                <td>Content 3</td>
                <td>Content 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-4">
        <h2>Modals</h2>
        <div>
          <button v-b-modal="'default'" class="button button-primary">
            Default modal
          </button>
          <b-modal id="default" title="Title">123</b-modal>

          <button class="button button-primary" @click="$bvModal.show('lg')">
            Lg modal
          </button>
          <b-modal id="lg" size="lg" title="Title">123</b-modal>

          <button class="button button-primary" @click="$bvModal.show('xl')">
            Xl modal
          </button>
          <b-modal id="xl" size="xl" title="Title">123</b-modal>

          <button class="button button-primary" @click="$bvModal.show('xxl')">
            Xxl modal
          </button>
          <b-modal id="xxl" size="xxl" title="Title">123</b-modal>
        </div>
      </div>

      <div class="mt-4">
        <h2>Icons</h2>
        <div class="text-danger">
          <SvgIcon name="admin" class="medium-icon" />
          <SvgIcon name="arrow_filled" class="medium-icon" />
          <SvgIcon name="attachment" class="medium-icon" />
          <SvgIcon name="awards" class="medium-icon" />
          <SvgIcon name="bell" class="medium-icon" />
          <SvgIcon name="building" class="medium-icon" />
          <SvgIcon name="calendar" class="medium-icon" />
          <SvgIcon name="call" class="medium-icon" />
          <SvgIcon name="car" class="medium-icon" />
          <SvgIcon name="check" class="medium-icon" />
          <SvgIcon name="close" class="medium-icon" />
          <SvgIcon name="contacts" class="medium-icon" />
          <SvgIcon name="copy" class="medium-icon" />
          <SvgIcon name="dots_vertical" class="medium-icon" />
          <SvgIcon name="dots" class="medium-icon" />
          <SvgIcon name="attachment_download" class="medium-icon" />
          <SvgIcon name="download" class="medium-icon" />
          <SvgIcon name="edit" class="medium-icon" />
          <SvgIcon name="email" class="medium-icon" />
          <SvgIcon name="estimate" class="medium-icon" />
          <SvgIcon name="eye_hidden" class="medium-icon" />
          <SvgIcon name="eye" class="medium-icon" />
          <SvgIcon name="folder" class="medium-icon" />
          <SvgIcon name="home" class="medium-icon" />
          <SvgIcon name="new_note" class="medium-icon" />
          <SvgIcon name="plan" class="medium-icon" />
          <SvgIcon name="question" class="medium-icon" />
          <SvgIcon name="rounded_plus" class="medium-icon" />
          <SvgIcon name="search" class="medium-icon" />
          <SvgIcon name="settings" class="medium-icon" />
          <SvgIcon name="trash" class="medium-icon" />
          <SvgIcon name="upload" class="medium-icon" />
          <SvgIcon name="user" class="medium-icon" />
          <SvgIcon name="download_cloud" class="medium-icon" />
        </div>
      </div>

      <div class="mt-4">
        <h2>Selects</h2>
        <div class="row">
          <div class="col-12 col-md-4 mt-3 mt-md-0">
            <multiselect
              v-model="form.select1"
              class="mt-3"
              :options="options"
              placeholder="Enter value"
            />
          </div>
          <div class="col-12 col-md-4 mt-3 mt-md-0">
            <multiselect
              v-model="form.select2"
              class="mt-3"
              :options="options"
              placeholder="Select several values"
              :multiple="true"
            />
          </div>
          <div class="col-12 col-md-4 mt-3 mt-md-0">
            <multiselect
              v-model="form.select3"
              :options="options2"
              class="mt-3"
              track-by="id"
              placeholder="Select with slots"
            >
              <template slot="singleLabel" slot-scope="props">
                <div class="option__desc">
                  <span class="option__title">
                    #{{ props.option.id }} - {{ props.option.value }}
                  </span>
                </div>
              </template>
              <template slot="option" slot-scope="props">
                <div class="option__desc">
                  <span class="option__title">
                    #{{ props.option.id }} - {{ props.option.value }}
                  </span>
                </div>
              </template>
            </multiselect>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h2>Pagination</h2>
        <div class="row">
          <div class="col-12 mt-3">
            <b-pagination :total-rows="100" :per-page="5"></b-pagination>
          </div>
        </div>
      </div>

      <div class="mt-5"></div>
    </template>
  </Page>
</template>

<script>
export default {
  components: {
    Page: () => import('~/components/layouts/Page'),
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
      ],
      form: {},
      options: ['Template 1', 'Kitchen Template', 'My awesome template'],
      options2: [
        {
          id: 1,
          value: 'value1',
        },
        {
          id: 2,
          value: 'value2',
        },
      ],
    }
  },
}
</script>
