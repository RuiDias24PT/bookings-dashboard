<template>
    <DashboardHeader v-model:pauseLiveUpdates="pauseLiveUpdates" v-model:darkMode="darkMode">
        <template #title>Bookings Dashboard</template>
    </DashboardHeader>

    <div class="container mx-auto px-6 py-6">
        <div class="flex gap-6">
            <div class="w-1/2">
                <WDatable :data="suppliers" :columns="supplierColumns" />
            </div>
            <div class="w-1/2">
                <WDatable :data="bookings" :columns="bookingColumns" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import WDatable from '../components/WDatable.vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import axios from 'axios';
const darkMode = ref(false);
const pauseLiveUpdates = ref(false);

const bookings = ref([]);
const suppliers = ref([]);

const bookingColumns = [
    { field: 'customer', header: 'Customer', sortable: true, filter: true, filterPlaceholder: 'Search by customer' },
    { field: 'supplierId', header: 'Supplier ID', sortable: true, filter: true, filterPlaceholder: 'Search by supplier' },
    { field: 'country', header: 'Country', sortable: true, filter: true, filterPlaceholder: 'Search by country' },
    { field: 'note', header: 'Note' },
    { field: 'price', header: 'Price', sortable: true, filter: true, filterPlaceholder: 'Search by price' }
];

const supplierColumns = [
    { field: 'name', header: 'Name', sortable: true, filter: true, filterPlaceholder: 'Search by name' },
    { field: 'country', header: 'Country', sortable: true, filter: true, filterPlaceholder: 'Search by country' },
    { field: 'rating', header: 'Rating', sortable: true }
];

const fetchBookings = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/bookings');
        bookings.value = data;
    } catch (err) {
        console.error(err);
    }
};

const fetchSuppliers = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/suppliers');
        suppliers.value = data;
    } catch (err) {
        console.error(err);
    }
};

onMounted(() => {
    fetchBookings();
    fetchSuppliers();
});

</script>

<style scoped></style>
