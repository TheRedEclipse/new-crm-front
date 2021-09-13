<template>
  <div class="component">
    <div class="title-form">
      <h2>{{ title }}</h2>
      <div class="line-title"></div>
    </div>
    <div class="col-12 col-lg-12">
      <label>First Name</label>
      <input
        v-model="form.name"
        type="text"
        class="form-control"
        placeholder="First name"
        :disabled="inputCheck"
      />
    </div>

    <div class="col-12 col-lg-12">
      <label>Last Name</label>
      <input
        v-model="form.last_name"
        type="text"
        class="form-control"
        placeholder="Last Name"
        :disabled="inputCheck"
      />
    </div>

    <div class="col-12 col-lg-12">
      <label>Email</label>
      <input
        v-model="form.email"
        type="text"
        class="form-control"
        placeholder="Email"
        :disabled="inputCheck"
      />
    </div>
    <div class="col-12 col-lg-12">
      <label>Phone</label>
      <input
        v-model="form.phone"
        type="text"
        class="form-control"
        placeholder="Phone"
        :disabled="inputCheck"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    lead: {
      type: Object,
      require: false,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      form: {
        new_lead: true,
      },
    }
  },
  computed: {
    inputCheck() {
      return Boolean(this.lead.user_id)
    },
  },
  watch: {
    form() {
      this.$emit('personal-data', this.form)
    },
  },
  mounted() {
    // this.form = { ...this.lead, ...this.lead?.user }
    this.form.name = this.lead?.user?.name
    this.form.last_name = this.lead?.user?.last_name
    this.form.phone = this.lead?.phone
    this.form.email = this.lead?.user?.email
    this.form.id = this.lead?.id
    this.form.user_id = this.lead?.user_id
    this.$emit('personal-data', this.form)
  },
}
</script>

<style scoped>
.component {
  width: 100%;
}
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group div {
  margin-bottom: 35px;
}
.title-form {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.title-form img {
  margin-right: 190px;
}
.line-title {
  height: 1px;
  width: 100%;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #0099ff 27.92%,
    #0097fb 77.88%,
    #ffffff 101.4%
  );
}
</style>
