<template>
    <DashboardHeader v-model:pauseLiveUpdates="pauseLiveUpdates" v-model:darkMode="darkMode">
        <template #title>Bookings Dashboard</template>
    </DashboardHeader>

    <DashboardTables :suppliers="suppliers" :bookings="bookings"/>

    <AnalyticsPanel :analytics="analytics" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AnalyticsPanel from '../components/AnalyticsPanel.vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardTables from '../components/DashboardTables.vue';

const darkMode = ref(false);
const pauseLiveUpdates = ref(false);

const bookings = ref([]);
const suppliers = ref([]);
const analytics = ref({
    topSuppliers: [],
    topCountries: [],
    avgPricePerCountry: []
});

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

const fetchAnalytics = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/analytics');
        analytics.value = {
            topSuppliers: data.topSuppliers || [],
            topCountries: data.topCountries || [],
            avgPricePerCountry: data.avgPricePerCountry || []
        };
    } catch (err) {
        console.error(err);
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
