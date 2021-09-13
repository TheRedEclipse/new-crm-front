<template>
  <div class="initial-component final-slide">
    <div class="final-slide__title">
      <span>FINISH</span>
      <h1>Congratulations!</h1>
    </div>
    <img src="/static/images/icon-other/final.svg" width="30%" />
    <span class="final-slide-msg"
      >We have already started processing your request</span
    >
  </div>
</template>
<style lang="scss">
h1,
h2 {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 36px;
}
.final-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 85px;
  &__title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10%;

    span {
      color: #979898;
    }
  }
  &-msg {
    margin-top: 5%;
    font-size: 28px;
    color: #979898;
    text-align: center;
  }
}
</style>
