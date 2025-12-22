<template>
    <div class="flex gap-6 mx-8">
        <Card class="basis-[30%] shrink-0">
            <template #title>
                Suppliers
            </template>
            
            <template #content>
                <Skeleton v-if="loadingSuppliers" height="2.5rem" class="mb-2" v-for="i in 6" :key="i" />
                <WDatable v-else :data="suppliers" :columns="supplierColumns" stripedRows />
            </template>
        </Card>

        <Card class="flex-1">
            <template #title>
                Bookings
            </template>
            <template #content>
                <Skeleton v-if="loadingBookings" height="2.5rem" class="mb-2" v-for="i in 6" :key="i" />
                <WDatable v-else :data="bookings" :columns="bookingColumns" stripedRows/>
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
    loadingSuppliers:{
        type:Boolean,
        default: false
    },
    loadingBookings: {
        type:Boolean,
        default: false
    }
});

const bookingColumns = [
    { field: 'customer', header: 'Customer', sortable: true },
    { field: 'country', header: 'Country', sortable: true },
    { field: 'note', header: 'Note', sortable: true },
    { field: 'price', header: 'Price', sortable: true }
];

const supplierColumns = [
    { field: 'name', header: 'Name', sortable: true  },
];
</script>

<style scoped>
    :deep(.p-datatable .p-paginator-bottom) {
        border-width: 0 !important;
    }
</style>
