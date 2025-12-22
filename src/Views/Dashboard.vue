<template>
    <DashboardHeader v-model:pauseLiveUpdates="pauseLiveUpdates" :seconds-to-refresh="secondsToRefresh">
        <template #title>Bookings Dashboard</template>
    </DashboardHeader>

    <DashboardTables :suppliers="suppliers" :bookings="bookings" :loadingSuppliers="loading.suppliers"
        :loadingBookings="loading.bookings" />

    <AnalyticsPanel :analytics="analytics" :loading="loading.analytics" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardTables from '../components/DashboardTables.vue';
import AnalyticsPanel from '../components/AnalyticsPanel.vue';

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

const pauseLiveUpdates = ref(false);

const secondsToRefresh = ref(60);
const refreshInterval = ref(null);
const countdownInterval = ref(null);

const isTabActive = ref(!document.hidden);

const handleVisibilityChange = () => {
    isTabActive.value = !document.hidden;
};

const fetchBookings = async () => {
    loading.value.bookings = true;
    await new Promise(r => setTimeout(r, 2000)); // simulate loading
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
    await new Promise(r => setTimeout(r, 2000)); // simulate loading
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

const startAutoRefresh = () => {
    if (refreshInterval.value) return;

    refreshInterval.value = setInterval(() => {
        if (!isTabActive.value || pauseLiveUpdates.value) return;

        fetchBookings();
        fetchSuppliers();
        secondsToRefresh.value = 60;
    }, 60_000);
};

const stopAutoRefresh = () => {
    if (refreshInterval.value) {
        clearInterval(refreshInterval.value);
        refreshInterval.value = null;
    }
};

const startCountdown = () => {
    if (countdownInterval.value) return;

    secondsToRefresh.value = 60;
    countdownInterval.value = setInterval(() => {
        if (!isTabActive.value || pauseLiveUpdates.value) return;

        if (secondsToRefresh.value > 0) {
            secondsToRefresh.value--;
        }
    }, 1000);
};

const stopCountdown = () => {
    if (countdownInterval.value) {
        clearInterval(countdownInterval.value);
        countdownInterval.value = null;
    }
};

onMounted(() => {
    fetchBookings();
    fetchSuppliers();
    fetchAnalytics();

    startAutoRefresh();
    startCountdown();

    document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
    stopAutoRefresh();
    stopCountdown();

    document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<style scoped></style>
