<template>
  <div class="component w-100">
    <HeaderComponent :number="3" :title="`Preferred styles`" />
    <div class="component__container">
      <div
        v-for="style in styles"
        :key="style.id"
        class="component__container-element"
      >
        <div
          class="component__container-element__background"
          :style="`background: url('${style.image}')`"
        ></div>
        <div
          class="component__container-element__image"
          :style="`background: url('${style.image}')`"
        >
          <div class="component__container-element__checkbox">
            <b-form-checkbox
              :id="`checkbox-style-${style.id}`"
              v-model="selected"
              :value="style"
              name="checkbox-styles"
              @change="saveStyles"
            >
              <span><b>White</b> Kitchen</span>
            </b-form-checkbox>
          </div>
        </div>
      </div>

      <div class="d-flex component__container__load-section">
        <AddFile
          :title="`Transfer your preferences`"
          :room="room"
          :variety="`styles`"
          @update-files="updateFiles"
        />
        <div class="component__container__load-section-or"><span>OR</span></div>
        <AddPinterest :room="room" />
      </div>
    </div>
  </div>
</template>
<script>
import cloneDeep from 'lodash/clonedeep'
export default {
  components: {
    AddFile: () => import('~/components/Pages/InitialForm/components/AddFile'),
    AddPinterest: () =>
      import('~/components/Pages/InitialForm/components/AddPinterest'),
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
      styles: [],
      selected: [],
    }
  },
  watch: {
    room() {
      this.requestStyle()
    },
  },
  mounted() {
    this.requestStyle()
  },
  methods: {
    updateFiles(index) {
      this.$emit('update-files', index)
    },
    setStyle() {
      if (!Array.isArray(this.room.styles)) {
        this.selected = []
        this.selected.push(this.room.styles)
      } else {
        this.selected = this.room.styles
      }
    },
    saveStyles() {
      const styles = {}
      styles.id_room = cloneDeep(this.room.index)
      styles.styles = this.selected
      this.$store.dispatch('initialForm/addStyles', cloneDeep(styles))
    },
    requestStyle() {
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/references/requests/roomStyles/${this.room.id}`
        )
        .then((response) => {
          this.styles = response.data.data.room_styles.splice(0, 6)
        })
      this.setStyle()
    },
  },
}
</script>
<style lang="scss">
.component {
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 24px;
    &-element {
      width: 30%;
      height: 230px;
      margin: 5px;
      background: rgba(31, 37, 45, 0.1);
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      &__image {
        width: 90%;
        height: 213px;
        background-size: cover !important;
        position: absolute;
        z-index: 2;
        filter: drop-shadow(0px 4px 40px rgba(31, 37, 45, 0.5));
        display: flex;
        align-items: flex-end;
        padding: 15px;
        overflow: hidden;
      }
      &__background {
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        height: 230px;
        background-size: cover !important;
        filter: blur(10px);
      }
      &__checkbox {
        display: flex !important;
        align-items: center !important;
        span {
          font-family: 'Lato';
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          text-transform: uppercase;
          color: #ffffff !important;
        }
      }
    }
    &__load-section {
      display: flex;
      position: relative;
      width: 100%;
      &-or {
        width: 54px;
        height: 54px;
        background: #fff;
        box-shadow: 0px 0px 20px rgba(27, 114, 193, 0.1);
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 500;
        position: absolute;
        left: 47%;
        top: 35%;
        span {
          font-size: 22px;
          color: #0085ff;
        }
      }
    }
  }
}
@media (max-width: 1782px) {
  .component__container__load-section {
    flex-direction: column;
    &-or {
      display: none;
    }
  }
}
</style>
