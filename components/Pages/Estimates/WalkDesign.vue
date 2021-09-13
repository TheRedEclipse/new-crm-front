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
      <template #button-content> </template>
    </b-dropdown>
    <div class="row mt-3">
      <div class="col-12">
        <div class="card page-content">
          <div class="table-block">
            <div
              class="table-block__content attachments-block__content px-0 mt-3 row aside-padding"
            >
              <div class="col-12">
                <div class="row mt-n3">
                  <div class="col-12 px-5">
                    <div
                      v-for="(item, i) in rooms"
                      :key="`item-folder-select-${i}`"
                    >
                      <DesignItem :item="item" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="table-block__footer-summary">
              <div class="d-flex align-items-center justify-content-between">
                <div class="f-18">Total price:</div>
                <div class="f-18">$ 500,00</div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
export default {
  components: {
    DesignItem: () => import('~/components/Pages/Estimates/DesignItem'),
  },
  props: {
    content: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    rooms: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      // rooms: [
      //   {
      //     title: 'Kitchen',
      //     items: [
      //       {
      //         img:
      //           'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c4b4e359965531.5a36e1edb6b7c.jpg',
      //       },
      //       {
      //         img:
      //           'https://images.ru.prom.st/382270158_w640_h640_nabor-mebeli-dlya.jpg',
      //       },
      //       {
      //         img:
      //           'https://images.ru.prom.st/743885748_w640_h640_divan-krovat-s-karetnoj.jpg',
      //       },
      //       {
      //         img:
      //           'http://www.3dmodelfree.com/imguploads/Image_0709/99893dmoxing/94/sfe.jpg',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Bathroom',
      //     items: [
      //       {
      //         img:
      //           'https://stayver.ru/images/downolods/%D1%87%D0%B5%D1%80%D1%82%D0%B5%D0%B6%20%D0%91%D0%B5%D0%BB%D1%8B%D0%B9%20%D1%8F%D1%81%D0%B5%D0%BD%D1%8C%20%D0%9D%D0%B5%D0%B0%D0%BF%D0%BE%D0%BB%D1%8C.jpg',
      //       },
      //       {
      //         img:
      //           'https://santehmoll.ru/wa-data/public/shop/products/98/23/222398/images/236685/236685.970.jpg',
      //       },
      //       {
      //         img:
      //           'https://novamett.ru/images/shkaf/vanuy/vaes/edvk10_thumb.jpg',
      //       },
      //       {
      //         img: 'https://stayver.ru/images/photo/17/b17-185.jpg',
      //       },
      //     ],
      //   },
      // ],
    }
  },
  methods: {
    save(data) {
      if (data.length > 0) this.items = _.cloneDeep(data)
      else this.items = []
    },
    saveFolders(data) {
      if (data.length > 0) this.folders = _.cloneDeep(data)
    },
    removeItem(item) {
      delete item.items
      delete item.code
      delete item.title
      delete item.folder
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
</style>
