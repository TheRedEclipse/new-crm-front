<template>
  <!-- dialog-class="modal-rounded" -->
  <b-modal
    id="add-advantages"
    title-class="text-left"
    size="lg"
    :title="header"
  >
    <template #modal-footer>
      <div class="d-flex justify-content-center w-100 mb-3">
        <div class="col-12">
          <div class="form-group">
            <label>Title</label>
            <input
              v-model="advantages.title"
              type="text"
              class="form-control"
              placeholder="Title advantages"
            />
          </div>
          <div class="form-group">
            <label>Advantages</label>
            <b-form-textarea v-model="advantages.text" rows="3" max-rows="6" />
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
    // LoadFileSingle: () => import('~/components/Modals/LoadFileSingle'),
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
      advantages: {},
    }
  },
  methods: {
    addImage(data) {
      this.advantages.icon = data
      this.render()
    },
    render() {
      this.componentKey += 1
    },
    deleteImage(image) {
      this.advantages.icon = null
      this.render()
    },
    modalImage(id) {
      this.$bvModal.show(id)
    },
  },
}
</script>
<style scoped>
.advantages-item {
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
.advantages-item div {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}
.advantages-item svg {
  width: 40px;
  height: 40px;
}
.advantages-item div label {
  color: #0097fb;
  font-weight: bold;
  font-size: 16px;
}
.advantages-item div small {
  margin-right: 20px;
  font-size: 12px;
  opacity: 0.5;
}
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
}
.action-advantages {
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
.action-advantages:hover {
  transition: 0.5s;
  opacity: 1;
}
.action-advantages svg {
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
