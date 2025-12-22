<template>
    <Card class="mx-8 my-4">
        <template #title>
            Analytics Panel
        </template>

        <template #content>
            <div class="flex gap-6">
                <Card class="basis-[35%] shrink-0">
                    <template #content>
                        <template v-if="loading">
                            <Skeleton v-for="i in 5" :key="i" height="2rem" class="mb-2" />
                        </template>

                        <DataTable v-else :value="topSuppliersFormatted" stripedRows>
                            <Column field="label" header="Top 5 Suppliers" />
                        </DataTable>
                    </template>
                </Card>

                <Card class="basis-[35%] shrink-0">
                    <template #content>
                        <template v-if="loading">
                            <Skeleton v-for="i in 5" :key="i" height="2rem" class="mb-2" />
                        </template>

                        <DataTable v-else :value="topCountriesFormatted" stripedRows>
                            <Column field="label" header="Top 5 Countries" />
                        </DataTable>
                    </template>
                </Card>

                <Card class="flex flex-col basis-[30%]">
                    <template #title>
                        Average Price per Country
                    </template>

                    <template #content>
                        <div v-if="loading" class="flex items-start gap-10">
                            <Skeleton shape="circle" size="10rem" />

                            <div class="flex flex-col justify-start gap-2">
                                <Skeleton height="2rem" width="14rem" />
                                <Skeleton height="2rem" width="14rem" />
                                <Skeleton height="2rem" width="14rem" />
                                <Skeleton height="2rem" width="14rem" />
                            </div>
                        </div>
                        <PieChart v-else :labels="avgPriceLabels" :values="avgPriceValues" />
                    </template>
                </Card>
            </div>
        </template>
    </Card>
</template>

<script setup>
import { computed } from 'vue';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import PieChart from './PieChart.vue';

const props = defineProps({
    analytics: {
        type: Object,
        required: true,
        default: () => ({
            topSuppliers: [],
            topCountries: [],
            avgPricePerCountry: []
        })
    },
    loading: { type: Boolean, default: false }
});

const topSuppliersFormatted = computed(() =>
    props.analytics.topSuppliers.map((item, index) => ({
        label: `${index + 1}. ${item.name} (${item.total})`
    }))
);

const topCountriesFormatted = computed(() =>
    props.analytics.topCountries.map((item, index) => ({
        label: `${index + 1}. ${item.country} (${item.total})`
    }))
);

const avgPriceLabels = computed(() =>
    props.analytics.avgPricePerCountry.map(i => i.country)
);

const avgPriceValues = computed(() =>
    props.analytics.avgPricePerCountry.map(i => i.avgPrice)
);
</script>

<style scoped></style>
