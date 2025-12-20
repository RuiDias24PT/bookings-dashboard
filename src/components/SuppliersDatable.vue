<template>
    <div class="card">
        <h3>Suppliers</h3>

        <span>
            <input type="text" pInputText placeholder="Search suppliers..." v-model="globalFilter" />
        </span>

        <DataTable :value="suppliers" paginator :rows="5" dataKey="id" :loading="loading" removableSort scrollable :filters="filters" filterDisplay="row">
            <Column field="name" header="Supplier Name" sortable filter filterPlaceholder="Search by name" />
        </DataTable>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import axios from 'axios'

const suppliers = ref([]);
const loading = ref(false);
const globalFilter = ref('');

const filters = ref({
    global: { value: null, matchMode: 'contains' }
});

watch(globalFilter, (val) => {
    filters.value.global.value = val;
});

const fetchSuppliers = async () => {
    loading.value = true;
    try {
        const { data } = await axios.get('http://localhost:3000/suppliers');
        suppliers.value = data;
    } catch (err) {
        console.error('Failed to fetch suppliers', err);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchSuppliers);
</script>

<style>
</style>
