<template>
  <div>
    <Header :title="title" @prev-btn="prevBtn" />
    <div class="col-12 col-lg-12">
      <label>Street</label>
      <input
        v-model="street"
        type="text"
        class="form-control"
        placeholder="Street"
      />
    </div>

    <div class="col-12 col-lg-12">
      <label>Address</label>
      <input
        v-model="address"
        type="text"
        class="form-control"
        placeholder="Address"
      />
    </div>

    <div class="col-12 col-lg-12">
      <label>City</label>
      <input
        v-model="city"
        type="text"
        class="form-control"
        placeholder="City"
      />
    </div>
    <div class="col-12 col-lg-12">
      <label>State</label>
      <multiselect
        v-model="state"
        :options="states"
        placeholder="Select state"
      />
    </div>
    <div class="col-12 col-lg-12 mt-4">
      <label>Zip</label>
      <input
        v-model="zip"
        type="text"
        minlength="1"
        maxlength="9"
        class="form-control"
        placeholder="Enter a zip"
      />
    </div>
  </div>
</template>
<script>
import states from '~/data/states'
export default {
  components: {
    Header: () => import('~/components/Pages/InitialForm/Header'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      states,
      address: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      form: {},
    }
  },
  watch: {
    address() {
      this.form.address = this.address
      this.$emit('address-data', this.form)
    },
    street() {
      this.form.street = this.street
      this.$emit('address-data', this.form)
    },
    city() {
      this.form.city = this.city
      this.$emit('address-data', this.form)
    },
    state() {
      this.form.state = this.state
      this.$emit('address-data', this.form)
    },
    zip() {
      this.form.zip = this.zip
      this.$emit('address-data', this.form)
    },
  },
  methods: {
    prevBtn() {
      this.$emit('prev-btn')
    },
  },
}
</script>
<style scoped>
.form-group H2 {
  text-align: center;
  margin-bottom: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
  width: 100% !important;
}
.form-group input {
  margin-bottom: 35px;
}
.title-form {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.title-form img {
  margin-right: 190px;
}
.line-title {
  height: 1px;
  width: 95%;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #0099ff 27.92%,
    #0097fb 77.88%,
    #ffffff 101.4%
  );
}
</style>
