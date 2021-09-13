<template>
  <div class="question-item mb-3">
    <div class="question-item__header-list d-flex align-items-center">
      <div class="d-flex align-items-center">
        <div class="question-item__avatar"></div>
        <div class="ml-2">
          {{ element.created_by.name }} {{ element.created_by.last_name }}
        </div>
      </div>
      <div class="question-item__created">
        {{ $moment(element.created_at).format('MMMM d, Y in hh:mm A') }}
      </div>
    </div>
    <h3 class="h2 mt-2">{{ element.subject }}</h3>
    <div
      class="mt-3 question-item__bubble"
      v-html="handleNewLine(element.description)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleNewLine(str) {
      return str.replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
  },
}
</script>

<style lang="scss">
.question-item {
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  padding: 0.7rem;
  width: 100%;

  &__type {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  &__avatar {
    width: 20px;
    height: 20px;
    background: #dfdfdf;
    border-radius: 50%;
    background-image: url(https://media.wired.com/photos/5cdefb92b86e041493d389df/master/pass/Culture-Grumpy-Cat-487386121.jpg);
    background-size: cover;
    background-position: center;
  }

  &__header-list > div + div:before {
    content: '';
    width: 5px;
    height: 5px;
    background: #e4e4e4;
    display: inline-block;
    margin: 4px 8px 4px 10px;
    border-radius: 50%;
  }

  &__header-list {
    font-size: 0.9rem;
    color: #696969;
  }

  &__bubble {
    font-size: 15px;
    padding: 0.5rem 1rem;
    background: #fafbff;
    border-radius: 3px;
    border-left: 3px solid #0084f4;
    margin-left: 3px;
  }
}
</style>
