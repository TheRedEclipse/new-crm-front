<template>
  <div class="sidebar h-100">
    <div class="d-flex flex-row align-items-center">
      <div class="w-100">
        <ul class="admin-panel-menu">
          <h1>Admin Panel</h1>
          <NuxtLink to="/control/cms"><li>Global config</li></NuxtLink>
          <NuxtLink to="/control/cms/pages"><li>Pages</li></NuxtLink>
          <NuxtLink to="/control/cms/reviews"><li>Reviews</li></NuxtLink>
          <b-dropdown
            id="link-dropdown"
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <li>Settings</li>
            </template>
            <b-dropdown-item href="/control/cms/settings/slider-content"
              >Sliders and Carousels</b-dropdown-item
            >
            <b-dropdown-item href="/control/cms/settings/advantages"
              >Advantages</b-dropdown-item
            >
            <b-dropdown-item href="/control/cms/settings/services"
              >Services</b-dropdown-item
            >
            <b-dropdown-item href="/control/cms/settings/rooms"
              >Rooms</b-dropdown-item
            >
          </b-dropdown>
        </ul>
      </div>
      <div class="user-panel">
        <UserPanel />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { BDropdown } from 'bootstrap-vue'
Vue.component('b-dropdown', BDropdown)
export default {
  components: {
    UserPanel: () => import('~/components/layouts/userPanel'),
    // Logo: () => import('~/components/layouts/logo'),
    // Navigation: () => import('~/components/layouts/navigation'),
  },
}
</script>

<style scoped>
.sidebar {
  width: 100%;
  background: linear-gradient(90deg, #53b3f3 0%, #0570cf 88.92%, #0068c9 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.admin-panel-menu {
  display: flex;
  color: #fff;
  padding: 10px;
  align-items: center;
  margin-left: 10px;
}
.admin-panel-menu li {
  font-size: 18px;
  margin-left: 30px;
  border: 2px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  text-decoration: none !important;
}
.admin-panel-menu li:hover {
  border-bottom: 2px solid #fff;
}
#link-dropdown li {
  color: rgb(255, 255, 255) !important;
}
.user-panel {
  width: 300px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
}
a {
  text-decoration: none;
  color: rgb(255, 255, 255) !important;
}
a:hover {
  text-decoration: none;
}
</style>
