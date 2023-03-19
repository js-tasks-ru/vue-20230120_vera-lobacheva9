<template>
  <UiCalendarView v-slot="{ shortDate }">
    <UiCalendarEvent v-for="meetup in dateByMeetups.get(shortDate)" :key="meetup.id" tag="a" :href="`/meetups/${meetup.id}`">
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    dateByMeetups() {
      const map = new Map();
      this.meetups.forEach(item => {
        const dateKey = this.shortDateFormat(new Date(item.date));
        const dayMeetups = map.get(dateKey);
        if (!dayMeetups) {
          map.set(dateKey, [item]);
        } else {
          dayMeetups.push(item);
        }
      });
      return map;
    },
  },

  methods: {
    shortDateFormat(date) {
      const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
      const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
      return `${day}-${month}-${date.getFullYear()}`;
    },
  },

};
</script>

<style scoped></style>
