<template>
  <div class="double-part">
    <div class="double-part-header">
      <div>
        <img
          :src="`/static/images/icon-works/${item.icon}.svg`"
          alt=""
          class="mr-4"
        />
        <span>{{ item.title }}</span>
      </div>
      <SvgIcon
        name="close"
        class="little-icon mr-4"
        style="color: red; cursor: pointer"
        @click="deleteWork"
      />
    </div>
    <div class="part">
      <div class="part-title">
        <span>Currently Have:</span>
      </div>

      <multiselect
        v-model="item.double_current"
        :options="double_current"
        select-label=""
        :searchable="false"
        selected-label=""
        deselect-label=""
        placeholder="Select"
        class="initial-multiselect_silver part-action"
        style="color: #0085ff"
      >
        <template slot="singleLabel" slot-scope="props"
          ><span class="option__title">
            {{ props.option.title }}
          </span></template
        >
        <template slot="option" slot-scope="props">
          <div class="option__desc">
            {{ props.option.title }}
          </div>
        </template>
      </multiselect>
    </div>
    <div class="part">
      <div class="part-title">
        <span>Replace With:</span>
      </div>
      <multiselect
        v-model="item.double_install"
        :options="double_install"
        label="title"
        select-label=""
        :searchable="false"
        selected-label=""
        deselect-label=""
        placeholder="Select"
        class="initial-multiselect_silver part-action"
        style="color: #0085ff"
      >
        <template slot="singleLabel" slot-scope="props"
          ><span class="option__title">
            {{ props.option.title }}
          </span></template
        >
        <template slot="option" slot-scope="props">
          <div class="option__desc">
            {{ props.option.title }}
          </div>
        </template>
      </multiselect>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {},
    },
    index: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      double_install: [],
      double_current: [],
    }
  },
  mounted() {
    this.$axios
      .get(
        `${process.env.API_DOMAIN}/api/v1/references/requests/work-doubles/replace/26`
      )
      .then(
        (response) =>
          (this.double_install = response.data.data.room_double_replace)
      )
    this.$axios
      .get(
        `${process.env.API_DOMAIN}/api/v1/references/requests/work-doubles/current/26`
      )
      .then(
        (response) =>
          (this.double_current = response.data.data.room_double_current)
      )
  },
  methods: {
    deleteWork() {
      this.$emit('delete-work', this.index)
    },
  },
}
</script>

<style lang="scss">
.double-part {
  border: 1px solid #d4d4d4;
  margin-top: 10px;
  &-header {
    color: #000;
    font-size: 18px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-bottom: 20px;
    margin-top: 17px;
    border-bottom: 1px solid #f0f0f0;
  }
}

.part {
  border: 1px solid #d4d4d4;
  background: #fafafa;
  height: 56px;
  margin-top: 24px;
  padding: 20px;
  margin: 20px auto;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-title {
    color: #000;
    font-size: 16px;
  }
  &-action {
    max-width: 50%;
  }
}
.initial-multiselect {
  &_silver {
    .multiselect__tags {
      // border: 1px solid rgb(226, 226, 226) !important;
      box-shadow: none !important;
      font-size: 18px !important;
      border: none !important;
      overflow: hidden;
      white-space: nowrap;
      height: 20px;
      background: #fafafa !important;
    }
    .multiselect__placeholder {
      color: #0085ff !important;
      font-size: 16px !important;
      display: flex;
      justify-content: flex-end;
    }
    .multiselect__single {
      display: flex;
      justify-content: flex-end;
      color: #0085ff !important;
      text-align: right;
      span {
        width: 100% !important;
        font-size: 18px !important;
      }
      svg {
        margin-right: 5px !important;
      }
    }
    .multiselect__option {
      font-size: 18px !important;
    }
    .multiselect__option--highlight {
      background-color: rgb(255, 255, 255) !important;
      color: #0085ff !important;
    }
    .multiselect__option--selected {
      background-color: rgb(255, 255, 255) !important;
      font-size: 18px !important;
      color: #0085ff;
    }
    .multiselect__select:before {
      border: none;
    }
    .multiselect__content {
      border: none !important;
      display: flex;
      flex-direction: row !important;
      box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
      position: absolute;
      right: 50px;
      overflow: hidden;
      color: #0085ff;
      li {
        border-bottom: 1px solid #f2f2f2;
        background-color: rgb(255, 255, 255) !important;
        padding: 3px;
        span {
          display: flex !important;
          margin-left: 20px;
        }
      }
      li:hover {
        background-color: rgb(255, 255, 255) !important;
      }
    }
  }
}
</style>
