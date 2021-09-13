<template>
  <div class="workspace">
    <form>
      <div class="form-group">
        <FirstStep
          id="1"
          :title="'Do You Like A Design'"
          class="active"
          @first-step="firstStep"
          @estimated-selector="showBtnEstimated"
        />
        <RequestChanges
          id="2"
          :title="'Request Changes'"
          class="form-item"
          @description-info="descriptionInfo"
          @next-btn="nextBtn"
        />
        <ChangesEstimate
          id="3"
          :title="'Changes In Estimated'"
          class="form-item"
          @changes-info="changesInfo"
          @next-btn="nextBtn"
        />
        <FinalStep
          id="4"
          :title="'Next Step'"
          class="form-item"
          @next-btn="nextBtn"
        />
      </div>
    </form>
    <div class="d-flex justify-content-center w-100 mb-3">
      <button
        v-if="id === 1"
        type="button"
        class="button button-primary w-35 justify-content-center"
        :disabled="!firstStepBtn"
        @click="nextBtn"
        @prev-btn="prevBtn"
      >
        Next
      </button>
      <button
        v-if="id !== 1 && id !== 4"
        type="button"
        class="button button-primary w-35 justify-content-center"
        @click="nextBtn(4)"
        @prev-btn="prevBtn"
      >
        Go To Final Step
      </button>
      <button
        v-if="id === 4"
        type="button"
        class="button button-outline-primary w-35 mr-3 justify-content-center"
        @click="nextBtn"
        @prev-btn="prevBtn"
      >
        Back
      </button>
      <button
        v-if="id === 4"
        type="button"
        class="button button-primary w-35 justify-content-center"
        @click="nextBtn"
        @prev-btn="prevBtn"
      >
        To Appoint
      </button>
    </div>
  </div>
</template>
<style scoped>
.form-group {
  display: flex;
  /* flex-direction: column; */
}
.active {
  width: 100%;
  display: block !important;
}
.form-item {
  display: none;
}
</style>
<script>
// import * as _ from 'lodash'
export default {
  components: {
    FirstStep: () => import('~/components/Pages/FeedbackForm/FirstStep'),
    RequestChanges: () =>
      import('~/components/Pages/FeedbackForm/RequestChanges'),
    ChangesEstimate: () =>
      import('~/components/Pages/FeedbackForm/ChangesEstimate'),
    FinalStep: () => import('~/components/Pages/FeedbackForm/FinalStep'),
  },
  data() {
    return {
      id: 1,
      firstStepBtn: false,
      firstSlide: null,
      requestSlide: null,
      estimateSlide: null,
    }
  },
  methods: {
    nextBtn(loop = null) {
      if (this.firstSlide.estimation === 'It Perfect' || loop === 4) {
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'form-item'
        const loopForm = document.getElementById(4)
        loopForm.className = 'active'
        this.id = 4
      } else {
        let prevForm = null
        prevForm = this.id
        this.id = this.id + 1
        prevForm = document.getElementById(prevForm)
        prevForm.className = 'form-item'
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'active'
      }

      if (this.id === 5) this.idComponent = this.idComponent + 1
    },
    prevBtn(loop) {
      if (loop === 4) {
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'form-item'
        const loopForm = document.getElementById(loop)
        loopForm.className = 'active'
        this.id = loop
      } else {
        let prevForm = null
        prevForm = this.id
        this.id = this.id - 1
        prevForm = document.getElementById(prevForm)
        prevForm.className = 'form-item'
        const currentForm = document.getElementById(this.id)
        currentForm.className = 'active'
      }
    },
    showBtnEstimated(check) {
      this.firstStepBtn = check
    },
    firstStep(data) {
      this.firstSlide = data
      this.firstSlide.firstName = 'Joe'
      this.firstSlide.lastName = 'Walker'
    },
    descriptionInfo(data) {
      this.requestSlide = data
    },
    changesInfo(data) {
      this.estimateSlide = data
    },
  },
}
</script>
