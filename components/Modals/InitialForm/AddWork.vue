<template>
  <div>
    <b-modal
      id="add-work"
      hide-footer
      size="xxl"
      title="EDIT TYPES OF ROOM"
      no-close-on-backdrop
    >
      <div class="d-flex initial-component">
        <div class="component col-4">
          <div class="component__settings">
            <div class="component__settings__header">
              <h2>Parts to Renovation</h2>
              <div class="add-btn_header" @click="addWorkAll">
                <span>Add All</span>
              </div>
            </div>
            <div
              v-dragscroll
              style="overflow: auto; height: 550px; padding: 0 30px 0 0px"
            >
              <div
                v-for="(work, i) in works"
                :key="i"
                class="component__settings__part"
                :class="uncountable(work.id)"
              >
                <div class="component__settings__part-title">
                  <img
                    :src="`/static/images/icon-works/${work.icon}.svg`"
                    alt=""
                    class="mr-4"
                  />
                  <span :ref="work.name">{{ work.title }}</span>
                </div>
                <div class="add-btn_part" @click="addWork(work)">
                  <span>+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="component col-8">
          <div class="component__settings">
            <div class="component__settings__header">
              <h2>My Scope Of work</h2>
              <div
                class="add-btn_delete"
                :class="`${selected.length === 0 ? 'disabled' : ''}`"
                @click="deleteWorkAll"
              >
                <span>Delete All</span>
              </div>
            </div>
            <div
              v-dragscroll
              style="overflow: auto; height: 550px; padding: 0 30px 0 0px"
            >
              <div v-for="(item, i) in selected" :key="i">
                <DoublePart
                  v-if="item.type === 'double'"
                  :item="item"
                  :index="i"
                  @delete-work="deleteWork"
                />

                <div v-else class="component__settings__part">
                  <div class="component__settings__part-title">
                    <img
                      :src="`/static/images/icon-works/${item.icon}.svg`"
                      alt=""
                      class="mr-4"
                    />
                    <span>{{ item.title }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-center align-items-center"
                    style="widht: 35%"
                  >
                    <div
                      v-if="item.type === 'count'"
                      class="component__settings__part-countble"
                    >
                      <b-form-spinbutton
                        v-model="item.quantity"
                        min="1"
                        max="100"
                        class="sprinbtn"
                      ></b-form-spinbutton>
                    </div>
                    <div class="component__settings__part-action">
                      <multiselect
                        v-model="item.action"
                        :options="actions"
                        label="title"
                        select-label=""
                        :searchable="false"
                        selected-label=""
                        deselect-label=""
                        placeholder="Select"
                        class="initial-multiselect"
                        style="color: #0085ff"
                      >
                        <template slot="singleLabel" slot-scope="props"
                          ><span class="option__title">
                            <SvgIcon :name="props.option.icon" />{{
                              props.option.title
                            }}
                          </span></template
                        >
                        <template slot="option" slot-scope="props"
                          ><SvgIcon :name="props.option.icon" />
                          <div class="option__desc">
                            {{ props.option.title }}
                          </div>
                        </template>
                      </multiselect>
                    </div>
                    <SvgIcon
                      name="close"
                      class="little-icon mr-4"
                      style="color: red; cursor: pointer"
                      @click="deleteWork(i)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="initial-button w-100 mt-3" @click="saveWorks">
        Save TYPES AND CONTINUE
      </div>
    </b-modal>
  </div>
</template>
<script>
import cloneDeep from 'lodash/clonedeep'
export default {
  components: {
    DoublePart: () =>
      import('~/components/Modals/InitialForm/components/DoublePart'),
  },
  props: {
    modal: {
      type: Boolean,
      required: false,
      default: false,
    },
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      actions: [],
      works: [],
      selected: [],
    }
  },
  watch: {
    id() {
      this.requestData()
    },
    list() {
      this.requestData()
    },
  },
  mounted() {
    this.requestData()
  },
  methods: {
    uncountable(id) {
      if (id === 1) {
        return this.selected.find((work) => work.id === 1) === undefined
          ? ''
          : 'disabled'
      } else if (id === 2) {
        return this.selected.find((work) => work.id === 2) === undefined
          ? ''
          : 'disabled'
      } else if (id === 3) {
        return this.selected.find((work) => work.id === 3) === undefined
          ? ''
          : 'disabled'
      }
    },
    saveWorks() {
      this.$emit('save-works', this.selected)
      this.selected = []
      this.$bvModal.hide('add-work')
    },
    deleteWork(index) {
      this.selected.splice(index, 1)
    },
    addWork(work) {
      if (work.id === 1) {
        if (this.selected.find((item) => item.id === 1) === undefined)
          this.selected.push(cloneDeep(work))
      } else if (work.id === 2) {
        if (this.selected.find((item) => item.id === 2) === undefined)
          this.selected.push(cloneDeep(work))
      } else if (work.id === 3) {
        if (this.selected.find((item) => item.id === 3) === undefined)
          this.selected.push(cloneDeep(work))
      } else this.selected.push(cloneDeep(work))
      this.uncountable(1)
    },
    addWorkAll() {
      this.selected = cloneDeep(this.works)
    },
    deleteWorkAll() {
      this.selected = []
    },
    requestData() {
      this.selected = this.list
      this.$axios
        .get(
          `${process.env.API_DOMAIN}/api/v1/references/requests/workTypes/${this.id}`
        )
        .then((response) => {
          this.works = response.data.data.work_types
        })
      this.$axios
        .get(`${process.env.API_DOMAIN}/api/v1/references/requests/workActions`)
        .then((response) => (this.actions = response.data.data.work_actions))
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  color: black;
  text-transform: uppercase;
}
.disabled {
  opacity: 0.5 !important;
  pointer-events: none;
}
.add-btn_header {
  border-radius: 8px;
  background: #eef4fd;
  display: flex;
  width: 75px;
  height: 26px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.add-btn_delete {
  border-radius: 8px;
  background: #eef4fd;
  color: #f51473;
  display: flex;
  width: 82px;
  height: 26px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.add-btn_part {
  border-radius: 8px;
  background: #eef4fd;
  display: flex;
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 14px;
}
.add-btn_part:hover {
  border: 1px solid #0085ff;
}
.component {
  width: 100%;
  color: #0085ff;
  &__settings {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 31px;
      width: 100%;
      padding-right: 30px;
    }
    &__part {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      width: 100%;
      height: 65px;
      border: 1px solid #d4d4d4;
      font-size: 18px;
      padding-left: 17px;

      // &-action {
      //   width: 185px;
      // }
      &-countble {
      }

      &-title {
        color: black;
        svg {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
