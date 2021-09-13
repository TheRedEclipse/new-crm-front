<template>
  <div class="position-relative">
    <b-dropdown
      right
      size="lg"
      variant="link"
      class="create-dropdown"
      menu-class="animate__animated animate__fadeIn animate__faster create-dropdown__container"
      toggle-class="outline-none p-0 text-decoration-none text-secondary"
      no-caret
    >
      <template #button-content>
        <div
          v-if="!final"
          class="button button-primary d-flex align-items-center justify-content-between mt-3"
        >
          <span>Edit Item</span>
          <span class="create-button__icon" style="margin-left: 30px">
            <SvgIcon name="edit" class="medium-icon" />
          </span>
        </div>
      </template>
      <template #default>
        <div>
          <!-- <a class="p-2 d-flex justify-content-between nav-link nav-link--free">
            <span class="d-flex align-items-center">
              <SvgIcon name="folder" class="text-dark-blue less-medium-icon" />
              <span class="ml-2 text-secondary">Item group</span>
            </span>
            <span>
              <SvgIcon name="arrow" class="text-secondary" />
            </span>
          </a> -->
          <a
            class="p-2 d-flex justify-content-between nav-link nav-link--free"
            @click="$bvModal.show(`estimate_create_item_${type}_modal`)"
          >
            <span class="d-flex align-items-center">
              <SvgIcon name="folder" class="text-primary less-medium-icon" />
              <span class="ml-2 text-secondary">Edit item group</span>
            </span>
            <span>
              <SvgIcon name="arrow" class="text-secondary" />
            </span>
          </a>
          <!-- <a class="p-2 d-flex justify-content-between nav-link nav-link--free">
            <span class="d-flex align-items-center">
              <SvgIcon name="code" class="text-primary less-medium-icon" />
              <span class="ml-2 text-secondary">CSI Codes</span>
            </span>
            <span>
              <SvgIcon name="arrow" class="text-secondary" />
            </span>
          </a> -->
        </div>
      </template>
    </b-dropdown>
    <div class="row mt-3">
      <div class="col-12">
        <div class="card page-content">
          <div class="table-block">
            <div
              class="position-sticky table-block__head px-3 d-flex align-items-center justify-content-between"
              style="top: 0"
            >
              <div class="table-block__title d-flex align-items-center w-100">
                <div style="width: 16px"></div>
                <div class="w-90">
                  {{ $t('pages.estimatesPage.item.details.fields.item') }}
                </div>
                <div class="w-10">
                  {{ $t('pages.estimatesPage.item.details.fields.totalPrice') }}
                </div>
              </div>
              <div></div>
            </div>
            <div
              class="table-block__content attachments-block__content px-0 mt-3 row aside-padding"
            >
              <div class="col-12">
                <div class="row mt-n3">
                  <div class="col-12 px-5">
                    <div
                      v-for="(item, i) in folders"
                      :key="`item-folder-select-${i}`"
                    >
                      <Item :item="item" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="row mt-n3">
                  <div class="col-12 px-5">
                    <Item
                      v-for="(item, i) in items"
                      :key="`item-element-top-${i}`"
                      :item="item"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="table-block__footer-summary col-6">
              <div class="d-flex align-items-center col-6">
                <div class="f-18">Total price:</div>
                <div class="f-18">$ {{ price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreateItemModal
      :id="`estimate_create_item_${type}_modal`"
      :items="items"
      :folders="folders"
      @save="save"
      @save-folder="saveFolders"
    />
  </div>
</template>

<script>
import * as _ from 'lodash'
export default {
  components: {
    Item: () => import('~/components/Pages/Estimates/Item'),
    CreateItemModal: () =>
      import('~/components/Modals/Estimates/CreateItemModal'),
  },
  props: {
    content: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    final: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: 'initial',
    },
  },
  data() {
    return {
      folders: [
        {
          folder: true,
          title: 'Kitchen',
          items: [],
        },
        {
          folder: true,
          title: 'Living room',
          items: [],
        },
        {
          folder: true,
          title: 'Bathroom',
          items: [],
        },
      ],
      price: 0,
      sum: [0, 0],
      items: [
        {
          title: 'General',
          code: '01.00.00.00',
          lvl: 1,
          parent: [1, 0, 0, 0],
          price: 100,
          items: [
            {
              title: 'Furniture/Hung Items Management',
              code: '01.20.0.00',
              lvl: 2,
              parent: [1, 20, 0, 0],
              price: 100,
            },
            {
              title: 'Interior Surface Protection',
              code: '01.30.00.00',
              lvl: 2,
              parent: [1, 30, 0, 0],
              price: 100,
            },
          ],
        },
      ],
    }
  },
  watch: {
    folders() {
      this.$emit('convert-folders', this.folders)
    },
  },
  mounted() {
    this.totalPrice(this.items, 1)
    this.$emit('convert-folders', this.folders)
  },
  methods: {
    save(data) {
      console.log(data)
      if (data.length > 0) this.items = _.cloneDeep(data)
      else this.items = []
      if (data !== undefined && data.length > 0) this.totalPrice(data, 1)
    },
    saveFolders(data) {
      const itemList = []
      if (data.length > 0) this.folders = _.cloneDeep(data)
      data.forEach(function (elem, i) {
        if (elem.items) {
          elem.items.forEach(function (elem) {
            itemList.push(elem)
          })
        }
      })
      this.totalPrice(itemList, 2)
    },
    removeItem(item) {
      delete item.items
      delete item.code
      delete item.title
      delete item.folder
    },
    totalPrice(items, type) {
      let price = 0
      let childElements = []
      if (items.length > 0 && items !== undefined) {
        items.forEach(function (elem) {
          if (elem !== undefined && elem.items) {
            elem.items.forEach(function (elem) {
              if (elem !== undefined && elem.items) {
                elem.items.forEach(function (elem) {
                  if (elem !== undefined && elem.items) {
                    elem.items.forEach(function (elem) {
                      if (!elem.items) childElements.push(elem)
                    })
                  } else {
                    childElements.push(elem)
                  }
                })
              } else {
                childElements.push(elem)
              }
            })
          } else {
            childElements.push(elem)
          }
        })
      }

      childElements.forEach(function (elem) {
        if (elem !== undefined && elem.price && elem.title) {
          price = price + elem.price
        }
      })
      if (type === 1) this.sum[0] = price
      if (type === 2) this.sum[1] = price

      childElements = []

      this.price = this.sum[0] + this.sum[1]
    },
  },
}
</script>

<style lang="scss">
.page-content {
  height: calc(100vh - 1.5rem - 48px - 3rem + 32px - 56px - 3rem - 45px);
  overflow: auto;
  margin-bottom: -1.5rem;
  scrollbar-color: #e4e4e4 transparent;
  scrollbar-width: thin;
}
.table-block__footer-summary {
  position: fixed;
  background: snow;
  bottom: 10px;
}
.f-18 {
  margin: 1%;
}
</style>
