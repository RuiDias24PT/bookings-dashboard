<template>
    <div class="flex items-center justify-between px-6 py-4">
        <div class="flex gap-4 items-center">
            <h1 class="text-xl font-semibold">
                Bookings Dashboard
            </h1>
            <div class="flex items-center gap-2">
                <InputSwitch v-model="pauseLiveUpdates" />
                <span>{{ pauseLiveUpdates ? 'Pause Live Updates' : 'Resume Live Updates' }}</span>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <InputSwitch v-model="darkMode" />
            <span>{{ darkMode ? 'Dark Mode' : 'Light Mode' }}</span>
        </div>
    </div>

    <div class="container mx-auto px-6 py-6">
        <div class="flex gap-6">
            <div class="w-1/2">
                <SuppliersDatable />
            </div>
            <div class="w-1/2">
                <BookingsDatatable />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SuppliersDatable from '../components/SuppliersDatable.vue';
import BookingsDatatable from '../components/BookingsDatatable.vue';

const darkMode = ref(false);
const pauseLiveUpdates = ref(false);
</script>

<style scoped></style>
