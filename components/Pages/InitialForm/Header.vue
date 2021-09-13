<template>
  <div class="header">
    <img src="/static/images/logo2.png" alt="" />
    <div class="header--text">
      <span class="header--text--title"> Select A BRANCH</span>
      <span class="header--text--subtitle"> We’re working in this areas</span>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.header img {
  position: absolute;
  left: 66px;
  top: 50px;
}
.header--text {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 44px;
}
.header--text {
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #1f252c;
  font-weight: 600;
  .header--text--title {
    font-size: 50px;
  }
}
</style>
