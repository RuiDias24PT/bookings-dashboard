<template>
    <div class="flex gap-6 mx-8">
        <Card class="basis-[30%] shrink-0">
            <template #title>
                Suppliers
            </template>
            <template #content>
                <WDatable :data="suppliers" :columns="supplierColumns" stripedRows />
            </template>
        </Card>

        <Card class="flex-1">
            <template #title>
                Bookings
            </template>
            <template #content>
                <WDatable :data="bookings" :columns="bookingColumns" stripedRows class="pb-0"/>
            </template>
        </Card>
    </div>
</template>

<script setup>
import Card from 'primevue/card';
import WDatable from '../components/WDatable.vue';

defineProps({
    suppliers: {
        type: Array,
        required: true,
        default: () => []
    },
    bookings: {
        type: Array,
        required: true,
        default: () => []
    },
});

const bookingColumns = [
    { field: 'customer', header: 'Customer' },
    { field: 'country', header: 'Country' },
    { field: 'note', header: 'Note' },
    { field: 'price', header: 'Price' }
];

const supplierColumns = [
    { field: 'name', header: 'Name' },
];
</script>

<style scoped>
    :deep(.p-datatable .p-paginator-bottom) {
        border-width: 0 !important;
    }
</style>
