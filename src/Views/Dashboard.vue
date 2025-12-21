<template>
    <DashboardHeader>
        <template #title>Bookings Dashboard</template>
    </DashboardHeader>

    <DashboardTables :suppliers="suppliers" :bookings="bookings" :loadingSuppliers="loading.suppliers"
        :loadingBookings="loading.bookings" />

    <AnalyticsPanel :analytics="analytics" :loading="loading.analytics" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AnalyticsPanel from '../components/AnalyticsPanel.vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardTables from '../components/DashboardTables.vue';


const bookings = ref([]);
const suppliers = ref([]);
const analytics = ref({
    topSuppliers: [],
    topCountries: [],
    avgPricePerCountry: []
});
const loading = ref({
    bookings: false,
    suppliers: false,
    analytics: false
});

const fetchBookings = async () => {
    loading.value.bookings = true;
    //Wait time to simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        const { data } = await axios.get('http://localhost:3000/bookings');
        bookings.value = data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value.bookings = false;
    }
};

const fetchSuppliers = async () => {
    loading.value.suppliers = true;
    //Wait time to simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        const { data } = await axios.get('http://localhost:3000/suppliers');
        suppliers.value = data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value.suppliers = false;
    }
};

const fetchAnalytics = async () => {
    loading.value.analytics = true;
    //Wait time to simulate loading
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
        const { data } = await axios.get('http://localhost:3000/analytics');
        analytics.value = {
            topSuppliers: data.topSuppliers || [],
            topCountries: data.topCountries || [],
            avgPricePerCountry: data.avgPricePerCountry || []
        };
    } catch (err) {
        console.error(err);
    } finally {
        loading.value.analytics = false;
    }
};

onMounted(() => {
    fetchBookings();
    fetchSuppliers();
    fetchAnalytics();
});
</script>

<style scoped>
</style>
