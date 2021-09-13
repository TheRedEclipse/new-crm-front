<template>
  <div class="header">
    <div class="header-number">{{ number }}</div>
    <span class="header-title"> {{ title }}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  width: 95%;
  display: flex;
  align-items: center;
  font-family: 'Lato';
  font-style: normal;
  font-weight: normal;
  line-height: 140%;
  display: flex;
  color: black !important;

  &-title {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 140%;
  }

  &-number {
    width: 33px;
    height: 33px;
    background: #0085ff;
    border-radius: 10px;
    font-weight: 500;
    font-size: 22px;
    line-height: 140%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-right: 10px;
  }
}
</style>
