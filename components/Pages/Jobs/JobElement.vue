<template>
  <div class="job-element">
    <div class="job-element__status-effect"></div>
    <NuxtLink to="/jobs/1" class="job-element__goto">
      <span>Job info</span>
      <span class="job-element__goto-icon">
        <SvgIcon name="info" />
      </span>
    </NuxtLink>
    <div
      :class="`job-element__about ${
        dropdown ? `job-element__about--less` : ``
      }`"
    >
      <div class="job-element__preview">
        <img
          src="https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78"
          alt=""
        />
      </div>
      <div class="job-element__data">
        <div class="job-element__data-header">
          <div class="job-element__data-title">
            Kitchen & Bathroom Renovation Option (A)
          </div>
          <div class="job-element__status">
            <div class="job-element__status-icon"></div>
            <div class="job-element__status-title">
              Initial proposal feedback & site meeting form sent
            </div>
            <div
              :class="`job-element__dropdown ${
                dropdown ? 'job-element__dropdown--opened' : ''
              }`"
              @click="toggleDropdown()"
            >
              <SvgIcon name="arrow" />
            </div>
          </div>
        </div>
        <div class="job-element__data-content">
          <div class="job-element__info">
            <span class="job-element__info-title">Job number:</span>
            <span>MCG-1234</span>
          </div>
          <div class="job-element__info">
            <span class="job-element__info-title">Status:</span>
            <span>Lead</span>
          </div>
          <div class="job-element__info">
            <span class="job-element__info-title">Date start:</span>
            <span>{{ $moment().format('MMMM d, Y') }}</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-show="dropdown" class="job-element__tabs">
        <b-tabs>
          <b-tab title="Pre-estimate">
            <div class="job-element__tab-content">
              <div class="row table-block">
                <div
                  v-for="i in 5"
                  :key="`job-card-${i}`"
                  class="col-12 col-md-3"
                >
                  <JobCard />
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab title="Walk-through">
            <div class="job-element__tab-content">
              <div class="row table-block">
                <div
                  v-for="i in 3"
                  :key="`job-card-${i}`"
                  class="col-12 col-md-3"
                >
                  <JobCard />
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab title="Final estimate">
            <div class="job-element__tab-content">
              <div class="row table-block">
                <div class="w-100 h-100 table-block__empty">
                  There is no cards to display
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    JobCard: () => import('~/components/Pages/Jobs/JobCard'),
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dropdown: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown
    },
  },
}
</script>

<style lang="scss">
.job-element {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06);
  position: relative;

  &__about {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    display: flex;
    align-items: center;
    user-select: none;

    &--less {
      .job-element__preview {
        width: 68px;
        height: 68px;
      }

      .job-element__status {
        font-size: 14px;
      }

      .job-element__data {
        font-size: 16px;

        &-content {
          margin-top: 8px;
        }
      }
    }
  }

  &__tabs {
    padding: 0 0 5rem 8px;

    .nav-tabs {
      justify-content: space-around;
    }
  }

  &__tab-content {
    margin: 1.5rem 1.5rem -1rem 1.5rem;
  }

  & + .job-element {
    margin-top: 1.5rem;
  }

  &__status {
    display: flex;
    align-items: center;
    font-size: 16px;
    transition: 0.2s ease;

    &-icon {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #cccccc;
    }

    &-title {
      margin-left: 0.75rem;
    }

    &-effect {
      width: 8px;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      background-color: #cccccc;
    }
  }

  &__dropdown {
    transition: 0.2s ease;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;

    &--opened {
      transform: rotate(90deg);
    }
  }

  &__preview {
    width: 110px;
    height: 110px;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #dfdfdf;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    margin-left: 1rem;
    flex-shrink: 0;
    transition: 0.2s ease;

    img {
      height: 100%;
    }
  }

  &__data {
    margin-left: 1.5rem;
    width: 100%;
    font-size: 17px;

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-title {
      font-weight: 600;
    }

    &-content {
      display: flex;
      align-items: center;
      margin-top: 20px;
      transition: 0.2s ease;
    }
  }

  &__info {
    margin-right: 1.5rem;
    color: #109ce1;

    &-title {
      color: #4c5862;
    }
  }

  &__goto {
    position: absolute;
    bottom: 33px;
    right: 29px;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #1a051d;

    &-icon {
      color: #0097fb;
      margin-left: 0.5rem;
      margin-top: -2px;
    }
  }
}
</style>
