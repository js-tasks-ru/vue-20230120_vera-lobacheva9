<template>
  <UiInput :type="type" :step="step" :model-value="value" @input="input">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  emits: ['update:modelValue'],

  props: {
    type: {
      type: String,
      required: false,
      default: 'date',
      validator (value) {
        return value === 'date' || value === 'time' || value === 'datetime-local';
      },
    },
    step: {
      type: String,
      required: false,
    },
    modelValue: {
      type: [Number, null],
      required: false,
      default: null,
    },
  },

  computed: {
    value() {
      if (!this.modelValue) {
        return '';
      }
      const isoDate = new Date(this.modelValue).toISOString();
      if (this.type === 'date') {
        return isoDate.split('T')[0];
      }
      if (this.type === 'datetime-local') {
        return isoDate.split('.')[0];
      }
      if (this.type === 'time') {
        return isoDate.substring(11, 16);
      }
      return String(this.modelValue);
    },
  },

  methods: {
    input(e) {
      let value = e.target.value;
      if (!value) {
        value = null;
      } else {
        value = e.target.valueAsNumber;
        if (isNaN(value)) {
          value = null;
        }
      }

      this.$emit('update:modelValue', value)
    },
  },

};
</script>
