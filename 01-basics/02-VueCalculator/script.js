import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
    name: 'App',

    data: () => {
        return {
            leftOperand: null,
            rightOperand: null,
            operator: null,
        }
    },

    computed: {
        result: function() {
            return this.calc();
        },
    },

    methods: {
        calc() {
            if (this.leftOperand === null || this.rightOperand === null) {
                return null;
            }

            switch (this.operator) {
                case 'sum':
                    return this.leftOperand + this.rightOperand;
                case 'subtract':
                    return this.leftOperand - this.rightOperand;
                case 'multiply':
                    return this.leftOperand * this.rightOperand;
                case 'divide':
                    return this.leftOperand / this.rightOperand;
                default:
                    return null;
            }
                
        }
    },

});

const app = createApp(App);
app.mount('#app');
