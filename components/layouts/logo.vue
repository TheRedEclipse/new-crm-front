<template>
  <div class="logo">
    <NuxtLink to="/" class="logo__image"> Modern Citi Group </NuxtLink>
  </div>
</template>

<style lang="scss">
// .logo {
//   display: block;
//   width: 145px;
//   height: 50px;
//   background: #fbfbfb;
//   background-image: url('/static/images/logo.png');
//   border-radius: 6px;
//   text-indent: -99999px;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
// }

.logo {
  margin: 0.5rem 0;

  &__image {
    display: block;
    width: 49px;
    height: 49px;
    background: #fbfbfb;
    background-image: url(/static/images/logo.png);
    border-radius: 16px;
    text-indent: -99999px;
    background-size: auto 44px;
    background-repeat: no-repeat;
    background-position: 5px;
    image-rendering: -webkit-optimize-contrast;
    box-shadow: 0 0 50px rgba(206, 212, 218, 0.5);
  }
}
</style>
