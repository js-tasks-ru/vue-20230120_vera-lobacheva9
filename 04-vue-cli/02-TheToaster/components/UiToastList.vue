<template>
  <div class="toasts">
    <UiToast 
      v-for="toast in toasts" 
      :kind="toast.kind" 
      :key="toast.id"
      :id="toast.id"
      :removeItemCallback="removeItemCallback"
    >
      {{ toast.message }}
    </UiToast>
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'UiToastList',

  components: { 
    UiToast,
  },

  props: {
    toasts: {
      required: true,
      type: Array,
    },
    removeItemCallback: {
      required: false,
      default: null,
      type: Function,
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
