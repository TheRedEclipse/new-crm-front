<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal id="add-rooms" title-class="text-left" size="lg" :title="header">
    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <div class="col-12">
          <div class="form-group">
            <label>Title</label>
            <input
              v-model="room.title"
              type="text"
              class="form-control"
              placeholder="Title Room"
            />
          </div>
          <div :key="componentKey" class="form-group mt-3 mb-3">
            <SvgIcon
              v-if="room.icon"
              name="close"
              class="icon-big"
              @click="deleteImage(room.icon)"
            />
            <a
              class="button button-primary ml-2"
              @click="modalImage('icon_modal')"
              >Upload SVG</a
            >
            <img :src="room.icon" class="ml-3" width="100" alt="" />
            <LoadFileSingle
              :id="`icon_modal`"
              :title="`Add Icon`"
              @add-image="addImage"
            />
          </div>
        </div>
      </div>
      <button class="button button-outline-primary w-35 justify-content-center">
        Create
      </button>
    </template>
  </b-modal>
</template>

<script>
export default {
  components: {
    LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
  },
  props: {
    header: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      componentKey: 0,
      room: {},
    }
  },
  methods: {
    addImage(data) {
      this.room.icon = data
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    deleteImage(image) {
      this.room.icon = null
      this.render()
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
  },
}
</script>
<style scoped>
.room-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  height: 68px;
  width: 200px;
  background: #ffffff;
  border: 1px solid #0097fb;
  box-sizing: border-box;
  box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  margin: 10px;
}
.room-item div {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}
.room-item svg {
  width: 40px;
  height: 40px;
}
.room-item div label {
  color: #0097fb;
  font-weight: bold;
  font-size: 16px;
}
.room-item div small {
  margin-right: 20px;
  font-size: 12px;
  opacity: 0.5;
}
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
}
.action-room {
  position: relative;
  display: flex;
  top: -50px;
  justify-content: space-between !important;
  align-items: center;
  height: 50px;
  flex-direction: row !important;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  /* border-radius: 10px; */
  z-index: 99999;
  background: rgb(255, 255, 255);
  opacity: 0;
}
.action-room:hover {
  transition: 0.5s;
  opacity: 1;
}
.action-room svg {
  width: 23px;
  height: 23px;
  color: crimson;
  cursor: pointer;
}
.tab-rooms {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #007bff !important;
}
</style>
