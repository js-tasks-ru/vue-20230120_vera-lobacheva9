<template>
  <button @click="onClick">{{ innerCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      innerCount: undefined,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler() {
        this.innerCount = this.count;
      },
    },
    innerCount: {
      handler() {
        this.$emit('update:count', this.innerCount);
      },
    },
  },
  
  methods: {
    onClick() {
      this.innerCount += 1;
    },
  },
};
</script>
