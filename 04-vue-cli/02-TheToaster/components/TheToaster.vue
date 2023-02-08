<template>
  <UiToastList :removeItemCallback="(id) => this.removeToastById(id)" :toasts="toasts" />
</template>

<script>
import UiToastList from './UiToastList.vue';

const defaultTtlMs = 5000;

export default {
  name: 'TheToaster',

  components: {
    UiToastList,
  },

  data: function() {
    return {
      toasts: [],
    };
  },

  methods: {
    error: function(message) {
      this.pushToast('error', message, 2000);
    },
    success: function(message) {
      this.pushToast('success', message);
    },
    pushToast: function (kind, message, ttl=defaultTtlMs) {
      const id = Date.now();
      this.toasts.push({
        id,
        kind,
        message,
        ttl,
      });
      setTimeout(() => {
        this.removeToastById(id);
      }, ttl);
    },
    removeToastById: function(id) {
      const index = this.toasts.findIndex((item) => item.id === id);
      if (index > -1) {
        this.toasts.splice(index, 1);
      }
    },
  },

};
</script>
