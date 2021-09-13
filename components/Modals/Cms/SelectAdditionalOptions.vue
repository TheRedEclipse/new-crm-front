<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    :id="id"
    size="xl"
    title-class="text-left"
    title="Select Additional Items"
  >
    <div class="row d-flex flex-wrap-wrap justify-content-center col-12">
      <div
        v-for="item in additional"
        :key="item.id"
        class="material"
        style="width: 300px; padding: 10px"
      >
        <b-form-checkbox
          :id="`checkbox-${item.id}`"
          v-model="selected"
          name="checkbox-1"
          :value="item"
          unchecked-value="not_accepted"
        >
          <div
            class="d-flex align-items-center"
            style="flex-derection: column; padding: 5px; margin: 1%"
          >
            <b-img
              v-if="item.img !== null"
              :src="item.img"
              style="border-radius: 5px; width: 100px"
              alt="Responsive image"
            />
            <span class="ml-1">{{ item.title }}</span>
          </div>
        </b-form-checkbox>
      </div>
    </div>

    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <button
          class="button button-outline-primary w-35 justify-content-center"
          @click="add"
        >
          Okey
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import { BCard, CardPlugin } from 'bootstrap-vue'

Vue.component('b-card', BCard)
Vue.use(CardPlugin)
export default {
  props: {
    id: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      selected: [],
      hardwareSelected: [],
      additionalSelected: [],
      additional: [
        {
          id: 1,
          title: 'Kitchen Sink & Faucet',
          img:
            'https://moderncitigroup.com/uploads/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_10-09-2020_192235.png.270x270_q90_box-275%2C356%2C595%2C676_crop_detail.jpg',
        },
        {
          id: 2,
          title: 'Oven',
          img:
            'https://moderncitigroup.com/uploads/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_10-09-2020_192547.png.270x270_q90_box-266%2C293%2C586%2C613_crop_detail.jpg',
        },
        {
          id: 3,
          title: 'Pendant lights',
          img:
            'https://moderncitigroup.com/uploads/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_10-09-2020_192908.png.270x270_q90_box-289%2C405%2C609%2C727_crop_detail.jpg',
        },
        {
          id: 4,
          title: 'Kitchen Sink & Faucet',
          img:
            'https://moderncitigroup.com/uploads/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_10-09-2020_192348.png.270x270_q90_box-289%2C288%2C585%2C585_crop_detail.jpg',
        },
        {
          id: 5,
          title: 'Oven',
          img:
            'https://moderncitigroup.com/uploads/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_11-09-2020_165951.png.270x270_q90_box-474%2C260%2C1092%2C879_crop_detail.jpg',
        },
        {
          id: 6,
          title: 'Pendant lights',
          img:
            'https://moderncitigroup.com/uploads/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_10-09-2020_192742.png.270x270_q90_box-141%2C233%2C461%2C554_crop_detail.jpg',
        },
        {
          id: 7,
          title: 'Oven',
          img:
            'https://moderncitigroup.com/uploads/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_11-09-2020_165951.png.270x270_q90_box-474%2C260%2C1092%2C879_crop_detail.jpg',
        },
        {
          id: 8,
          title: 'Pendant lights',
          img:
            'https://moderncitigroup.com/uploads/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_10-09-2020_192742.png.270x270_q90_box-141%2C233%2C461%2C554_crop_detail.jpg',
        },
      ],
    }
  },
  mounted() {},
  methods: {
    add() {
      this.$emit('add-options', this.selected)
      this.selected = []
      this.$bvModal.hide(this.id)
    },
  },
}
</script>
<style scoped>
.hardware-item {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  width: 100%;
  max-width: 100%;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  padding-left: 10px;
  margin: 1%;
}
.material {
  margin: 1%;
  box-shadow: 1px 4px 15px 0px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 1px 4px 15px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 1px 4px 15px 0px rgba(0, 0, 0, 0.35);
}
</style>
