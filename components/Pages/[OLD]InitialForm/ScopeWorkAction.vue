<template>
  <div>
    <Header :title="'Select works for room parts'" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12 work-list">
      <div v-for="work in actionWorks" :key="work.id" class="work-item">
        <div class="work-item">
          <SvgIcon :name="work.icon" class="medium-icon" />
          <label class="col-5"> {{ work.title }}</label>
          <!-- <multiselect
            v-model="work.action"
            :options="actions"
            placeholder="Select work"
            deselect-label="Can't remove this value"
          >
          </multiselect> -->
          <multiselect
            v-model="work.action"
            :options="options"
            label="title"
            class="mt-3 multi"
            placeholder="Select work"
            deselect-label="Can't remove this value"
          />
        </div>
      </div>
    </div>
    <div v-if="lighting" class="col-12 col-lg-12 work-list mt-5 mb-5">
      <h2><SvgIcon name="Idea" class="medium-icon" />Lighting</h2>
      <div v-for="item in countable" :key="item.id" class="work-item">
        <label class="col-9">{{ item.countable_title }}</label>
        <b-form-spinbutton
          v-model="item.count"
          :value="0"
          min="0"
          max="99"
          class="col-3"
          inline
        ></b-form-spinbutton>
      </div>
      <!-- <div class="work-item">
        <label class="col-9">Recessed Light</label>
        <b-form-spinbutton
          v-model="recessedLight"
          :value="0"
          min="0"
          class="col-3"
          inline
        ></b-form-spinbutton>
      </div>
      <div class="work-item">
        <label class="col-9">Wall Fixture</label>
        <b-form-spinbutton
          v-model="wallFixture"
          :value="0"
          min="0"
          class="col-3"
          inline
        ></b-form-spinbutton>
      </div>
      <div class="work-item">
        <label class="col-9">Ceiling Fixture</label>
        <b-form-spinbutton
          v-model="ceilingFixture"
          :value="0"
          min="0"
          class="col-3"
          inline
        ></b-form-spinbutton>
      </div> -->
    </div>
    <div class="d-flex justify-content-center w-100 mb-n3 mt-4">
      <button
        type="button"
        class="button button-outline-primary w-35 justify-content-center"
        @click="sendData"
      >
        Okey
      </button>
    </div>
  </div>
</template>
<script>
import * as _ from 'lodash'
export default {
  components: {
    Header: () => import('~/components/Pages/InitialForm/Header'),
  },
  props: {
    room: {
      type: String,
      required: false,
      default: '',
    },
    actionWorks: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
    lighting: {
      type: Boolean,
      required: false,
      default: false,
    },
    plumbing: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
    index: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  data() {
    return {
      result: {},
      action: [],
      typeRenov: this.type,
      // actions: ['Refinish', 'Replace', 'Remove Existing', 'Install / Add New'],
      recessedLight: 0,
      wallFixture: 0,
      ceilingFixture: 0,
      countable: [],
      options: [
        {
          ico: 'refinish',
          value: 'Refinish',
        },
        {
          ico: 'replace',
          value: 'Replace',
        },
        {
          ico: 'remove',
          value: 'Remove Existing',
        },
        {
          ico: 'install_add',
          value: 'Install / Add New',
        },
      ],
    }
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/workActions`)
      .then((response) => (this.options = response.data.data.work_actions))
    this.$axios
      .get(
        `${process.env.API_DOMAIN}/api/v1/references/requests/workCountableTypes/7`
      )
      .then((response) => {
        const data = response.data.data.work_countable_types
        const array = []
        data.forEach(function (item) {
          const elem = {
            countable_title: item.title,
            countable_type_id: item.id,
            count: 0,
          }
          array.push(elem)
        })
        this.countable = array
      })
  },
  methods: {
    sendData() {
      const actionWorks = _.cloneDeep(this.actionWorks)
      const index = this.index
      actionWorks.forEach(function (work) {
        if (work.id) work.work_type_id = work.id
        if (work.action) {
          work.room_type_id = index
          work.work_action_id = work.action.id
        }
      })
      const worksList = []

      actionWorks.forEach(function (item) {
        worksList.push(_.cloneDeep(item))
      })
      console.log(worksList)
      const data = {
        countable: _.cloneDeep(this.countable),
        works: worksList,
        room_title: this.room,
        ligth: this.lighting,
        plumbing: this.plumbing,
      }
      this.$emit('room-data', data)
      this.actionWorks.forEach(function (item, i, arr) {
        item.action = null
      })
      this.recessedLight = 0
      this.wallFixture = 0
      this.ceilingFixture = 0
    },
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
<style lang="scss" scoped>
.multi {
  &__select {
    height: 38px !important;
    top: 1px !important;
  }

  &--active {
    .multi__tags {
      background-color: #d2e9f8;
    }
  }

  &__single {
    color: #1a051d !important;
  }

  &__tags {
    background: #ffffff;
    border: 1px solid #ced4da !important;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.04);
    border-radius: 6px !important;
    padding: 3px 40px 3px 18px !important;
    color: rgba(50, 60, 71, 0.5);
    min-height: 38px !important;
  }

  .multi__tag {
    background: #fd7c32 !important;

    &-icon:after {
      color: #ffffff;
    }

    &-icon:hover,
    &-icon:focus {
      background: #fd7c32 !important;
    }
  }

  &__input,
  &__single {
    color: rgba(50, 60, 71, 0.5);
    font-size: 14px !important;
    margin: 5px 0 5px 0 !important;
    padding-left: 0 !important;
    background: transparent !important;

    &::placeholder {
      color: rgba(50, 60, 71, 0.5);
    }
  }

  &__placeholder {
    color: rgba(50, 60, 71, 0.5) !important;
    margin: 3px 0 !important;
  }

  &__option {
    &--highlight {
      background: #0097fb !important;

      &:after {
        background: #fb6400 !important;
      }
    }
  }

  &__content {
    border: 1px solid #ced4da !important;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    overflow: auto;
    max-height: 240px !important;

    &-wrapper {
      margin: 5px 0 !important;
      border: none !important;
      overflow: visible !important;
      max-height: 240px !important;
    }
  }
}
svg {
  color: #007bff;
  width: 50px;
}
.work-list {
  display: flex;
  flex-wrap: wrap;
}
.b-form-spinbutton {
  border: none;
  color: #007bff;
  stroke-width: 0;
}

.work-list h2 {
  margin: auto;
}
.work-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  margin-top: 5px;
  width: 100%;
  height: 50px;
}
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
}
.form-group {
  display: flex;
  flex-direction: column;
  width: 100% !important;
}
.form-group input {
  margin-bottom: 35px;
}
</style>
