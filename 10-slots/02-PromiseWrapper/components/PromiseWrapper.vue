<template>
  <slot :name="tplName" :result="result" :error="error" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      tplName: null,
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      handler(newValue, oldValue) {
        this.tplName = 'pending';
        this.promise.then((data) => {
          this.tplName = 'fulfilled';
          this.result = data;
        }).catch((error) => {
          this.tplName = 'rejected';
          this.error = error;
        });
      },
      immediate: true,
    }
  },

};
</script>
