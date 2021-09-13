<template>
  <div class="progress-bar initial-component">
    <img
      src="/static/images/drawings_background.png"
      alt=""
      width="100%"
      style="z-index: 100"
    />
    <NuxtLink
      class="progress-bar__steps__step__text-link"
      :to="`/initial-form`"
    >
      <img
        src="/static/images/logo3.png"
        alt=""
        width="170"
        class="progress-bar-logo"
      />
    </NuxtLink>

    <div class="progress-bar__steps">
      <div
        v-for="(item, i) in menu"
        :key="i"
        class="progress-bar__steps__step"
        :class="`${
          item.id > last_step && item.id !== step ? 'not_available' : ''
        }`"
      >
        <div class="progress-bar__steps__step__status">
          <div v-if="item.id !== step" class="status">
            <SvgIcon v-if="item.id <= last_step" name="ok" class="small-icon" />
            <SvgIcon
              v-if="item.id > last_step"
              name="lock"
              class="small-icon"
            />
          </div>
          <div v-else class="active">
            <SvgIcon name="ok" class="small-icon" />
          </div>
          <div v-if="item.id !== 6" class="line"></div>
        </div>
        <div class="progress-bar__steps__step__text">
          <NuxtLink
            :style="`pointer-events: ${final ? 'none' : 'auto'}`"
            class="progress-bar__steps__step__text-link"
            :to="`/initial-form/${item.href}`"
            :class="`${
              item.id > last_step && item.id !== step ? 'not_available' : ''
            }`"
          >
            <span class="progress-bar__steps__step__text-subtitle"
              >STEP {{ item.id }}</span
            >
            <span class="progress-bar__steps__step__text-title">{{
              item.title
            }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <Footer :color="`white`" />
    <img
      src="/static/images/drawings_background2.png"
      alt=""
      width="100%"
      style="z-index: 1000; position: absolute; bottom: 0"
    />
  </div>
</template>
<script>
export default {
  components: {
    Footer: () => import('~/components/Pages/InitialForm/Footer'),
  },
  props: {
    step: {
      type: Number,
      required: false,
      default: 0,
    },
    final: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      last_step: 0,
      next_step: 0,
      menu: [
        {
          id: 1,
          title: 'Bulding type',
          href: 'building-type',
        },
        {
          id: 2,
          title: 'Bulding stage',
          href: 'building-stage',
        },
        {
          id: 3,
          title: 'Project stage date',
          href: 'project-stage-date',
        },
        {
          id: 4,
          title: 'Floor plan',
          href: 'floor-plan',
        },
        {
          id: 5,
          title: 'Rooms',
          href: 'rooms',
        },
        {
          id: 6,
          title: 'Final',
          href: 'final',
        },
      ],
    }
  },

  mounted() {
    // this.$store.dispatch('initialForm/addProgress', this.step)
    this.last_step = this.$store.getters['initialForm/getData'].progress
    this.next_step = this.last_step + 1
    if (this.step <= this.next_step)
      this.$store.dispatch('initialForm/addProgress', this.step)
    else this.$router.replace({ path: '/initial-form' })
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #fff;
}
a:hover {
  text-decoration: none;
  color: #fff;
}
.not_available {
  pointer-events: none !important;
  opacity: 0.5;
}
.progress-bar {
  display: flex;
  justify-content: flex-start;
  width: 25%;
  min-height: 100%;
  position: fixed;
  left: 0;

  &-logo {
    position: absolute;
    top: 50px;
    left: 66px;
    z-index: 1;
  }

  &__steps {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 77px;

    &__step {
      display: flex;
      margin-top: 16px;
      z-index: 9999;

      &__text {
        &-link {
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: flex-start;
          margin-left: 10px;
        }

        &-subtitle {
          font-size: 12px;
        }

        &-title {
          font-size: 22px !important;
        }
      }
      &__status {
        display: flex;
        flex-direction: column;
        align-items: center;
        .status {
          width: 32px;
          height: 32px;
          border: 3px solid #fff;
          border-radius: 100%;
        }
        .active {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          border-radius: 100%;
          background: #fff;
          color: #0085ff;
        }
        .line {
          width: 3px;
          height: 42px;
          margin-top: 10px;
          background: #ffffff;
          background: -webkit-linear-gradient(bottom, #ffffff, #ffffff00);
          background: -moz-linear-gradient(bottom, #ffffff, #ffffff00);
          background: linear-gradient(to top, #ffffff, #ffffff00);
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
