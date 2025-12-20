import { createApp } from 'vue';
import './index.css'
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import Dropdown from 'primevue/dropdown'
import Toolbar from 'primevue/toolbar'
import Card from 'primevue/card'
import InputSwitch from 'primevue/inputswitch';

const app = createApp(App);

app.use(PrimeVue);
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Button', Button)
app.component('ToggleButton', ToggleButton)
app.component('Dropdown', Dropdown)
app.component('Toolbar', Toolbar)
app.component('Card', Card)
app.component('InputSwitch', InputSwitch);
app.mount('#app');
