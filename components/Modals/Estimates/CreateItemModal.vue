<template>
  <b-modal
    :id="id"
    size="xxl"
    title-class="text-center"
    title="Edit line items"
    hide-footer
    centered
    class="estimate-create-item"
  >
    <div class="row d-flex justify-content-center my-4">
      <div class="col-12 col-lg-4 estimate-create-item__block">
        <div class="col-12 col-lg-4">Levels</div>
        <AviableItem
          v-for="(item, i) in itemsCsi"
          :key="`item-element-top-${i}`"
          :item="item"
          @selected-csi="selectedCsi"
          @close-csi="closeCsi"
        />
      </div>
      <div
        class="col-12 col-lg-4"
        style="max-height: calc(100vh - 20rem); overflow-y: auto"
      >
        <div class="col-12 col-lg-4">Line Items</div>
        <SelectableItem
          v-for="(item, i) in outputCsi"
          :key="`item-element-select-${i}`"
          :item="item"
          @add-csi="addCsi"
        />
      </div>
      <div
        class="col-12 col-lg-4"
        style="max-height: calc(100vh - 20rem); overflow-y: auto"
      >
        <CreateCsi @create-folder="CreateFolder" @edit="edit" />
        <div v-for="(item, i) in folders" :key="`item-folder-select-${i}`">
          <draggable
            class="list-group"
            :list="item.items"
            group="folders"
            @change="onEnd(item.items)"
          >
            <FoldersItem :item="item" />
          </draggable>
        </div>
        <!-- <span @click="debuger">test</span> -->
        <div
          class="col-12 col-lg-12"
          style="max-height: calc(100vh - 20rem); overflow-y: auto"
        >
          <draggable class="list-group" :list="insertCsi" group="folders">
            <div>
              <ViewEstimate
                v-for="(item, i) in insertCsi"
                :key="`item-element-select-${i}`"
                :item="item"
                :list="insertCsi"
              />
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import * as _ from 'lodash'
import draggable from 'vuedraggable'
export default {
  components: {
    AviableItem: () =>
      import('~/components/Pages/Estimates/CreateItem/AviableItem'),
    SelectableItem: () =>
      import('~/components/Pages/Estimates/CreateItem/SelectableItem'),
    ViewEstimate: () =>
      import('~/components/Pages/Estimates/CreateItem/ViewEstimate'),
    FoldersItem: () =>
      import('~/components/Pages/Estimates/CreateItem/FoldersItem'),
    CreateCsi: () =>
      import('~/components/Pages/Estimates/CreateItem/CreateCsi'),
    draggable,
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {
        return [{}, {}]
      },
    },
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      outputCsi: [],
      insertCsi: [
        {
          title: '',
        },
        {
          title: '',
        },
      ],
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
      demolition: null,
      general: null,
      currentItem: null,
      allCsi: [],
      itemsCsi: [
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
        {
          title: 'Demolition',
          code: '02.00.00.00',
          lvl: 1,
          parent: [2, 0, 0, 0],
          price: 100,
          items: [
            {
              title: 'Electrical Fixtures Removal',
              code: '02.10.00.00',
              lvl: 2,
              parent: [2, 10, 0, 0],
              price: 100,
              items: [
                {
                  title: 'Light Fixtures Removal',
                  code: '02.10.01.00',
                  lvl: 3,
                  parent: [2, 10, 1, 0],
                  price: 100,
                },
                {
                  title: 'Light Switch/Outlet Removal',
                  code: '02.10.02.00',
                  lvl: 3,
                  parent: [2, 10, 2, 0],
                  price: 100,
                },
              ],
            },
            {
              title: 'Plumbing Appliances Disconnect/Removal',
              code: '02.20.00.00',
              lvl: 2,
              parent: [2, 20, 0, 0],
              price: 100,
              items: [
                {
                  title: 'Kitchen Plumbing Appliances Disconnect/Removal',
                  code: '02.20.01.00',
                  lvl: 3,
                  parent: [2, 20, 1, 0],
                  price: 100,
                },
                {
                  title: 'Bathroom Plumbing Appliances Disconnect/Removal',
                  code: '02.20.02.00',
                  lvl: 3,
                  parent: [2, 20, 2, 0],
                  price: 100,
                },
                {
                  title: 'Washer/Dryer Removal',
                  code: '02.20.02.00',
                  lvl: 3,
                  parent: [2, 20, 3, 0],
                  price: 100,
                },
                {
                  title: 'Radiator Removal',
                  code: '02.20.02.00',
                  lvl: 3,
                  parent: [2, 20, 4, 0],
                  price: 100,
                },
                {
                  title: 'Boiler Removal',
                  code: '02.20.02.00',
                  lvl: 3,
                  parent: [2, 20, 5, 0],
                  price: 100,
                },
              ],
            },
            {
              title: 'Interior Demolition',
              code: '02.30.00.00',
              lvl: 2,
              parent: [2, 30, 0, 0],
              price: 100,
              items: [
                {
                  title: 'Window A/C Unit Removal',
                  code: '02.30.02.00',
                  lvl: 3,
                  parent: [2, 30, 2, 0],
                  price: 100,
                },
                {
                  title: 'Cabinets/Shelves/Woodwork Removal',
                  code: '02.30.02.00',
                  lvl: 3,
                  parent: [2, 30, 2, 0],
                  price: 100,
                },
                {
                  title: 'Molding/Trim Demolition',
                  code: '02.30.03.00',
                  lvl: 3,
                  parent: [2, 30, 3, 0],
                  price: 100,
                },
              ],
            },
          ],
        },
      ],

      // itemsCsi: [
      //   {
      //     title: 'General',
      //     code: '01.00.00.00',
      //     lvl: 1,
      //     parent: [1, 0, 0, 0],
      //     price: 469,
      //     items: [
      //       {
      //         title: 'General blocks',
      //         code: '01.10.00.00',
      //         lvl: 2,
      //         parent: [1, 10, 0, 0],
      //         price: 469,
      //         items: [
      //           {
      //             title: 'Block 1',
      //             code: '01.10.01.00',
      //             lvl: 3,
      //             parent: [1, 10, 1, 0],
      //             price: 469,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Demolition',
      //     code: '02.00.00.00',
      //     parent: [2, 0, 0, 0],
      //     lvl: 1,
      //     price: 469,
      //     items: [
      //       {
      //         title: 'Electrical fixture removal',
      //         code: '02.10.00.00',
      //         parent: [2, 10, 0, 0],
      //         lvl: 2,
      //         price: 500,
      //       },
      //       {
      //         title: 'Plumbing appliances disconnet/removal',
      //         code: '02.20.00.00',
      //         parent: [2, 20, 0, 0],
      //         lvl: 2,
      //         price: 469,
      //         items: [
      //           {
      //             title: 'Window A/C Unit Removal',
      //             code: '02.20.01.00',
      //             parent: [2, 20, 1, 0],
      //             lvl: 3,
      //             price: 300,
      //           },
      //           {
      //             title: 'Windows',
      //             code: '02.20.02.00',
      //             parent: [2, 20, 2, 0],
      //             lvl: 3,
      //             price: 469,
      //             items: [
      //               {
      //                 title: 'Window 1',
      //                 code: '02.20.02.01',
      //                 parent: [2, 20, 2, 1],
      //                 lvl: 4,
      //                 price: 150,
      //               },
      //               {
      //                 title: 'Window 2',
      //                 code: '02.20.02.02',
      //                 parent: [2, 20, 2, 2],
      //                 lvl: 4,
      //                 price: 150,
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    }
  },
  watch: {
    insertCsi() {
      if (!this.insertCsi[0]) {
        this.demolition = null
      }
      if (!this.insertCsi[1]) {
        this.general = null
      }
    },
  },
  mounted() {
    this.linkOldData(this.items)
    this.debuger()
    const childElements = []
    this.itemsCsi.forEach(function (elem) {
      if (elem.items) {
        elem.items.forEach(function (elem) {
          if (elem.items) {
            elem.items.forEach(function (elem) {
              if (elem.items) {
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
    this.allCsi = childElements
  },
  methods: {
    dev() {
      console.log(123)
    },
    edit() {
      this.debuger()
      this.$emit('save', this.insertCsi)
      this.$emit('save-folder', this.folders)
      this.$bvModal.hide(this.id)
    },
    debuger() {
      const array = []
      console.log('debug pre', this.insertCsi)
      this.insertCsi.forEach(function (elem, i) {
        if (elem !== undefined) {
          array.push(elem)
        }
      })
      this.insertCsi = array
      console.log('debug result', this.insertCsi)
    },
    onEnd(data) {
      const codeSpace = []
      // собрать список кодов в папке
      data.forEach(function (elem) {
        codeSpace.push(elem.code)
      })
      // фильтруем список с кодами и оставляем лиш дублирующие друг друга (по родителю). В итоге получаем список веток для мерджа
      const array = codeSpace.filter((item, index) => {
        return codeSpace.indexOf(item) === index
      })
      // выбираем каждый элемент по очереди из списка для мерджа веток
      array.forEach(function (code) {
        const merge = []
        // проходимся по всей папке и находим те ветки, которые сошлись с текущим кодом
        data.forEach(function (elem, i) {
          // добавляем его в хранилище Merge
          if (elem.code === code) {
            merge.push(elem)
          }
          // ##################### в итоге имеем список с дублями для каждой папки индивидуально
        })
        // мерджим весь список одинаковых веток к самому первому элементу, попутно удаляя смердженные
        merge.forEach(function (item, i) {
          const firstMerge = merge[0]
          merge[0] = _.merge(firstMerge, item)
          if (i > 0) delete merge[i]
        })
        // в результате мы имеем одну ветку содержащую в себе все переменные и вновь добавленные (merge[0])
        // далее удаляем все ранее добавленные ветки и втыкаем новую
        data.forEach(function (item, i) {
          if (item.code === code) delete data[i]
        })
        data.push(merge[0])
      })
    },
    selectedCsi(csi) {
      const arr = _.cloneDeep(this.allCsi)
      const array = _.cloneDeep(
        arr.filter(
          (elem) =>
            elem.parent[0] === csi.parent[0] &&
            elem.parent[1] >= csi.parent[1] &&
            elem.parent[2] >= csi.parent[2] &&
            elem.parent[3] >= csi.parent[3] &&
            !elem.child
        )
      )
      const checkArr = []
      array.forEach((element) => {
        const arr = this.outputCsi.filter((item) => item.code === element.code)
        if (arr.length > 0) checkArr.push(arr)
      })
      if (checkArr.length === 0) this.outputCsi = this.outputCsi.concat(array)
    },
    closeCsi(csi) {
      const lvl = csi.lvl - 1
      const array = _.cloneDeep(
        this.outputCsi.filter((elem) => elem.parent[lvl] !== csi.parent[lvl])
      )
      this.outputCsi = array
    },
    // функция принимает в себя выбранный объект и выстраевает на основе него общее дерево родителей, параллельно скрывая из него не нужные Lvl и csi-коды
    // Эта функция поебала мне мозги в течении дня по этому было принято решение дать ей внегласное название "Охотница за партизанами",
    // название дано в честь Дивизии СС "Дирлевангер" - " Охотников за партизанами" многие считают самым страшным карательным
    // подразделением в истории Второй Мировой войны.
    addCsi(item) {
      const data = _.cloneDeep(
        this.itemsCsi.find(function (csi) {
          return csi.parent[0] === item.parent[0]
        })
      )
      this.linkOldData(this.items)
      if (data.items) {
        data.items.forEach(function (elem) {
          if (elem !== undefined && elem.parent[1] === item.parent[1]) {
            elem.hidden = false
            if (elem.items) {
              elem.items.forEach(function (elem) {
                if (elem.parent[2] === item.parent[2]) {
                  elem.hidden = false
                  if (elem.items) {
                    elem.items.forEach(function (elem) {
                      if (elem.parent[3] === item.parent[3]) {
                        elem.hidden = false
                      } else {
                        delete elem.items
                        delete elem.lvl
                        delete elem.parent
                        delete elem.code
                        delete elem.title
                        delete elem.price
                      }
                    })
                  }
                } else {
                  delete elem.items
                  delete elem.lvl
                  delete elem.parent
                  delete elem.code
                  delete elem.title
                  delete elem.price
                }
              })
            }
          } else {
            delete elem.items
            delete elem.lvl
            delete elem.parent
            delete elem.code
            delete elem.title
            delete elem.price
          }
        })
      }
      if (data.title === 'Demolition') {
        if (this.demolition === null) this.demolition = data
        else _.merge(this.demolition, data)
        this.insertCsi[0] = _.cloneDeep(this.demolition)
      }
      if (data.title === 'General') {
        if (this.general === null) this.general = data
        else _.merge(this.general, data)
        this.insertCsi[1] = _.cloneDeep(this.general)
      }
      this.insertCsi = _.cloneDeep(this.insertCsi)
    },
    linkOldData(items) {
      let general = this.general
      let demolition = this.demolition
      const insertCsi = this.insertCsi
      items.forEach(function (data) {
        if (data.title === 'Demolition') {
          if (demolition === null) demolition = data
          else _.merge(demolition, data)
          insertCsi[0] = _.cloneDeep(demolition)
        }
        if (data.title === 'General') {
          if (general === null) general = data
          else _.merge(general, data)
          insertCsi[1] = _.cloneDeep(general)
        }
      })
    },
    CreateFolder(name) {
      const data = {
        title: name,
        items: [],
        folder: true,
        images: [
          {
            img:
              'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c4b4e359965531.5a36e1edb6b7c.jpg',
          },
          {
            img:
              'https://images.ru.prom.st/382270158_w640_h640_nabor-mebeli-dlya.jpg',
          },
          {
            img:
              'https://images.ru.prom.st/743885748_w640_h640_divan-krovat-s-karetnoj.jpg',
          },
          {
            img:
              'http://www.3dmodelfree.com/imguploads/Image_0709/99893dmoxing/94/sfe.jpg',
          },
        ],
      }
      // data.items.push(this.insertCsi[0])
      this.folders.push(data)
    },
  },
}
</script>

<style lang="scss">
.estimate-create-item {
  &__block {
    border-right: 1px solid #c0c0c0;
  }
}
.indicator {
  width: 18px;
  height: 18px;
  border: 1px solid #1a051d;
  border-radius: 50%;
  color: #1a051d;

  .icon {
    width: 8px;
    height: 8px;
  }
}
</style>
