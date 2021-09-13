<template>
  <div class="item-walk">
    <div class="avatar"><b-img :src="item.img" class="img-item" /></div>
    <div class="contact-info">
      <div class="contact-data">
        <span class="contact-name">{{ item.name }}</span
        ><span
          v-if="item.role === 'Lead'"
          class="contact-role"
          style="color: orange"
          >({{ item.role }})</span
        >
        <span
          v-if="item.role === 'Project Manager'"
          class="contact-role"
          style="color: #007bff"
          >({{ item.role }})</span
        >
      </div>
      <div class="contact-data">
        <span class="contact-email">{{ item.email }}</span
        ><span class="contact-phone"> {{ item.phone }}</span>
      </div>
      <div class="contact-date">
        <small>Appointer at: {{ item.date }}</small>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss">
.contact-date {
  color: silver;
}
.item-walk {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.contact-name {
  font-size: 18px;
}
.contact-role {
  color: coral;
  margin-left: 15px;
}
.contact-phone {
  margin-left: 10px;
}
.img-item {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
.contact-info {
  display: flex;
  flex-direction: column !important;
}
</style>
