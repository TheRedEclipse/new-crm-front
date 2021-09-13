<template>
  <div class="attachment">
    <div class="p-3 d-flex justify-content-center">
      <div class="attachment__preview">
        <img :src="image" alt="" />
      </div>
    </div>
    <div class="attachment__title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.attachment {
  background: #ffffff;
  // border: 1px solid #c4c4c4;
  border: 1px solid #dadada;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 8px rgba(76, 76, 76, 0.15);
  border-radius: 8px;

  &__title {
    // border-top: 1px solid #c4c4c4;
    border-top: 1px solid #dadada;
    padding: 0.75rem;
    text-align: center;
    color: #3f3356;
    // text-transform: capitalize;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__preview {
    width: 155px;
    height: 155px;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 8px;
    border: 5px solid rgba(196, 196, 196, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    img {
      height: 100%;
    }
  }
}
</style>
