<template>
  <div class="request-element">
    <div
      class="request-element__status-effect"
      :style="`background-color: ${data.status.color}`"
    ></div>
    <NuxtLink :to="`/leads/${data.lead.id}`" class="request-element__goto">
      <span>Lead info</span>
      <span class="request-element__goto-icon">
        <SvgIcon name="info" />
      </span>
    </NuxtLink>
    <div class="request-element__about">
      <div class="request-element__preview">
        <span
          class="request-element__question"
          :style="`background-color: ${data.status.color}`"
        >
          ?
        </span>
        <SvgIcon name="email" class="text-primary big-icon" />
      </div>
      <div class="request-element__data">
        <div class="request-element__data-header">
          <div class="request-element__data-title d-flex align-items-center">
            <span
              class="badge badge-primary"
              :style="`background-color: ${data.status.color}`"
              >#{{ data.id }}</span
            >
            <span class="ml-2">
              {{ data.user.name }} {{ data.user.last_name }}
            </span>
          </div>
          <div class="request-element__status">
            <div
              class="request-element__status-icon"
              :style="`background-color: ${data.status.color}`"
            ></div>
            <div class="request-element__status-title">
              {{ data.status.title }}
            </div>
            <a class="request-element__dropdown" @click="openModal()">
              <span>View</span>
              <SvgIcon name="arrow" />
            </a>
          </div>
        </div>
        <div class="request-element__data-content">
          <div class="request-element__info">
            <span class="request-element__info-title">Due date:</span>
            <span v-if="data.project_started_at">
              {{ $moment(data.project_started_at).format('MMMM d, Y') }}
            </span>
            <span v-else> - </span>
          </div>
          <div class="request-element__info">
            <span class="request-element__info-title">
              <SvgIcon name="call" />
            </span>
            <span>{{ data.lead.phone || '-' }}</span>
          </div>
          <div class="request-element__info">
            <span class="request-element__info-title">
              <SvgIcon name="email" />
            </span>
            <span>{{ data.user.email || '-' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dropdown: false,
    }
  },
  methods: {
    openModal() {
      this.$emit('view', this.data.id)
    },
  },
}
</script>

<style lang="scss">
.request-element {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06);
  position: relative;
  border-radius: 3px;
  overflow: hidden;

  &__question {
    color: #fff;
    font-weight: 600;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #cccccc;
    position: absolute;
    right: 14px;
    top: 16px;
    font-size: 0.8rem;
    padding-bottom: 2px;
  }

  &__about {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    display: flex;
    align-items: center;
    user-select: none;

    &--less {
      .request-element__preview {
        width: 68px;
        height: 68px;
      }

      .request-element__status {
        font-size: 14px;
      }

      .request-element__data {
        font-size: 16px;

        &-content {
          margin-top: 8px;
        }
      }
    }
  }

  &__tabs {
    padding: 0 0 5rem 8px;

    .nav-tabs {
      justify-content: space-around;
    }
  }

  &__tab-content {
    margin: 1.5rem 1.5rem -1rem 1.5rem;
  }

  & + .request-element {
    margin-top: 1.5rem;
  }

  &__status {
    display: flex;
    align-items: center;
    font-size: 15px;
    transition: 0.2s ease;

    &-icon {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #cccccc;
    }

    &-title {
      margin-left: 0.5rem;
    }

    &-effect {
      width: 4px;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      background-color: #cccccc;
    }
  }

  &__dropdown {
    transition: 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
    color: #0097fb;

    & svg {
      width: 16px;
      height: 16px;
      margin-left: 5px;
    }
  }

  &__preview {
    position: relative;
    width: 75px;
    height: 75px;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 25px;
    border: 1px solid #dfdfdf;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    margin-left: 0.3rem;
    flex-shrink: 0;
    transition: 0.2s ease;

    img {
      height: 100%;
    }
  }

  &__data {
    margin-left: 1.5rem;
    width: 100%;
    font-size: 17px;

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-title {
      font-weight: 600;
    }

    &-content {
      display: flex;
      align-items: center;
      margin-top: 10px;
      transition: 0.2s ease;
    }
  }

  &__info {
    margin-right: 2rem;
    color: #3f3356;
    font-size: 0.9375rem;

    &-title {
      color: #109ce1;
      margin-right: 5px;
    }
  }

  &__goto {
    position: absolute;
    bottom: 24px;
    right: 29px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #1a051d;

    &-icon {
      color: #0097fb;
      margin-left: 0.5rem;
      margin-top: -2px;
    }
  }
}
</style>
