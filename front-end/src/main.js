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
import 'primeicons/primeicons.css';
import InputSwitch from 'primevue/inputswitch';
import DataView from 'primevue/dataview';
import Chart from 'primevue/chart';
import Skeleton from 'primevue/skeleton';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
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
app.component('DataView', DataView);
app.component('Chart', Chart);
app.component('Skeleton', Skeleton);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.use(ToastService);

app.mount('#app');
