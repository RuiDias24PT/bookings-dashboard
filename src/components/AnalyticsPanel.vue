<template>
    <Card class="mx-8 my-4">
        <template #title>
            Analytics Panel
        </template>

        <template #content>
            <div class="flex gap-6">
                <Card class="basis-[35%] shrink-0">
                    <template #content>
                        <DataTable :value="topSuppliersFormatted" stripedRows>
                            <Column field="label" header="Top 5 Suppliers" />
                        </DataTable>
                    </template>
                </Card>

                <Card class="basis-[35%] shrink-0">
                    <template #content>
                        <DataTable :value="topCountriesFormatted" stripedRows>
                            <Column field="label" header="Top 5 Countries" />
                        </DataTable>
                    </template>
                </Card>

                <Card class="flex flex-col basis-[30%] ">
                    <template #title>
                        Average Price per Country
                    </template>

                    <template #content>
                        <div class="flex-1 flex items-center justify-center">
                            <Chart type="pie" :data="avgPricePieData" :options="pieOptions" class="w-full h-[10rem]" />
                        </div>
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

const props = defineProps({
    analytics: {
        type: Object,
        required: true,
        default: () => ({
            topSuppliers: [],
            topCountries: [],
            avgPricePerCountry: []
        })
    }
});
const topCountriesFormatted = computed(() =>
    props.analytics.topCountries.map((item, index) => ({
        label: `${index + 1}. ${item.country} (${item.total})`
    }))
);

const topSuppliersFormatted = computed(() =>
    props.analytics.topSuppliers.map((item, index) => ({
        label: `${index + 1}. ${item.name} (${item.total})`
    }))
);

const avgPricePieData = computed(() => {
    const count = props.analytics.avgPricePerCountry.length;

    return {
        labels: props.analytics.avgPricePerCountry.map(i => i.country),
        datasets: [{
            data: props.analytics.avgPricePerCountry.map(i => i.avgPrice),
            backgroundColor: generateColors(count)
        }]
    };
});

const pieOptions = computed(() => {
    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--text-color');

    return {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: textColor,
                    usePointStyle: true
                }
            },
            tooltip: {
                callbacks: {
                    label: (ctx) =>
                        `${ctx.label}: ${ctx.raw.toFixed(2)}`
                }
            }
        }
    };
});

const generateColors = (count) =>
    Array.from({ length: count }, (_, i) =>
        `hsl(${Math.round((360 / count) * i)}, 70%, 55%)`
    );
</script>

<style scoped>

</style>