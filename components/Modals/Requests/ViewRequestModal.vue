<template>
  <b-modal
    :id="id"
    title-class="text-left"
    :title="`Request ${userName}`"
    size="xlg"
    class="request-info"
    body-class="px-0"
    hide-footer
    @hidden="clearView"
  >
    <div class="request-info__body">
      <template v-if="Object.keys(form).length">
        <template v-if="view === 'main'">
          <div
            class="request-info__header d-flex justify-content-between align-items-center"
          >
            <div class="request-info__header-title">Rooms:</div>
            <a class="request-info__goto" @click="changeView('own_info')">
              <span>Own info</span>
              <span class="request-info__goto-icon">
                <SvgIcon name="info" />
              </span>
            </a>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-12 my-n3">
                <RoomItem
                  v-for="(room, i) in form.rooms"
                  :key="`request-room-${i}`"
                  :element="room"
                  @show-room="showRoom"
                />
              </div>
            </div>
          </div>
        </template>

        <template v-if="view === 'room'">
          <div
            class="request-info__header request-info__header--no-border d-flex justify-content-between align-items-center"
          >
            <div class="request-info__header-title d-flex align-items-center">
              <a class="request-info__header-arrow" @click="changeView('main')">
                <SvgIcon name="arrow" />
              </a>
              <span class="ml-2">{{ currentRoom.room_type.title }}</span>
            </div>
            <a class="request-info__goto" @click="changeView('own_info')">
              <span>Own info</span>
              <span class="request-info__goto-icon">
                <SvgIcon name="info" />
              </span>
            </a>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-12 my-n3">
                <b-tabs class="pill-tabs mt-3">
                  <b-tab title="Scope of work">
                    <div class="row justify-content-center my-3 px-2">
                      <div
                        v-for="(work, i) in currentRoom.works"
                        :key="`work-item-${i}`"
                        class="col-12 col-lg-6 my-2 px-2"
                      >
                        <WorkItem :element="work" />
                      </div>
                      <div
                        v-for="(countableItem, i) in currentRoom.countable"
                        :key="`countable-item-${i}`"
                        class="col-12 col-lg-6 my-2 px-2"
                      >
                        <CountableItem :element="countableItem" />
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Additional info">
                    <div
                      class="request-info__header d-flex justify-content-between align-items-center mt-3"
                    >
                      <div
                        class="request-info__header-title d-flex align-items-center text-dark-blue"
                      >
                        <SvgIcon name="rule" />
                        <span class="ml-2">Measurments</span>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-group">
                            <label>Length x Width x Height</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled
                              :value="currentRoom.size"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="request-info__header d-flex justify-content-between align-items-center mt-3"
                    >
                      <div
                        class="request-info__header-title d-flex align-items-center text-dark-blue"
                      >
                        <SvgIcon name="description" />
                        <span class="ml-2">Work description</span>
                      </div>
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-group">
                            <textarea
                              v-model="currentRoom.description"
                              disabled
                              class="form-control"
                              style="height: 155px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Existing condition photos">
                    <div class="text-gray font-italic my-5 text-center">
                      No existing condition photos provided...
                    </div>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </div>
        </template>

        <template v-if="view === 'own_info'">
          <div
            class="request-info__header request-info__header--no-border d-flex justify-content-between align-items-center"
          >
            <div class="request-info__header-title d-flex align-items-center">
              <a class="request-info__header-arrow" @click="changeView('main')">
                <SvgIcon name="arrow" />
              </a>
              <span class="ml-2">Own info:</span>
            </div>
          </div>

          <div
            class="request-info__header d-flex justify-content-between align-items-center"
          >
            <div
              class="request-info__header-title d-flex align-items-center text-dark-blue"
            >
              <SvgIcon name="user" />
              <span class="ml-2">Personal info</span>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-12 col-lg-6">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    :value="form.user.name"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6 mt-3 mt-lg-0">
                <div class="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    :value="form.user.last_name"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>EMail</label>
                  <input
                    type="email"
                    class="form-control"
                    disabled
                    :value="form.user.email"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="request-info__header d-flex justify-content-between align-items-center mt-3"
          >
            <div
              class="request-info__header-title d-flex align-items-center text-dark-blue"
            >
              <SvgIcon name="address" />
              <span class="ml-2">Address</span>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-12 col-lg-6">
                <div class="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    :value="form.address ? form.address.city : '-'"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6 mt-3 mt-lg-0">
                <div class="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    :value="form.address ? form.address.state : '-'"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-lg-6">
                <div class="form-group">
                  <label>Postcode / Zip</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    :value="form.address ? form.address.zip : '-'"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6 mt-3 mt-lg-0">
                <div class="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    :value="form.address ? form.address.address : '-'"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>Street</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    :value="form.address ? form.address.street : '-'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="request-info__header d-flex justify-content-between align-items-center mt-3"
          >
            <div
              class="request-info__header-title d-flex align-items-center text-dark-blue"
            >
              <SvgIcon name="floor_plan" />
              <span class="ml-2">Floor plan</span>
            </div>
          </div>

          <div class="container">
            <div class="row mb-4">
              <div class="col-12">
                <div class="d-flex align-items-center justify-content-between">
                  <!-- <div class="d-flex align-items-center">
                    <SvgIcon name="file" class="text-dark-blue medium-icon" />
                    <span class="ml-2">
                      Floor plan Kitchen bathroom remodeling- estimate - MCG
                    </span>
                  </div>
                  <div>
                    <a href="#">View</a>
                  </div> -->
                  <div class="text-gray font-italic">
                    No floor plan provided...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="view === 'missing_info'">
          <div
            class="request-info__header request-info__header--no-border d-flex justify-content-between align-items-center"
          >
            <div class="request-info__header-title d-flex align-items-center">
              <a class="request-info__header-arrow" @click="changeView('main')">
                <SvgIcon name="arrow" />
              </a>
              <span class="ml-2">Missing info:</span>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-12">
                <b-tabs class="pill-tabs">
                  <b-tab title="New question">
                    <div class="container mt-4">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-group">
                            <label>Subject</label>
                            <input
                              v-model="localQuestion.subject"
                              type="text"
                              :class="`form-control ${
                                validation.questions.subject ? `is-invalid` : ``
                              }`"
                            />
                            <div class="invalid-feedback">
                              <div
                                v-for="(error, i) in validation.questions
                                  .subject"
                                :key="`errors-description-${i}`"
                              >
                                {{ error }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label>Description</label>
                            <textarea
                              v-model="localQuestion.description"
                              :class="`form-control ${
                                validation.questions.description
                                  ? `is-invalid`
                                  : ``
                              }`"
                              style="height: 175px"
                            />
                            <div class="invalid-feedback">
                              <div
                                v-for="(error, i) in validation.questions
                                  .description"
                                :key="`errors-description-${i}`"
                              >
                                {{ error }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 mb-3">
                          <button
                            class="button button-primary w-100 d-flex justify-content-center"
                            @click="createQuestion"
                          >
                            Send question to lead
                          </button>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="All questions">
                    <div class="container mt-4">
                      <div class="row">
                        <div class="col-12 px-0">
                          <template v-if="Object.keys(form.questions).length">
                            <QuestionItem
                              v-for="(questionItem, i) in form.questions"
                              :key="`request-question-${i}`"
                              :element="questionItem"
                            />
                          </template>
                          <div v-else class="d-flex justify-content-center">
                            <div class="text-gray font-italic my-4">
                              No questions asked to this request...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </div>
        </template>
      </template>
      <div
        v-else
        class="d-flex align-items-center justify-content-center h-100"
      >
        <b-spinner class="load" variant="light" label="Loading..." />
      </div>
    </div>

    <div class="request-info__footer modal-footer p-0 mb-n3">
      <div class="d-flex w-100 m-0">
        <a
          :class="`button-modal text-danger w-100 ${
            view == 'missing_info' ? `disabled` : ``
          }`"
          @click="changeView('missing_info')"
        >
          <span>Questions</span>
          <span class="ml-2">?</span>
        </a>
        <template v-if="Object.keys(form).length">
          <a
            v-if="form.status.name !== 'estimated'"
            class="button-modal text-primary w-100"
            @click="createEstimate"
          >
            <span>Start estimate</span>
            <SvgIcon name="bold_arrow" class="small-icon ml-2" />
          </a>
          <NuxtLink
            v-else
            to="/estimates/1"
            class="button-modal text-primary w-100"
          >
            <span>Go to estimate</span>
            <SvgIcon name="bold_arrow" class="small-icon ml-2" />
          </NuxtLink>
        </template>
        <template v-else>
          <a href="#" class="button-modal text-primary w-100 disabled">
            <b-spinner class="load" variant="light" label="Loading..." small />
          </a>
        </template>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  components: {
    RoomItem: () => import('~/components/Modals/Requests/RoomItem'),
    WorkItem: () => import('~/components/Modals/Requests/WorkItem'),
    CountableItem: () => import('~/components/Modals/Requests/CountableItem'),
    QuestionItem: () => import('~/components/Modals/Requests/QuestionItem'),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    form: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    question: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    validation: {
      type: Object,
      required: false,
      default: () => {
        return {
          questions: {},
        }
      },
    },
  },
  data() {
    return {
      view: 'main',
      currentRoom: {},
      localQuestion: { ...this.question },
    }
  },
  computed: {
    userName() {
      return `${this.form?.user?.name || ''} ${
        this.form?.user?.last_name || ''
      }`
    },
  },
  watch: {
    question(val) {
      this.localQuestion = { ...val }
    },
  },
  methods: {
    changeView(view) {
      this.view = view
    },
    showRoom(room) {
      this.currentRoom = room
      this.changeView('room')
    },
    clearView() {
      this.currentRoom = {}
      this.view = 'main'
      this.$emit('hidden', true)
    },
    createQuestion() {
      this.localQuestion.model_type = 'App\\Models\\Request'
      this.localQuestion.model_id = this.form.id
      this.$emit('create-question', this.localQuestion)
    },
    createEstimate() {
      this.$emit('create-estimate', this.form.id)
    },
  },
}
</script>

<style lang="scss">
.request-info {
  &__header {
    padding: 0 1rem 0.5rem 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #dfdfdf;

    &--no-border {
      border-bottom: none;
    }

    &-title {
      font-weight: 500;
      font-size: 1.0625rem;
    }

    &-arrow {
      color: #000 !important;
      padding: 0.2rem;
      width: 40px;
      height: 40px;
      margin: -1rem -0.9rem -1rem -0.7rem;
      border-radius: 5px;
      transition: 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 15px;
        height: 15px;
        transform: rotate(180deg);
      }

      &:hover {
        background: #fbfbfb;
      }
    }
  }

  &__body {
    height: 50vh;
    overflow-y: auto;
  }

  &__goto {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #1a051d;
    cursor: pointer;

    &-icon {
      color: #0097fb;
      margin-left: 0.5rem;
      margin-top: -2px;
    }
  }
}
</style>
