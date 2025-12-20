<template>
    <div>
        <h3>Bookings</h3>

        <span>
            <input type="text" pInputText placeholder="Search bookings..." v-model="globalFilter" />
        </span>

        <DataTable :value="bookings" paginator :rows="5" dataKey="id" :loading="loading" removableSort scrollable :filters="filters" filterDisplay="row">
            <Column field="customer" header="Customer" sortable filter filterPlaceholder="Search by customer" />

            <Column field="supplierId" header="Supplier ID" sortable filter filterPlaceholder="Search by supplier" />

            <Column field="country" header="Country" sortable filter filterPlaceholder="Search by country" />

            <Column field="note" header="Note" />

            <Column field="price" header="Price" sortable filter filterPlaceholder="Search by price" />
        </DataTable>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import axios from 'axios'

const bookings = ref([])
const loading = ref(false)
const globalFilter = ref('')

const filters = ref({
    global: { value: null, matchMode: 'contains' }
})

watch(globalFilter, (val) => {
    filters.value.global.value = val
})

const fetchBookings = async () => {
    loading.value = true
    try {
        const { data } = await axios.get('http://localhost:3000/bookings')
        bookings.value = data
    } catch (err) {
        console.error('Failed to fetch bookings', err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchBookings)
</script>

<style scoped>
    .p-datatable .p-datatable-tbody>tr>td {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
    }
</style>
