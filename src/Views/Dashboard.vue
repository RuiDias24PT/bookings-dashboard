<template>
    <DashboardHeader v-model:pauseLiveUpdates="pauseLiveUpdates" :seconds-to-refresh="secondsToRefresh">
        <template #title>Bookings Dashboard</template>
    </DashboardHeader>

    <DashboardTables :suppliers="suppliers" :bookings="bookings" :loadingSuppliers="loading.suppliers"
        :loadingBookings="loading.bookings" />

    <AnalyticsPanel :analytics="analytics" :loading="loading.analytics" />
    <Toast />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardTables from '../components/DashboardTables.vue';
import AnalyticsPanel from '../components/AnalyticsPanel.vue';
import { useAutoRefresh } from '../composables/useAutoRefresher.ts';
import { fetchWithBackoff } from '../utils/fetchwithBackoff.ts';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
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

const {
    secondsToRefresh,
    pauseLiveUpdates
} = useAutoRefresh(60, () => {
    fetchBookings()
    fetchSuppliers()
})

const fetchBookings = async () => {
    loading.value.bookings = true;
    await new Promise(r => setTimeout(r, 2000)); // simulate loading
    try {
        const { data } = await fetchWithBackoff(() =>
            axios.get('http://localhost:3000/bookings')
        )
        bookings.value = data;
    } catch (err) {
        console.error(err);
        console.error(err);
        toast.add({
            severity: 'error',
            summary: 'Failed to load bookings',
            detail: 'Please check your connection or try again later.',
            life: 3000
        });
    } finally {
        loading.value.bookings = false;
    }
};

const fetchSuppliers = async () => {
    loading.value.suppliers = true;
    await new Promise(r => setTimeout(r, 2000)); // simulate loading
    try {
        const { data } = await fetchWithBackoff(() =>
            axios.get('http://localhost:3000/suppliers')
        )
        suppliers.value = data;
    } catch (err) {
        console.error(err);
        toast.add({
            severity: 'error',
            summary: 'Failed to load suppliers',
            detail: 'Please check your connection or try again later.',
            life: 3000
        });
    } finally {
        loading.value.suppliers = false;
    }
};

const fetchAnalytics = async () => {
    loading.value.analytics = true;
    await new Promise(r => setTimeout(r, 3000)); // simulate loading
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

<style scoped></style>
