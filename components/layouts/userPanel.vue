<template>
  <div class="userpanel d-flex justify-content-between py-3">
    <template v-if="loaded">
      <template v-if="currentUser">
        <div class="d-flex flex-column">
          <div class="userpanel__name">
            {{ currentUser.name }} {{ currentUser.last_name }}
          </div>
          <div class="userpanel__role">{{ primaryRole }}</div>
        </div>
        <div class="d-flex flex-column align-items-end ml-3">
          <div class="notification text-primary position-relative">
            <SvgIcon name="bell" />
            <!-- <span class="notification__status"></span> -->
          </div>
          <div>
            <b-dropdown
              size="lg"
              dropright
              variant="link"
              menu-class="animate__animated animate__fadeIn animate__faster"
              toggle-class="outline-none p-0 text-decoration-none text-secondary"
              no-caret
            >
              <template #button-content>
                <div
                  class="d-flex flex-column align-items-center justify-content-center"
                >
                  <SvgIcon name="dots" />
                </div>
              </template>
              <b-dropdown-item to="/settings">
                <div class="d-flex align-items-center">
                  <SvgIcon name="settings" class="little-icon" />
                  <span class="ml-2">
                    {{ $t('pages.accountSettingsPage.title') }}
                  </span>
                </div>
              </b-dropdown-item>
              <b-dropdown-item @click="logout">
                <div class="d-flex align-items-center">
                  <SvgIcon name="logout" class="little-icon" />
                  <span class="ml-2">{{ $t('layout.userPanel.logout') }}</span>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </template>
      <template v-else>
        <NuxtLink to="/login" class="btn btn-primary">
          {{ $t('layout.userPanel.login') }}
        </NuxtLink>
      </template>
    </template>
    <div v-else class="d-flex align-items-center h-100">
      <b-spinner
        class="load"
        small
        variant="light"
        label="Loading..."
      ></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser'].user
    },
    primaryRole() {
      return (
        this.currentUser?.roles[Object.keys(this.currentUser.roles)[0]]
          ?.title || '-'
      )
    },
  },
  mounted() {
    this.loaded = true
  },
  methods: {
    logout() {
      if (this.currentUser) {
        this.$cookies.remove('token')
        this.$store.dispatch('user/logout')
        this.$toast.success('You are signed out')
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style lang="scss">
.userpanel {
  &__name {
    color: #1a051d;
    font-weight: 600;
    text-align: right;
  }

  &__role {
    text-align: right;
    color: #848484;
  }
}

.notification {
  &__status {
    background: #f7685b;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    position: absolute;
    top: 1px;
    right: -2px;
    border: 2px solid #fff;
  }
}
</style>
