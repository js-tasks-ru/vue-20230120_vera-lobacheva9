import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  methods: {
    increment() {
      this.$emit('update:count', this.count + 1);
    }
  },

  emits: ['update:count'],

  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
    }
  },

  template: `<button type="button" @click="increment()">{{ count }}</button>`,
});
