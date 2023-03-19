<script>
import { compile, defineComponent, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    GeneratedComponent() {
      return defineComponent({
        name: 'GeneratedComponent',
        props: {
          bindings: Object,
        },
        components: this.components,
        render: compile(this.template),
      });
    },
  },

  render() {
    return h(
      this.GeneratedComponent,
      {
        bindings: this.bindings
      },
    );
  },
};
</script>
