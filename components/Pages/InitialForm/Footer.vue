<template>
  <div class="footer" :style="`padding: ${link ? '0px 99px 0 99px' : '0 5%'}`">
    <div class="footer--text">
      <span :style="`color: ${color}`">© 2021 - 2021 All rights reserved</span>
      <span
        :style="`color: ${color}; border-bottom: 1px solid ${color}; cursor: pointer`"
        @click="$bvModal.show('cookie-policy')"
        >Cookie policy</span
      >
      <span
        :style="`color: ${color}; border-bottom: 1px solid ${color}; cursor: pointer`"
        @click="$bvModal.show('privacy-policy')"
        >Privacy policy</span
      >
    </div>
    <div
      v-if="link"
      v-b-tooltip.hover.viewport="
        `We have offices in represented states only. If you want to do renovation in another region, please contact us.`
      "
      class="footer--text link"
    >
      <span
        :style="`color: ${color}; border-bottom: 1px solid ${color}; cursor: pointer`"
        >CAN’T FIND YOUR REGION?</span
      >
    </div>
    <CookiePolicy />
    <PrivacyPolicy />
  </div>
</template>
<style lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 20px;
  z-index: 9999;
  padding: 0px 99px 0 99px;
}
.footer--text {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 13px;
  span {
    margin-right: 19px;
  }
}
.link {
  display: flex;
  justify-content: flex-end;
}
</style>
<script>
export default {
  components: {
    CookiePolicy: () => import('~/components/Modals/InitialForm/CookiePolicy'),
    PrivacyPolicy: () =>
      import('~/components/Modals/InitialForm/PrivacyPolicy'),
  },
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: '#7c7c7c',
    },
  },
}
</script>
