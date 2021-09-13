<template>
  <div class="component">
    <HeaderComponent :number="1" :title="`Room measurements`" />
    <div class="component__settings">
      <div class="component__settings-measurements">
        <span
          >The length of your room (A)
          <input
            v-model="data.length"
            type="number"
            min="0"
            size="3"
            max="100"
            placeholder="0"
            style="width: 60px"
            @change="setValue"
          /><b>ft</b></span
        >
        <input
          v-model="data.length"
          min="0"
          max="100"
          type="range"
          @change="setValue"
        />
        <div class="d-flex justify-content-between w-100" style="opacity: 0.5">
          <span>0 ft</span>
          <span>100 ft</span>
        </div>
        <span
          >The width of your room (B)
          <input
            v-model="data.width"
            type="number"
            min="0"
            max="100"
            step="1"
            placeholder="0"
            style="width: 60px"
            @change="setValue"
          /><b>ft</b></span
        >
        <input
          v-model="data.width"
          min="0"
          max="100"
          step="1"
          type="range"
          class="w-100"
          @change="setValue"
        />
        <div class="d-flex justify-content-between w-100" style="opacity: 0.5">
          <span>0 ft</span>
          <span>100 ft</span>
        </div>
        <span
          >The height of your room (C)
          <input
            v-model="data.height"
            type="number"
            min="0"
            max="100"
            placeholder="0"
            style="width: 60px"
            @change="setValue"
          /><b>ft</b></span
        >
        <input
          v-model="data.height"
          min="0"
          max="100"
          type="range"
          @change="setValue"
        />
        <div class="d-flex justify-content-between w-100" style="opacity: 0.5">
          <span>0 ft</span>
          <span>100 ft</span>
        </div>
      </div>
      <img
        :src="`/static/images/icon/Group _149.png`"
        width="298"
        height="201.24"
      />
    </div>
  </div>
</template>
<script>
import cloneDeep from 'lodash/clonedeep'
export default {
  components: {
    HeaderComponent: () =>
      import('~/components/Pages/InitialForm/components/HeaderComponent'),
  },
  props: {
    room: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      data: {},
      timerId: null,
    }
  },
  watch: {
    room() {
      this.getRoom()
    },
  },
  mounted() {
    this.getRoom()
  },
  methods: {
    getRoom() {
      this.data = cloneDeep(this.room.measurements)
      this.data.index = cloneDeep(this.room.index)
    },
    setValue() {
      clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        this.$store.dispatch(
          'initialForm/addMeasurements',
          cloneDeep(this.data)
        )
      }, 300)
    },
  },
}
</script>
<style lang="scss" scoped>
@media (max-width: 1700px) {
  img {
    display: none;
  }
  .component {
    width: 100% !important;
    &__settings {
      &-measurements {
        width: 100% !important;
      }
    }
  }
}
.component {
  width: 900px;
  color: black;
  &__settings {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    &-measurements {
      width: 549px;
      span input {
        margin: 10px;
        border: 1px solid #f7f9fc;
      }
      span input:focus {
        border: 1px solid #f7f9fc;
      }
    }
  }
}
</style>
