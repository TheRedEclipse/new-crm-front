<template>
  <div class="component">
    <div class="title-form">
      <h2>{{ title }}</h2>
      <div class="line-title"></div>
    </div>
    <div class="col-12 col-lg-12">
      <label>First Name</label>
      <input
        v-model="firstName"
        type="text"
        class="form-control"
        placeholder=""
        disabled
      />
    </div>

    <div class="col-12 col-lg-12">
      <label>Last Name</label>
      <input
        v-model="lastName"
        type="text"
        class="form-control"
        placeholder=""
        disabled
      />
    </div>
    <div class="col-12 col-lg-12">
      <label>How Do You Like A Estimate</label>
      <multiselect
        v-model="estimation"
        :options="options"
        placeholder="Design"
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
  },
  data() {
    return {
      form: {},
      firstName: 'Joe',
      lastName: 'Walker',
      estimation: '',
      options: ['It Perfect', 'Need To Change Something'],
    }
  },
  watch: {
    firstName() {
      this.form.firstName = this.firstName
      this.$emit('first-step', this.form)
    },
    lastName() {
      this.form.lastName = this.lastName
      this.$emit('first-step', this.form)
    },
    estimation() {
      if (this.estimation != null) {
        this.form.estimation = this.estimation
        this.$emit('estimated-selector', true)
        this.$emit('first-step', this.form)
      } else this.$emit('estimated-selector', false)
    },
  },
}
</script>

<style scoped>
.component {
  width: 100%;
}
.form-group H2 {
  margin: auto;
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
