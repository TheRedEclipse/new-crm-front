<template>
  <div>
    <Header :title="'Select works for room parts'" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12 work-list mt-5">
      <div v-for="work in edit.actionEdit" :key="work.id" class="work-item">
        <div class="work-item">
          <label class="col-5"> {{ work.title }}</label>
          <!-- <multiselect
            v-model="work.action"
            :options="actions"
            placeholder="Select work"
            deselect-label="Can't remove this value"
          ></multiselect> -->
          <multiselect
            v-model="work.action"
            :options="options"
            class="mt-3"
            placeholder="Select work"
            deselect-label="Can't remove this value"
          >
            <template slot="singleLabel" slot-scope="props">
              <div class="option__desc">
                <span class="option__title">
                  <!-- <SvgIcon :name="props.option.icon" class="medium-icon" /> -->
                  {{ props.option.title }}
                </span>
              </div>
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__desc">
                <span class="option__title">
                  <!-- <SvgIcon :name="props.option.icon" class="medium-icon" /> -->
                  {{ props.option.title }}
                </span>
              </div>
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__desc">
                <span class="option__title">
                  <!-- <SvgIcon :name="props.option.icon" class="medium-icon" /> -->
                  {{ props.option.title }}
                </span>
              </div>
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__desc">
                <span class="option__title">
                  <!-- <SvgIcon :name="props.option.icon" class="medium-icon" /> -->
                  {{ props.option.title }}
                </span>
              </div>
            </template>
          </multiselect>
        </div>
      </div>
    </div>
    <div v-if="edit.has_ligth" class="col-12 col-lg-12 work-list mt-5">
      <h2><SvgIcon name="Idea" class="medium-icon" />Lighting</h2>
      <div v-for="item in edit.countable" :key="item.id" class="work-item">
        <label class="col-9">{{ item.countable_title }}</label>
        <b-form-spinbutton
          v-model="item.count"
          :value="0"
          class="col-3"
          inline
        ></b-form-spinbutton>
      </div>
      <!-- <div class="work-item">
        <label class="col-9">Recessed Light</label>
        <b-form-spinbutton
          v-model="edit.lightEdit.recessedLight.value"
          min="0"
          class="col-3"
          inline
        ></b-form-spinbutton>
      </div>
      <div class="work-item">
        <label class="col-9">Wall Fixture</label>
        <b-form-spinbutton
          v-model="edit.lightEdit.wallFixture.value"
          min="0"
          class="col-3"
          inline
        ></b-form-spinbutton>
      </div>
      <div class="work-item">
        <label class="col-9">Ceiling Fixture</label>
        <b-form-spinbutton
          v-model="edit.lightEdit.ceilingFixture.value"
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
<style scoped>
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
.title-form {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.title-form img {
  margin-right: 10%;
}
.line-title {
  height: 1px;
  width: 95%;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #0099ff 27.92%,
    #0097fb 77.88%,
    #ffffff 101.4%
  );
}
</style>
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
    edit: {
      type: Object,
      required: false,
      default: () => {
        return {}
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
    styles: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      value: [],
      data: [],
      actions: ['Refinish', 'Replace', 'Remove Existing', 'Install / Add New'],
      recessedLight: 0,
      wallFixture: 0,
      ceilingFixture: 0,
      options: [],
    }
  },
  mounted() {
    this.$axios
      .get(`${process.env.API_DOMAIN}/api/v1/references/requests/workActions`)
      .then((response) => (this.options = response.data.data.work_actions))
  },
  methods: {
    sendData() {
      this.$emit('save-edit', _.cloneDeep(this.edit))
    },
    prevBtn() {
      this.$emit('prev-btn', 4)
    },
  },
}
</script>
