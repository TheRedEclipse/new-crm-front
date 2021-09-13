<template>
  <div class="title-form">
    <!-- <img src="~assets/sprite/svg/prev.svg" @click="prevBtn" /> -->
    <SvgIcon name="prev" class="medium-icon" @click="prevBtn" />
    <h2>{{ title }}</h2>
    <div class="line-title"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
<style>
.title-form {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  justify-content: center;
}
.title-form svg {
  width: 1%;
  cursor: pointer;
}
.title-form h2 {
  width: 99%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}
.line-title {
  height: 1px;
  width: 100%;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #0099ff 27.92%,
    #0097fb 77.88%,
    #ffffff 101.4%
  );
}
</style>
