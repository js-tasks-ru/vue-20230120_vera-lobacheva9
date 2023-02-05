import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      required: false,
      default: 'Meetup',
      type: String,
    },
    image: {
      required: false,
      default: null,
      type: String,
    },
  },

  template: `
    <div class="meetup-cover" :style="image ? {
      '--bg-url': 'url(' + image + ')',
    } : null">
      <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
