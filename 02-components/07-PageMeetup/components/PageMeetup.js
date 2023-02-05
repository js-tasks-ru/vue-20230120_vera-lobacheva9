import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  data: () => {
    return {
      meetup: null,
      error: null,
      loading: true,
    }
  },

  props: {
    meetupId: {
      required: true,
      type: Number,
    },
  },

  watch: {
    meetupId: {
      handler: function() {
        this.loading = true;
        this.meetup = null;
        this.error = null;

        fetchMeetupById(this.meetupId).then((result) => {
          this.meetup = result;
          this.loading = false;
        }).catch((error) => {
          this.error = error.message;
          this.loading = false;
        });
      },
      immediate: true,
    }
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />

      <UiContainer v-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>

    </div>`,
});
