<template>
    <div class="flex gap-6 mx-8">
        <Card class="basis-[30%] shrink-0">
            <template #title>Suppliers</template>

            <template #content>
                <Skeleton v-if="loadingSuppliers" height="2.5rem" class="mb-2" v-for="i in 6" :key="i" />

                <WDatable v-else :data="suppliers" :columns="supplierColumns" stripedRows selectionMode="single"
                    v-model:selection="selectedSupplier" dataKey="id" />
            </template>
        </Card>

        <Card class="flex-1">
            <template #title>
                <span v-if="selectedSupplier">
                    Bookings — {{ selectedSupplier.name }}
                </span>
                <span v-else class="text-gray-400">Bookings</span>
            </template>

            <template #content>
                <Skeleton v-if="loadingBookings" height="2.5rem" class="mb-2" v-for="i in 6" :key="i" />

                <div v-else-if="!selectedSupplier" class="flex items-center justify-center h-40 text-gray-500">
                    Select a supplier to view bookings
                </div>

                <DataTable v-else-if="filteredBookings.length" v-model:editingRows="editingRows"
                    :value="localBookings"
                    dataKey="id" editMode="row"
                    @row-edit-save="saveBooking" @row-edit-cancel="cancelEdit">
                    <Column field="customer" header="Customer">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" :input-style="{ maxWidth: '6rem' }" />
                        </template>
                    </Column>

                    <Column field="country" header="Country">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" :input-style="{ maxWidth: '6rem' }" />
                        </template>
                    </Column>

                    <Column field="note" header="Note">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" :input-style="{ maxWidth: '6rem' }" />
                        </template>
                    </Column>

                    <Column field="price" header="Price">
                        <template #body="slotProps">
                            {{ formatEuro(slotProps.data.price) }}
                        </template>
                        <template #editor="{ data, field }">
                            <InputNumber v-model="data[field]" mode="currency" currency="EUR" locale="de-DE"
                                :input-style="{ maxWidth: '6rem' }" />
                        </template>
                    </Column>

                    <Column :rowEditor="true"/>
                </DataTable>

                <div v-else class="flex items-center justify-center h-40 text-gray-400">
                    No bookings for this supplier
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import WDatable from '../components/WDatable.vue';
import { useToast } from 'primevue/usetoast';
import { apiService } from '../services/apiService';
import { ref, computed, watch } from 'vue';
import { formatEuro } from '../utils/formatCurrency.ts';

const emit = defineEmits(['update:booking']);

const props = defineProps({
    suppliers: { type: Array, required: true, default: () => [] },
    bookings: { type: Array, required: true, default: () => [] },
    loadingSuppliers: { type: Boolean, default: false },
    loadingBookings: { type: Boolean, default: false }
});
const toast = useToast();
const selectedSupplier = ref(null);
const editingRows = ref([]);
const supplierColumns = [
    { field: 'name', header: 'Name', sortable: true }
];
const localBookings = ref([]);

const filteredBookings = computed(() => {
    if (!selectedSupplier.value) return [];
    return props.bookings.filter(
        booking => booking.supplierId === selectedSupplier.value.id
    );
});

watch(
    () => filteredBookings.value,
    (val) => {
        const editingIds = editingRows.value.map(row => row.id);

        localBookings.value = val.map(b => {
            const localEdit = localBookings.value.find(lb => lb.id === b.id && editingIds.includes(lb.id));
            return localEdit ? localEdit : { ...b };
        });
    },
    { immediate: true }
);

const saveBooking = async (event) => {
    const booking = event.newData;
    try {
        await apiService.update(booking);
        emit('update:booking', { ...booking });
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Failed to edit booking',
            detail: 'Please check your connection or try again later.',
            life: 3000
        });
        console.error('Failed to update booking', err);
    }
};

const cancelEdit = (event) => {
    const booking = event.data;
    const original = filteredBookings.value.find(b => b.id === booking.id);
    if (original) {
        Object.assign(booking, original);
    }
};
</script>

<style scoped>
:deep(.p-datatable .p-paginator-bottom) {
    border-width: 0 !important;
}
</style>
