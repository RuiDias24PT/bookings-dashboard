<template>
    <div>
        <span class="mb-2 block">
            <input type="text" pInputText placeholder="Search..." v-model="globalFilter" />
        </span>

        <DataTable :value="data" paginator :rows="rows" removableSort scrollable :filters="filters" filterDisplay="row"
            :dataKey="dataKey" style="max-height: 18.75rem;">
            <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"
                :sortable="col.sortable ?? false" :filter="col.filter ?? false"
                :filterPlaceholder="col.filterPlaceholder ?? ''" />
        </DataTable>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps({
    data: { type: Array, required: true },
    columns: { type: Array, required: true },
    rows: { type: Number, default: 5 },
    dataKey: { type: String, default: 'id' }
});

const globalFilter = ref('');
const filters = ref({
    global: { value: null, matchMode: 'contains' }
});

watch(globalFilter, (val) => {
    filters.value.global.value = val;
});
</script>

<style scoped>
.p-datatable .p-datatable-tbody>tr>td {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}
</style>
