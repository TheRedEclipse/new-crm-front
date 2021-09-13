<template>
  <div class="d-flex align-items-center col-12">
    View Estimate
    <div
      class="button button-primary ml-3 mb-1"
      style="height: 30px"
      @click="edit"
    >
      Save
    </div>
    <b-dropdown
      id="dropdown-aria"
      variant="primary"
      size="sm"
      pill
      class="ml-1 mb-1"
      style="height: 30px"
    >
      <b-dropdown-item-button
        v-b-modal.modal-1
        aria-describedby="dropdown-header-1"
        >Item group</b-dropdown-item-button
      >
    </b-dropdown>
    <div>
      <b-modal id="modal-1" ref="my-modal" class="mt-5" hide-footer>
        <template #modal-title>Create item group</template>
        <div class="d-block text-center">
          <p class="my-4">Please enter the name of the group</p>
          <input
            v-model="folder"
            type="text"
            class="form-control"
            placeholder="Group name"
          />
        </div>
        <button class="button button-primary mt-2" @click="createFolder">
          Create folder
        </button>
      </b-modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown: true,
      folder: '',
    }
  },
  methods: {
    createFolder() {
      this.$refs['my-modal'].hide()
      this.$emit('create-folder', this.folder)
      this.folder = ''
    },
    edit() {
      this.$emit('edit')
    },
  },
}
</script>
