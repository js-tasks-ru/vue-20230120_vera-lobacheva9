import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
    name: 'App',

    data: () => {
        return {
            count: 0,
        }
    },

    methods: {
        increment() {
            this.count++
        }
    }

});

const app = createApp(App);
app.mount('#app');
