<template>
  <UiToastList @remove="removeToast($event)" :toasts="Array.from(toasts.values())" />
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
      toasts: new Map(),
    };
  },

  lastId: 0,

  methods: {
    error: function(message) {
      this.pushToast('error', message);
    },
    success: function(message) {
      this.pushToast('success', message);
    },
    pushToast: function(kind, message, ttl=defaultTtlMs) {
      const id = this.$options.lastId++;
      const toast = {
        id,
        kind,
        message,
        ttl,
      };
      this.toasts.set(id, toast);
      setTimeout(() => {
        this.removeToast(id);
      }, ttl);
    },
    removeToast: function(id) {
      this.toasts.delete(id);
    },
  },

};
</script>
