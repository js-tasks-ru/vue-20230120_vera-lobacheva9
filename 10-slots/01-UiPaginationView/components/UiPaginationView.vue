<template>
  <div class="pagination-container">
    <slot v-for="item in currentPageItems" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    currentPageItems() {
      return this.items.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage,
      );
    },
  },
};
</script>

<style></style>
